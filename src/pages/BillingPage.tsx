
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Gift } from 'lucide-react';

const BillingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto py-8 sm:py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Subscription & Credits</h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            Choose the best plan for you, or find ways to earn more free credits.
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          {/* How to get free credits */}
          <Card className="lg:col-span-1 glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-6 h-6 text-myanmar-red" />
                <span>Get Free Credits</span>
              </CardTitle>
              <CardDescription>Earn credits without paying.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                  <h3 className="font-semibold text-gray-800">Refer a Friend</h3>
                  <p className="text-sm text-muted-foreground">
                    Invite your friends to join and you'll both get 10 free credits when they sign up! (Coming soon)
                  </p>
              </div>
              <div>
                  <h3 className="font-semibold text-gray-800">Complete Your Profile</h3>
                  <p className="text-sm text-muted-foreground">
                    Add a profile picture and fill out your details to receive 5 bonus credits. (Coming soon)
                  </p>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Plan Card */}
          <Card className="lg:col-span-2 border-2 border-primary shadow-lg myanmar-gradient-border">
            <CardHeader className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Most Popular</p>
              <CardTitle className="text-3xl font-bold">Unlimited Plan</CardTitle>
              <CardDescription>Generate endless content without limits.</CardDescription>
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
              <Button className="w-full text-lg py-6 myanmar-gradient hover:opacity-90">Subscribe Now</Button>
              <div className="w-full flex gap-2">
                <Input placeholder="Enter a promo code" className="bg-white"/>
                <Button variant="outline">Apply</Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">Get a 7-day free trial with a valid promo code.</p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BillingPage;

