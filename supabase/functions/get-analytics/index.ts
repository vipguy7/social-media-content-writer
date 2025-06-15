
import { serve } from "std/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const client = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  const { user_id } = await req.json();

  // Audience Behavior
  const { data: audience_behavior } = await client
    .from("audience_behavior")
    .select("*")
    .eq("user_id", user_id);

  // Content Analytics
  const { data: content_analytics } = await client
    .from("content_analytics")
    .select("*")
    .eq("user_id", user_id);

  // Engagement Predictions
  const { data: engagement_predictions } = await client
    .from("engagement_predictions")
    .select("*")
    .eq("user_id", user_id);

  // Best Posting Times
  const { data: posting_time } = await client
    .from("posting_time_optimization")
    .select("*")
    .eq("user_id", user_id);

  // Hashtag Performance (public/global)
  const { data: hashtag_performance } = await client
    .from("hashtag_performance")
    .select("*");

  return new Response(
    JSON.stringify({
      audience_behavior: audience_behavior ?? [],
      content_analytics: content_analytics ?? [],
      engagement_predictions: engagement_predictions ?? [],
      posting_time: posting_time ?? [],
      hashtag_performance: hashtag_performance ?? [],
    }),
    {
      headers: { "Content-Type": "application/json" },
      status: 200,
    }
  );
});
