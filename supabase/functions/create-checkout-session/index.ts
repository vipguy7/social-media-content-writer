
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// IMPORTANT: You must create a product and a recurring price in your Stripe dashboard.
// Once created, replace this placeholder with your actual Price ID.
// Your price should be for $10 USD per month.
const STRIPE_PRICE_ID = "price_1P..."; 

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );
    
    // Get the user from the authorization header
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user } } = await supabaseAdmin.auth.getUser(token);

    if (!user || !user.email) {
      throw new Error("User not found.");
    }

    // Retrieve or create a Stripe customer
    const { data: subscriber, error: subscriberError } = await supabaseAdmin
      .from('subscribers')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();

    if (subscriberError && subscriberError.code !== 'PGRST116') { // Ignore "no rows" error
      throw subscriberError;
    }

    let customerId = subscriber?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { user_id: user.id },
      });
      customerId = customer.id;

      await supabaseAdmin
        .from('subscribers')
        .upsert({ 
          user_id: user.id, 
          email: user.email, 
          stripe_customer_id: customerId,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/billing?subscribed=true`,
      cancel_url: `${req.headers.get("origin")}/billing`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
