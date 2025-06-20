
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LoginFormProps {
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
  onSuccess?: () => void;
}

const LoginForm = ({ setIsLoading, isLoading, onSuccess }: LoginFormProps) => {
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    
    if (!email.trim() || !password.trim()) {
      toast({
        variant: "destructive",
        title: "အချက်အလက်များ ပြည့်စုံအောင် ဖြည့်ပါ",
        description: "အီးမေးလ်နှင့် စကားဝှက် နှစ်ခုလုံး လိုအပ်ပါသည်။",
      });
      return;
    }

    setIsLoading(true);
    console.log('Attempting login for:', email);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      console.log('Login response:', { user: !!data.user, session: !!data.session, error });

      if (error) {
        console.error('Login error:', error);
        
        let errorMessage = 'အကောင့်ဝင်ရောက်မှုတွင် အမှား ဖြစ်ပေါ်ခဲ့သည်။';
        
        if (error.message === 'Invalid login credentials') {
          errorMessage = 'အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည်။';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'အီးမေးလ်ကို အတည်ပြုရန် လိုအပ်ပါသည်။ သင့်အီးမေးလ်ကို စစ်ဆေးပါ။';
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'တောင်းဆိုမှု များလွန်းပါသည်။ ခဏစောင့်ပြီး ထပ်မံကြိုးစားပါ။';
        } else if (error.name === 'AuthRetryableFetchError' || error.message.includes('504') || error.message.includes('timeout')) {
          errorMessage = 'Server ပြဿနာ ရှိနေပါသည်။ ခဏစောင့်ပြီး ထပ်မံကြိုးစားပါ။';
        }
        
        setServerError(errorMessage);
        toast({
          variant: "destructive",
          title: "အကောင့်ဝင်ရောက်မှု မအောင်မြင်ပါ",
          description: errorMessage,
        });
      } else if (data.user && data.session) {
        console.log('Login successful for user:', data.user.email);
        toast({
          title: "အကောင့်ဝင်ရောက်မှု အောင်မြင်ပါပြီ!",
          description: "Myanmar Content Generator သို့ ကြိုဆိုပါသည်",
        });
        
        if (onSuccess) {
          onSuccess();
        } else {
          navigate('/');
        }
      }
    } catch (err: any) {
      console.error('Login catch error:', err);
      
      let errorMessage = "အမှားတစ်ခု ဖြစ်ပေါ်ခဲ့သည်။ ကျေးဇူးပြု၍ ထပ်မံကြိုးစားပါ။";
      
      if (err.name === 'AuthRetryableFetchError' || err.message?.includes('Failed to fetch') || err.message?.includes('504') || err.message?.includes('timeout')) {
        errorMessage = "Server ပြဿနာ ရှိနေပါသည်။ ခဏစောင့်ပြီး ထပ်မံကြိုးစားပါ။";
      }
      
      setServerError(errorMessage);
      toast({
        variant: "destructive",
        title: "အကောင့်ဝင်ရောက်မှု အမှား",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      toast({
        variant: "destructive",
        title: "အီးမေးလ် လိုအပ်ပါသည်",
        description: "စကားဝှက် ပြန်လည်သတ်မှတ်ရန် သင့်အီးမေးလ်လိပ်စာကို ထည့်ပါ။",
      });
      return;
    }

    setIsSendingReset(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) {
        let errorMessage = 'စကားဝှက် ပြန်လည်သတ်မှတ်မှုတွင် အမှား ဖြစ်ပေါ်ခဲ့သည်။';
        
        if (error.name === 'AuthRetryableFetchError' || error.message.includes('504') || error.message.includes('timeout')) {
          errorMessage = 'Server ပြဿနာ ရှိနေပါသည်။ ခဏစောင့်ပြီး ထပ်မံကြိုးစားပါ။';
        }
        
        toast({
          variant: "destructive",
          title: "စကားဝှက် ပြန်လည်သတ်မှတ်မှု မအောင်မြင်ပါ",
          description: errorMessage,
        });
      } else {
        toast({
          title: "စကားဝှက် ပြန်လည်သတ်မှတ်ရန် အီးမေးလ် ပို့ပြီးပါပြီ",
          description: "စကားဝှက် ပြန်လည်သတ်မှတ်ရန် သင့်အီးမေးလ်ကို စစ်ဆေးပါ။",
        });
      }
    } catch (err: any) {
      let errorMessage = "အမှားတစ်ခု ဖြစ်ပေါ်ခဲ့သည်။ ကျေးဇူးပြု၍ နောက်မှ ထပ်မံကြိုးစားပါ။";
      
      if (err.name === 'AuthRetryableFetchError' || err.message?.includes('504') || err.message?.includes('timeout')) {
        errorMessage = "Server ပြဿနာ ရှိနေပါသည်။ ခဏစောင့်ပြီး ထပ်မံကြိုးစားပါ။";
      }
      
      toast({
        variant: "destructive",
        title: "အမှားတစ်ခု ဖြစ်ပေါ်ခဲ့သည်",
        description: errorMessage,
      });
    } finally {
      setIsSendingReset(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {serverError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-myanmar">
            {serverError}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email" className="font-myanmar font-semibold text-slate-700 dark:text-slate-200">အီးမေးလ်</Label>
        <Input
          id="email"
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
         <div className="flex items-center justify-between">
          <Label htmlFor="password" className="font-myanmar font-semibold text-slate-700 dark:text-slate-200">စကားဝှက်</Label>
          <Button
            type="button"
            variant="link"
            className="px-0 text-xs h-auto text-blue-600 dark:text-blue-400 font-myanmar"
            onClick={handleForgotPassword}
            disabled={isSendingReset || isLoading}
          >
            {isSendingReset ? 'ပို့နေသည်...' : 'စကားဝှက် မေ့ပြီလား?'}
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
            disabled={isLoading}
            className="bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 pr-10"
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
      </div>
      
      <Button
        type="submit"
        className="w-full btn-visible font-myanmar font-semibold"
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
