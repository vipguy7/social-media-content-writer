
import Header from '@/components/Header';
import ProfileEditor from '@/components/ProfileEditor';
import ReferralSystem from '@/components/ReferralSystem';
import { useAuth } from '@/hooks/useAuth';
import AnimatedLoader from '@/components/AnimatedLoader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, KeySquare, CreditCard, Sparkles } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const AccountPage = () => {
    const { profile, loading, fetchProfile, subscription } = useAuth();

    if (loading || !profile || !subscription) {
        return (
            <div className="min-h-screen flex flex-col bg-secondary">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <AnimatedLoader />
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-secondary">
            <Header />
            <main className="flex-1 w-full max-w-4xl mx-auto py-8 sm:py-12 px-4">
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">My Account</h1>
                    <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Manage your profile, see your referral code, and earn free credits.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <User />
                                <span>Profile Settings</span>
                            </CardTitle>
                            <CardDescription>Complete your profile to earn free credits.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground flex items-center gap-2"><CreditCard className="w-4 h-4" /> Subscription</span>
                                    <span className={`font-semibold px-2 py-1 rounded-md text-xs ${subscription.isSubscribed ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'}`}>
                                        {subscription.isSubscribed ? (subscription.tier || 'Subscribed') : 'Free Plan'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground flex items-center gap-2"><Sparkles className="w-4 h-4" /> Credits</span>
                                    <span className="font-semibold">{profile.credits}</span>
                                </div>
                            </div>
                            <Separator className="my-6" />
                            <ProfileEditor profile={profile} onUpdate={fetchProfile} />
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <KeySquare />
                                <span>Referral Program</span>
                            </CardTitle>
                            <CardDescription>Share your code and earn credits together.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ReferralSystem profile={profile} onUpdate={fetchProfile} />
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

export default AccountPage;
