
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
    <div className="space-y-6 w-full">
      <Card className="glass-card animate-slide-up border-2 w-full">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4">
            <div>
              <CardTitle className="flex items-center gap-3 text-foreground font-semibold text-xl">
                <FileText className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="myanmar-text">ရေးပြီးပါပြီ</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground font-medium mt-2">
                အဆင့်သင့် အသုံးပြုရန် ပိုစ့် {content.length} မျိုး
              </CardDescription>
            </div>
            
            <div className="flex flex-col gap-3 w-full">
              {onSave && (
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <Button
                      onClick={handleSelectAll}
                      variant="outline"
                      size="sm"
                      className="text-foreground border-2 hover:bg-primary hover:text-primary-foreground font-medium flex-1 min-w-0"
                    >
                      <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">
                        {selectedItems.length === content.length ? 'Deselect All' : 'Select All'}
                      </span>
                    </Button>
                    <Button
                      onClick={handleSave}
                      variant="outline"
                      disabled={selectedItems.length === 0 || isSaving}
                      size="sm"
                      className="btn-visible font-semibold flex-1 min-w-0"
                    >
                      <Save className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">
                        {isSaving ? 'Saving...' : `Save Selected (${selectedItems.length})`}
                      </span>
                    </Button>
                  </div>
                </div>
              )}
              <Button
                onClick={onExportAll}
                variant="outline"
                size="sm"
                className="text-foreground border-2 hover:bg-primary hover:text-primary-foreground font-medium w-full"
              >
                <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="myanmar-text">အားလုံး ထုတ်ယူပါ</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {content.map((variation, index) => (
            <div
              key={index}
              className="relative p-4 sm:p-6 bg-card border-2 border-border rounded-xl hover:shadow-lg hover:border-primary/30 transition-all duration-300 w-full"
            >
              <div className="flex gap-3 w-full">
                {onSave && (
                  <div className="flex items-start pt-1 flex-shrink-0">
                    <Checkbox
                      checked={selectedItems.includes(index)}
                      onCheckedChange={() => handleItemSelect(index)}
                      className="mt-1"
                    />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-muted-foreground mb-3 font-semibold">
                    <span className="myanmar-text">ရွေးချယ်စရာ {index + 1}</span>
                  </div>
                  <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap font-medium myanmar-text break-words">
                    {variation}
                  </p>
                </div>
                
                <Button
                  onClick={() => onCopy(variation)}
                  variant="ghost"
                  size="sm"
                  className="hover:bg-primary hover:text-primary-foreground transition-all duration-200 flex-shrink-0 p-2"
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
