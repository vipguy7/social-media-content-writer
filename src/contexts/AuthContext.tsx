import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  login: (email_param: string, password_param: string) => Promise<void>;
  signup: (email_param: string, password_param: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error);
        setLoading(false);
        return;
      }
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    setData();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (_event === 'SIGNED_IN') {
        // Can navigate here or handle in components
      } else if (_event === 'SIGNED_OUT') {
        navigate('/'); // Or to a login page
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [navigate]);

  const login = async (email_param: string, password_param: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email_param, password: password_param });
    if (error) {
      setLoading(false);
      throw error;
    }
    // Session update will be handled by onAuthStateChange
    setLoading(false);
  };

  const signup = async (email_param: string, password_param: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email_param,
      password: password_param
    });
    if (error) {
      setLoading(false);
      throw error;
    }
    // User might need to confirm email. Session update by onAuthStateChange if auto-confirm or after confirm.
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setLoading(false);
      throw error;
    }
    // State update will be handled by onAuthStateChange
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, login, signup, logout }}>
      {!loading && children}
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
