
-- Add a 'credits' column to the profiles table to track user generation credits.
-- New users will start with 5 free credits.
ALTER TABLE public.profiles
ADD COLUMN credits INTEGER NOT NULL DEFAULT 5;

-- Create a function to atomically decrement credits and check if the user has enough.
-- This prevents race conditions and ensures a user can't generate content with 0 credits.
CREATE OR REPLACE FUNCTION public.decrement_user_credits(p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_credits INT;
  success BOOLEAN;
BEGIN
  -- Lock the user's profile row to prevent concurrent updates
  -- This is a critical step for transactional integrity
  SELECT credits INTO current_credits FROM public.profiles WHERE id = p_user_id FOR UPDATE;

  IF current_credits > 0 THEN
    -- If credits are available, decrement them
    UPDATE public.profiles
    SET credits = credits - 1
    WHERE id = p_user_id;
    success := TRUE;
  ELSE
    -- If no credits, do not proceed
    success := FALSE;
  END IF;

  RETURN success;
END;
$$;
