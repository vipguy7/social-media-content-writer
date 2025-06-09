
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
    `Professional Myanmar business social media post for ${body.productName}, red and gold Myanmar colors, clean modern typography, square format 1:1, commercial quality, minimalist design`,
    `Modern Facebook post design for ${body.productName}, Myanmar cultural elements, traditional patterns, vibrant colors, square layout, professional branding, engaging visual`,
    `Creative promotional graphic for ${body.productName}, Myanmar flag colors, elegant design, square format, social media ready, high quality, professional look`,
    `Minimalist product showcase for ${body.productName}, Myanmar style background, clean typography, square composition, Instagram ready, premium quality`
  ];

  // Enhance prompts based on content type and platform
  const enhancedPrompts = basePrompts.map(prompt => {
    let enhancement = '';
    
    switch (body.contentType) {
      case 'promotional':
        enhancement = ', promotional style, eye-catching, sales-focused, call-to-action elements';
        break;
      case 'educational':
        enhancement = ', informative layout, clean design, educational content, professional';
        break;
      case 'entertaining':
        enhancement = ', fun and engaging, bright colors, entertainment theme, playful';
        break;
      default:
        enhancement = ', professional and clean design';
    }

    if (body.platform === 'facebook') {
      enhancement += ', Facebook post format, engaging social media design';
    } else if (body.platform === 'instagram') {
      enhancement += ', Instagram post format, visually appealing, hashtag ready';
    }

    return `${prompt}${enhancement}, high resolution, professional quality`;
  });

  return enhancedPrompts.slice(0, body.numImages);
}

async function generateImageWithGemini(prompt: string, geminiApiKey: string): Promise<string | null> {
  try {
    console.log('Generating image with Gemini Imagen...');
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:generateImage?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        safetySettings: [
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_LOW_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_LOW_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_LOW_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_LOW_AND_ABOVE"
          }
        ],
        generationConfig: {
          aspectRatio: "1:1",
          negativePrompt: "blurry, low quality, distorted, watermark, text overlay, poor lighting"
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini Imagen API error:', response.status, errorText);
      return null;
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].image) {
      const base64Image = data.candidates[0].image.data;
      return `data:image/png;base64,${base64Image}`;
    }

    return null;
  } catch (error) {
    console.error('Error generating image with Gemini:', error);
    return null;
  }
}

function generatePlaceholderImage(productName: string, index: number): string {
  // Generate a simple SVG placeholder with Myanmar styling
  const svg = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FF6B6B;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad1)"/>
      <rect x="20" y="20" width="472" height="472" fill="none" stroke="#fff" stroke-width="4"/>
      <text x="256" y="200" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="#fff">Myanmar Content</text>
      <text x="256" y="240" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="#fff">${productName}</text>
      <text x="256" y="300" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#fff">Professional Design ${index + 1}</text>
      <circle cx="256" cy="350" r="30" fill="none" stroke="#fff" stroke-width="3"/>
      <path d="M 240 350 L 250 360 L 272 338" stroke="#fff" stroke-width="3" fill="none"/>
    </svg>
  `;
  
  const base64Svg = btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${base64Svg}`;
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
    const imagePrompts = generateImagePrompts(body);
    const images: string[] = [];

    // Try to generate images with Gemini Imagen if API key is available
    if (GEMINI_API_KEY) {
      console.log('Using Gemini Imagen for image generation...');
      
      for (let i = 0; i < imagePrompts.length; i++) {
        const prompt = imagePrompts[i];
        console.log(`Generating image ${i + 1} with prompt: ${prompt.substring(0, 100)}...`);
        
        try {
          const imageData = await Promise.race([
            generateImageWithGemini(prompt, GEMINI_API_KEY),
            new Promise<null>((_, reject) => 
              setTimeout(() => reject(new Error('Image generation timeout')), 30000)
            )
          ]);

          if (imageData) {
            images.push(imageData);
            console.log(`Successfully generated image ${i + 1}`);
          } else {
            console.log(`Failed to generate image ${i + 1}, creating placeholder`);
            images.push(generatePlaceholderImage(body.productName, i));
          }

          // Add delay between requests to respect rate limits
          if (i < imagePrompts.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }

        } catch (error) {
          console.error(`Error generating image ${i + 1}:`, error);
          // Create placeholder image if generation fails
          images.push(generatePlaceholderImage(body.productName, i));
        }
      }
    } else {
      console.log('No Gemini API key found, generating placeholder images...');
      // Generate placeholder images if no API key is available
      for (let i = 0; i < body.numImages; i++) {
        images.push(generatePlaceholderImage(body.productName, i));
      }
    }

    console.log(`Generated ${images.length} images out of ${body.numImages} requested`);

    return new Response(JSON.stringify({
      success: true,
      images: images,
      prompts: imagePrompts,
      message: GEMINI_API_KEY ? 
        `Generated ${images.length} images using AI` : 
        `Generated ${images.length} placeholder images (Gemini API key not configured)`
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
