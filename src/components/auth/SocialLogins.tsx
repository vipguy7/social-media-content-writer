
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import GoogleIcon from '@/components/icons/GoogleIcon';

interface SocialLoginsProps {
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
}

const SocialLogins = ({ setIsLoading, isLoading }: SocialLoginsProps) => {
  const { toast } = useToast();

  const handleLoginWithGoogle = async () => {
    setIsLoading(true);
    console.log('Attempting Google OAuth login');
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      console.log('Google OAuth response:', { data, error });

      if (error) {
        console.error('Google OAuth error:', error);
        
        let errorMessage = error.message;
        if (error.message.includes('unauthorized_client')) {
          errorMessage = 'Google အကောင့်ဝင်ရောက်မှု ပြဿနာ ရှိနေပါသည်။ နောက်မှ ထပ်မံကြိုးစားပါ။';
        } else if (error.message.includes('access_denied')) {
          errorMessage = 'Google အကောင့်ဝင်ရောက်မှု ခွင့်ပြုချက် ငြင်းပယ်ခံရပါသည်။';
        }
        
        toast({
          variant: "destructive",
          title: "Google Sign-In မအောင်မြင်ပါ",
          description: errorMessage,
        });
        setIsLoading(false);
      }
      // Note: If successful, the redirect will happen automatically
      // so we don't need to setIsLoading(false) here
    } catch (err) {
      console.error('Google OAuth catch error:', err);
      
      toast({
        variant: "destructive",
        title: "Google Sign-In အမှား",
        description: "ကျေးဇူးပြု၍ ထပ်မံကြိုးစားပါ။",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            သို့မဟုတ် ဆက်လက်ပြုလုပ်ပါ
          </span>
        </div>
      </div>

      <Button 
        variant="outline" 
        className="w-full text-base font-semibold btn-visible" 
        onClick={handleLoginWithGoogle} 
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GoogleIcon className="mr-2 h-5 w-5" />
        )}
        Google ဖြင့် ဆက်လုပ်ပါ
      </Button>
    </>
  );
};

export default SocialLogins;
