
-- Create a table to store generated content locally
CREATE TABLE public.generated_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  platform TEXT,
  content_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.generated_content ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to view their own content
CREATE POLICY "Users can view their own generated content" 
  ON public.generated_content 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to insert their own content
CREATE POLICY "Users can create their own generated content" 
  ON public.generated_content 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to delete their own content
CREATE POLICY "Users can delete their own generated content" 
  ON public.generated_content 
  FOR DELETE 
  USING (auth.uid() = user_id);
