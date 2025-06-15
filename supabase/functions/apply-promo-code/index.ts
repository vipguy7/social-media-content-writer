
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );
    
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user } } = await supabaseAdmin.auth.getUser(token);

    if (!user || !user.email) {
      throw new Error("User not found.");
    }
    
    const { code } = await req.json();
    if (!code) {
      throw new Error("Promo code is required.");
    }

    const { data: usedCode } = await supabaseAdmin
        .from('used_promo_codes')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

    if (usedCode) {
        return new Response(JSON.stringify({ success: false, message: "You have already used a promo code." }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400
        });
    }

    const { data: promoCodeData, error: promoCodeError } = await supabaseAdmin
        .from('promo_codes')
        .select('*')
        .eq('code', code.trim().toUpperCase())
        .eq('is_active', true)
        .single();
    
    if (promoCodeError || !promoCodeData) {
        return new Response(JSON.stringify({ success: false, message: "This promo code is not valid." }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404
        });
    }

    if (promoCodeData.expires_at && new Date(promoCodeData.expires_at) < new Date()) {
        return new Response(JSON.stringify({ success: false, message: "This promo code has expired." }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400
        });
    }

    if (promoCodeData.max_uses != null && promoCodeData.times_used >= promoCodeData.max_uses) {
        return new Response(JSON.stringify({ success: false, message: "This promo code has reached its usage limit." }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400
        });
    }

    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + promoCodeData.trial_days);

    await supabaseAdmin
        .from('subscribers')
        .upsert({
            user_id: user.id,
            email: user.email,
            subscribed: true,
            subscription_tier: 'trial',
            subscription_end: trialEndDate.toISOString(),
            updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
    
    await supabaseAdmin
        .from('promo_codes')
        .update({ times_used: promoCodeData.times_used + 1 })
        .eq('id', promoCodeData.id);

    await supabaseAdmin
        .from('used_promo_codes')
        .insert({ user_id: user.id, promo_code_id: promoCodeData.id });

    return new Response(JSON.stringify({ success: true, message: `Your ${promoCodeData.trial_days}-day trial has started!` }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
