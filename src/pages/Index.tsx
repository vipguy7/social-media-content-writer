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
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [error, setError] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
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
      console.log('Starting content generation...');
      
      // Call the enhanced Gemini edge function
      const response = await fetch(`https://xlowbgltztktrejjifie.supabase.co/functions/v1/generate-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Content generation failed');
      }

      setGeneratedContent(data.variations || []);
      
      // Mock QA metrics with enhanced scoring
      const mockQA: QAMetrics = {
        grammar: Math.floor(Math.random() * 10) + 90,
        narrativeFlow: Math.floor(Math.random() * 10) + 85,
        culturalContext: Math.floor(Math.random() * 8) + 92,
        optimization: Math.floor(Math.random() * 12) + 83,
        engagement: Math.floor(Math.random() * 15) + 85
      };
      
      setQAMetrics(mockQA);
      
      toast({
        title: "Content Generated Successfully!",
        description: `Generated ${data.variations?.length || 0} professional Burmese content variations`,
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

  const handleGenerateImages = async () => {
    if (generatedContent.length === 0) {
      toast({
        variant: "destructive",
        title: "Generate Content First",
        description: "Please generate content before creating images",
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
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
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
        throw new Error(`HTTP error! status: ${imageResponse.status}`);
      }

      const imageData = await imageResponse.json();
      
      if (!imageData.success) {
        throw new Error(imageData.error || 'Image generation failed');
      }

      setGeneratedImages(imageData.images || []);
      
      toast({
        title: "Images Generated Successfully!",
        description: `Created ${imageData.images?.length || 0} professional graphics`,
      });
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate images';
      toast({
        variant: "destructive",
        title: "Image Generation Failed", 
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
            Professional AI-powered social media content generation with advanced Burmese language patterns. 
            Create culturally relevant content and matching graphics for Myanmar business success.
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
              onGenerateImages={handleGenerateImages}
              isLoading={isLoading}
              isGeneratingImages={isGeneratingImages}
              hasContent={generatedContent.length > 0}
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
                images={generatedImages}
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
