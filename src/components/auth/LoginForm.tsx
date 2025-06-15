
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface LoginFormProps {
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
}

const LoginForm = ({ setIsLoading, isLoading }: LoginFormProps) => {
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "အကောင့်ဝင်ရောက်မှု မအောင်မြင်ပါ",
          description: error.message === 'Invalid login credentials' 
            ? 'အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည်'
            : error.message,
        });
      } else {
        toast({
          title: "အကောင့်ဝင်ရောက်မှု အောင်မြင်ပါပြီ!",
          description: "Myanmar Content Generator သို့ ကြိုဆိုပါသည်",
        });
        navigate('/');
      }
    } catch (err) {
      if (err instanceof Error && err.message === 'Failed to fetch') {
        toast({
          variant: "destructive",
          title: "ကွန်ရက်ချိတ်ဆက်မှု အမှား",
          description: "သင်၏ ကွန်ရက်ချိတ်ဆက်မှုကို စစ်ဆေးပြီး ထပ်မံကြိုးစားပါ။"
        });
      } else {
        toast({
          variant: "destructive",
          title: "အမှားတစ်ခု ဖြစ်ပေါ်ခဲ့သည်",
          description: "ကျေးဇူးပြု၍ ထပ်မံကြိုးစားပါ",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Email is required",
        description: "Please enter your email address to reset your password.",
      });
      return;
    }

    setIsSendingReset(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Failed to send reset email",
          description: error.message,
        });
      } else {
        toast({
          title: "Password reset email sent",
          description: "Please check your inbox for a link to reset your password.",
        });
      }
    } catch (err) {
       toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Please try again later.",
        });
    } finally {
      setIsSendingReset(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">အီးမေးလ်</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="သင့်အီးမေးလ် ထည့်ပါ"
          required
        />
      </div>
      
      <div className="space-y-2">
         <div className="flex items-center justify-between">
          <Label htmlFor="password">စကားဝှက်</Label>
          <Button
            type="button"
            variant="link"
            className="px-0 text-xs h-auto"
            onClick={handleForgotPassword}
            disabled={isSendingReset}
          >
            {isSendingReset ? 'Sending...' : 'Forgot Password?'}
          </Button>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="စကားဝှက် ထည့်ပါ"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ဝင်ရောက်နေသည်...
          </>
        ) : (
          'အကောင့်ဝင်ရန်'
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
