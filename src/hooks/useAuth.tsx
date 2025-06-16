
import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  credits: number;
  full_name: string | null;
  avatar_url: string | null;
  referral_code: string | null;
  referred_by_user_id: string | null;
  profile_completion_bonus_awarded: boolean;
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
    if (!session?.user?.id) return;
    
    try {
      let { data, error } = await supabase
        .from('profiles')
        .select('credits, full_name, avatar_url, referral_code, referred_by_user_id, profile_completion_bonus_awarded')
        .eq('id', session.user.id)
        .maybeSingle();
      
      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching profile:", error);
        return;
      }

      if (!data) {
        console.log("No profile found for user, creating one.");
        const { data: newData, error: insertError } = await supabase
            .from('profiles')
            .insert({ id: session.user.id })
            .select('credits, full_name, avatar_url, referral_code, referred_by_user_id, profile_completion_bonus_awarded')
            .single();

        if (insertError) {
            console.error("Error creating profile:", insertError);
            return;
        }
        data = newData;
      }

      setProfile(data as Profile);
    } catch (error) {
      console.error("Error in fetchProfile:", error);
    }
  }, [session?.user?.id]);

  const checkSubscription = useCallback(async () => {
    if (!session?.user?.id) {
      setSubscription({ isSubscribed: false, tier: null, endDate: null });
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('subscribed, subscription_tier, subscription_end')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching subscription:", error);
        setSubscription({ isSubscribed: false, tier: null, endDate: null });
        return;
      }

      if (data) {
          if (data.subscribed && data.subscription_tier === 'trial' && data.subscription_end && new Date(data.subscription_end) < new Date()) {
              await supabase.from('subscribers').update({ subscribed: false, subscription_tier: null, subscription_end: null }).eq('user_id', session.user.id);
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
    } catch (error) {
      console.error("Error in checkSubscription:", error);
      setSubscription({ isSubscribed: false, tier: null, endDate: null });
    }
  }, [session?.user?.id]);

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener first
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          // Only set loading to false after we've processed the initial session
          if (event === 'INITIAL_SESSION') {
            setLoading(false);
          }
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
      }
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      authSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session?.user && !loading) {
      // Use setTimeout to avoid potential deadlocks
      const timeoutId = setTimeout(() => {
        fetchProfile().catch(error => {
          console.error("Error loading profile:", error);
        });
        checkSubscription().catch(error => {
          console.error("Error loading subscription:", error);
        });
      }, 100);

      return () => clearTimeout(timeoutId);
    } else if (!session?.user) {
      setProfile(null);
      setSubscription(null);
    }
  }, [session?.user, loading, fetchProfile, checkSubscription]);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }
      
      // Clear local state
      setProfile(null);
      setSubscription(null);
    } catch (error) {
      console.error('Error in signOut:', error);
      throw error;
    }
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
