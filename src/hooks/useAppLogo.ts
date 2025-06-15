
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useAppLogo = () => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedLogo = localStorage.getItem('app-logo');
    if (savedLogo) {
      setLogoUrl(savedLogo);
    } else {
      generateLogo();
    }
  }, []);

  const generateLogo = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch(`https://xlowbgltztktrejjifie.supabase.co/functions/v1/generate-logo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.success && data.image) {
        setLogoUrl(data.image);
        localStorage.setItem('app-logo', data.image);
        
        // Update favicon
        const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
        if (favicon) {
          favicon.href = data.image;
        }
        
        toast({
          title: "လိုဂို အောင်မြင်စွာ ဖန်တီးပြီးပါပြီ!",
          description: "သင့်အက်ပ်လိုဂို အသစ်ကို ဖန်တီးပေးပြီးပါပြီ",
        });
      }
    } catch (error) {
      console.error('Logo generation failed:', error);
      toast({
        variant: "destructive",
        title: "လိုဂို ဖန်တီးမှု မအောင်မြင်ပါ",
        description: "လိုဂို ဖန်တီးရာတွင် အမှားအယွင်း ဖြစ်ပွားခဲ့ပါသည်",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    logoUrl,
    isGenerating,
    generateLogo,
  };
};
