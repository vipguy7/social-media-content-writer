// supabase/functions/delete-old-history/index.ts
import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'; // Ensure using a recent std version

console.log('Delete Old History function initializing.');

// These environment variables must be set in your Supabase project's function settings
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!SUPABASE_URL) {
  console.error('SUPABASE_URL environment variable is not set.');
}
if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('SUPABASE_SERVICE_ROLE_KEY environment variable is not set.');
}

// It's good practice to create the client outside the handler if it doesn't need to change per request
// For a scheduled function, this is fine.
const supabaseAdmin: SupabaseClient | null = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY ?
  createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) : null;

serve(async (req) => {
  console.log('Delete Old History function invoked.');

  if (!supabaseAdmin) {
    const errorMessage = 'Supabase client is not initialized. Check environment variables.';
    console.error(errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    console.log(`Attempting to delete records older than: ${sevenDaysAgo}`);

    const { data, error } = await supabaseAdmin
      .from('content_history')
      .delete()
      .lt('created_at', sevenDaysAgo);

    if (error) {
      console.error('Error deleting old content history:', error);
      return new Response(JSON.stringify({ success: false, error: error.message, details: error.details }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // `data` for delete operations is usually null or an empty array, count is more useful if available
    // For Supabase v2, delete() doesn't directly return the count of deleted rows in `data`.
    // We can infer success if no error was thrown.
    // Supabase typically returns an object with `data` (often null for deletes or the items deleted) and `count` (if requested and supported)
    // Let's assume `error` being null means success. The actual number of deleted rows isn't directly available without a select or if the API changes.
    const count = (data as any)?.length; // This might not be accurate for delete operations.
                                          // Supabase documentation should be checked for how to get deleted row count if needed.
                                          // For now, success is implied by no error.

    const message = `Successfully processed deletion for records older than ${sevenDaysAgo}. ${(typeof count === 'number') ? count + ' records were targeted (Note: count may not be exact for delete operations without select).' : ''}`;
    console.log(message);

    return new Response(JSON.stringify({ success: true, message: message.trim() }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (e) {
    console.error('Unexpected error in Delete Old History function:', e);
    return new Response(JSON.stringify({ success: false, error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
