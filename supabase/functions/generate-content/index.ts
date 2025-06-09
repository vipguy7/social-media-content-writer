
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
  brandGender?: string;
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
  if (!pageLink || !pageLink.includes('facebook.com')) {
    return {};
  }

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

function getPronounGuidelines(brandGender?: string): string {
  if (!brandGender) return '';

  const pronounGuides = {
    male: `
### ယောက်ျား ကိုယ်စားပြုနာမ် အတွက် စကားလုံးရွေးချယ်မှု:
- ပထမပုဂ္ဂိုလ်: "ကျွန်တော်", "ကျွန်တော်တို့"
- တတိယပုဂ္ဂိုလ်: "သူ", "သူတို့"
- အခန်းကဏ္ဍ: "မန်နေဂျာ", "ကျွမ်းကျင်သူ", "အကြံပေးပုဂ္ဂိုလ်"
- စကားလုံးရွေးချယ်မှု: ခံရင်းမားသော၊ တိုက်ရိုက်သော၊ အားကောင်းသော စကားလုံးများ အသုံးပြုပါ
`,
    female: `
### မိန်းမ ကိုယ်စားပြုနာမ် အတွက် စကားလုံးရွေးချယ်မှု:
- ပထမပုဂ္ဂိုလ်: "ကျွန်မ", "ကျွန်မတို့"
- တတိယပုဂ္ဂိုလ်: "သူမ", "သူမတို့"
- အခန်းကဏ္ဍ: "မန်နေဂျာမ", "ကျွမ်းကျင်သူမ", "အကြံပေးပုဂ္ဂိုလ်မ"
- စကားလုံးရွေးချယ်မှု: နူးညံ့သော၊ ခံစားမှုရှိသော၊ ညှို့နှုံ့သော စကားလုံးများ အသုံးပြုပါ
`,
    neutral: `
### ကြားခံ ကိုယ်စားပြုနာမ် အတွက် စကားလုံးရွေးချယ်မှု:
- ပထမပုဂ္ဂိုလ်: "ကျွန်ုပ်", "ကျွန်တော်တို့"
- တတိယပုဂ္ဂိုလ်: "ဤလုပ်ငန်း", "ကုမ္ပဏီ"
- အခန်းကဏ္ဍ: "ကျွမ်းကျင်သူ", "လုပ်ငန်းရှင်", "အဖွဲ့"
- စကားလုံးရွေးချယ်မှု: ပရော်ဖက်ရှင်နယ်၊ မျှတသော၊ ကြားခံသော စကားလုံးများ အသုံးပြုပါ
`
  };

  return pronounGuides[brandGender as keyof typeof pronounGuides] || '';
}

