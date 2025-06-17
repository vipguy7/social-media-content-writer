
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import GoogleIcon from '@/components/icons/GoogleIcon';
import { useNavigate } from 'react-router-dom';

interface SocialLoginsProps {
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
  onSuccess?: () => void;
}

const SocialLogins = ({ setIsLoading, isLoading, onSuccess }: SocialLoginsProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    setIsLoading(true);
    console.log('Attempting Google OAuth login');
    
    try {
      const redirectTo = `${window.location.origin}/`;
      console.log('Google OAuth redirect URL:', redirectTo);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });

      console.log('Google OAuth response:', { data, error });

      if (error) {
        console.error('Google OAuth error:', error);
        
        let errorMessage = 'Google ဖြင့် အကောင့်ဝင်ရောက်မှုတွင် ပြဿနာ ရှိနေပါသည်။';
        
        if (error.message.includes('unauthorized_client')) {
          errorMessage = 'Google အကောင့်ဝင်ရောက်မှု စီမံခန့်ခွဲမှု ပြဿနာ ရှိနေပါသည်။ နောက်မှ ထပ်မံကြိုးစားပါ။';
        } else if (error.message.includes('access_denied')) {
          errorMessage = 'Google အကောင့်ဝင်ရောက်မှု ခွင့်ပြုချက် ငြင်းပယ်ခံရပါသည်။';
        } else if (error.message.includes('popup_blocked')) {
          errorMessage = 'Popup ပိတ်ဆို့ခံရပါသည်။ Browser ၏ popup settings ကို စစ်ဆေးပါ။';
        }
        
        toast({
          variant: "destructive",
          title: "Google Sign-In မအောင်မြင်ပါ",
          description: errorMessage,
        });
        setIsLoading(false);
      } else {
        console.log('Google OAuth initiated successfully');
        // Don't set loading to false here - let the auth state change handle it
        // The redirect will happen automatically
      }
    } catch (err: any) {
      console.error('Google OAuth catch error:', err);
      
      let errorMessage = "ကွန်ရက်ပြဿနာ ရှိနေပါသည်။ ခဏစောင့်ပြီး ထပ်မံကြိုးစားပါ။";
      
      if (err.name === 'AuthRetryableFetchError') {
        errorMessage = "Server အလုပ်ရှုပ်နေပါသည်။ ၁-၂ မိနစ်စောင့်ပြီး ထပ်မံကြိုးစားပါ။";
      } else if (err.message === 'Failed to fetch') {
        errorMessage = "ကွန်ရက်ချိတ်ဆက်မှုကို စစ်ဆေးပြီး ထပ်မံကြိုးစားပါ။";
      } else if (err.message?.includes('timeout') || err.message?.includes('504')) {
        errorMessage = "Server ပြဿနာ ရှိနေပါသည်။ ခဏစောင့်ပြီး ထပ်မံကြိုးစားပါ။";
      }
      
      toast({
        variant: "destructive",
        title: "Google Sign-In အမှား",
        description: errorMessage,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-300 dark:border-slate-600" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-slate-800 px-3 text-slate-600 dark:text-slate-400 font-myanmar font-medium">
            သို့မဟုတ် ဆက်လက်ပြုလုပ်ပါ
          </span>
        </div>
      </div>

      <Button 
        variant="outline" 
        className="w-full mt-4 text-base font-semibold bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200" 
        onClick={handleLoginWithGoogle} 
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GoogleIcon className="mr-2 h-5 w-5" />
        )}
        <span className="font-myanmar">Google ဖြင့် ဆက်လုပ်ပါ</span>
      </Button>
    </div>
  );
};

export default SocialLogins;
