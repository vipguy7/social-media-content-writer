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

interface ContentAnalysis {
  keywords: string[];
  emotions: string[];
  visualElements: string[];
  colors: string[];
  mood: string;
}

function analyzeContentForVisuals(contentText: string, productName: string): ContentAnalysis {
  const text = contentText.toLowerCase();
  
  // Extract keywords and themes from content
  const keywords: string[] = [];
  const emotions: string[] = [];
  const visualElements: string[] = [];
  const colors: string[] = [];
  
  // Emotion detection (Burmese and English)
  const emotionMap = {
    'ပျော်ရွှင်': 'happy',
    'စိတ်လှုပ်ရှား': 'excited', 
    'ကျေးဇူးတင်': 'grateful',
    'အံ့ဩ': 'amazed',
    'လှပ': 'beautiful',
    'အရသာ': 'delicious',
    'လတ်ဆတ်': 'fresh',
    'အရည်အသွေး': 'quality',
    'မြန်မာ': 'myanmar',
    'ရိုးရာ': 'traditional'
  };
  
  Object.entries(emotionMap).forEach(([burmese, english]) => {
    if (text.includes(burmese) || text.includes(english)) {
      emotions.push(english);
      keywords.push(burmese);
    }
  });
  
  // Visual elements detection
  const visualKeywords = {
    'အစားအသောက်': ['food', 'dining', 'kitchen', 'restaurant'],
    'ဖက်ရှင်': ['fashion', 'clothing', 'style', 'model'],
    'နည်းပညာ': ['technology', 'modern', 'digital', 'sleek'],
    'အလှကုန်': ['beauty', 'skincare', 'makeup', 'elegant'],
    'ခရီးသွား': ['travel', 'landscape', 'adventure', 'destination'],
    'ကျန်းမာရေး': ['health', 'wellness', 'fitness', 'natural'],
    'ပညာရေး': ['education', 'books', 'learning', 'professional']
  };
  
  Object.entries(visualKeywords).forEach(([burmese, elements]) => {
    if (text.includes(burmese)) {
      visualElements.push(...elements);
    }
  });
  
  // Myanmar color palette detection
  const colorKeywords = {
    'နီ': 'red',
    'ရွှေ': 'gold', 
    'အဖြူ': 'white',
    'အစိမ်း': 'green',
    'အပြာ': 'blue',
    'ရောင်စုံ': 'colorful'
  };
  
  Object.entries(colorKeywords).forEach(([burmese, color]) => {
    if (text.includes(burmese)) {
      colors.push(color);
    }
  });
  
  // Determine mood based on content type and emotions
  let mood = 'professional';
  if (emotions.includes('happy') || emotions.includes('excited')) {
    mood = 'vibrant and energetic';
  } else if (emotions.includes('traditional') || text.includes('ရိုးရာ')) {
    mood = 'traditional and elegant';
  } else if (emotions.includes('quality') || text.includes('အရည်အသွေး')) {
    mood = 'premium and sophisticated';
  }
  
  return {
    keywords: [...new Set(keywords)],
    emotions: [...new Set(emotions)],
    visualElements: [...new Set(visualElements)],
    colors: colors.length > 0 ? [...new Set(colors)] : ['red', 'gold'],
    mood
  };
}

