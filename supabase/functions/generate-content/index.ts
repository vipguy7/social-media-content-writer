
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  platform: string;
  contentType: string;
  contentLength: string;
  objective: string;
  style: string;
  productName: string;
  keyMessage: string;
  targetAudience: string;
  keywords: string;
  facebookPageLink?: string;
  includeCTA: boolean;
  includeEmojis: boolean;
  includeHashtags: boolean;
  numVariations: number;
}

interface FacebookAnalysis {
  brandStyle?: string;
  contentThemes?: string[];
  audienceEngagement?: string;
  postingPatterns?: string;
}

function validateInput(body: RequestBody): void {
  if (!body.productName?.trim()) {
    throw new Error('Product name is required');
  }
  if (!body.keyMessage?.trim()) {
    throw new Error('Key message is required');
  }
  if (body.numVariations < 1 || body.numVariations > 5) {
    throw new Error('Number of variations must be between 1 and 5');
  }
}

function sanitizeInput(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim();
}

async function analyzeFacebookPage(pageLink: string): Promise<FacebookAnalysis> {
  // Simulate Facebook page analysis
  // In a real implementation, this would use Facebook Graph API or web scraping
  if (!pageLink || !pageLink.includes('facebook.com')) {
    return {};
  }

  // Mock analysis results based on common patterns
  const mockAnalysis: FacebookAnalysis = {
    brandStyle: "ဖော်ရွေပြီး ပရော်ဖက်ရှင်နယ် ပုံစံ၊ မကြာခဏ ရိုးရာ မြန်မာ အင်္ဂါရပ်များ အသုံးပြု",
    contentThemes: [
      "ထုတ်ကုန် အရည်အသွေး ကိုအလေးပေး",
      "ဖောက်သည် စိတ်ကျေနပ်မှု",
      "မြန်မာ့ ယဉ်ကျေးမှု တန်ဖိုးများ",
      "အသိုင်းအဝိုင်း ပါဝင်မှု"
    ],
    audienceEngagement: "ပြောဆိုမှုများတွင် အချစ်၊ ကျေးဇူးတင်မှု၊ မေးခွန်းများ များသည်။ ညနေပိုင်း ၅ နာရီမှ ၈ နာရီအတွင်း အများဆုံး တုံ့ပြန်မှု ရှိသည်။",
    postingPatterns: "တစ်နေ့ ၁-၂ ကြိမ် ပို့စ်လုပ်၊ သောကြာနေ့ညနေများတွင် အများဆုံး engagement ရှိ"
  };

  return mockAnalysis;
}

