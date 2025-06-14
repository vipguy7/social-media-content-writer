
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
      return 'bg-pink-100 text-pink-800 border-pink-200';
    }
    if (personality.includes('အားကောင်း') || personality.includes('ရဲရင့်')) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    }
    return 'bg-gray-100 text-gray-800 border-gray-200';
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
    <Card className="glass-card animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-myanmar-red" />
          AI မားကတ်တင်း ခွဲခြမ်းစိတ်ဖြာမှု
        </CardTitle>
        <CardDescription>
          မိမိလုပ်ငန်းကို အမြန်ဆုံးလူသိများစေဖို့ AI မားကတ်တင်း ခွဲခြမ်းစိတ်ဖြာမှုများကို လေ့လာပါ။
          <span className="font-bold text-blue-500"> ပရိသတ်ကို နားလည်ပြီး</span> မိမိလုပ်ငန်းအတွက် အထူးသင့်လျော်သော မားကတ်တင်း ဗျူဟာများ ဖန်တီးပါ။
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Audience Profile */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-myanmar-red" />
            <h4 className="font-medium">ပရိသတ် ခွဲခြမ်းစိတ်ဖြာမှု</h4>
          </div>
          <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
            {insights.audienceProfile}
          </p>
        </div>

        {/* Emotional Triggers */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-500" />
            <h4 className="font-medium">စိတ်ခံစားမှု လှုံ့ဆော်မှု အင်္ဂါရပ်များ</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {insights.emotionalTriggers.map((trigger, index) => (
              <Badge key={index} variant="secondary" className="text-xs gap-1">
                {getTriggerIcon(trigger)}
                {trigger}
              </Badge>
            ))}
          </div>
        </div>

        {/* Brand Personality */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-500" />
            <h4 className="font-medium">ဘရန်း ကိုယ်ရည်ကိုယ်သွေး</h4>
          </div>
          <Badge className={`${getPersonalityColor(insights.brandPersonality)} text-xs`}>
            {insights.brandPersonality}
          </Badge>
        </div>

        {/* Competitive Advantage */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <h4 className="font-medium">ပြိုင်ဆိုင်မှု အသာစီးချက်</h4>
          </div>
          <p className="text-sm text-muted-foreground bg-green-50 p-3 rounded-lg">
            {insights.competitiveAdvantage}
          </p>
        </div>

        {/* Content Strategy */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <h4 className="font-medium">ကွန်တင့် ဗျူဟာ</h4>
          </div>
          <p className="text-sm text-muted-foreground bg-purple-50 p-3 rounded-lg">
            {insights.contentStrategy}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketingInsights;
