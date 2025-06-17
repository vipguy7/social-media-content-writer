CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  is_unique BOOLEAN := false;
  max_attempts INTEGER := 10; -- Set a limit for attempts
  attempts INTEGER := 0;
BEGIN
  WHILE NOT is_unique AND attempts < max_attempts LOOP
    code := (
        SELECT string_agg(c, '')
        FROM (
            SELECT unnest(string_to_array('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', NULL))
            ORDER BY random()
            LIMIT 6
        ) AS dt(c)
    );
    -- Check if the code already exists
    PERFORM 1 FROM public.profiles WHERE referral_code = code;
    IF NOT FOUND THEN
      is_unique := true;
    END IF;
    attempts := attempts + 1;
  END LOOP;

  IF NOT is_unique THEN
    RAISE EXCEPTION 'Could not generate a unique referral code after % attempts. This may indicate high table contention or an issue with the generation logic.', max_attempts;
  END IF;

  RETURN code;
END;
$$ LANGUAGE plpgsql VOLATILE;
