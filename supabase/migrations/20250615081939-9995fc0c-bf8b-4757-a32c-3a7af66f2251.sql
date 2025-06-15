
-- Create a table to store user subscription data
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL, -- This will store the user's ID from auth.users
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT,
  subscription_end TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row-Level Security for the subscribers table
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own subscription details
CREATE POLICY "select_own_subscription" ON public.subscribers
FOR SELECT
USING (auth.uid() = user_id);

-- Allow server-side operations (like from Edge Functions) to insert data
CREATE POLICY "allow_service_role_insert_subscription" ON public.subscribers
FOR INSERT
WITH CHECK (true);

-- Allow server-side operations to update data
CREATE POLICY "allow_service_role_update_subscription" ON public.subscribers
FOR UPDATE
USING (true);


-- Create a table for promo codes
CREATE TABLE public.promo_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    trial_days INTEGER NOT NULL DEFAULT 7,
    expires_at TIMESTAMPTZ,
    max_uses INTEGER,
    times_used INTEGER DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row-Level Security for the promo_codes table
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view active promo codes
CREATE POLICY "allow_read_active_promo_codes" ON public.promo_codes 
FOR SELECT TO authenticated 
USING (is_active = true AND (expires_at IS NULL OR expires_at > now()) AND (max_uses IS NULL OR times_used < max_uses));


-- Create a table to track which user has used which promo code
CREATE TABLE public.used_promo_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE, -- A user can only use one promo code
    promo_code_id UUID NOT NULL REFERENCES public.promo_codes(id),
    used_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row-Level Security for the used_promo_codes table
ALTER TABLE public.used_promo_codes ENABLE ROW LEVEL SECURITY;

-- Allow users to see their own used promo codes
CREATE POLICY "allow_user_read_own_used_codes" ON public.used_promo_codes 
FOR SELECT 
USING (auth.uid() = user_id);

-- Allow server-side operations to record a used promo code
CREATE POLICY "allow_service_to_insert_used_codes" ON public.used_promo_codes 
FOR INSERT 
WITH CHECK (true);

