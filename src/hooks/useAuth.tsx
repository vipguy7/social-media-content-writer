import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  credits: number;
  full_name: string | null;
  avatar_url: string | null;
}

interface Subscription {
  isSubscribed: boolean;
  tier: string | null;
  endDate: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  profile: Profile | null;
  fetchProfile: () => Promise<void>;
  subscription: Subscription | null;
  checkSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const fetchProfile = useCallback(async () => {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (currentUser) {
      const { data, error } = await supabase
        .from('profiles')
        .select('credits, full_name, avatar_url')
        .eq('id', currentUser.id)
        .single();
      
      if (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      } else if (data) {
        setProfile(data as Profile);
      }
    }
  }, []);

  const checkSubscription = useCallback(async () => {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) {
      setSubscription({ isSubscribed: false, tier: null, endDate: null });
      return;
    }
    
    const { data, error } = await supabase
      .from('subscribers')
      .select('subscribed, subscription_tier, subscription_end')
      .eq('user_id', currentUser.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116: no rows returned
      console.error("Error fetching subscription:", error);
      setSubscription({ isSubscribed: false, tier: null, endDate: null });
      return;
    }

    if (data) {
        if (data.subscribed && data.subscription_tier === 'trial' && data.subscription_end && new Date(data.subscription_end) < new Date()) {
            await supabase.from('subscribers').update({ subscribed: false, subscription_tier: null, subscription_end: null }).eq('user_id', currentUser.id);
            setSubscription({ isSubscribed: false, tier: null, endDate: null });
        } else {
            setSubscription({
                isSubscribed: data.subscribed ?? false,
                tier: data.subscription_tier,
                endDate: data.subscription_end,
            });
        }
    } else {
        setSubscription({ isSubscribed: false, tier: null, endDate: null });
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const checkUser = async () => {
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      if (initialSession?.user) {
        await Promise.all([fetchProfile(), checkSubscription()]);
      }
      setLoading(false);
    };
    checkUser();

    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        if (newSession?.user) {
          await Promise.all([fetchProfile(), checkSubscription()]);
        } else {
          setProfile(null);
          setSubscription(null);
        }
        setLoading(false);
      }
    );

    return () => authSubscription.unsubscribe();
  }, [fetchProfile, checkSubscription]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setSubscription(null);
  };

  const value = useMemo(() => ({
    user,
    session,
    loading,
    signOut,
    profile,
    fetchProfile,
    subscription,
    checkSubscription,
  }), [user, session, loading, profile, fetchProfile, subscription, checkSubscription]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
