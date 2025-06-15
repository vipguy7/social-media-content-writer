
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const SubscriptionCard = () => {
  const { subscription, checkSubscription } = useAuth();
  const [promoCode, setPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(''); // can be 'subscribe', 'promo', or 'manage'
  
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
      
      const result = data as { success: boolean, message: string };

      if (result.success) {
        toast.success('Promo Code Applied!', { description: result.message });
        await checkSubscription();
      } else {
        toast.error('Invalid Promo Code', { description: result.message || "The code could not be applied." });
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
  );
};

export default SubscriptionCard;