function generateImagePrompts(body: ImageRequestBody): string[] {
  const analysis = analyzeContentForVisuals(body.contentText, body.productName);
  
  console.log('Content analysis:', analysis);
  
  // Base Myanmar styling elements
  const myanmarElements = [
    'Myanmar traditional patterns',
    'red and gold Myanmar colors',
    'Myanmar cultural elements',
    'Myanmar flag inspired colors',
    'traditional Myanmar motifs'
  ];
  
  // Platform-specific requirements
  const platformSpecs = {
    facebook: 'Facebook post format, engaging social media design, 1200x630 optimal',
    instagram: 'Instagram square format, visually appealing, hashtag ready, 1080x1080',
    twitter: 'Twitter post format, concise visual message, 1200x675',
    default: 'social media ready, square format, professional quality'
  };
  
  const platformSpec = platformSpecs[body.platform as keyof typeof platformSpecs] || platformSpecs.default;
  
  // Content type specific styles
  const contentStyles = {
    promotional: 'promotional style, eye-catching, sales-focused, call-to-action elements, marketing appeal',
    educational: 'informative layout, clean design, educational content, professional, instructional',
    entertaining: 'fun and engaging, bright colors, entertainment theme, playful, dynamic',
    news: 'news-style layout, informative, credible, professional journalism look',
    community: 'community-focused, warm and welcoming, inclusive, social connection'
  };
  
  const contentStyle = contentStyles[body.contentType as keyof typeof contentStyles] || contentStyles.promotional;
  
  // Generate diverse prompts based on analysis
  const prompts: string[] = [];
  
  // Prompt 1: Main product focus with analyzed elements
  const colorScheme = analysis.colors.length > 0 ? analysis.colors.join(' and ') : 'red and gold';
  const visualElements = analysis.visualElements.length > 0 ? `, ${analysis.visualElements.slice(0, 2).join(', ')} theme` : '';
  
  prompts.push(
    `Professional Myanmar business social media post featuring ${body.productName}, ${colorScheme} color scheme, ${analysis.mood} mood${visualElements}, clean modern typography, ${platformSpec}, high quality commercial design, Myanmar cultural touch`
  );
  
  // Prompt 2: Emotion and mood focused
  const emotionKeywords = analysis.emotions.length > 0 ? analysis.emotions.join(', ') : 'professional, trustworthy';
  prompts.push(
    `${analysis.mood} design for ${body.productName}, conveying ${emotionKeywords} emotions, ${myanmarElements[Math.floor(Math.random() * myanmarElements.length)]}, ${contentStyle}, ${platformSpec}, engaging visual composition`
  );
  
  // Prompt 3: Cultural and traditional focus
  prompts.push(
    `Myanmar traditional style graphic for ${body.productName}, traditional patterns and motifs, ${colorScheme} Myanmar colors, cultural heritage inspired, ${contentStyle}, ${platformSpec}, authentic Myanmar aesthetic, premium quality`
  );
  
  // Prompt 4: Modern minimalist approach
  if (analysis.visualElements.includes('technology') || analysis.visualElements.includes('modern')) {
    prompts.push(
      `Modern minimalist design for ${body.productName}, clean and contemporary, Myanmar red and gold accents, ${contentStyle}, ${platformSpec}, sophisticated layout, premium branding`
    );
  } else {
    prompts.push(
      `Creative promotional graphic for ${body.productName}, Myanmar cultural elements with modern twist, vibrant ${colorScheme} colors, ${contentStyle}, ${platformSpec}, eye-catching design, professional quality`
    );
  }
  
  // Add content-specific enhancements to all prompts
  const enhancedPrompts = prompts.map(prompt => {
    let enhancement = '';
    
    // Add visual elements based on content analysis
    if (analysis.visualElements.length > 0) {
      const relevantElements = analysis.visualElements.slice(0, 2);
      enhancement += `, ${relevantElements.join(' and ')} elements`;
    }
    
    // Add keyword-based visual cues
    if (analysis.keywords.some(k => ['အစားအသောက်', 'အရသာ'].includes(k))) {
      enhancement += ', appetizing food photography style';
    }
    
    if (analysis.keywords.some(k => ['လှပ', 'အလှ'].includes(k))) {
      enhancement += ', beauty and elegance focused';
    }
    
    return `${prompt}${enhancement}, high resolution, professional quality, optimized for social media`;
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
    console.log('Image generation request:', { 
      ...body, 
      contentText: body.contentText?.substring(0, 100) + '...' 
    });
    
    if (!body.productName?.trim()) {
      throw new Error('Product name is required for image generation');
    }
    
    if (body.numImages < 1 || body.numImages > 4) {
      throw new Error('Number of images must be between 1 and 4');
    }

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const imagePrompts = generateImagePrompts(body);
    
    console.log('Generated prompts based on content analysis:', imagePrompts);
    
    const images: string[] = [];

    // Try to generate images with Gemini Imagen if API key is available
    if (GEMINI_API_KEY) {
      console.log('Using Gemini Imagen for image generation...');
      
      for (let i = 0; i < imagePrompts.length; i++) {
        const prompt = imagePrompts[i];
        console.log(`Generating image ${i + 1} with analyzed prompt: ${prompt.substring(0, 150)}...`);
        
        try {
          const imageData = await Promise.race([
            generateImageWithGemini(prompt, GEMINI_API_KEY),
            new Promise<null>((_, reject) => 
              setTimeout(() => reject(new Error('Image generation timeout')), 30000)
            )
          ]);

          if (imageData) {
            images.push(imageData);
            console.log(`Successfully generated image ${i + 1} based on content analysis`);
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
      contentAnalysis: analyzeContentForVisuals(body.contentText, body.productName),
      message: GEMINI_API_KEY ? 
        `Generated ${images.length} images using AI with content analysis` : 
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
