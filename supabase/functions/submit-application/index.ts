// Supabase Edge Function: submit-application
// Ontvangt sollicitatie form data, slaat op in DB, triggert ATS sync

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

    const body = await req.json();

    // Validatie
    if (!body.full_name || !body.email || !body.landing_page_id) {
      return new Response(
        JSON.stringify({ success: false, error: "Naam, email en landing_page_id zijn vereist" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Privacy consent is verplicht - zonder akkoord geen verwerking
    if (!body.privacy_consent) {
      return new Response(
        JSON.stringify({ success: false, error: "Akkoord met privacyverklaring is vereist om te solliciteren" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert application
    const { data: application, error: insertError } = await supabase
      .from("applications")
      .insert({
        landing_page_id: body.landing_page_id,
        variant_id: body.variant_id || null,
        session_id: body.session_id || null,
        full_name: body.full_name,
        email: body.email,
        phone: body.phone || null,
        city: body.city || null,
        motivation: body.motivation || null,
        cv_storage_path: body.cv_storage_path || null,
        extra_fields: body.extra_fields || {},
        privacy_consent: body.privacy_consent || false,
        newsletter_consent: body.newsletter_consent || false,
        utm_source: body.utm_source,
        utm_medium: body.utm_medium,
        utm_campaign: body.utm_campaign,
        utm_term: body.utm_term,
        utm_content: body.utm_content,
        referrer: body.referrer,
        landing_url: body.landing_url,
        device_type: body.device_type,
        browser: body.browser,
      })
      .select("id")
      .single();

    if (insertError) {
      return new Response(
        JSON.stringify({ success: false, error: insertError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update visitor session
    if (body.session_id) {
      await supabase
        .from("visitor_sessions")
        .update({ did_submit_form: true })
        .eq("id", body.session_id);
    }

    // Track analytics event
    if (body.session_id) {
      await supabase.from("analytics_events").insert({
        session_id: body.session_id,
        landing_page_id: body.landing_page_id,
        variant_id: body.variant_id,
        event_name: "form_submit",
        event_category: "conversion",
        event_data: { application_id: application.id },
      });
    }

    // Trigger ATS sync (async, niet blokkeren)
    try {
      const { data: landingPage } = await supabase
        .from("landing_pages")
        .select("ats_provider, ats_webhook_url, ats_config, ats_api_key")
        .eq("id", body.landing_page_id)
        .single();

      if (landingPage?.ats_webhook_url) {
        // Fire-and-forget ATS webhook
        fetch(landingPage.ats_webhook_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(landingPage.ats_config?.custom_headers || {}),
          },
          body: JSON.stringify({
            application_id: application.id,
            ...body,
          }),
        }).catch(() => {
          // Log failure silently
          supabase.from("ats_sync_log").insert({
            application_id: application.id,
            provider: landingPage.ats_provider || "custom",
            request_url: landingPage.ats_webhook_url,
            status: "error",
            error_message: "Webhook request failed",
          });
        });
      }
    } catch {
      // ATS sync is non-blocking
    }

    return new Response(
      JSON.stringify({ success: true, application_id: application.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
