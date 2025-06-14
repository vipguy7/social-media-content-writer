import MarketingInsights from '@/components/MarketingInsights';
import QualityAssurance from '@/components/QualityAssurance';
import GeneratedContentOutput from '@/components/GeneratedContentOutput';
import { QAMetrics, MarketingInsights as MarketingInsightsType } from '@/types/content';
import { useGoogleDrive } from "@/hooks/useGoogleDrive";
import { Save } from "lucide-react";

interface ResultsPanelProps {
  marketingInsights: MarketingInsightsType | null;
  qaMetrics: QAMetrics | null;
  generatedContent: string[];
  onCopy: (content: string) => void;
  onExportAll: () => void;
}

const ResultsPanel = ({
  marketingInsights, qaMetrics, generatedContent, onCopy, onExportAll
}: any) => {
  const { isSignedIn, signIn, saveContent } = useGoogleDrive();

  const handleSaveToDrive = async () => {
    if (!isSignedIn) {
      await signIn();
    }
    await saveContent(generatedContent.join("\n\n---\n\n"));
  };

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
        />
      )}
      
      {generatedContent?.length > 0 && (
        <div className="mt-4 flex flex-col items-end space-y-2">
          <button
            onClick={handleSaveToDrive}
            className="flex items-center gap-2 px-4 py-2 border border-myanmar-red rounded bg-myanmar-red text-white shadow hover:scale-105 transition-transform text-lg"
          >
            <Save className="w-5 h-5" /> Save to My Library
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;
