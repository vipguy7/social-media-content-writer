
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, TrendingUp, Award } from 'lucide-react';
import { QAMetrics } from '@/types/content';

interface QualityAssuranceProps {
  metrics: QAMetrics;
}

const QualityAssurance = ({ metrics }: QualityAssuranceProps) => {
  const metricItems = [
    { label: 'သဒ္ဒါနှင့် ဘာသာစကား', value: metrics.grammar, icon: '📝', color: 'bg-blue-500' },
    { label: 'အဖွဲ့အစည်း စီးဆင်းမှု', value: metrics.narrativeFlow, icon: '📖', color: 'bg-green-500' },
    { label: 'ယဉ်ကျေးမှု သင့်လျော်မှု', value: metrics.culturalContext, icon: '🇲🇲', color: 'bg-myanmar-orange' },
    { label: 'ရှာဖွေမှု အကောင်းဆုံးပြုလုပ်မှု', value: metrics.optimization, icon: '🔍', color: 'bg-purple-500' },
    { label: 'ပရိသတ် ဆွဲဆောင်မှု', value: metrics.engagement, icon: '❤️', color: 'bg-pink-500' }
  ];

  const overallScore = Math.round(
    (metrics.grammar + metrics.narrativeFlow + metrics.culturalContext + metrics.optimization + metrics.engagement) / 5
  );

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-myanmar-orange';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'ထူးခြားသော';
    if (score >= 80) return 'ကောင်းသော';
    if (score >= 70) return 'အမျှတ်သား';
    return 'မွမ်းမံရန် လိုအပ်သော';
  };

  return (
    <Card className="floating-card animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 myanmar-heading">
          <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          အရည်အသွေး စစ်ဆေးမှု
        </CardTitle>
        <CardDescription className="myanmar-text">
          ပိုစ့် အရေးအသား အကဲဖြတ်ချက်
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Overall Score */}
        <div className="text-center p-6 bg-gradient-to-br from-myanmar-blue-light via-white to-myanmar-orange/10 rounded-2xl border-2 border-myanmar-blue/20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-r from-myanmar-orange to-orange-500 rounded-xl">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg font-medium text-myanmar-gray myanmar-text">အလုံးစုံ ရမှတ်</span>
          </div>
          <div className={`text-5xl font-bold ${getScoreColor(overallScore)} mb-2`}>
            {overallScore}%
          </div>
          <div className="text-sm text-myanmar-gray myanmar-text font-medium">
            {getScoreLabel(overallScore)}
          </div>
        </div>

        {/* Individual Metrics */}
        <div className="space-y-6">
          {metricItems.map((metric, index) => (
            <div key={index} className="space-y-3 p-4 bg-white/50 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-3 font-medium myanmar-text">
                  <span className="text-xl">{metric.icon}</span>
                  <span className="text-myanmar-blue-dark">{metric.label}</span>
                </span>
                <span className={`font-bold text-lg ${getScoreColor(metric.value)}`}>
                  {metric.value}%
                </span>
              </div>
              <div className="relative">
                <Progress 
                  value={metric.value} 
                  className="h-3 bg-gray-200"
                />
                <div 
                  className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-700 ${metric.color}`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="p-4 bg-gradient-to-r from-myanmar-orange/10 to-yellow-500/10 border border-myanmar-orange/20 rounded-xl">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-myanmar-orange mt-1" />
            <div>
              <h4 className="font-medium myanmar-text text-myanmar-blue-dark mb-1">
                အကြံပြုချက်
              </h4>
              <p className="text-sm text-myanmar-gray myanmar-text leading-relaxed">
                ၈၅% နှင့်အထက် ရမှတ်များသည် အွန်လိုင်းတွင် အသုံးပြုရန် အရည်အသွေး ပြည့်မှီသော ပိုစ့်ဖြစ်ပါသည်။ 
                ရမှတ် ၆၀% အောက်ကို ရောက်ရှိခဲ့လျှင် မွမ်းမံရန် လိုအပ်သော Key-point များဖြစ်သည်။
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QualityAssurance;
