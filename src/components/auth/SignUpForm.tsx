
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface SignUpFormProps {
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
  setActiveTab: (tab: string) => void;
  onSuccess?: () => void;
}

const SignUpForm = ({ setIsLoading, isLoading, setActiveTab, onSuccess }: SignUpFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState('');
  const { toast } = useToast();

  const checkPasswordStrength = (password: string): { strength: string, feedback: string } => {
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    if (password.length < minLength) {
      return { strength: 'Weak', feedback: 'အနည်းဆုံး စာလုံး ၈ လုံး လိုအပ်ပါသည်။' };
    } else if (password.length >= minLength && (hasNumber || hasSpecialChar)) {
      if (hasNumber && hasSpecialChar) {
        return { strength: 'Strong', feedback: 'ခိုင်မာသော စကားဝှက်။' };
      }
      return { strength: 'Medium', feedback: 'ကောင်းပါပြီ။ နံပါတ်များနှင့် အထူးအက္ခရာများ ထည့်သွင်းရန် စဉ်းစားပါ။' };
    } else {
      return { strength: 'Weak', feedback: 'နံပါတ် သို့မဟုတ် အထူးအက္ခရာတစ်ခု ထည့်သွင်းပါ။' };
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword) {
      const { strength, feedback } = checkPasswordStrength(newPassword);
      setPasswordStrength(strength);
      setPasswordFeedback(feedback);
    } else {
      setPasswordStrength('');
      setPasswordFeedback('');
    }
  };

  const attemptSignUp = async (email: string, password: string, fullName: string, retryCount = 0): Promise<any> => {
    const maxRetries = 2;
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName.trim(),
          }
        }
      });

      return { data, error };
    } catch (err: any) {
      console.error(`Signup attempt ${retryCount + 1} failed:`, err);
      
      // Check if it's a retryable error and we haven't exceeded max retries
      if (retryCount < maxRetries && (
        err.name === 'AuthRetryableFetchError' || 
        err.message?.includes('timeout') ||
        err.message?.includes('504') ||
        err.message?.includes('Failed to fetch')
      )) {
        // Wait before retrying (exponential backoff)
        const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
        await new Promise(resolve => setTimeout(resolve, delay));
        
        console.log(`Retrying signup (attempt ${retryCount + 2}/${maxRetries + 1})...`);
        return attemptSignUp(email, password, fullName, retryCount + 1);
      }
      
      // If not retryable or max retries exceeded, throw the error
      throw err;
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim() || !fullName.trim()) {
      toast({
        variant: "destructive",
        title: "အချက်အလက်များ ပြည့်စုံအောင် ဖြည့်ပါ",
        description: "အမည်၊ အီးမေးလ်နှင့် စကားဝှက် အားလုံး လိုအပ်ပါသည်။",
      });
      return;
    }

    const strengthCheck = checkPasswordStrength(password);
    if (strengthCheck.strength === 'Weak') {
      toast({
        variant: "destructive",
        title: "စကားဝှက် အားနည်းလွန်းပါသည်",
        description: "ကျေးဇူးပြု၍ လမ်းညွှန်ချက်များအတိုင်း ပိုမိုခိုင်မာသော စကားဝှက်ကို ရွေးချယ်ပါ။",
      });
      return;
    }

    setIsLoading(true);
    console.log('Attempting signup for:', email.trim());

    try {
      const { data, error } = await attemptSignUp(email, password, fullName);

      console.log('Signup response:', { user: !!data?.user, session: !!data?.session, error });

      if (error) {
        console.error('Signup error:', error);
        
        let errorMessage = 'အကောင့်ဖွင့်မှုတွင် အမှား ဖြစ်ပေါ်ခဲ့သည်။';
        
        if (error.message === 'User already registered') {
          errorMessage = 'ဤအီးမေးလ်ဖြင့် အကောင့်တစ်ခု ရှိပြီးဖြစ်ပါသည်။ Log in ကို သုံးပါ။';
        } else if (error.message.includes('Password should be')) {
          errorMessage = 'စကားဝှက် အနည်းဆုံး ၆ လုံး ရှိရမည်။';
        } else if (error.message.includes('Unable to validate email')) {
          errorMessage = 'အီးမေးလ်လိပ်စာ မှန်ကန်မှု စစ်ဆေး၍ မရပါ။';
        } else if (error.message.includes('Invalid email')) {
          errorMessage = 'အီးမေးလ်လိပ်စာ မှန်ကန်မှုကို စစ်ဆေးပါ။';
        } else if (error.message.includes('signup_disabled')) {
          errorMessage = 'အကောင့်ဖွင့်မှု ခေတ္တပိတ်ထားပါသည်။ နောက်မှ ထပ်မံကြိုးစားပါ။';
        }
        
        toast({
          variant: "destructive",
          title: "အကောင့်ဖွင့်မှု မအောင်မြင်ပါ",
          description: errorMessage,
        });
      } else if (data?.user) {
        console.log('Signup successful for user:', data.user.email);
        toast({
          title: "အကောင့်ဖွင့်မှု အောင်မြင်ပါပြီ!",
          description: "အီးမေးလ်ကို စစ်ဆေးပြီး အကောင့်ကို အတည်ပြုပါ။",
        });
        setActiveTab('login');
        
        // Clear form
        setEmail('');
        setPassword('');
        setFullName('');
        setPasswordStrength('');
        setPasswordFeedback('');
        
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err: any) {
      console.error('Signup catch error:', err);
      
      let errorMessage = "ကွန်ရက်ပြဿနာ ရှိနေပါသည်။ ခဏစောင့်ပြီး ထပ်မံကြိုးစားပါ။";
      
      if (err.name === 'AuthRetryableFetchError') {
        errorMessage = "Server အလုပ်ရှုပ်နေပါသည်။ ၁-၂ မိနစ်စောင့်ပြီး ထပ်မံကြိုးစားပါ။";
      } else if (err.message?.includes('Failed to fetch')) {
        errorMessage = "ကွန်ရက်ချိတ်ဆက်မှုကို စစ်ဆေးပြီး ထပ်မံကြိုးစားပါ။";
      } else if (err.message?.includes('timeout') || err.message?.includes('504')) {
        errorMessage = "Server ပြဿနာ ရှိနေပါသည်။ ခဏစောင့်ပြီး ထပ်မံကြိုးစားပါ။";
      }
      
      toast({
        variant: "destructive",
        title: "အကောင့်ဖွင့်မှု အမှား",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="font-myanmar font-semibold text-slate-700 dark:text-slate-200">အမည်</Label>
        <Input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="သင့်အမည် ထည့်ပါ"
          required
          disabled={isLoading}
          className="bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signupEmail" className="font-myanmar font-semibold text-slate-700 dark:text-slate-200">အီးမေးလ်</Label>
        <Input
          id="signupEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="သင့်အီးမေးလ် ထည့်ပါ"
          required
          disabled={isLoading}
          className="bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signupPassword" className="font-myanmar font-semibold text-slate-700 dark:text-slate-200">စကားဝှက်</Label>
        <div className="relative">
          <Input
            id="signupPassword"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="စကားဝှက် ထည့်ပါ"
            required
            className="pr-10 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100"
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-500"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {passwordFeedback && (
          <p className={`text-sm mt-1 font-myanmar ${
            passwordStrength === 'Weak' ? 'text-red-600 dark:text-red-400' :
            passwordStrength === 'Medium' ? 'text-yellow-600 dark:text-yellow-400' :
            'text-green-600 dark:text-green-400'
          }`}>
            {passwordFeedback}
          </p>
        )}
      </div>
      
      <Button
        type="submit"
        className="w-full btn-visible font-myanmar font-semibold"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            အကောင့်ဖွင့်နေသည်...
          </>
        ) : (
          'အကောင့်ဖွင့်ရန်'
        )}
      </Button>
    </form>
  );
};

export default SignUpForm;
