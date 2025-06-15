
import Header from '@/components/Header';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import CreditBalanceCard from '@/components/billing/CreditBalanceCard';
import FreeCreditsCard from '@/components/billing/FreeCreditsCard';
import SubscriptionCard from '@/components/billing/SubscriptionCard';

const BillingPage = () => {
  const { checkSubscription } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('subscribed') === 'true') {
      toast.success('Subscription successful!', { description: 'Welcome to the Unlimited Plan.'});
      checkSubscription();
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, checkSubscription, setSearchParams]);

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
          <CreditBalanceCard />
          <FreeCreditsCard />
          <SubscriptionCard />
        </div>
      </main>
    </div>
  );
};

export default BillingPage;
