
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
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md animate-fade-in rounded-2xl shadow-2xl shadow-gray-200/40 dark:shadow-black/20">
        <CardHeader className="text-center p-8">
          <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
            Myanmar Content Generator
          </CardTitle>
          <CardDescription className="pt-2 font-myanmar">
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
