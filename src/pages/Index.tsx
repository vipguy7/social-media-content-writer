import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import AdPlaceholder from '@/components/AdPlaceholder';
import AnimatedLoader from '@/components/AnimatedLoader';
import ContentFormConfig from '@/components/ContentFormConfig';
import ResultsPanel from '@/components/ResultsPanel';
import ErrorDisplay from '@/components/ErrorDisplay';
import FloatingActionButton from '@/components/FloatingActionButton';
import { Book, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from '@/hooks/use-mobile';
import { useContentGenerator } from '@/hooks/useContentGenerator';
import InterstitialAd from '@/components/InterstitialAd';

const Index = () => {
  const { user, loading, fetchProfile } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const {
    formData,
    updateFormData,
    isLoading,
    error,
    generatedContent,
    qaMetrics,
    marketingInsights,
    handleGenerateContent,
    handleSaveContent,
    copyToClipboard,
    exportAllContent,
    showInterstitialAd,
    setShowInterstitialAd,
  } = useContentGenerator(user, fetchProfile!);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

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

      {/* Header Banner Ad */}
      <div className="w-full flex justify-center bg-background pt-2 pb-1">
        <AdPlaceholder 
          width={isMobile ? '320px' : '728px'} 
          height={isMobile ? '50px' : '90px'} 
          label={isMobile ? "320x50 Banner" : "728x90 Banner"}
          className="my-1"
        />
      </div>

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
        </nav>

        <ErrorDisplay error={error} />

        <section className={
          "flex-1 w-full flex flex-col-reverse gap-5 md:gap-8 md:flex-row mt-1 md:mt-6 transition-all duration-300"
        }>
          {/* Main content generator form */}
          <div className="w-full md:w-2/3 flex flex-col">
            <div className="animate-slide-in-left">
              <ContentFormConfig
                formData={formData}
                setFormData={updateFormData}
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
              {/* Sidebar Ad - Desktop only */}
              {!isMobile && (
                 <div className="mt-6 flex justify-center">
                   <AdPlaceholder 
                     width="300px"
                     height="250px"
                     label="300x250 Ad"
                   />
                 </div>
              )}
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
      
      {showInterstitialAd && (
        <InterstitialAd onClose={() => setShowInterstitialAd(false)} />
      )}
    </div>
  );
};

export default Index;
