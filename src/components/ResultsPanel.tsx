
import MarketingInsights from '@/components/MarketingInsights';
import QualityAssurance from '@/components/QualityAssurance';
import GeneratedContentOutput from '@/components/GeneratedContentOutput';
import { QAMetrics, MarketingInsights as MarketingInsightsType } from '@/types/content';

interface ResultsPanelProps {
  marketingInsights: MarketingInsightsType | null;
  qaMetrics: QAMetrics | null;
  generatedContent: string[];
  generatedImages: string[];
  onCopy: (content: string) => void;
  onExportAll: () => void;
}

const ResultsPanel = ({
  marketingInsights,
  qaMetrics,
  generatedContent,
  generatedImages,
  onCopy,
  onExportAll
}: ResultsPanelProps) => {
  return (
    <>
      {marketingInsights && (
        <MarketingInsights insights={marketingInsights} />
      )}
      
      {qaMetrics && (
        <QualityAssurance metrics={qaMetrics} />
      )}
      
      {generatedContent.length > 0 && (
        <GeneratedContentOutput
          content={generatedContent}
          images={generatedImages}
          onCopy={onCopy}
          onExportAll={onExportAll}
        />
      )}
    </>
  );
};

export default ResultsPanel;
