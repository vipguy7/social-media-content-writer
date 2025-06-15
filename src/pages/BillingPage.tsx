import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Gift, Coins } from 'lucide-react'; // Import Coins icon
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Header from '@/components/Header';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const BillingPage = () => {
  const { subscription, checkSubscription, profile } = useAuth(); // Get profile
  const [promoCode, setPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(''); // can be 'subscribe', 'promo', or 'manage'
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('subscribed') === 'true') {
      toast.success('Subscription successful!', { description: 'Welcome to the Unlimited Plan.'});
      checkSubscription();
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, checkSubscription, setSearchParams]);

  const handleSubscribe = async () => {
    setIsLoading('subscribe');
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session');
      if (error) throw error;
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Could not create a checkout session.');
      }
    } catch (error: any) {
      toast.error('Subscription Error', { description: error.message });
      setIsLoading('');
    }
  };

  const handleApplyPromoCode = async () => {
    if (!promoCode.trim()) {
      toast.warning('Please enter a promo code.');
      return;
    }
    setIsLoading('promo');
    try {
      const { data, error } = await supabase.functions.invoke('apply-promo-code', {
        body: { code: promoCode },
      });

      if (error) throw new Error(data?.message || error.message || 'An unexpected error occurred.');
      
      if (data.success) {
        toast.success('Promo Code Applied!', { description: data.message });
        await checkSubscription();
      } else {
        toast.error('Invalid Promo Code', { description: data.message || "The code could not be applied." });
      }

    } catch (error: any) {
        toast.error('Promo Code Error', { description: error.message });
    } finally {
        setIsLoading('');
        setPromoCode('');
    }
  };
  
  const handleManageSubscription = async () => {
    setIsLoading('manage');
    try {
      const { data, error } = await supabase.functions.invoke('manage-subscription');
      if (error) throw error;
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      toast.error('Error', { description: "Could not open subscription management portal."});
    } finally {
      setIsLoading('');
    }
  }
  
  const isSubscribed = subscription?.isSubscribed ?? false;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50 dark:bg-background">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto py-8 sm:py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">Subscription & Credits</h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            Choose the best plan for you, or find ways to earn more free credits.
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          <Card className="lg:col-span-1 glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="w-6 h-6 text-yellow-500" />
                <span>Your Credit Balance</span>
              </CardTitle>
              <CardDescription>Credits are used to generate content.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{profile?.credits ?? '...'}</div>
              <p className="text-sm text-muted-foreground">credits remaining</p>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1 glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-6 h-6 text-primary" />
                <span>Get Free Credits</span>
              </CardTitle>
              <CardDescription>Earn credits without paying.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                  <h3 className="font-semibold text-foreground/90">Refer a Friend</h3>
                  <p className="text-sm text-muted-foreground">
                    Invite your friends to join and you'll both get 10 free credits when they sign up! (Coming soon)
                  </p>
              </div>
              <div>
                  <h3 className="font-semibold text-foreground/90">Complete Your Profile</h3>
                  <p className="text-sm text-muted-foreground">
                    Add a profile picture and fill out your details to receive 5 bonus credits. (Coming soon)
                  </p>
              </div>
            </CardContent>
          </Card>

          <Card className={`lg:col-span-1 shadow-lg gradient-border ${isSubscribed && subscription?.tier !== 'trial' ? 'border-green-500' : isSubscribed && subscription?.tier === 'trial' ? 'border-blue-500' : 'border-primary'}`}>
            <CardHeader className="text-center">
              {isSubscribed ? (
                <p className="text-sm font-semibold uppercase tracking-wide text-green-600">Your Current Plan</p>
              ) : (
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">Most Popular</p>
              )}
              <CardTitle className="text-3xl font-bold">Unlimited Plan</CardTitle>
              <CardDescription>
                {isSubscribed
                  ? subscription.tier === 'trial'
                    ? subscription.endDate
                      ? `Your trial plan ends on ${new Date(subscription.endDate).toLocaleDateString()}.`
                      : 'You are on a trial plan.'
                    : `You are on the ${subscription.tier || 'Unlimited'} plan.`
                  : 'Generate endless content without limits.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <span className="text-5xl font-bold">$10</span>
                <span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> Unlimited Content Generation</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> Access to all content types & features</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> Save and export all content</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> Priority Support</li>
              </ul>
            </CardContent>
            <CardFooter className="flex-col gap-4">
              {isSubscribed ? (
                 <Button className="w-full text-lg py-6" variant="outline" onClick={handleManageSubscription} disabled={!!isLoading}>
                  {isLoading === 'manage' ? 'Loading...' : 'Manage Subscription'}
                </Button>
              ) : (
                <>
                  <Button className="w-full text-lg py-6 adorable-gradient text-white hover:opacity-90" onClick={handleSubscribe} disabled={!!isLoading}>
                    {isLoading === 'subscribe' ? 'Processing...' : 'Subscribe Now'}
                  </Button>
                  <div className="w-full flex gap-2">
                    <Input 
                      placeholder="Enter a promo code" 
                      className="bg-white dark:bg-input"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={!!isLoading}
                    />
                    <Button variant="outline" onClick={handleApplyPromoCode} disabled={!!isLoading}>
                      {isLoading === 'promo' ? 'Applying...' : 'Apply'}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Get a 7-day free trial with a valid promo code.</p>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BillingPage;
