
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ImageRequestBody {
  contentText: string;
  productName: string;
  numImages: number;
  platform: string;
  contentType: string;
}

function generateImagePrompts(body: ImageRequestBody): string[] {
  const basePrompts = [
    `Professional product photography of ${body.productName}, Myanmar style, clean background, high quality, commercial use`,
    `Modern social media graphic for ${body.productName}, Myanmar colors (red, gold), typography, square format`,
    `Lifestyle image showing ${body.productName} in use, Myanmar setting, natural lighting, authentic`,
    `Minimalist graphic design for ${body.productName}, Myanmar cultural elements, geometric shapes, square layout`
  ];

  // Enhance prompts based on content type
  const enhancedPrompts = basePrompts.map(prompt => {
    switch (body.contentType) {
      case 'promotional':
        return `${prompt}, promotional style, vibrant colors, attention-grabbing`;
      case 'educational':
        return `${prompt}, informative layout, clean design, professional`;
      case 'entertaining':
        return `${prompt}, fun and engaging, bright colors, dynamic composition`;
      default:
        return prompt;
    }
  });

  return enhancedPrompts.slice(0, body.numImages);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: ImageRequestBody = await req.json();
    console.log('Image generation request:', { ...body, contentText: body.contentText?.substring(0, 50) + '...' });
    
    if (!body.productName?.trim()) {
      throw new Error('Product name is required for image generation');
    }
    
    if (body.numImages < 1 || body.numImages > 4) {
      throw new Error('Number of images must be between 1 and 4');
    }

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const imagePrompts = generateImagePrompts(body);
    const images: string[] = [];

    // Generate images sequentially to avoid rate limiting
    for (const prompt of imagePrompts) {
      try {
        console.log('Generating image with prompt:', prompt.substring(0, 100) + '...');
        
        const imageResponse = await Promise.race([
          fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:generateImage?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt: prompt,
              config: {
                aspectRatio: "1:1",
                safetyFilterLevel: "BLOCK_ONLY_HIGH",
                personGeneration: "ALLOW_ADULT"
              }
            }),
          }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Image generation timeout')), 20000)
          )
        ]) as Response;

        if (!imageResponse.ok) {
          console.error(`Image generation failed for prompt: ${prompt.substring(0, 50)}...`);
          continue;
        }

        const imageData = await imageResponse.json();
        
        if (imageData.images && imageData.images.length > 0) {
          // The response should contain base64 encoded image data
          const base64Image = imageData.images[0].image;
          images.push(`data:image/png;base64,${base64Image}`);
          console.log('Successfully generated image');
        }

        // Add delay between requests to respect rate limits
        if (imagePrompts.indexOf(prompt) < imagePrompts.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

      } catch (error) {
        console.error('Error generating individual image:', error);
        // Continue with other images even if one fails
      }
    }

    console.log(`Generated ${images.length} images out of ${imagePrompts.length} requested`);

    return new Response(JSON.stringify({
      success: true,
      images: images,
      prompts: imagePrompts
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-images function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
