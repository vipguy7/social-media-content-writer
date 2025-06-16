
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
import { AlertCircle } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { useContentGenerator } from '@/hooks/useContentGenerator';
import InterstitialAd from '@/components/InterstitialAd';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import HeroSection from '@/components/HeroSection';

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
  } = useContentGenerator(user, fetchProfile);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <AnimatedLoader />;
  }

  if (!user) {
    return null; // Will redirect to auth
  }
  
  const isCreditError = error.includes('Not enough credits');

  return (
    <div className="min-h-screen flex flex-col bg-background animate-fade-in">
      <Header />

      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20">
            <HeroSection />
        </div>

        <div className="w-full flex justify-center bg-background py-4">
            <AdPlaceholder 
                width={isMobile ? '320px' : '728px'} 
                height={isMobile ? '50px' : '90px'} 
                label={isMobile ? "320x50 Banner" : "728x90 Banner"}
                className="my-2"
            />
        </div>

        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 pb-8" id="content-generator">
          {isCreditError ? (
            <div className="my-6 p-6 border-2 border-destructive rounded-xl bg-destructive/5 animate-fade-in">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-destructive mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-destructive mb-2">Credit Depleted</h3>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-foreground font-medium">You've run out of credits. Please subscribe or earn more to continue generating content.</p>
                    <Button onClick={() => navigate('/billing')} className="btn-visible whitespace-nowrap">
                      Go to Billing Page
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <ErrorDisplay error={error} />
          )}

          <section className="flex-1 w-full flex flex-col-reverse gap-6 md:gap-8 md:flex-row mt-2 md:mt-8 transition-all duration-300">
            <div className="w-full md:w-2/3 flex flex-col">
              <div className="animate-slide-in-left">
                <ContentFormConfig
                  formData={formData}
                  updateFormData={updateFormData}
                  onGenerate={handleGenerateContent}
                  isLoading={isLoading}
                  hasContent={generatedContent.length > 0}
                />
              </div>
            </div>
            
            <aside className={`w-full md:w-1/3 flex flex-col pt-2 md:pt-0 ${isMobile ? "order-first" : "order-none"}`}>
              <div className="animate-slide-in-right">
                <ResultsPanel
                  marketingInsights={marketingInsights}
                  qaMetrics={qaMetrics}
                  generatedContent={generatedContent}
                  onCopy={copyToClipboard}
                  onExportAll={exportAllContent}
                  onSave={handleSaveContent}
                />
                {!isMobile && (
                   <div className="mt-8 flex justify-center">
                     <AdPlaceholder 
                       width="300px"
                       height="250px"
                       label="300x250 Ad"
                       className="border-2"
                     />
                   </div>
                )}
              </div>
            </aside>
          </section>
        </div>
      </main>

      <div className="fixed bottom-4 right-1/2 translate-x-1/2 sm:right-8 sm:translate-x-0 z-50 pointer-events-none">
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
