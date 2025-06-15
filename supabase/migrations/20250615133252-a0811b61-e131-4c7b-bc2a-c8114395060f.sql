
-- Part 1: "Complete Your Profile" Feature

-- Add a column to track if the profile completion bonus has been awarded.
ALTER TABLE public.profiles
ADD COLUMN profile_completion_bonus_awarded BOOLEAN NOT NULL DEFAULT FALSE;

-- Add a column to store the user's unique referral code.
ALTER TABLE public.profiles
ADD COLUMN referral_code TEXT UNIQUE;

-- Add a column to track who referred the current user.
ALTER TABLE public.profiles
ADD COLUMN referred_by_user_id UUID REFERENCES public.profiles(id);

-- Create a storage bucket for user avatars.
-- Avatars are public so they can be displayed in the app.
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for the avatars bucket to allow users to manage their own avatar.
DROP POLICY IF EXISTS "Avatar images are publicly accessible." ON storage.objects;
CREATE POLICY "Avatar images are publicly accessible."
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'avatars' );

DROP POLICY IF EXISTS "Anyone can upload an avatar." ON storage.objects;
CREATE POLICY "Anyone can upload an avatar."
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'avatars' );

DROP POLICY IF EXISTS "Users can update their own avatar." ON storage.objects;
CREATE POLICY "Users can update their own avatar."
  ON storage.objects FOR UPDATE
  USING ( auth.uid() = owner )
  WITH CHECK ( bucket_id = 'avatars' );

DROP POLICY IF EXISTS "Users can delete their own avatar." ON storage.objects;
CREATE POLICY "Users can delete their own avatar."
  ON storage.objects FOR DELETE
  USING ( auth.uid() = owner );

-- DB function to atomically award profile completion bonus.
CREATE OR REPLACE FUNCTION public.award_profile_completion_bonus()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  profile_record RECORD;
  current_user_id uuid := auth.uid();
BEGIN
  -- Lock the row to prevent race conditions
  SELECT * INTO profile_record FROM public.profiles WHERE id = current_user_id FOR UPDATE;

  IF profile_record.profile_completion_bonus_awarded THEN
    RETURN json_build_object('success', false, 'message', 'Bonus already awarded for profile completion.');
  END IF;

  IF profile_record.full_name IS NOT NULL AND profile_record.avatar_url IS NOT NULL THEN
    UPDATE public.profiles
    SET 
      credits = profile_record.credits + 5,
      profile_completion_bonus_awarded = TRUE
    WHERE id = current_user_id;

    RETURN json_build_object('success', true, 'message', '5 bonus credits awarded for completing your profile!');
  ELSE
    RETURN json_build_object('success', false, 'message', 'Profile is not yet complete. Please provide a full name and avatar.');
  END IF;
END;
$$;


-- Part 2: "Refer a Friend" Feature

-- Function to generate a unique 6-character alphanumeric referral code.
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  is_unique BOOLEAN := false;
BEGIN
  WHILE NOT is_unique LOOP
    code := (
        SELECT string_agg(c, '')
        FROM (
            SELECT unnest(string_to_array('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', NULL))
            ORDER BY random()
            LIMIT 6
        ) AS dt(c)
    );
    PERFORM 1 FROM public.profiles WHERE referral_code = code;
    IF NOT FOUND THEN
      is_unique := true;
    END IF;
  END LOOP;
  RETURN code;
END;
$$ LANGUAGE plpgsql VOLATILE;

-- This function is triggered when a new user signs up.
-- It creates a profile with a unique referral code.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, referral_code)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    generate_referral_code()
  );
  RETURN NEW;
END;
$$;

-- Trigger to execute the function when a new user is added.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- DB function to apply a referral code.
CREATE OR REPLACE FUNCTION public.apply_referral_code(p_referral_code text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  referrer_profile RECORD;
  referred_user_profile RECORD;
  current_user_id uuid := auth.uid();
BEGIN
  SELECT * INTO referrer_profile FROM public.profiles WHERE referral_code = p_referral_code;
  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'message', 'Invalid referral code.');
  END IF;
  
  IF referrer_profile.id = current_user_id THEN
      RETURN json_build_object('success', false, 'message', 'You cannot refer yourself.');
  END IF;

  -- Lock rows to prevent race conditions
  SELECT * INTO referred_user_profile FROM public.profiles WHERE id = current_user_id FOR UPDATE;
  PERFORM * FROM public.profiles WHERE id = referrer_profile.id FOR UPDATE;

  IF referred_user_profile.referred_by_user_id IS NOT NULL THEN
    RETURN json_build_object('success', false, 'message', 'This account has already used a referral code.');
  END IF;

  UPDATE public.profiles SET credits = credits + 10 WHERE id = referrer_profile.id;
  UPDATE public.profiles SET credits = credits + 10, referred_by_user_id = referrer_profile.id WHERE id = current_user_id;

  RETURN json_build_object('success', true, 'message', 'Success! You and your friend have both received 10 bonus credits.');
END;
$$;
