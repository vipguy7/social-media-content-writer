
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, TrendingUp } from 'lucide-react';
import { QAMetrics } from '@/pages/Index';

interface QualityAssuranceProps {
  metrics: QAMetrics;
}

const QualityAssurance = ({ metrics }: QualityAssuranceProps) => {
  const metricItems = [
    { label: 'Grammar & Language', value: metrics.grammar, icon: '📝' },
    { label: 'Narrative Flow', value: metrics.narrativeFlow, icon: '📖' },
    { label: 'Cultural Context', value: metrics.culturalContext, icon: '🇲🇲' },
    { label: 'SEO Optimization', value: metrics.optimization, icon: '🔍' },
    { label: 'Engagement Potential', value: metrics.engagement, icon: '❤️' }
  ];

  const overallScore = Math.round(
    (metrics.grammar + metrics.narrativeFlow + metrics.culturalContext + metrics.optimization + metrics.engagement) / 5
  );

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-myanmar-gold';
    if (score >= 70) return 'text-orange-500';
    return 'text-red-500';
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-myanmar-gold';
    if (score >= 70) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <Card className="glass-card animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-myanmar-red" />
          Quality Metrics
        </CardTitle>
        <CardDescription>
          AI-powered content quality assessment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="text-center p-4 bg-gradient-to-r from-myanmar-red/5 to-myanmar-gold/5 rounded-lg border">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-myanmar-red" />
            <span className="text-sm font-medium text-muted-foreground">Overall Score</span>
          </div>
          <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
            {overallScore}%
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {overallScore >= 90 ? 'Excellent' : overallScore >= 80 ? 'Good' : overallScore >= 70 ? 'Fair' : 'Needs Improvement'}
          </div>
        </div>

        {/* Individual Metrics */}
        <div className="space-y-4">
          {metricItems.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium">
                  <span>{metric.icon}</span>
                  {metric.label}
                </span>
                <span className={`font-bold ${getScoreColor(metric.value)}`}>
                  {metric.value}%
                </span>
              </div>
              <div className="relative">
                <Progress 
                  value={metric.value} 
                  className="h-2"
                />
                <div 
                  className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ${getProgressColor(metric.value)}`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="p-3 bg-myanmar-gold/10 border border-myanmar-gold/20 rounded-lg">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Tip:</strong> Scores above 85% indicate high-quality content ready for publication. 
            Lower scores suggest areas for improvement.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QualityAssurance;
