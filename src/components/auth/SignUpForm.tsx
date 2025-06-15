
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
}

const SignUpForm = ({ setIsLoading, isLoading, setActiveTab }: SignUpFormProps) => {
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
    const { strength, feedback } = checkPasswordStrength(newPassword);
    setPasswordStrength(strength);
    setPasswordFeedback(feedback);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const strengthCheck = checkPasswordStrength(password);
    if (strengthCheck.strength === 'Weak') {
      toast({
        variant: "destructive",
        title: "စကားဝှက် အားနည်းလွန်းပါသည်",
        description: "ကျေးဇူးပြု၍ လမ်းညွှန်ချက်များအတိုင်း ပိုမိုခိုင်မာသော စကားဝှက်ကို ရွေးချယ်ပါ။",
      });
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "အကောင့်ဖွင့်မှု မအောင်မြင်ပါ",
          description: error.message === 'User already registered' 
            ? 'ဤအီးမေးလ်ဖြင့် အကောင့်တစ်ခု ရှိပြီးဖြစ်ပါသည်'
            : error.message,
        });
      } else {
        toast({
          title: "အကောင့်ဖွင့်မှု အောင်မြင်ပါပြီ!",
          description: "အီးမေးလ်ကို စစ်ဆေးပြီး အကောင့်ကို အတည်ပြုပါ",
        });
        setActiveTab('login');
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

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">အမည်</Label>
        <Input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="သင့်အမည် ထည့်ပါ"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signupEmail">အီးမေးလ်</Label>
        <Input
          id="signupEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="သင့်အီးမေးလ် ထည့်ပါ"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signupPassword">စကားဝှက်</Label>
        <div className="relative">
          <Input
            id="signupPassword"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="စကားဝှက် ထည့်ပါ"
            required
            className="pr-10"
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
        {passwordFeedback && (
          <p className={`text-sm mt-1 ${
            passwordStrength === 'Weak' ? 'text-destructive' :
            passwordStrength === 'Medium' ? 'text-yellow-400' :
            'text-cyan-400'
          }`}>
            {passwordFeedback}
          </p>
        )}
      </div>
      
      <Button
        type="submit"
        className="w-full"
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
