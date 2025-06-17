DROP POLICY IF EXISTS "Anyone can upload an avatar." ON storage.objects;
CREATE POLICY "Authenticated users can upload to avatars bucket." ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'avatars');
