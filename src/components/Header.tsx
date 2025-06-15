
import { Button } from '@/components/ui/button';
import { LogOut, User, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useAppLogo } from '@/hooks/useAppLogo';

const Header = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { logoUrl, isGenerating, generateLogo } = useAppLogo();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "အောင်မြင်စွာ ထွက်ခွာပြီးပါပြီ",
        description: "သင့်အကောင့်မှ အောင်မြင်စွာ ထွက်ခွာပြီးပါပြီ",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "ထွက်ခွာမှု မအောင်မြင်ပါ",
        description: "အကောင့်မှ ထွက်ခွာရာတွင် အမှားအယွင်း ဖြစ်ပွားခဲ့ပါသည်",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt="Myanmar Content Crafter Logo" 
              className="w-10 h-10 rounded-lg object-cover shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={generateLogo}
              title="Click to regenerate logo"
            />
          ) : (
            <div 
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
              onClick={generateLogo}
              title="Click to generate logo"
            >
              {isGenerating ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Sparkles className="w-5 h-5 text-white" />
              )}
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Myanmar Content Writer
            </h1>
            <p className="text-xs text-muted-foreground">မြန်မာအွန်လိုင်းစီးပွားရေးများအတွက် အထူးလုပ်ဆောင်ပေးနိုင်သည့် AI </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4" />
                <span className="hidden md:inline text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">ထွက်ရန်</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
