
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Heart, Target, Lightbulb, Sparkles } from 'lucide-react';

interface MarketingInsightsProps {
  insights?: {
    audienceProfile: string;
    emotionalTriggers: string[];
    brandPersonality: string;
    competitiveAdvantage: string;
    contentStrategy: string;
  };
}

const MarketingInsights = ({ insights }: MarketingInsightsProps) => {
  if (!insights) return null;

  const getPersonalityColor = (personality: string) => {
    if (personality.includes('နူးညံ့') || personality.includes('ယဉ်ကျေး')) {
      return 'bg-pink-50 text-pink-700 border-pink-200';
    }
    if (personality.includes('အားကောင်း') || personality.includes('ရဲရင့်')) {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    }
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getTriggerIcon = (trigger: string) => {
    if (trigger.includes('လှပမှု') || trigger.includes('ချစ်ခြင်း')) {
      return <Heart className="w-3 h-3" />;
    }
    if (trigger.includes('အောင်မြင်မှု') || trigger.includes('စွမ်းရည်')) {
      return <TrendingUp className="w-3 h-3" />;
    }
    return <Sparkles className="w-3 h-3" />;
  };

  return (
    <Card className="glass-card animate-fade-in border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="w-5 h-5 text-myanmar-red drop-shadow-glow" />
          <span className="bg-gradient-to-r from-myanmar-red to-purple-600 bg-clip-text text-transparent">
            AI မားကတ်တင်း ခွဲခြမ်းစိတ်ဖြာမှု
          </span>
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          မိမိလုပ်ငန်းကို အမြန်ဆုံးလူသိများစေဖို့ AI မားကတ်တင်း ခွဲခြမ်းစိတ်ဖြာမှုများကို လေ့လာပါ။
          <span className="font-semibold text-blue-600"> ပရိသတ်ကို နားလည်ပြီး</span> မိမိလုပ်ငန်းအတွက် အထူးသင့်လျော်သော မားကတ်တင်း ဗျူဟာများ ဖန်တီးပါ။
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Audience Profile */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <h4 className="font-semibold text-foreground">ပရိသတ် ခွဲခြမ်းစိတ်ဖြာမှု</h4>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm text-blue-800 leading-relaxed">
              {insights.audienceProfile}
            </p>
          </div>
        </div>

        {/* Emotional Triggers */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-600" />
            <h4 className="font-semibold text-foreground">စိတ်ခံစားမှု လှုံ့ဆော်မှု အင်္ဂါရပ်များ</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {insights.emotionalTriggers.map((trigger, index) => (
              <Badge key={index} variant="secondary" className="text-xs gap-1 bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100">
                {getTriggerIcon(trigger)}
                {trigger}
              </Badge>
            ))}
          </div>
        </div>

        {/* Brand Personality */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-600" />
            <h4 className="font-semibold text-foreground">ဘရန်း ကိုယ်ရည်ကိုယ်သွေး</h4>
          </div>
          <Badge className={`${getPersonalityColor(insights.brandPersonality)} text-sm px-3 py-1`}>
            {insights.brandPersonality}
          </Badge>
        </div>

        {/* Competitive Advantage */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <h4 className="font-semibold text-foreground">ပြိုင်ဆိုင်မှု အသာစီးချက်</h4>
          </div>
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <p className="text-sm text-green-800 leading-relaxed">
              {insights.competitiveAdvantage}
            </p>
          </div>
        </div>

        {/* Content Strategy */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h4 className="font-semibold text-foreground">ကွန်တင့် ဗျူဟာ</h4>
          </div>
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
            <p className="text-sm text-purple-800 leading-relaxed">
              {insights.contentStrategy}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketingInsights;
