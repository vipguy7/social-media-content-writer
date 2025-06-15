
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const CreditBalanceCard = () => {
    const { profile } = useAuth();
    return (
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
    );
}

export default CreditBalanceCard;
