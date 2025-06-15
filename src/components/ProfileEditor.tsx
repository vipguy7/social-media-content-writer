import React, { useState, useEffect } from 'react';
import { useToast } from './ui/use-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Award, Upload } from 'lucide-react';

interface ProfileEditorProps {
    profile: {
        full_name: string | null;
        avatar_url: string | null;
        profile_completion_bonus_awarded: boolean;
    };
    onUpdate: () => Promise<void>;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile, onUpdate }) => {
    const [fullName, setFullName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const { toast: shadcnToast } = useToast();

    useEffect(() => {
        if (profile.full_name) setFullName(profile.full_name);
        if (profile.avatar_url) setAvatarUrl(profile.avatar_url);
    }, [profile]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("You must be logged in to update your profile.");

            const updates = {
                id: user.id,
                full_name: fullName,
                avatar_url: avatarUrl,
                updated_at: new Date().toISOString(),
            };

            const { error } = await supabase.from('profiles').upsert(updates);
            if (error) throw error;
            
            // Check for bonus AFTER successful profile update
            if (updates.full_name && updates.avatar_url && !profile.profile_completion_bonus_awarded) {
                const { data: bonusResult, error: bonusError } = await supabase.functions.invoke('award_profile_completion_bonus');
                
                if (bonusError) {
                    // Fail silently, main profile update still worked
                    console.error('Error awarding bonus:', bonusError);
                }
                
                if (bonusResult) {
                    // The function returns JSON, we need to cast it to access its properties.
                    const resultData = bonusResult as { success: boolean; message: string };
                    if (resultData.success) {
                        toast.success('Bonus Awarded!', { description: resultData.message });
                    }
                }
            }
            
            await onUpdate();
            shadcnToast({
                title: 'Profile Updated',
                description: 'Your profile has been successfully updated.',
            });
        } catch (error: any) {
            toast.error('Update Failed', { description: error.message });
        } finally {
            setLoading(false);
        }
    };

    const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("You must be logged in to upload an avatar.");

            const fileExt = file.name.split('.').pop();
            const filePath = `${user.id}/${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${filePath}`;
            setAvatarUrl(publicUrl);
            toast.success('Avatar Uploaded', { description: 'Your avatar has been successfully uploaded.' });
        } catch (error: any) {
            toast.error('Upload Failed', { description: error.message });
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
            </div>
            <div>
                <Label>Avatar</Label>
                <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                        {avatarUrl ? (
                            <AvatarImage src={avatarUrl} alt="Avatar" />
                        ) : (
                            <AvatarFallback>{profile.full_name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                        )}
                    </Avatar>
                    <Input
                        type="file"
                        id="avatar"
                        accept="image/*"
                        className="hidden"
                        onChange={uploadAvatar}
                    />
                    <Button variant="outline" asChild disabled={uploading}>
                        <label htmlFor="avatar" className="cursor-pointer">
                            {uploading ? (
                                <>
                                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload
                                </>
                            )}
                        </label>
                    </Button>
                </div>
            </div>
            {!profile.profile_completion_bonus_awarded && fullName && avatarUrl && (
                <div className="rounded-md bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-3 flex items-center gap-3">
                    <Award className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm">Complete your profile to receive a bonus of 10 free credits!</p>
                </div>
            )}
            <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Profile'}
            </Button>
        </form>
    );
};

export default ProfileEditor;
