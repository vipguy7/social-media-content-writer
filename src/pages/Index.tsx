
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import ContentFormConfig from '@/components/ContentFormConfig';
import GeneratedContentOutput from '@/components/GeneratedContentOutput';
import QualityAssurance from '@/components/QualityAssurance';
import Header from '@/components/Header';
import { Sparkles } from 'lucide-react';

export interface ContentFormData {
  platform: string;
  contentType: string;
  contentLength: string;
  objective: string;
  style: string;
  productName: string;
  keyMessage: string;
  targetAudience: string;
  keywords: string;
  facebookPageLink: string;
  includeCTA: boolean;
  includeEmojis: boolean;
  includeHashtags: boolean;
  numVariations: number;
}

export interface QAMetrics {
  grammar: number;
  narrativeFlow: number;
  culturalContext: number;
  optimization: number;
  engagement: number;
}

const Index = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [qaMetrics, setQAMetrics] = useState<QAMetrics | null>(null);

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
    includeCTA: true,
    includeEmojis: true,
    includeHashtags: true,
    numVariations: 3
  });

  const handleGenerateContent = async () => {
    setError('');
    
    // Basic validation
    if (!formData.productName.trim() || !formData.keyMessage.trim()) {
      setError('Product name and key message are required.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call for now - replace with actual Supabase Edge Function call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock generated content in Burmese
      const mockContent = [
        "🌟 ကျွန်တော်တို့၏ " + formData.productName + " သည် သင့်ဘဝကို ပိုမိုကောင်းမွန်စေမည်! " + formData.keyMessage + " #Myanmar #Quality",
        "✨ " + formData.productName + " - မြန်မာနိုင်ငံအတွက် အမြတ်တန်းထုတ်ကုန်! " + formData.keyMessage + " သင့်အတွက် အဆင်သင့်ဖြစ်ပါပြီ! 🇲🇲",
        "🎯 " + formData.keyMessage + " " + formData.productName + " နှင့်အတူ နေ့စဉ်ဘဝမှာ အောင်မြင်မှုရယူပါ! လက်လှမ်းမမီတော့ပါ! 💫"
      ].slice(0, formData.numVariations);
      
      // Mock QA metrics
      const mockQA: QAMetrics = {
        grammar: 92,
        narrativeFlow: 88,
        culturalContext: 95,
        optimization: 87,
        engagement: 91
      };
      
      setGeneratedContent(mockContent);
      setQAMetrics(mockQA);
      
      toast({
        title: "Content Generated Successfully!",
        description: `Generated ${mockContent.length} content variations`,
      });
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate content';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied to clipboard!",
        description: "Content has been copied successfully",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Copy failed",
        description: "Could not copy content to clipboard",
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
      title: "Content Exported!",
      description: "All content variations have been downloaded",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-myanmar-red" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-myanmar-red to-myanmar-red-light bg-clip-text text-transparent">
              Myanmar Content Crafter
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional AI-powered social media content generation for the Burmese market. 
            Create culturally relevant, engaging content that resonates with your Myanmar audience.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-destructive animate-slide-up">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Content Form */}
          <div className="lg:col-span-2">
            <ContentFormConfig
              formData={formData}
              setFormData={setFormData}
              onGenerate={handleGenerateContent}
              isLoading={isLoading}
            />
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {qaMetrics && (
              <QualityAssurance metrics={qaMetrics} />
            )}
            
            {generatedContent.length > 0 && (
              <GeneratedContentOutput
                content={generatedContent}
                onCopy={copyToClipboard}
                onExportAll={exportAllContent}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
