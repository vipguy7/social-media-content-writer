
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import AnimatedLoader from '@/components/AnimatedLoader';
import ContentGeneratorForm from '@/components/ContentGeneratorForm';
import ResultsPanel from '@/components/ResultsPanel';
import ErrorDisplay from '@/components/ErrorDisplay';
import FloatingActionButton from '@/components/FloatingActionButton';
import { ContentFormData, QAMetrics, MarketingInsights } from '@/types/content';
import { Book, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
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

  // Show full-screen loading animation before hydration and login checking.
  if (loading) {
    return <AnimatedLoader />;
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen flex flex-col bg-white animate-fade-in">
      <Header />

      {/* Responsive main area */}
      <main className="flex-1 w-full flex flex-col items-stretch px-1 sm:px-3 pb-6 max-w-4xl mx-auto">
        {/* Top navigation & quick access row */}
        <nav className="w-full flex flex-col gap-2 sm:gap-0 sm:flex-row items-stretch sm:items-center justify-between mt-2 mb-2 sm:mb-3 px-0">
          <div className="flex gap-2 w-full sm:w-auto">
            <Link
              to="/knowledge-base"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#fbe7ee] to-[#e7f5fc] border-2 border-pink-300 hover:border-pink-400 rounded-xl p-2 sm:p-3 shadow hover:scale-[1.03] transition group"
              aria-label="Go to Content Strategy Knowledge Base"
            >
              <Sparkles className="w-6 h-6 text-pink-500 drop-shadow-glow group-hover:animate-bounce" />
              <span className="text-base sm:text-lg font-bold text-pink-600 capitalize">Content Knowledge Base</span>
            </Link>
            <Link
              to="/library"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#e4eafc] to-[#fdf6ec] border-2 border-blue-300 hover:border-blue-400 rounded-xl p-2 sm:p-3 shadow hover:scale-[1.03] transition group"
              aria-label="Go to My Personal Content Library"
            >
              <Book className="w-6 h-6 text-blue-600 drop-shadow-glow group-hover:animate-bounce" />
              <span className="text-base sm:text-lg font-bold text-blue-700 capitalize">Personal Library</span>
            </Link>
          </div>
          <div className="flex justify-end mt-2 sm:mt-0">
            <a
              href="/analytics"
              className="inline-flex items-center gap-2 px-4 py-2 font-semibold rounded-xl bg-gradient-to-r from-blue-50 to-yellow-50 border-2 border-blue-200 hover:bg-blue-100 transition shadow hover:scale-[1.04] text-base"
              aria-label="Go to Analytics Dashboard"
            >
              <span className="material-symbols-outlined text-blue-600">insights</span>
              <span className="text-blue-700 font-bold">Analytics</span>
            </a>
          </div>
        </nav>

        <ErrorDisplay error={error} />

        <section className={
          "flex-1 w-full flex flex-col-reverse gap-5 md:gap-8 md:flex-row mt-1 md:mt-6 transition-all duration-300"
        }>
          {/* Main content generator form */}
          <div className="w-full md:w-2/3 flex flex-col">
            <div className="animate-slide-in-left">
              <ContentGeneratorForm
                formData={formData}
                updateFormData={updateFormData}
                onGenerate={handleGenerateContent}
                isLoading={isLoading}
                hasContent={generatedContent.length > 0}
              />
            </div>
          </div>
          {/* Results & analysis panel */}
          <aside className={`w-full md:w-1/3 flex flex-col pt-1 md:pt-0 ${isMobile ? "order-first" : "order-none"}`}>
            <div className="animate-slide-in-right">
              <ResultsPanel
                marketingInsights={marketingInsights}
                qaMetrics={qaMetrics}
                generatedContent={generatedContent}
                onCopy={copyToClipboard}
                onExportAll={exportAllContent}
                onSave={handleSaveContent}
              />
            </div>
          </aside>
        </section>
      </main>

      {/* Floating action button always shown at bottom, never overlays main form fields */}
      <div className="fixed bottom-3 right-1/2 translate-x-1/2 sm:right-7 sm:translate-x-0 z-50 pointer-events-none">
        {/* pointer-events-auto only on btn for accessibility */}
        <div className="pointer-events-auto">
          <FloatingActionButton
            onClick={handleGenerateContent}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;

