// Stripe Checkout Edge Function
// Creates a checkout session for subscription upgrades

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") || "";
const FRONTEND_URL = Deno.env.get("FRONTEND_URL") || "http://localhost:3000";

const PRICE_MAP: Record<string, string> = {
  starter: Deno.env.get("STRIPE_PRICE_STARTER") || "",
  professional: Deno.env.get("STRIPE_PRICE_PROFESSIONAL") || "",
  enterprise: Deno.env.get("STRIPE_PRICE_ENTERPRISE") || "",
};

// Get CORS headers with origin validation
function getCorsHeaders(origin?: string): Record<string, string> {
  const allowedOrigins = (Deno.env.get("ALLOWED_ORIGINS") || "http://localhost:3000,http://localhost:5173").split(',').map(o => o.trim());
  const isAllowed = origin && allowedOrigins.includes(origin);

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "X-RateLimit-Remaining": "99",
    "X-RateLimit-Reset": Math.floor(Date.now() / 1000 + 3600).toString(),
  };
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    if (!corsHeaders["Access-Control-Allow-Origin"]) {
      return new Response("CORS policy violation", { status: 403 });
    }
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { plan } = await req.json();
    const priceId = PRICE_MAP[plan];

    if (!priceId) {
      return new Response(
        JSON.stringify({ error: "Invalid plan selected" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!STRIPE_SECRET_KEY) {
      return new Response(
        JSON.stringify({ error: "Payment system not configured" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get or create Stripe customer
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("stripe_customer_id, email")
      .eq("id", user.id)
      .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      const customerRes = await fetch("https://api.stripe.com/v1/customers", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: user.email || "",
          "metadata[supabase_uid]": user.id,
        }),
      });

      const customer = await customerRes.json();
      customerId = customer.id;

      await supabase
        .from("user_profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    // Create checkout session
    const checkoutRes = await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          customer: customerId!,
          "line_items[0][price]": priceId,
          "line_items[0][quantity]": "1",
          mode: "subscription",
          success_url: `${FRONTEND_URL}/admin/billing?success=true`,
          cancel_url: `${FRONTEND_URL}/admin/billing?canceled=true`,
          "metadata[supabase_uid]": user.id,
          "metadata[plan]": plan,
        }),
      }
    );

    const session = await checkoutRes.json();

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
