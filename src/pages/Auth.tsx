
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);

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
      toast({
        variant: "destructive",
        title: "အမှားတစ်ခု ဖြစ်ပေါ်ခဲ့သည်",
        description: "ကျေးဇူးပြု၍ ထပ်မံကြိုးစားပါ",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

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
      toast({
        variant: "destructive",
        title: "အမှားတစ်ခု ဖြစ်ပေါ်ခဲ့သည်",
        description: "ကျေးဇူးပြု၍ ထပ်မံကြိုးစားပါ",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Myanmar Content Generator
          </CardTitle>
          <CardDescription>
            မြန်မာ ဆိုရှယ်မီဒီယာ ကွန်တင့် ဖန်တီးသူ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">အကောင့်ဝင်ရန်</TabsTrigger>
              <TabsTrigger value="signup">အကောင့်ဖွင့်ရန်</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
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
                  <Label htmlFor="password">စကားဝှက်</Label>
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
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
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
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="စကားဝှက် ထည့်ပါ (အနည်းဆုံး ၆ လုံး)"
                      required
                      minLength={6}
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
                      အကောင့်ဖွင့်နေသည်...
                    </>
                  ) : (
                    'အကောင့်ဖွင့်ရန်'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
