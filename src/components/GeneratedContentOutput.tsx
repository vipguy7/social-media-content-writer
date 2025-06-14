
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download, FileText, Save, Check } from 'lucide-react';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface GeneratedContentOutputProps {
  content: string[];
  onCopy: (content: string) => void;
  onExportAll: () => void;
  onSave?: (selectedContent: string[], title: string) => void;
}

const GeneratedContentOutput = ({ content, onCopy, onExportAll, onSave }: GeneratedContentOutputProps) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  if (content.length === 0) return null;

  const handleSelectAll = () => {
    if (selectedItems.length === content.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(content.map((_, index) => index));
    }
  };

  const handleItemSelect = (index: number) => {
    setSelectedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleSave = async () => {
    if (!onSave || selectedItems.length === 0) return;
    
    setIsSaving(true);
    const selectedContent = selectedItems.map(index => content[index]);
    const title = `Generated Content - ${new Date().toLocaleDateString()}`;
    
    try {
      await onSave(selectedContent, title);
    } finally {
      setIsSaving(false);
      setSelectedItems([]);
    }
  };

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
                အသုံးပြုရန် အဆင့်သင့် ပရော်ဖက်ရှင်နယ် ရွေးချယ်စရာ {content.length} မျိုး
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {onSave && (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleSelectAll}
                    variant="outline"
                    size="sm"
                    className="hover:bg-myanmar-red hover:text-white transition-colors"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    {selectedItems.length === content.length ? 'Deselect All' : 'Select All'}
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={selectedItems.length === 0 || isSaving}
                    size="sm"
                    className="bg-myanmar-red hover:bg-myanmar-red/90 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Saving...' : `Save Selected (${selectedItems.length})`}
                  </Button>
                </div>
              )}
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
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.map((variation, index) => (
            <div
              key={index}
              className="relative p-4 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                {onSave && (
                  <div className="flex items-start pt-1">
                    <Checkbox
                      checked={selectedItems.includes(index)}
                      onCheckedChange={() => handleItemSelect(index)}
                      className="mr-3"
                    />
                  </div>
                )}
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
    </div>
  );
};

export default GeneratedContentOutput;
