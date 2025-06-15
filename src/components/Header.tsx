
import { Button } from '@/components/ui/button';
import { LogOut, Sparkles, Coins } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useAppLogo } from '@/hooks/useAppLogo';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = () => {
  const { user, signOut, profile } = useAuth();
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
            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Myanmar Content Writer
            </h1>
            <p className="text-caption md:text-body-sm text-muted-foreground">မြန်မာအွန်လိုင်းစီးပွားရေးများအတွက် အထူးလုပ်ဆောင်ပေးနိုင်သည့် AI </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <>
              {profile && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex cursor-help items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-sm font-medium text-muted-foreground">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span>{profile.credits} Credits</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Get more credits by subscribing to a plan.</p>
                  </TooltipContent>
                </Tooltip>
              )}

              <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={profile?.avatar_url ?? ''} alt={profile?.full_name ?? user.email ?? 'User'} />
                  <AvatarFallback>
                    {profile?.full_name ? profile.full_name.substring(0, 2) : user.email?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-body-sm font-medium">
                  {profile?.full_name || user.email}
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
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
