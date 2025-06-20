
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useAppLogo = () => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedLogo = localStorage.getItem('app-logo');
    if (savedLogo) {
      setLogoUrl(savedLogo);
    }
  }, []);

  const generateLogo = async () => {
    setIsGenerating(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (session) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }

      const response = await fetch(`https://xlowbgltztktrejjifie.supabase.co/functions/v1/generate-logo`, {
        method: 'POST',
        headers,
      });

      if (!response.ok) {
        if (response.status === 401) {
            throw new Error("You must be logged in to generate a logo.");
        }
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.image) {
        setLogoUrl(data.image);
        localStorage.setItem('app-logo', data.image);
        
        const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
        if (favicon) {
          favicon.href = data.image;
        }
        
        toast({
          title: "လိုဂို အောင်မြင်စွာ ဖန်တီးပြီးပါပြီ!",
          description: "သင့်အက်ပ်လိုဂို အသစ်ကို ဖန်တီးပေးပြီးပါပြီ",
        });
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Logo generation failed:', error);
      toast({
        variant: "destructive",
        title: "လိုဂို ဖန်တီးမှု မအောင်မြင်ပါ",
        description: error instanceof Error ? error.message : "လိုဂို ဖန်တီးရာတွင် အမှားအယွင်း ဖြစ်ပွားခဲ့ပါသည်",
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
