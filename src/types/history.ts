export interface ContentHistoryItem {
  id: string; // UUID
  user_id: string; // UUID from auth.users
  generated_content: string;
  created_at: string; // ISO timestamp string
  inputs?: Record<string, any>; // To store generation parameters
  title?: string;
}

export interface ContentHistoryItemInsert {
  user_id: string;
  generated_content: string;
  inputs?: Record<string, any>;
  title?: string;
}

// RLS Policies Reminder:
// Ensure Row Level Security (RLS) is enabled on the `content_history` table in Supabase.
//
// Example Policies:
//
// -- Enable RLS
// ALTER TABLE content_history ENABLE ROW LEVEL SECURITY;
//
// -- Policy for users to insert their own content
// CREATE POLICY "Users can insert their own content history"
// ON content_history FOR INSERT
// TO authenticated
// WITH CHECK (auth.uid() = user_id);
//
// -- Policy for users to select their own content history
// CREATE POLICY "Users can view their own content history"
// ON content_history FOR SELECT
// TO authenticated
// USING (auth.uid() = user_id);
//
// -- Policy for users to update their own content history
// CREATE POLICY "Users can update their own content history"
// ON content_history FOR UPDATE
// TO authenticated
// USING (auth.uid() = user_id)
// WITH CHECK (auth.uid() = user_id);
//
// -- Policy for users to delete their own content history
// CREATE POLICY "Users can delete their own content history"
// ON content_history FOR DELETE
// TO authenticated
// USING (auth.uid() = user_id);