function getRefinedBurmeseContentPrompt(body: RequestBody, fbAnalysis?: FacebookAnalysis): string {
  const contentTypeMapping = {
    'promotional': 'Product Advertising',
    'educational': 'Product Knowledge Sharing',
    'entertaining': 'Fun Facts',
    'news': 'Sales Announcements',
    'community': 'Branding Posts'
  };

  const objectiveMapping = {
    'awareness': 'Awareness',
    'engagement': 'Branding',
    'conversion': 'Sales',
    'retention': 'Lead generation',
    'traffic': 'Promotion'
  };

  const styleMapping = {
    'professional': 'Professional style (အလုပ်သုံးသင့်တဲ့ စည်းကမ်းရှိပြီး ယဥ်ကျေးတဲ့စကားလုံး)',
    'casual': 'Influencer style (ယုံကြည်စိတ်ချရတဲ့ မျှဝေမှုအပြင် ပရိသတ်နဲ့ ချစ်ခြင်းမေတ္တာရှိစွာ ဆက်ဆံမှု)',
    'friendly': 'Influencer style (ယုံကြည်စိတ်ချရတဲ့ မျှဝေမှုအပြင် ပရိသတ်နဲ့ ချစ်ခြင်းမေတ္တာရှိစွာ ဆက်ဆံမှု)',
    'authoritative': 'Knowledge-sharing style (အကြောင်းအရာ ရှင်းလင်းနားလည်စေဖို့ သတင်းအချက်အလက်ပြေပြစ်)',
    'playful': 'Sales promoter style (အားကျဖွယ်အရောင်းစကားများ၊ စိတ်ဝင်စားဖို့အချက်များ)'
  };

  const ctaExamples = {
    'awareness': 'သိထားသင့်တဲ့အချက်လေးပါ။',
    'engagement': 'ကျွန်တော်တို့ကို ယနေ့လိုမျိုး follow လုပ်ထားပါ။',
    'conversion': 'အခုဝယ်လိုက်တော့ နောက်ကျမယ်နော်။',
    'retention': 'စိတ်ဝင်စားရင် inbox ထဲလာမေးနိုင်ပါတယ်နော်။',
    'traffic': 'နောက်မကျခင် အမြန်ဆုံးလက်ခံလိုက်နော်။'
  };

  let basePrompt = `
# Refined Prompt for Burmese Social Media Content Generation

သင်သည် မြန်မာနိုင်ငံရှိ လုပ်ငန်းတစ်ခုအတွက် မြန်မာဘာသာ ဆိုရှယ်မီဒီယာ ကွန်တင့်ရေးသားသူ ဖြစ်သည်။ သင့်တာဝန်မှာ ဆိုရှယ်မီဒီယာ ပလပ်ဖောင်းများ (Facebook သို့မဟုတ် Instagram) အတွက် တိုတောင်းသော၊ ပုံမှန်၊ အသေးစိတ်ရှင်းလင်းသော၊ စိတ်ဝင်စားဖွယ်ရာနှင့် ရည်ရွယ်ချက်ရှိသော ကွန်တင့်များ ဖန်တီးခြင်း ဖြစ်သည်။

## လက်ရှိ လုပ်ငန်းအချက်အလက်များ:
**ထုတ်ကုန်/ဝန်ဆောင်မှု**: ${sanitizeInput(body.productName)}
**အဓိကမက်ဆေ့ခ်**: ${sanitizeInput(body.keyMessage)}
**ပစ်မှတ်ပရိသတ်**: ${body.targetAudience || 'ယေဘုယျ မြန်မာပရိသတ်'}
**အဓိကစကားလုံးများ**: ${body.keywords || 'မရှိ'}
**ပလပ်ဖောင်း**: ${body.platform}
**ကွန်တင့်အမျိုးအစား**: ${contentTypeMapping[body.contentType as keyof typeof contentTypeMapping] || body.contentType}
**အရေးယရ**: ${body.contentLength}
**မားကတ်တင်း ရည်ရွယ်ချက်**: ${objectiveMapping[body.objective as keyof typeof objectiveMapping] || body.objective}
**ရေးသားပုံစံ**: ${styleMapping[body.style as keyof typeof styleMapping] || body.style}

${getPronounGuidelines(body.brandGender)}

## အတိအကျ လိုက်နာရမည့် စည်းမျဉ်းများ:

### 1. ဘာသာစကား
- အားလုံး မြန်မာ Unicode ဖြင့် ရေးသားရမည်
- စာလုံးပေါင်း၊ သဒ္ဒါ၊ စာကြောင်းဖွဲ့စည်းပုံ မှန်ကန်ရမည်
- ယဉ်ကျေးမှုနှင့် ကိုက်ညီမှုရှိရမည်

### 2. ရေးသားပုံစံ
- ပုံမှန်ပြီး ဖော်ရွေသော အသံဖြင့် ရေးရန် — ယဉ်ကျေးသော၊ ယုံကြည်စိတ်ချရသော၊ ချဉ်းကပ်ရလွယ်သော

### 3. ရေးသားစတိုင်များ
လိုအပ်သလို အောက်ပါစတိုင်များမှ ရွေးချယ် သို့မဟုတ် ပေါင်းစပ်အသုံးပြုပါ:
- **Professional style**: အလုပ်သုံးသင့်တဲ့ စည်းကမ်းရှိပြီး ယဥ်ကျေးတဲ့စကားလုံး
- **Knowledge-sharing style**: အကြောင်းအရာ ရှင်းလင်းနားလည်စေဖို့ သတင်းအချက်အလက်ပြေပြစ်
- **Sales promoter style**: အားကျဖွယ်အရောင်းစကားများ၊ စိတ်ဝင်စားဖို့အချက်များ
- **Influencer style**: ယုံကြည်စိတ်ချရတဲ့ မျှဝေမှုအပြင် ပရိသတ်နဲ့ ချစ်ခြင်းမေတ္တာရှိစွာ ဆက်ဆံမှု
- **Product review style**: အကြောင်းအရာမှာ သုံးသပ်ချက်၊ အသုံးပြုသူအတွေ့အကြုံများ ပါဝင်မှု

### 4. ကွန်တင့်အမျိုးအစားများ
${contentTypeMapping[body.contentType as keyof typeof contentTypeMapping] || body.contentType} အတွက် ကွန်တင့် ဖန်တီးပါ။

🔹 တစ်ခုချင်းစီအတွက်:
- မိတ်ဆက်နှင့် CTA (အဆုံး) များသာ ရည်ရွယ်ချက်အပေါ် မူတည်၍ ပြောင်းလဲမည်
- ရည်ရွယ်ချက်နှင့် ကိုက်ညီသော မိတ်ဆက် ထည့်ပါ
- နောက်ဆုံးတွင် မားကတ်တင်း ရည်ရွယ်ချက်အပေါ် မူတည်သော သင့်လျော်သော CTA ထည့်ပါ

### 5. မားကတ်တင်း ရည်ရွယ်ချက်အပေါ် မူတည်သော CTA ဥပမာများ
သင့် ရည်ရွယ်ချက် **${body.objective}** အတွက် သင့်လျော်သော CTA: **"${ctaExamples[body.objective as keyof typeof ctaExamples] || 'ဆက်လက် လိုက်လာပါ။'}"**

### 6. အဓိကမက်ဆေ့ခ်နှင့် စကားလုံး ကိုင်တွယ်မှု
- ပေးထားသော အဓိကမက်ဆေ့ခ်များနှင့် စကားလုံးများကို တိကျစွာ အသုံးပြုပါ
- ၎င်းတို့ကို မိတ်ဆက်၊ အဓိကအပိုင်း၊ CTA ကဏ္ဍများတွင် သဘာဝကျကျ ထည့်ပါ

### 7. ကွန်တင့်အရေး
ဆိုရှယ်မီဒီယာအတွက် သင့်လျော်သော တိုတောင်းမှုရှိရမည် — အများဆုံး စာပိုဒ် ၂ မှ ၃ ပိုဒ်
လိုအပ်ပါက ဖတ်ရှုရလွယ်ကူရန် bullet points သို့မဟုတ် line breaks များ အသုံးပြုပါ

### 8. အပိုအင်္ဂါရပ်များ
${body.includeEmojis ? '- စိတ်ဝင်စားမှု တိုးပွားစေရန် emojis များကို မဟာဗျူဟာအလိုက် အသုံးပြုပါ' : '- Emojis များ မထည့်ပါနှင့်'}
${body.includeHashtags ? '- လှုပ်ရှားမှု သို့မဟုတ် ခေါင်းစဉ်နှင့် သက်ဆိုင်ပါက hashtags များ အသုံးပြုပါ' : '- Hashtags များ မထည့်ပါနှင့်'}
${body.includeCTA ? '- အပြီးသတ်တွင် သင့်လျော်သော call-to-action ထည့်ပါ' : '- Call-to-action မထည့်ပါနှင့်'}
`;

  // Add Facebook analysis if available
  if (fbAnalysis && Object.keys(fbAnalysis).length > 0) {
    basePrompt += `

### Facebook Page ခွဲခြမ်းစိတ်ဖြာမှု အခြေခံ လမ်းညွှန်ချက်များ:
`;
    
    if (fbAnalysis.brandStyle) {
      basePrompt += `**ဘရန်း စတိုင်**: ${fbAnalysis.brandStyle}\n`;
    }

    if (fbAnalysis.contentThemes && fbAnalysis.contentThemes.length > 0) {
      basePrompt += `**အဓိက ကွန်တင့် ဆောင်ပုဒ်များ**: ${fbAnalysis.contentThemes.join('၊ ')}\n`;
    }

    if (fbAnalysis.audienceEngagement) {
      basePrompt += `**ပရိသတ် ပါဝင်မှု ပုံစံ**: ${fbAnalysis.audienceEngagement}\n`;
    }
  }

  basePrompt += `

## အထူးညွှန်ကြားချက်များ:
1. မြန်မာစာဖြင့်သာ ဖန်တီးပါ
2. ယဉ်ကျေးမှုနှင့် ကိုက်ညီမှုရှိရမည်
3. တစ်ခုနှင့်တစ်ခု ကွဲပြားသော ${body.numVariations} မျိုး ဖန်တီးပါ
4. တစ်ခုချင်းစီကို ===VARIATION_START=== နှင့် ===VARIATION_END=== ဖြင့် ခွဲခြားပါ
5. ခေတ်မီ မြန်မာလူငယ်များ သုံးသော စကားလုံးများ အသုံးပြုပါ
6. မြန်မာ့စီးပွားရေး ပတ်ဝန်းကျင်နှင့် ကိုက်ညီမှုရှိရမည်
7. ပေးထားသော အဓိကမက်ဆေ့ခ်နှင့် စကားလုံးများကို အရေးပါသော နေရာများတွင် ထည့်သွင်းပါ
8. ကွန်တင့်ရေးသားပုံစံ စည်းမျဉ်းများကို တိကျစွာ လိုက်နာပါ

ယခုပဲ စတင်ဖန်တီးပါ:`;

  return basePrompt;
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

    const prompt = getRefinedBurmeseContentPrompt(body, fbAnalysis);
    
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
