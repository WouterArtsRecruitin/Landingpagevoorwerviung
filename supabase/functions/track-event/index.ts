// Supabase Edge Function: track-event
// Lightweight endpoint voor batch analytics event ingestion

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { events } = await req.json();

    if (!Array.isArray(events) || events.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Events array is vereist" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Allowed event names and categories for validation
    const VALID_EVENT_NAMES = new Set([
      "page_view", "scroll_depth", "cta_click", "form_submit", "form_error",
      "form_open", "whatsapp_click", "phone_click", "email_click",
      "calendly_click", "section_view", "time_milestone", "video_play",
      "chatbot_open", "page_exit", "cookie_consent",
    ]);
    const VALID_CATEGORIES = new Set([
      "navigation", "engagement", "conversion",
    ]);

    // Batch insert (max 100 per request) with validation
    const batch = events.slice(0, 100)
      .filter((event: any) =>
        event.session_id &&
        event.landing_page_id &&
        event.event_name &&
        VALID_EVENT_NAMES.has(event.event_name)
      )
      .map((event: any) => ({
        session_id: event.session_id,
        landing_page_id: event.landing_page_id,
        variant_id: event.variant_id || null,
        event_name: event.event_name,
        event_category: VALID_CATEGORIES.has(event.event_category) ? event.event_category : "engagement",
        event_data: typeof event.event_data === 'object' ? event.event_data : {},
      }));

    if (batch.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "No valid events in batch" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { error } = await supabase.from("analytics_events").insert(batch);

    if (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, count: batch.length }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
