
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/auth/LoginForm';
import SignUpForm from '@/components/auth/SignUpForm';
import SocialLogins from '@/components/auth/SocialLogins';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('Initial session check:', { session: !!session, error });
        
        if (session) {
          console.log('User already logged in, redirecting to home');
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };
    
    checkUser();
    
    // Set dark mode by default for the auth page
    document.documentElement.classList.add('dark');
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event, !!session);
      if (event === 'SIGNED_IN' && session) {
        console.log('User signed in, redirecting to home');
        navigate('/');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
      <Card className="w-full max-w-md animate-fade-in rounded-2xl glass-card gradient-border">
        <CardHeader className="text-center p-8">
          <CardTitle className="text-h1 font-bold tracking-tight bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
            Myanmar Content Generator
          </CardTitle>
          <CardDescription className="pt-2 font-myanmar text-slate-400">
            မြန်မာ ဆိုရှယ်မီဒီယာ ကွန်တင့် ဖန်တီးသူ
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">အကောင့်ဝင်ရန်</TabsTrigger>
              <TabsTrigger value="signup">အကောင့်ဖွင့်ရန်</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4 pt-6 data-[state=active]:animate-fade-in">
              <LoginForm setIsLoading={setIsLoading} isLoading={isLoading} />
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4 pt-6 data-[state=active]:animate-fade-in">
              <SignUpForm setIsLoading={setIsLoading} isLoading={isLoading} setActiveTab={setActiveTab} />
            </TabsContent>
          </Tabs>

          <SocialLogins setIsLoading={setIsLoading} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
