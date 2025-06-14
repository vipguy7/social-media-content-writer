
import MarketingInsights from '@/components/MarketingInsights';
import QualityAssurance from '@/components/QualityAssurance';
import GeneratedContentOutput from '@/components/GeneratedContentOutput';
import { QAMetrics, MarketingInsights as MarketingInsightsType } from '@/types/content';

interface ResultsPanelProps {
  marketingInsights: MarketingInsightsType | null;
  qaMetrics: QAMetrics | null;
  generatedContent: string[];
  onCopy: (content: string) => void;
  onExportAll: () => void;
  onSave?: (selectedContent: string[], title: string) => void;
}

const ResultsPanel = ({
  marketingInsights, qaMetrics, generatedContent, onCopy, onExportAll, onSave
}: ResultsPanelProps) => {
  return (
    <div>
      {marketingInsights && (
        <MarketingInsights insights={marketingInsights} />
      )}
      
      {qaMetrics && (
        <QualityAssurance metrics={qaMetrics} />
      )}
      
      {generatedContent.length > 0 && (
        <GeneratedContentOutput
          content={generatedContent}
          onCopy={onCopy}
          onExportAll={onExportAll}
          onSave={onSave}
        />
      )}
    </div>
  );
};

export default ResultsPanel;
