
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const FreeCreditsCard = () => {
    return (
        <Card className="lg:col-span-1 glass-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Gift className="w-6 h-6 text-primary" />
                    <span>Get Free Credits</span>
                </CardTitle>
                <CardDescription>Earn credits without paying.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    You can earn free credits by completing your profile or by referring friends. Click below to manage your profile and get your referral code.
                </p>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <Link to="/account">Go to My Account</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default FreeCreditsCard;
