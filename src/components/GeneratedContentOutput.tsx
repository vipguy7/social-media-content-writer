
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download, FileText, Sparkles } from 'lucide-react';

interface GeneratedContentOutputProps {
  content: string[];
  images?: string[];
  onCopy: (content: string) => void;
  onExportAll: () => void;
}

const GeneratedContentOutput = ({ content, images = [], onCopy, onExportAll }: GeneratedContentOutputProps) => {
  if (content.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Content Variations */}
      <Card className="glass-card animate-slide-up">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-myanmar-red" />
               ကဲ..ပိုစ့်ကို ရေးပြီးပါပြီခင်ဗျ. 
              </CardTitle>
              <CardDescription>
                အသုံးပြုရန် အဆင်သင့် ပရော်ဖက်ရှင်နယ် ရွေးချယ်စရာ {content.length} မျိုး
              </CardDescription>
            </div>
            <Button
              onClick={onExportAll}
              variant="outline"
              size="sm"
              className="hover:bg-myanmar-red hover:text-white transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              အားလုံး ထုတ်ယူပါ
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
                    ရွေးချယ်စရာ {index + 1}
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

      {/* Generated Images */}
      {images.length > 0 && (
        <Card className="glass-card animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-myanmar-red" />
              ဖန်တီးပြီး ဂရပ်ဖစ်များ
            </CardTitle>
            <CardDescription>
              ဆိုရှယ်မီဒီယာအတွက် အဆင်သင့် ပရော်ဖက်ရှင်နယ် ဂရပ်ဖစ် {images.length} ခု
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-lg border border-slate-200 hover:shadow-lg transition-shadow"
                >
                  <img
                    src={image}
                    alt={`ဖန်တီးပြီး ဂရပ်ဖစ် ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = image;
                        link.download = `myanmar-graphic-${index + 1}.png`;
                        link.click();
                      }}
                      variant="secondary"
                      size="sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      ဒေါင်းလုဒ်
                    </Button>
                  </div>
                  <div className="absolute top-2 left-2 bg-white/90 text-xs px-2 py-1 rounded">
                    ဂရပ်ဖစ် {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GeneratedContentOutput;
