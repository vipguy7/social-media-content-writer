
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download, FileText } from 'lucide-react';

interface GeneratedContentOutputProps {
  content: string[];
  onCopy: (content: string) => void;
  onExportAll: () => void;
}

const GeneratedContentOutput = ({ content, onCopy, onExportAll }: GeneratedContentOutputProps) => {
  if (content.length === 0) return null;

  return (
    <Card className="glass-card animate-slide-up">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-myanmar-red" />
              Generated Content
            </CardTitle>
            <CardDescription>
              {content.length} variation{content.length > 1 ? 's' : ''} ready for use
            </CardDescription>
          </div>
          <Button
            onClick={onExportAll}
            variant="outline"
            size="sm"
            className="hover:bg-myanmar-red hover:text-white transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {content.map((variation, index) => (
          <div
            key={index}
            className="relative p-4 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-2 font-medium">
                  Variation {index + 1}
                </div>
                <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                  {variation}
                </p>
              </div>
              <Button
                onClick={() => onCopy(variation)}
                variant="ghost"
                size="sm"
                className="hover:bg-myanmar-red hover:text-white transition-colors shrink-0"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default GeneratedContentOutput;
