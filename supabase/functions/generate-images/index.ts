
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
    `Professional Myanmar business advertisement for ${body.productName}, red and gold colors, clean typography, square format, commercial quality`,
    `Modern social media post design for ${body.productName}, Myanmar cultural elements, vibrant colors, square layout, professional branding`,
    `Minimalist product showcase for ${body.productName}, Myanmar style background, elegant design, square format, high quality`,
    `Creative promotional graphic for ${body.productName}, traditional Myanmar patterns, modern typography, square composition`
  ];

  // Enhance prompts based on content type
  const enhancedPrompts = basePrompts.map(prompt => {
    switch (body.contentType) {
      case 'promotional':
        return `${prompt}, promotional style, eye-catching, sales-focused`;
      case 'educational':
        return `${prompt}, informative layout, clean design, educational`;
      case 'entertaining':
        return `${prompt}, fun and engaging, bright colors, entertainment`;
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

    // Generate images using OpenAI's image generation (more reliable than Imagen)
    for (const prompt of imagePrompts) {
      try {
        console.log('Generating image with prompt:', prompt.substring(0, 100) + '...');
        
        const imageResponse = await Promise.race([
          fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${GEMINI_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'dall-e-3',
              prompt: prompt,
              n: 1,
              size: '1024x1024',
              quality: 'standard',
              response_format: 'b64_json'
            }),
          }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Image generation timeout')), 30000)
          )
        ]) as Response;

        if (!imageResponse.ok) {
          console.error(`Image generation failed for prompt: ${prompt.substring(0, 50)}...`);
          continue;
        }

        const imageData = await imageResponse.json();
        
        if (imageData.data && imageData.data.length > 0) {
          const base64Image = imageData.data[0].b64_json;
          images.push(`data:image/png;base64,${base64Image}`);
          console.log('Successfully generated image');
        }

        // Add delay between requests to respect rate limits
        if (imagePrompts.indexOf(prompt) < imagePrompts.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
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
