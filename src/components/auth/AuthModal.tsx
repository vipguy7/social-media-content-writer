
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import SocialLogins from './SocialLogins';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

const AuthModal = ({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab);

  const handleTabChange = (value: string) => {
    if (value === 'login' || value === 'signup') {
      setActiveTab(value);
    }
  };

  const handleSetActiveTab = (tab: string) => {
    if (tab === 'login' || tab === 'signup') {
      setActiveTab(tab);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 border-2 border-blue-200 dark:border-blue-700">
        <DialogHeader className="text-center p-6 pb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <DialogTitle className="text-2xl font-bold">
            Myanmar Content Generator
          </DialogTitle>
          <p className="text-blue-100 font-myanmar text-sm mt-1">
            မြန်မာ ဆိုရှယ်မီဒီယာ ကွန်တင့် ဖန်တီးသူ
          </p>
        </DialogHeader>
        
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="font-myanmar">အကောင့်ဝင်ရန်</TabsTrigger>
              <TabsTrigger value="signup" className="font-myanmar">အကောင့်ဖွင့်ရန်</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <LoginForm 
                setIsLoading={setIsLoading} 
                isLoading={isLoading} 
                onSuccess={onClose}
              />
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <SignUpForm 
                setIsLoading={setIsLoading} 
                isLoading={isLoading} 
                setActiveTab={handleSetActiveTab}
                onSuccess={onClose}
              />
            </TabsContent>
          </Tabs>

          <SocialLogins setIsLoading={setIsLoading} isLoading={isLoading} onSuccess={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