function getAdvancedBurmeseGuidelines(fbAnalysis?: FacebookAnalysis): string {
  let baseGuidelines = `
## မြန်မာစာရေးသူ အင်္ဂလိပ်သုံးအခြေအနေများ

သင်သည် မြန်မာနိုင်ငံရှိ အရောင်းအဝယ်နှင့် စီးပွားရေးလုပ်ငန်းများအတွက် ကျွမ်းကျင်သော ဆိုရှယ်မီဒီယာ ကွန်တင့်ရေးသားသူ၊ ပရော်ဖက်ရှင်နယ် ဘလော့ဂါ နှင့် ဖန်တီးမှုမန်နေဂျာ ဖြစ်သည်။ သင့်တွင် ဆိုရှယ်မီဒီယာ မားကတ်တင်းနှင့် မဟာဗျူဟာပြုလုပ်ခြင်းတွင် အထူးကျွမ်းကျင်မှုရှိသည်။

### မြန်မာစာရေးနည်း အထူးလက်ရာများ:
1. **ဖေါ်ရမ်များ**: ရုပ်ပိုင်းဆိုင်ရာ လုပ်ငန်းများအတွက် "ကျွန်တော်တို့", အွန်လိုင်းအတွက် "ကျွန်ုပ်တို့"
2. **စကားလုံးရွေးချယ်မှု**: ရိုးရာဖြင့် "အမြတ်တန်း", ခေတ်မီဖြင့် "အရည်အသွေးမြင့်"
3. **စာရေးပုံစံ**: အစပိုင်းတွင် အာရုံစိုက်မှု၊ အလယ်တွင် အခြေခံအချက်အလက်၊ အဆုံးတွင် လုပ်ဆောင်ချက်တောင်းဆိုခြင်း
4. **ရေပန်းစားသောစကားလုံးများ**: "လက်လှမ်းမမီ", "မြန်မာ့အကောင်းဆုံး", "သင့်အတွက်", "အခုပဲ"

### Facebook Page အမျိုးအစားများနှင့် စကားလုံးရွေးချယ်မှု:
- **အလှကုန်**: လှပမှု၊ အလှတရား၊ တောက်ပမှု
- **အစားအသောက်**: အရသာ၊ လတ်ဆတ်မှု၊ စားကောင်းမှု  
- **ဖက်ရှင်**: ခေတ်မီ၊ ရူပဗေဒ၊ စတိုင်ကျ
- **နည်းပညာ**: ခေတ်မီ၊ လွယ်ကူ၊ မြန်ဆန်
- **သွေးဆောင်မှုစာလုံးများ**: သုံးပုံတစ်ပုံ လျှော့စျေး၊ အခမဲ့ ပို့ဆောင်မှု၊ ၁၀၀% ပြန်အမ်းငွေ

### ကွန်တင့်ဖွဲ့စည်းပုံ:
1. **အာရုံစိုက်မှု ဆွဲဆောင်သော ခေါင်းစဉ်** (၁-၂ လိုင်း)
2. **ပြဿနာ/လိုအပ်ချက် သတိပေးခြင်း** (၁-२ လိုင်း) 
3. **ထုတ်ကုန်/ဝန်ဆောင်မှု နိဒါန်း** (၂-၃ လိုင်း)
4. **အကျိုးကျေးဇူးများ** (၂-၄ အချက်)
5. **လူမှုပင်ရိုးစွဲခြင်း** (သက်သေခံချက်များ သို့မဟုတ် ကိန်းဂဏန်းများ)
6. **အရေးကြီးသော လုပ်ဆောင်ချက်တောင်းဆိုခြင်း**

### ယဉ်ကျေးမှုဆိုင်ရာ အသုံးအနှုန်းများ:
- မင်္ဂလာပါ / ဆွေမျိုးတော် / မိတ်ဆွေများ (နံနက်ပိုင်း)
- ညနေခင်းမင်္ဂလာပါ (ညနေပိုင်း)  
- အားလုံးပဲ ကျန်းမာပါစေ (အဆုံးသတ်မှု)
- မြန်မာ့ဂုဏ်ရည် / မြန်မာ့အစဉ်အလာ (ဂုဏ်ယူမှု)

### စေ့စပ်ညှိနှိုင်းမှုနှင့် တိုက်တွန်းခြင်း:
- "ကျွန်တော်တို့နှင့် အတူတူ..."
- "သင့်ကဲ့သို့ လူမျိုးများအတွက်..."  
- "မြန်မာနိုင်ငံမှာ တစ်ခုတည်းသော..."
- "သင့်မိသားစုအတွက် အကောင်းဆုံး..."
`;

  // Add Facebook page analysis insights if available
  if (fbAnalysis && Object.keys(fbAnalysis).length > 0) {
    baseGuidelines += `

### Facebook Page ခွဲခြမ်းစိတ်ဖြာမှု အခြေခံ လမ်းညွှန်ချက်များ:
`;
    
    if (fbAnalysis.brandStyle) {
      baseGuidelines += `
**ဘရန်း စတိုင်**: ${fbAnalysis.brandStyle}
သင့် ကွန်တင့်ကို ဤ စတိုင်နှင့် ကိုက်ညီအောင် ရေးသားပါ။
`;
    }

    if (fbAnalysis.contentThemes && fbAnalysis.contentThemes.length > 0) {
      baseGuidelines += `
**အဓိက ကွန်တင့် ဆောင်ပုဒ်များ**: ${fbAnalysis.contentThemes.join('၊ ')}
ဤ ဆောင်ပုဒ်များကို သင့် ကွန်တင့်တွင် ထည့်သွင်းစဉ်းစားပါ။
`;
    }

    if (fbAnalysis.audienceEngagement) {
      baseGuidelines += `
**ပရိသတ် ပါဝင်မှု ပုံစံ**: ${fbAnalysis.audienceEngagement}
ဤ ပုံစံများကို အခြေခံ၍ ပရိသတ်နှင့် ပိုမို ချိတ်ဆက်နိုင်သော ကွန်တင့် ရေးပါ။
`;
    }
  }

  return baseGuidelines;
}

