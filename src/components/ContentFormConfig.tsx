
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2 } from 'lucide-react';
import { ContentFormData } from '@/types/content';
import PrimaryContentInputs from './PrimaryContentInputs';
import AdvancedContentOptions from './AdvancedContentOptions';
import AdPlaceholder from './AdPlaceholder';

interface ContentFormConfigProps {
  formData: ContentFormData;
  setFormData: (data: ContentFormData) => void;
  onGenerate: () => void;
  isLoading: boolean;
  hasContent: boolean;
}

const ContentFormConfig = ({ 
  formData, 
  setFormData, 
  onGenerate, 
  isLoading, 
  hasContent 
}: ContentFormConfigProps) => {
  const updateFormData = (updates: Partial<ContentFormData>) => {
    setFormData({ ...formData, ...updates });
  };

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-7 h-7 text-myanmar-red drop-shadow-glow" />
          <span>ပိုစ့်အမျိုးအစားရွေးပါ၊ </span>
        </CardTitle>
        <CardDescription className="font-medium text-base">
          သင့် Facebook ပိုစ့် သို့မဟုတ် TikTok ဗီဒီယိုအတွက် ပိုစ့်ရေးသားပေးနိုင်ရန် လိုအပ်သော အချက်အလက်များကို ဖြည့်ပါ။
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <PrimaryContentInputs formData={formData} updateFormData={updateFormData} />
        
        {/* In-Content Ad */}
        <div className="py-2">
          <AdPlaceholder 
            width="100%" 
            height="280px" 
            label="336x280 Ad"
            className="max-w-[336px] mx-auto"
          />
        </div>

        <AdvancedContentOptions formData={formData} updateFormData={updateFormData} />

        {/* Generate Buttons */}
        <div className="space-y-4">
          <Button
            onClick={onGenerate}
            disabled={isLoading || !formData.productName.trim() || !formData.keyMessage.trim()}
            className="w-full myanmar-gradient hover:opacity-90 transition-opacity text-lg py-6"
          >
            {isLoading ? (
              <div className="flex flex-col items-center">
                <img
                  src="https://media1.tenor.com/m/zXhK-0R9y1gAAAAC/vengeful-notes.gif"
                  alt="Generating content animation..."
                  className="h-12 w-auto mx-auto mb-2"
                />
                <span>ရေးသားပေးနေပါပြီ</span>
              </div>
            ) : (
              <>
                <Wand2 className="w-5 h-5 mr-2" />
                ပိုစ့်ရေးပါ
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentFormConfig;
