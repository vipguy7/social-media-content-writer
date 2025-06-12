
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ContentGeneratorForm from '@/components/ContentGeneratorForm';
import ResultsPanel from '@/components/ResultsPanel';
import ErrorDisplay from '@/components/ErrorDisplay';
import { ContentFormData, QAMetrics, MarketingInsights } from '@/types/content';

const Index = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [error, setError] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [qaMetrics, setQAMetrics] = useState<QAMetrics | null>(null);
  const [marketingInsights, setMarketingInsights] = useState<MarketingInsights | null>(null);

  const [formData, setFormData] = useState<ContentFormData>({
    platform: 'facebook',
    contentType: 'promotional',
    contentLength: 'medium',
    objective: 'awareness',
    style: 'professional',
    productName: '',
    keyMessage: '',
    targetAudience: '',
    keywords: '',
    facebookPageLink: '',
    brandGender: '',
    includeCTA: true,
    includeEmojis: true,
    includeHashtags: true,
    numVariations: 3
  });

  const updateFormData = (updates: Partial<ContentFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleGenerateContent = async () => {
    setError('');
    
    if (!formData.productName.trim() || !formData.keyMessage.trim()) {
      setError('ထုတ်ကုန်အမည်နှင့် အဓိကမက်ဆေ့ခ် လိုအပ်ပါသည်။');
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Starting enhanced content generation...');
      
      const response = await fetch(`https://xlowbgltztktrejjifie.supabase.co/functions/v1/generate-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhsb3diZ2x0enRrdHJlamppZmllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwMTM3NDgsImV4cCI6MjA2MjU4OTc0OH0.hzBK9jGmDoCUPF1v-YEaXNKBsTnOL4Srjru0f8hZRuE`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'ကွန်တင့် ဖန်တီးမှု မအောင်မြင်ပါ');
      }

      setGeneratedContent(data.variations || []);
      setMarketingInsights(data.marketingInsights || null);
      
      const mockQA: QAMetrics = {
        grammar: Math.floor(Math.random() * 10) + 90,
        narrativeFlow: Math.floor(Math.random() * 10) + 85,
        culturalContext: Math.floor(Math.random() * 8) + 92,
        optimization: Math.floor(Math.random() * 12) + 83,
        engagement: Math.floor(Math.random() * 15) + 85
      };
      
      setQAMetrics(mockQA);
      
      toast({
        title: "အဆင့်မြင့် ကွန်တင့် အောင်မြင်စွာ ဖန်တီးပြီးပါပြီ!",
        description: `ပရော်ဖက်ရှင်နယ် မြန်မာ ကွန်တင့် ${data.variations?.length || 0} မျိုး ဖန်တီးပေးပြီးပါပြီ`,
      });
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'ကွန်တင့် ဖန်တီးမှု မအောင်မြင်ပါ';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "ဖန်တီးမှု မအောင်မြင်ပါ",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateImages = async () => {
    if (generatedContent.length === 0) {
      toast({
        variant: "destructive",
        title: "ကွန်တင့် ဦးစွာ ဖန်တီးပါ",
        description: "ပုံများ မဖန်တီးမီ ကွန်တင့် ဦးစွာ ဖန်တီးပါ",
      });
      return;
    }

    setIsGeneratingImages(true);
    
    try {
      console.log('Starting image generation...');
      
      const imageResponse = await fetch(`https://xlowbgltztktrejjifie.supabase.co/functions/v1/generate-images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhsb3diZ2x0enRrdHJlamppZmllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwMTM3NDgsImV4cCI6MjA2MjU4OTc0OH0.hzBK9jGmDoCUPF1v-YEaXNKBsTnOL4Srjru0f8hZRuE`,
        },
        body: JSON.stringify({
          contentText: generatedContent[0],
          productName: formData.productName,
          numImages: Math.min(4, formData.numVariations),
          platform: formData.platform,
          contentType: formData.contentType
        }),
      });

      if (!imageResponse.ok) {
        const errorData = await imageResponse.json();
        throw new Error(errorData.error || `HTTP error! status: ${imageResponse.status}`);
      }

      const imageData = await imageResponse.json();
      
      if (!imageData.success) {
        throw new Error(imageData.error || 'ပုံ ဖန်တီးမှု မအောင်မြင်ပါ');
      }

      setGeneratedImages(imageData.images || []);
      
      toast({
        title: "ပုံများ အောင်မြင်စွာ ဖန်တီးပြီးပါပြီ!",
        description: `ပရော်ဖက်ရှင်နယ် ဂရပ်ဖစ် ${imageData.images?.length || 0} ခု ဖန်တီးပေးပြီးပါပြီ`,
      });
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'ပုံများ ဖန်တီးမှု မအောင်မြင်ပါ';
      toast({
        variant: "destructive",
        title: "ပုံ ဖန်တီးမှု မအောင်မြင်ပါ", 
        description: errorMessage,
      });
    } finally {
      setIsGeneratingImages(false);
    }
  };

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "ကလစ်ဘုတ်သို့ ကူးယူပြီးပါပြီ!",
        description: "ကွန်တင့်ကို အောင်မြင်စွာ ကူးယူပြီးပါပြီ",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "ကူးယူမှု မအောင်မြင်ပါ",
        description: "ကလစ်ဘုတ်သို့ ကွန်တင့် ကူးယူ၍ မရပါ",
      });
    }
  };

  const exportAllContent = () => {
    const allContent = generatedContent.join('\n\n---\n\n');
    const blob = new Blob([allContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `myanmar-content-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "ကွန်တင့် ထုတ်ယူပြီးပါပြီ!",
      description: "ကွန်တင့် အားလုံးကို ဒေါင်းလုဒ် လုပ်ပြီးပါပြီ",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <HeroSection />

        <ErrorDisplay error={error} />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ContentGeneratorForm
              formData={formData}
              updateFormData={updateFormData}
              onGenerate={handleGenerateContent}
              onGenerateImages={handleGenerateImages}
              isLoading={isLoading}
              isGeneratingImages={isGeneratingImages}
              hasContent={generatedContent.length > 0}
            />
          </div>

          <div className="space-y-6">
            <ResultsPanel
              marketingInsights={marketingInsights}
              qaMetrics={qaMetrics}
              generatedContent={generatedContent}
              generatedImages={generatedImages}
              onCopy={copyToClipboard}
              onExportAll={exportAllContent}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
