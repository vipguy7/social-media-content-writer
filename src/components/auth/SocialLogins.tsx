
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
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Google Sign-In Failed",
        description: error.message,
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
            Or continue with
          </span>
        </div>
      </div>

      <Button variant="outline" className="w-full text-base font-semibold" onClick={handleLoginWithGoogle} disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GoogleIcon className="mr-2 h-5 w-5" />
        )}
        Continue with Google
      </Button>
    </>
  );
};

export default SocialLogins;
