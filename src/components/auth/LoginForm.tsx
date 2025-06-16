
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
        } else if (error.message.includes('timeout') || error.message.includes('504')) {
          errorMessage = 'Server ပြဿနာ ရှိနေပါသည်။ ခဏစောင့်ပြီး ထပ်မံကြိုးစားပါ။';
        }
        
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
        navigate('/');
      }
    } catch (err) {
      console.error('Login catch error:', err);
      
      let errorMessage = "အမှားတစ်ခု ဖြစ်ပေါ်ခဲ့သည်။ ကျေးဇူးပြု၍ ထပ်မံကြိုးစားပါ။";
      
      if (err instanceof Error) {
        if (err.message === 'Failed to fetch') {
          errorMessage = "ကွန်ရက်ချိတ်ဆက်မှုကို စစ်ဆေးပြီး ထပ်မံကြိုးစားပါ။";
        } else if (err.message.includes('timeout') || err.message.includes('504')) {
          errorMessage = "Server ပြဿနာ ရှိနေပါသည်။ ခဏစောင့်ပြီး ထပ်မံကြိုးစားပါ။";
        }
      }
      
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
        
        if (error.message.includes('timeout') || error.message.includes('504')) {
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
    } catch (err) {
       toast({
          variant: "destructive",
          title: "အမှားတစ်ခု ဖြစ်ပေါ်ခဲ့သည်",
          description: "ကျေးဇူးပြု၍ နောက်မှ ထပ်မံကြိုးစားပါ။",
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
          disabled={isLoading}
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
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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
        className="w-full btn-visible"
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
