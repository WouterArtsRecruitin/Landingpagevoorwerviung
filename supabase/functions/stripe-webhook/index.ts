// Stripe Webhook Handler
// Processes subscription events from Stripe

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { hmac } from "https://deno.land/x/hmac@v2.0.1/mod.ts";

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") || "";
const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";

const PLAN_LIMITS: Record<string, number> = {
  free: 3,
  starter: 15,
  professional: -1,
  enterprise: -1,
};

function verifyStripeSignature(
  body: string,
  signatureHeader: string,
  secret: string,
  toleranceSeconds = 300
): boolean {
  const elements = signatureHeader.split(",");
  const params: Record<string, string> = {};
  for (const element of elements) {
    const [key, value] = element.split("=");
    params[key.trim()] = value;
  }

  const timestamp = params["t"];
  const signature = params["v1"];

  if (!timestamp || !signature) return false;

  // Check timestamp tolerance (prevent replay attacks)
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp)) > toleranceSeconds) return false;

  // Compute expected signature
  const signedPayload = `${timestamp}.${body}`;
  const expectedSignature = hmac("sha256", secret, signedPayload, "utf8", "hex");

  // Constant-time comparison
  if (signature.length !== expectedSignature.length) return false;
  let mismatch = 0;
  for (let i = 0; i < signature.length; i++) {
    mismatch |= signature.charCodeAt(i) ^ expectedSignature.charCodeAt(i);
  }
  return mismatch === 0;
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.text();

    // Verify Stripe webhook signature
    const signatureHeader = req.headers.get("stripe-signature");
    if (!signatureHeader || !STRIPE_WEBHOOK_SECRET) {
      return new Response(JSON.stringify({ error: "Missing signature or webhook secret" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!verifyStripeSignature(body, signatureHeader, STRIPE_WEBHOOK_SECRET)) {
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const event = JSON.parse(body);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.supabase_uid;
        const plan = session.metadata?.plan;

        if (userId && plan) {
          await supabase
            .from("user_profiles")
            .update({
              subscription_plan: plan,
              stripe_subscription_id: session.subscription,
              subscription_status: "active",
              page_limit: PLAN_LIMITS[plan] ?? 3,
              updated_at: new Date().toISOString(),
            })
            .eq("id", userId);
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        const { data: profile } = await supabase
          .from("user_profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          await supabase
            .from("user_profiles")
            .update({
              subscription_status: subscription.status,
              updated_at: new Date().toISOString(),
            })
            .eq("id", profile.id);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        const { data: profile } = await supabase
          .from("user_profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          await supabase
            .from("user_profiles")
            .update({
              subscription_plan: "free",
              subscription_status: "canceled",
              page_limit: PLAN_LIMITS.free,
              stripe_subscription_id: null,
              updated_at: new Date().toISOString(),
            })
            .eq("id", profile.id);
        }
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
});
