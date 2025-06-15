
import React, { useState, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';
import { Camera, CheckCircle2, Gift } from 'lucide-react';
import { Label } from './ui/label';

interface Profile {
    full_name: string | null;
    avatar_url: string | null;
    profile_completion_bonus_awarded: boolean;
}

interface ProfileEditorProps {
    profile: Profile;
    onUpdate: () => Promise<void>;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile, onUpdate }) => {
    const { user } = useAuth();
    const [fullName, setFullName] = useState(profile.full_name || '');
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0 || !user) {
            return;
        }

        const file = event.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}-${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        setIsUploading(true);
        try {
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);
            
            await handleProfileUpdate({ avatar_url: publicUrl }, true);
            
        } catch (error: any) {
            toast.error('Avatar Upload Failed', { description: error.message });
        } finally {
            setIsUploading(false);
        }
    };

    const handleProfileUpdate = async (updates: { full_name?: string; avatar_url?: string }, isAvatarUpdate = false) => {
        if (!user) return;
        setIsSaving(true);
        try {
            const { error } = await supabase.from('profiles').update(updates).eq('id', user.id);
            if (error) throw error;
            
            if(!isAvatarUpdate) {
                toast.success('Profile Updated!', { description: "Your name has been saved."});
            } else {
                toast.success('Avatar Updated!', { description: "Your new avatar has been saved."});
            }
            
            await onUpdate();
            // Check for bonus after update, but wait for state to propagate
            setTimeout(checkForBonus, 500);

        } catch (error: any) {
            toast.error('Update Failed', { description: error.message });
        } finally {
            setIsSaving(false);
        }
    };
    
    const checkForBonus = async () => {
        if (profile.profile_completion_bonus_awarded) return;

        const { data, error } = await supabase.rpc('award_profile_completion_bonus');
        
        if (error) {
            console.error("Error checking for bonus:", error.message);
        } else if (data.success) {
            toast.success('Bonus Credits Awarded!', { description: data.message });
            await onUpdate(); // Re-fetch profile to get updated credits & bonus status
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(fullName.trim() && fullName !== profile.full_name) {
            handleProfileUpdate({ full_name: fullName });
        }
    };

    const bonusAwarded = profile.profile_completion_bonus_awarded;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
             <div className="relative mx-auto w-32 h-32 cursor-pointer group" onClick={handleAvatarClick}>
                <Avatar className="w-full h-full text-lg">
                    <AvatarImage src={profile.avatar_url ?? undefined} alt="User Avatar" />
                    <AvatarFallback>{(fullName || '...').substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white w-8 h-8"/>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleAvatarUpload}
                    className="hidden"
                    disabled={isUploading}
                />
            </div>
            {isUploading && <p className="text-sm text-center text-muted-foreground">Uploading...</p>}

            <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    disabled={isSaving}
                />
            </div>
            
            <Button type="submit" className="w-full" disabled={isSaving || isUploading || fullName === profile.full_name || !fullName.trim()}>
                {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
            
            {bonusAwarded ? (
                <div className="flex items-center gap-2 text-sm p-3 rounded-md bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    <p>You've received 5 bonus credits for completing your profile!</p>
                </div>
            ) : (
                <div className="flex items-center gap-2 text-sm p-3 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
                    <Gift className="w-5 h-5" />
                    <p>Complete your profile (name & avatar) to earn 5 free credits.</p>
                </div>
            )}
        </form>
    );
};

export default ProfileEditor;
