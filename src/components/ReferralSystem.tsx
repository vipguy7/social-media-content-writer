
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { Copy, Gift } from 'lucide-react';
import { Label } from './ui/label';

interface ReferralSystemProps {
    profile: {
        referral_code: string | null;
        referred_by_user_id: string | null;
    };
    onUpdate: () => Promise<void>;
}

const ReferralSystem: React.FC<ReferralSystemProps> = ({ profile, onUpdate }) => {
    const [friendCode, setFriendCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCopyCode = () => {
        if (profile.referral_code) {
            navigator.clipboard.writeText(profile.referral_code);
            toast.success('Referral code copied to clipboard!');
        }
    };

    const handleApplyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!friendCode.trim()) {
            toast.warning('Please enter a referral code.');
            return;
        }
        setIsLoading(true);
        try {
            const { data, error } = await supabase.rpc('apply_referral_code', {
                p_referral_code: friendCode.trim().toUpperCase(),
            });

            if (error) throw new Error(error.message);
            
            if (data.success) {
                toast.success('Referral Success!', { description: data.message });
                await onUpdate();
                setFriendCode('');
            } else {
                toast.error('Referral Failed', { description: data.message });
            }

        } catch (error: any) {
            toast.error('An error occurred', { description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const hasBeenReferred = !!profile.referred_by_user_id;

    return (
        <div className="space-y-6">
            <div>
                <Label>Your Referral Code</Label>
                <div className="flex items-center gap-2 mt-1">
                    <Input readOnly value={profile.referral_code || 'Loading...'} className="font-mono text-lg tracking-widest" />
                    <Button variant="outline" size="icon" onClick={handleCopyCode} disabled={!profile.referral_code}>
                        <Copy className="w-4 h-4" />
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Share this code with friends. When they use it, you both get 10 free credits!</p>
            </div>
            
            {!hasBeenReferred && (
                 <form onSubmit={handleApplyCode} className="space-y-2">
                    <Label htmlFor="friendCode">Used a friend's code?</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            id="friendCode"
                            placeholder="Enter friend's code"
                            value={friendCode}
                            onChange={(e) => setFriendCode(e.target.value)}
                            disabled={isLoading}
                        />
                        <Button type="submit" disabled={isLoading || !friendCode.trim()}>
                            {isLoading ? 'Applying...' : 'Apply'}
                        </Button>
                    </div>
                 </form>
            )}

            <div className={`flex items-start gap-3 text-sm p-3 rounded-md ${hasBeenReferred ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'}`}>
                <Gift className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{hasBeenReferred ? "You've successfully used a referral code and received bonus credits!" : "Apply a friend's code to get 10 bonus credits!"}</p>
            </div>
        </div>
    );
};

export default ReferralSystem;
