
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

interface MarketingInsights {
  audienceProfile: string;
  emotionalTriggers: string[];
  brandPersonality: string;
  competitiveAdvantage: string;
  contentStrategy: string;
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

function generateMarketingInsights(body: RequestBody): MarketingInsights {
  const isFemaleTargeted = body.targetAudience.toLowerCase().includes('မိန်းမ') || 
                          body.targetAudience.toLowerCase().includes('အမျိုးသမီး') ||
                          body.targetAudience.toLowerCase().includes('female') ||
                          body.productName.toLowerCase().includes('beauty') ||
                          body.productName.toLowerCase().includes('cosmetic') ||
                          body.productName.toLowerCase().includes('fashion');

  const isMaleTargeted = body.targetAudience.toLowerCase().includes('ယောက်ျား') || 
                        body.targetAudience.toLowerCase().includes('အမျိုးသား') ||
                        body.targetAudience.toLowerCase().includes('male') ||
                        body.productName.toLowerCase().includes('sport') ||
                        body.productName.toLowerCase().includes('tech') ||
                        body.productName.toLowerCase().includes('gaming');

  if (isFemaleTargeted) {
    return {
      audienceProfile: "အမျိုးသမီးများ - လှပမှု၊ အရည်အသွေး၊ ယုံကြည်စိတ်ချရမှုကို တန်ဖိုးထား",
      emotionalTriggers: ["လှပမှု", "ယုံကြည်စိတ်ချရမှု", "မိသားစု", "ကျန်းမာရေး", "လုံခြုံမှု"],
      brandPersonality: "နူးညံ့၊ ယဉ်ကျေး၊ ယုံကြည်စိတ်ချရ၊ အတတ်ပညာရှိ၊ စာနာမှုရှိ",
      competitiveAdvantage: "အရည်အသွေးမြင့်မှု၊ သဘာဝကင်းမြင့်မှု၊ ယုံကြည်စိတ်ချရမှု",
      contentStrategy: "လှပသော ပုံရိပ်များ၊ အကြောင်းအရာ နူးညံ့စွာ တင်ပြမှု၊ အတွေ့အကြုံ မျှဝေမှု"
    };
  } else if (isMaleTargeted) {
    return {
      audienceProfile: "အမျိုးသားများ - စွမ်းရည်၊ အောင်မြင်မှု၊ နည်းပညာကို တန်ဖိုးထား",
      emotionalTriggers: ["အောင်မြင်မှု", "စွမ်းရည်", "ခေါင်းဆောင်မှု", "ရဲရင့်မှု", "ကျွမ်းကျင်မှု"],
      brandPersonality: "အားကောင်း၊ ယုံကြည်မှုရှိ၊ ရဲရင့်၊ နည်းပညာဆန်၊ ပြုံးပြေးမှုရှိ",
      competitiveAdvantage: "ကောင်းမွန်သော စွမ်းဆောင်ရည်၊ ရလဒ်မြန်မှု၊ ယုံကြည်စိတ်ချရမှု",
      contentStrategy: "စွမ်းရည်ကို အလေးပေး၊ ရလဒ်များ ပြသမှု၊ အောင်မြင်မှု ဇာတ်လမ်းများ"
    };
  }

  return {
    audienceProfile: "ယေဘုယျ ပရိသတ် - အရည်အသွေး၊ တန်ဖိုး၊ ယုံကြည်စိတ်ချရမှုကို လိုအပ်",
    emotionalTriggers: ["ယုံကြည်စိတ်ချရမှု", "အရည်အသွေး", "စျေးနှုန်းသင့်မှု", "ကျန်းမာရေး"],
    brandPersonality: "ပရော်ဖက်ရှင်နယ်၊ ယုံကြည်စိတ်ချရ၊ ဖော်ရွေ၊ လက်လှမ်းမီ",
    competitiveAdvantage: "အရည်အသွေးမြင့်မှု၊ ဈေးနှုန်းသင့်မှု၊ ဝန်ဆောင်မှုကောင်းမှု",
    contentStrategy: "မျှတသော အချက်အလက်များ၊ ပရိသတ်နှင့် ဆက်သွယ်မှု၊ တန်ဖိုး ပြသမှု"
  };
}

function getAdvancedBrandVoiceGuidelines(body: RequestBody, insights: MarketingInsights): string {
  const isFemaleTargeted = insights.audienceProfile.includes('အမျိုးသမီး');
  const isMaleTargeted = insights.audienceProfile.includes('အမျိုးသား');

  let voiceGuidelines = `
### အဆင့်မြင့် ဘရန်း အသံ လမ်းညွှန်ချက်များ

**ပစ်မှတ် ပရိသတ် ခွဲခြမ်းစိတ်ဖြာမှု**: ${insights.audienceProfile}
**စိတ်ခံစားမှု လှုံ့ဆော်မှု အင်္ဂါရပ်များ**: ${insights.emotionalTriggers.join('၊ ')}
**ဘရန်း ကိုယ်ရည်ကိုယ်သွေး**: ${insights.brandPersonality}
**ပြိုင်ဆိုင်မှု အသာစီးချက်**: ${insights.competitiveAdvantage}
`;

  if (isFemaleTargeted) {
    voiceGuidelines += `
### အမျိုးသမီး ပရိသတ်အတွက် အထူး ဘရန်း အသံ:
- **စကားလုံး ရွေးချယ်မှု**: နူးညံ့၊ လှပ၊ ယဉ်ကျေး၊ စာနာမှုရှိ
- **ကိုယ်စားပြုနာမ်**: "ကျွန်မ"၊ "ကျွန်မတို့"၊ "သူမ"
- **စကားပြောပုံစံ**: "ချစ်သူများ"၊ "လှပတဲ့ သူများ"၊ "နူးညံ့စွာ"
- **အင်္ဂါရပ်များ**: လှပမှု၊ ယုံကြည်စိတ်ချရမှု၊ ကျန်းမာရေး၊ မိသားစု
- **CTA ပုံစံ**: "လှပစွာ ရွေးချယ်လိုက်ပါ"၊ "နူးညံ့စွာ ခံစားကြည့်ပါ"
- **Emojis**: 🌸 💖 ✨ 🌺 💫 🦋 💕
`;
  } else if (isMaleTargeted) {
    voiceGuidelines += `
### အမျိုးသား ပရိသတ်အတွက် အထူး ဘရန်း အသံ:
- **စကားလုံး ရွေးချယ်မှု**: အားကောင်း၊ ရဲရင့်၊ ယုံကြည်မှုရှိ၊ ပြတ်သား
- **ကိုယ်စားပြုနာမ်**: "ကျွန်တော်"၊ "ကျွန်တော်တို့"၊ "သူ"
- **စကားပြောပုံစံ**: "ညီအစ်ကိုများ"၊ "ရဲရင့်တဲ့ သူများ"၊ "အားကောင်းစွာ"
- **အင်္ဂါရပ်များ**: အောင်မြင်မှု၊ စွမ်းရည်၊ ခေါင်းဆောင်မှု၊ နည်းပညာ
- **CTA ပုံစံ**: "ယခုပဲ လုပ်ဆောင်လိုက်ပါ"၊ "အောင်မြင်မှု ရယူလိုက်ပါ"
- **Emojis**: 💪 🔥 ⚡ 🎯 🚀 🏆 💯
`;
  } else {
    voiceGuidelines += `
### ယေဘုယျ ပရိသတ်အတွက် မျှတသော ဘရန်း အသံ:
- **စကားလုံး ရွေးချယ်မှု**: ပရော်ဖက်ရှင်နယ်၊ ဖော်ရွေ၊ ယုံကြည်စိတ်ချရ
- **ကိုယ်စားပြုနာမ်**: "ကျွန်ုပ်"၊ "ကျွန်တော်တို့"
- **စကားပြောပုံစံ**: "ချစ်မိတ်ဆွေများ"၊ "လေးစားဖွယ် သူများ"
- **အင်္ဂါရပ်များ**: အရည်အသွေး၊ ယုံကြည်စိတ်ချရမှု၊ တန်ဖိုး
- **CTA ပုံစံ**: "ယုံကြည်စွာ ရွေးချယ်လိုက်ပါ"၊ "အတူတူ လုပ်ဆောင်ကြပါ"
- **Emojis**: ✨ 🌟 💡 🎉 👍 💫 🌈
`;
  }

  return voiceGuidelines;
}

function getRefinedBurmeseContentPrompt(body: RequestBody, fbAnalysis?: FacebookAnalysis, insights?: MarketingInsights): string {
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
# မြန်မာ ဆိုရှယ်မီဒီယာ ကွန်တင့် အဆင့်မြင့် ဖန်တီးမှု - Marketing AI Agent

သင်သည် မြန်မာနိုင်ငံရှိ လုပ်ငန်းတစ်ခုအတွက် အဆင့်မြင့် မားကတ်တင်း AI အကြံပေးနှင့် ဆိုရှယ်မီဒီယာ ကွန်တင့်ရေးသားသူ ဖြစ်သည်။ သင့်တာဝန်မှာ ဘရန်းနှင့် ပစ်မှတ်ပရိသတ်အတွက် အထူးပြုလုပ်ထားသော၊ စိတ်ဝင်စားဖွယ်ရာနှင့် ရည်ရွယ်ချက်ရှိသော ကွန်တင့်များ ဖန်တီးခြင်း ဖြစ်သည်။

## လက်ရှိ လုပ်ငန်းအချက်အလက်များ:
**ထုတ်ကုန်/ဝန်ဆောင်မှု**: ${sanitizeInput(body.productName)}
**အဓိကမက်ဆေ့ခ်**: ${sanitizeInput(body.keyMessage)}
**ပစ်မှတ်ပရိသတ်**: ${body.targetAudience || 'ယေဘုယျ မြန်မာပရိသတ်'}
**အဓိကစကားလုံးများ**: ${body.keywords || 'မရှိ'}
**ပလပ်ဖောင်း**: ${body.platform}
**ကွန်တင့်အမျိုးအစား**: ${contentTypeMapping[body.contentType as keyof typeof contentTypeMapping] || body.contentType}
**အရေးအရေး**: ${body.contentLength}
**မားကတ်တင်း ရည်ရွယ်ချက်**: ${objectiveMapping[body.objective as keyof typeof objectiveMapping] || body.objective}
**ရေးသားပုံစံ**: ${styleMapping[body.style as keyof typeof styleMapping] || body.style}

${insights ? getAdvancedBrandVoiceGuidelines(body, insights) : ''}

## Marketing AI ခွဲခြမ်းစိတ်ဖြာမှု စမ်းသပ်လမ်းညွှန်ချက်များ:

### 1. ဘာသာစကားနှင့် ယဉ်ကျေးမှု
- အားလုံး မြန်မာ Unicode ဖြင့် ရေးသားရမည်
- မြန်မာ့ယဉ်ကျေးမှုနှင့် တန်ဖိုးများနှင့် ကိုက်ညီမှုရှိရမည်
- ခေတ်မီ မြန်မာလူငယ်များ နားလည်နိုင်သော ဘာသာစကား အသုံးပြုပါ

### 2. အဆင့်မြင့် ရေးသားပုံစံများ
သင့်ပရိသတ်အတွက် အသင့်လျော်ဆုံး စတိုင်များမှ ရွေးချယ် သို့မဟုတ် ပေါင်းစပ်အသုံးပြုပါ:

**Professional style**: အလုပ်သုံးသင့်တဲ့ စည်းကမ်းရှိပြီး ယဥ်ကျေးတဲ့စကားလုံး
**Knowledge-sharing style**: အကြောင်းအရာ ရှင်းလင်းနားလည်စေဖို့ သတင်းအချက်အလက်ပြေပြစ်
**Sales promoter style**: အားကျဖွယ်အရောင်းစကားများ၊ စိတ်ဝင်စားဖို့အချက်များ
**Influencer style**: ယုံကြည်စိတ်ချရတဲ့ မျှဝေမှုအပြင် ပရိသတ်နဲ့ ချစ်ခြင်းမေတ္တာရှိစွာ ဆက်ဆံမှု
**Product review style**: သုံးသပ်ချက်၊ အသုံးပြုသူအတွေ့အကြုံများ ပါဝင်မှု

### 3. ကွန်တင့်အမျိုးအစားများ
${contentTypeMapping[body.contentType as keyof typeof contentTypeMapping] || body.contentType} အတွက် ကွန်တင့် ဖန်တီးပါ။

### 4. မားကတ်တင်း ရည်ရွယ်ချက်အပေါ် မူတည်သော CTA
သင့် ရည်ရွယ်ချက် **${body.objective}** အတွက် သင့်လျော်သော CTA: **"${ctaExamples[body.objective as keyof typeof ctaExamples] || 'ဆက်လက် လိုက်လာပါ။'}"**

### 5. အင်္ဂါရပ်များ
${body.includeEmojis ? '- ပရိသတ်နှင့် သင့်လျော်သော emojis များကို မဟာဗျူဟာအလိုက် အသုံးပြုပါ' : '- Emojis များ မထည့်ပါနှင့်'}
${body.includeHashtags ? '- သက်ဆိုင်ရာ hashtags များ အသုံးပြုပါ' : '- Hashtags များ မထည့်ပါနှင့်'}
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
2. ပရိသတ်၊ ထုတ်ကုန်နှင့် ဘရန်း အသံနှင့် ကိုက်ညီမှုရှိရမည်
3. တစ်ခုနှင့်တစ်ခု ကွဲပြားသော ${body.numVariations} မျိုး ဖန်တီးပါ
4. တစ်ခုချင်းစီကို ===VARIATION_START=== နှင့် ===VARIATION_END=== ဖြင့် ခွဲခြားပါ
5. စိတ်ခံစားမှု လှုံ့ဆော်မှု အင်္ဂါရပ်များကို ထိရောက်စွာ အသုံးပြုပါ
6. ဘရန်း ကိုယ်ရည်ကိုယ်သွေးနှင့် ကိုက်ညီသော အသံ အသုံးပြုပါ
7. ပေးထားသော အဓိကမက်ဆေ့ခ်နှင့် စကားလုံးများကို သဘာဝကျကျ ထည့်သွင်းပါ
8. တိုတောင်းပြီး စွဲမှတ်ဖွယ်ရာ ကွန်တင့်များ ဖန်တီးပါ

ယခုပဲ အဆင့်မြင့် ဘရန်း ကွန်တင့် ဖန်တီးပါ:`;

  return basePrompt;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: RequestBody = await req.json();
    console.log('Enhanced content generation request:', { ...body, keyMessage: body.keyMessage?.substring(0, 50) + '...' });
    
    validateInput(body);
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    // Generate marketing insights based on target audience and product
    const marketingInsights = generateMarketingInsights(body);
    console.log('Generated marketing insights:', marketingInsights);

    // Analyze Facebook page if provided
    let fbAnalysis: FacebookAnalysis = {};
    if (body.facebookPageLink?.trim()) {
      console.log('Analyzing Facebook page:', body.facebookPageLink);
      fbAnalysis = await analyzeFacebookPage(body.facebookPageLink);
      console.log('Facebook analysis result:', fbAnalysis);
    }

    const prompt = getRefinedBurmeseContentPrompt(body, fbAnalysis, marketingInsights);
    
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

    console.log(`Generated ${finalVariations.length} variations with marketing insights`);

    return new Response(JSON.stringify({
      success: true,
      variations: finalVariations,
      analysis: fbAnalysis,
      marketingInsights: marketingInsights
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in enhanced generate-content function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
