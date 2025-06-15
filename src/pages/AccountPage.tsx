
import Header from '@/components/Header';
import ProfileEditor from '@/components/ProfileEditor';
import ReferralSystem from '@/components/ReferralSystem';
import { useAuth } from '@/hooks/useAuth';
import AnimatedLoader from '@/components/AnimatedLoader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, KeySquare } from 'lucide-react';

const AccountPage = () => {
    const { profile, loading, fetchProfile } = useAuth();

    if (loading || !profile) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50/50 dark:bg-background">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <AnimatedLoader />
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50/50 dark:bg-background">
            <Header />
            <main className="flex-1 w-full max-w-4xl mx-auto py-8 sm:py-12 px-4">
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">My Account</h1>
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
