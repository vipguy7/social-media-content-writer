
import { Button } from '@/components/ui/button';
import { LogOut, Sparkles, Coins, Library, CreditCard, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, NavLink } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import { useState } from 'react';
import AuthModal from './auth/AuthModal';

const Header = () => {
  const { user, signOut, profile, subscription } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed Out Successfully", {
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast.error("Sign Out Failed", {
        description: "There was an error while signing out.",
      });
    }
  };

  const handleLoginClick = () => {
    setAuthModalTab('login');
    setShowAuthModal(true);
  };

  const handleSignUpClick = () => {
    setAuthModalTab('signup');
    setShowAuthModal(true);
  };

  const subscriptionText = subscription?.isSubscribed && subscription.tier !== 'trial'
    ? 'Unlimited'
    : `${profile?.credits ?? '...'} Credits`;

  let subscriptionLabel = '';
  if (subscription?.isSubscribed) {
    if (subscription.tier === 'trial') {
        subscriptionLabel = '(Trial)';
    } else {
        const tierName = subscription.tier ? subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1) : 'Pro';
        subscriptionLabel = `(${tierName})`;
    }
  }

  const navLinkClass = "text-muted-foreground transition-colors hover:text-primary";
  const activeNavLinkClass = "text-primary";

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <div className="flex-1 flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div 
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:scale-105"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                  Content Writer AI
                </h1>
                <p className="text-caption md:text-body-sm text-muted-foreground">မြန်မာဘာသာဖြင့် ရေးသားနိုင်</p>
              </div>
            </Link>
          </div>

          <div className="flex-none flex items-center gap-2 md:gap-4">
            {user ? (
              <>
                <NavigationMenu>
                  <NavigationMenuList className="gap-1 md:gap-2">
                    <NavigationMenuItem>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <NavLink 
                            to="/library" 
                            className={({ isActive }) => cn(navLinkClass, 'h-10 w-10 flex items-center justify-center rounded-full', isActive && activeNavLinkClass)}
                          >
                            <Library className="h-5 w-5" />
                            <span className="sr-only">Library</span>
                          </NavLink>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View your saved content</p>
                        </TooltipContent>
                      </Tooltip>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <NavLink 
                            to="/billing" 
                            className={({ isActive }) => cn(navLinkClass, 'h-10 w-10 flex items-center justify-center rounded-full', isActive && activeNavLinkClass)}
                          >
                            <CreditCard className="h-5 w-5" />
                             <span className="sr-only">Billing</span>
                          </NavLink>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Manage subscription and credits</p>
                        </TooltipContent>
                      </Tooltip>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                {profile && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/billing" className="hidden sm:flex cursor-pointer items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80">
                        <Coins className="h-4 w-4 text-yellow-400" />
                        <span className="font-semibold">{subscriptionText}</span>
                        {subscriptionLabel && <span className="hidden sm:inline text-xs opacity-75 ml-1">{subscriptionLabel}</span>}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to manage subscription.</p>
                    </TooltipContent>
                  </Tooltip>
                )}

                <Link to="/account" className="flex items-center gap-3 group">
                  <Avatar className="h-9 w-9 group-hover:ring-2 group-hover:ring-primary group-hover:ring-offset-2 group-hover:ring-offset-background transition-all">
                    <AvatarImage src={profile?.avatar_url ?? ''} alt={profile?.full_name ?? user.email ?? 'User'} />
                    <AvatarFallback>
                      {profile?.full_name ? profile.full_name.substring(0, 2) : user.email?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden lg:inline text-body-sm font-medium group-hover:text-primary transition-colors">
                    {profile?.full_name || user.email}
                  </span>
                </Link>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                      <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={handleSignOut}
                      >
                          <LogOut className="w-5 h-5" />
                          <span className="sr-only">Sign Out</span>
                      </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                      <p>Sign Out</p>
                  </TooltipContent>
                </Tooltip>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLoginClick}
                  className="flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="font-myanmar">အကောင့်ဝင်ရန်</span>
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={handleSignUpClick}
                  className="flex items-center gap-2 btn-visible"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="font-myanmar">အကောင့်ဖွင့်ရန်</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        defaultTab={authModalTab}
      />
    </>
  );
};

export default Header;