function buildContentPrompt(body: RequestBody, fbAnalysis?: FacebookAnalysis): string {
  const guidelines = getAdvancedBurmeseGuidelines(fbAnalysis);
  
  return `${guidelines}

## လုပ်ငန်းတာဝန်
သင်သည် အောက်ပါ သတ်မှတ်ချက်များအတိုင်း ပရော်ဖက်ရှင်နယ် မြန်မာ ဆိုရှယ်မီဒီယာ ကွန်တင့်ကို ဖန်တီးရမည်:

**ပလပ်ဖောင်း**: ${body.platform}
**ကွန်တင့်အမျိုးအစား**: ${body.contentType}
**အရေးယရ**: ${body.contentLength}
**ရည်ရွယ်ချက်**: ${body.objective}
**စကားလုံးရွေးချယ်မှုပုံစံ**: ${body.style}
**ထုတ်ကုန်/ဝန်ဆောင်မှု**: ${sanitizeInput(body.productName)}
**အဓိကမက်ဆေ့ခ်**: ${sanitizeInput(body.keyMessage)}
**ပစ်မှတ်ပရိသတ်**: ${body.targetAudience || 'ယေဘုယျ မြန်မာပရိသတ်'}
**အဓိကစကားလုံးများ**: ${body.keywords || 'မရှိ'}
${body.facebookPageLink ? `**Facebook Page**: ${body.facebookPageLink} (ခွဲခြမ်းစိတ်ဖြာပြီး)` : ''}

## အပိုဆောင်းပါအချက်များ:
- Call to Action: ${body.includeCTA ? 'ပါဝင်ရမည်' : 'မပါဝင်'}
- အီမိုဂျီများ: ${body.includeEmojis ? 'ပါဝင်ရမည်' : 'မပါဝင်'}  
- Hashtag များ: ${body.includeHashtags ? 'ပါဝင်ရမည်' : 'မပါဝင်'}

## အထူးညွှန်ကြားချက်များ:
1. မြန်မာစာဖြင့်သာ ဖန်တီးပါ
2. ယဉ်ကျေးမှုနှင့် ကိုက်ညီမှုရှိရမည်
3. တစ်ခုနှင့်တစ်ခု ကွဲပြားသော ${body.numVariations} မျိုး ဖန်တီးပါ
4. တစ်ခုချင်းစီကို ===VARIATION_START=== နှင့် ===VARIATION_END=== ဖြင့် ခွဲခြားပါ
5. ခေတ်မီ မြန်မာလူငယ်များ သုံးသော စကားလုံးများ အသုံးပြုပါ
6. မြန်မာ့စီးပွားရေး ပတ်ဝန်းကျင်နှင့် ကိုက်ညီမှုရှိရမည်
${fbAnalysis && Object.keys(fbAnalysis).length > 0 ? '7. Facebook Page ခွဲခြမ်းစိတ်ဖြာမှုအခြေခံ လမ်းညွှန်ချက်များကို လိုက်နာပါ' : ''}

ယခုပဲ စတင်ဖန်တီးပါ:`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: RequestBody = await req.json();
    console.log('Content generation request:', { ...body, keyMessage: body.keyMessage?.substring(0, 50) + '...' });
    
    validateInput(body);
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    // Analyze Facebook page if provided
    let fbAnalysis: FacebookAnalysis = {};
    if (body.facebookPageLink?.trim()) {
      console.log('Analyzing Facebook page:', body.facebookPageLink);
      fbAnalysis = await analyzeFacebookPage(body.facebookPageLink);
      console.log('Facebook analysis result:', fbAnalysis);
    }

    const prompt = buildContentPrompt(body, fbAnalysis);
    
    const geminiResponse = await Promise.race([
      fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        }),
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 20000)
      )
    ]) as Response;

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', errorText);
      throw new Error(`Gemini API error: ${geminiResponse.status} - ${errorText}`);
    }

    const geminiData = await geminiResponse.json();
    console.log('Gemini response received');
    
    if (!geminiData.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response from Gemini API');
    }

    const generatedText = geminiData.candidates[0].content.parts[0].text;
    console.log('Generated text length:', generatedText.length);

    // Parse variations
    const variationPattern = /===VARIATION_START===([\s\S]*?)===VARIATION_END===/g;
    const variations: string[] = [];
    let match;

    while ((match = variationPattern.exec(generatedText)) !== null) {
      const variation = match[1].trim();
      if (variation) {
        variations.push(variation);
      }
    }

    // Fallback if no markers found
    if (variations.length === 0) {
      const lines = generatedText.split('\n').filter(line => line.trim());
      const avgLinesPerVariation = Math.max(3, Math.floor(lines.length / body.numVariations));
      
      for (let i = 0; i < body.numVariations && i * avgLinesPerVariation < lines.length; i++) {
        const start = i * avgLinesPerVariation;
        const end = Math.min((i + 1) * avgLinesPerVariation, lines.length);
        const variation = lines.slice(start, end).join('\n').trim();
        if (variation) {
          variations.push(variation);
        }
      }
    }

    // Ensure we have the right number of variations
    const finalVariations = variations.slice(0, body.numVariations);
    
    if (finalVariations.length === 0) {
      finalVariations.push(generatedText.trim());
    }

    console.log(`Generated ${finalVariations.length} variations`);

    return new Response(JSON.stringify({
      success: true,
      variations: finalVariations,
      analysis: fbAnalysis
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-content function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
