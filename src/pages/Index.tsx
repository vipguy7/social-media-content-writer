
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ContentGeneratorForm from '@/components/ContentGeneratorForm';
import ResultsPanel from '@/components/ResultsPanel';
import ErrorDisplay from '@/components/ErrorDisplay';
import FloatingActionButton from '@/components/FloatingActionButton';
import { ContentFormData, QAMetrics, MarketingInsights } from '@/types/content';
import { Book, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
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

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

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

  const handleSaveContent = async (selectedContent: string[], title: string) => {
    if (!user) return;
    try {
      const contentToSave = selectedContent.join('\n\n---\n\n');
      const { error } = await supabase
        .from('generated_content')
        .insert({
          user_id: user.id,
          title,
          content: contentToSave,
          platform: formData.platform,
          content_type: formData.contentType
        });
      if (error) throw error;

      toast({
        title: "Content saved successfully!",
        description: `${selectedContent.length} variation(s) saved to your library`,
      });
    } catch (err) {
      console.error('Error saving content:', err);
      toast({
        variant: "destructive",
        title: "Save failed",
        description: "Failed to save content to your library",
      });
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex flex-col w-full flex-1 px-0 sm:px-4 py-4 sm:py-12 space-y-6 sm:space-y-12 max-w-[640px] mx-auto relative">
        <HeroSection />

        {/* Analytics Dashboard Entry */}
        <div className="flex justify-end max-w-full sm:max-w-5xl mx-auto px-2">
          <a
            href="/analytics"
            className="inline-flex items-center gap-2 px-4 py-2 font-semibold rounded-2xl bg-gradient-to-r from-blue-50 to-yellow-50 border-2 border-blue-200 hover:bg-blue-100 transition shadow hover:scale-[1.04] text-base sm:text-lg"
            aria-label="Go to Analytics Dashboard"
          >
            <span className="material-symbols-outlined text-blue-600">insights</span>
            <span className="text-blue-700 font-bold">Analytics Dashboard</span>
          </a>
        </div>

        {/* Navigation Buttons for Knowledge Base and Library */}
        <div className="flex flex-col gap-4 md:flex-row md:gap-6 justify-center mt-2 mb-4 w-full max-w-full sm:max-w-3xl mx-auto px-2">
          <Link
            to="/knowledge-base"
            className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-[#fbe7ee] to-[#e7f5fc] border-2 border-pink-300 hover:border-pink-400 rounded-2xl p-4 sm:p-6 shadow hover:scale-[1.03] transition group"
            aria-label="Go to Content Strategy Knowledge Base"
          >
            <Sparkles className="w-7 h-7 text-pink-500 drop-shadow-glow group-hover:animate-bounce" />
            <span className="text-lg sm:text-xl font-bold text-pink-600 capitalize">Content Knowledge Base</span>
          </Link>
          <Link
            to="/library"
            className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-[#e4eafc] to-[#fdf6ec] border-2 border-blue-300 hover:border-blue-400 rounded-2xl p-4 sm:p-6 shadow hover:scale-[1.03] transition group"
            aria-label="Go to My Personal Content Library"
          >
            <Book className="w-7 h-7 text-blue-600 drop-shadow-glow group-hover:animate-bounce" />
            <span className="text-lg sm:text-xl font-bold text-blue-700 capitalize">Personal Library</span>
          </Link>
        </div>

        <ErrorDisplay error={error} />

        <div className="flex-1 flex flex-col gap-8 sm:grid sm:grid-cols-3 sm:gap-8">
          <div className="sm:col-span-2 animate-slide-in-left flex-1 flex flex-col">
            <ContentGeneratorForm
              formData={formData}
              updateFormData={updateFormData}
              onGenerate={handleGenerateContent}
              isLoading={isLoading}
              hasContent={generatedContent.length > 0}
            />
          </div>
          <div className="flex-1 flex flex-col space-y-4 animate-slide-in-right mt-4 sm:mt-0">
            <ResultsPanel
              marketingInsights={marketingInsights}
              qaMetrics={qaMetrics}
              generatedContent={generatedContent}
              onCopy={copyToClipboard}
              onExportAll={exportAllContent}
              onSave={handleSaveContent}
            />
          </div>
        </div>
      </main>

      {/* Floating action button always shown at bottom */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xs z-50">
        <FloatingActionButton
          onClick={handleGenerateContent}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Index;
