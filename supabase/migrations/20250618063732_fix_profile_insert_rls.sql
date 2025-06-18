-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;

-- Create a new INSERT policy that allows inserts by the user themselves OR by the postgres role (for SECURITY DEFINER triggers)
CREATE POLICY "Users can insert their own profile or system can insert via trigger." ON public.profiles
  FOR INSERT
  WITH CHECK ((auth.uid() = id) OR (session_user = 'postgres'));
