// Supabase Edge Function: generate-landing-page
// Ontvangt intake formulierdata, genereert een complete landingspagina config,
// en slaat deze op in de landing_pages tabel.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders, jsonResponse, generateSlug, ensureUniqueSlug, findOrCreateOrganization } from "./helpers.ts";
import { generateSections, generateTheme, generateFormFields } from "./generators.ts";

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
    const required = ["company_name", "job_title", "job_location", "contact_name", "contact_email"];
    for (const field of required) {
      if (!body[field]) {
        return jsonResponse(400, {
          success: false,
          error: `Veld '${field}' is vereist`,
        });
      }
    }

    // 1. Sla intake submission op
    const { data: intake, error: intakeError } = await supabase
      .from("intake_submissions")
      .insert({
        created_by: body.created_by || body.contact_email,
        company_name: body.company_name,
        company_website: body.company_website,
        company_logo_url: body.company_logo_url,
        company_sector: body.company_sector,
        primary_color: body.primary_color,
        job_title: body.job_title,
        job_location: body.job_location,
        salary_min: body.salary_min,
        salary_max: body.salary_max,
        employment_type: body.employment_type || "fulltime",
        job_description: body.job_description,
        responsibilities: body.responsibilities || [],
        requirements_must: body.requirements_must || [],
        requirements_nice: body.requirements_nice || [],
        benefits: body.benefits || [],
        contact_name: body.contact_name,
        contact_role: body.contact_role,
        contact_email: body.contact_email,
        contact_phone: body.contact_phone,
        contact_whatsapp: body.contact_whatsapp,
        status: "processing",
      })
      .select("id")
      .single();

    if (intakeError) {
      return jsonResponse(500, { success: false, error: intakeError.message });
    }

    // 2-4. Slug, uniek slug, organisatie
    const slug = generateSlug(body.company_name, body.job_title);
    const uniqueSlug = await ensureUniqueSlug(supabase, slug);
    const orgId = await findOrCreateOrganization(supabase, body);

    // 5-7. Genereer config onderdelen
    const sections = generateSections(body);
    const theme = generateTheme(body);
    const formFields = generateFormFields();

    // 8. Salaris tekst voor meta description
    const salaryText = body.salary_min && body.salary_max
      ? `\u20AC${body.salary_min} - \u20AC${body.salary_max}`
      : body.salary_min
        ? `Vanaf \u20AC${body.salary_min}`
        : "Marktconform";

    // 9. Insert landing page
    const { data: landingPage, error: lpError } = await supabase
      .from("landing_pages")
      .insert({
        organization_id: orgId,
        slug: uniqueSlug,
        status: "draft",
        page_title: `${body.job_title} | ${body.company_name} | ${body.job_location}`,
        meta_description: `Word ${body.job_title} bij ${body.company_name} in ${body.job_location}. ${salaryText} bruto per maand. Solliciteer direct!`,
        sections,
        theme,
        cookie_consent: {
          enabled: true,
          privacyPolicyUrl: body.company_website
            ? `${body.company_website.replace(/\/$/, "")}/privacy`
            : "#",
          categories: { necessary: true, analytics: true, marketing: true },
        },
        ga4_measurement_id: body.ga4_measurement_id || null,
        form_fields: formFields,
        form_success_message:
          "Bedankt voor je sollicitatie! We nemen binnen enkele werkdagen contact met je op.",
        contact_person_name: body.contact_name,
        contact_person_role: body.contact_role || "Recruiter",
        contact_person_email: body.contact_email,
        contact_person_phone: body.contact_phone,
        contact_whatsapp_url: body.contact_whatsapp
          ? `https://wa.me/${body.contact_whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hoi, ik heb interesse in de ${body.job_title} vacature bij ${body.company_name}!`)}`
          : null,
      })
      .select("id")
      .single();

    if (lpError) {
      await supabase
        .from("intake_submissions")
        .update({ status: "failed", error_message: lpError.message })
        .eq("id", intake.id);

      return jsonResponse(500, { success: false, error: lpError.message });
    }

    // 10. Update intake submission
    await supabase
      .from("intake_submissions")
      .update({
        status: "completed",
        landing_page_id: landingPage.id,
        processed_at: new Date().toISOString(),
      })
      .eq("id", intake.id);

    return jsonResponse(200, {
      success: true,
      landing_page_id: landingPage.id,
      slug: uniqueSlug,
      url: `/v/${uniqueSlug}`,
      status: "draft",
      message: "Landingspagina is aangemaakt als concept. Publiceer via het dashboard.",
    });
  } catch (error) {
    return jsonResponse(500, {
      success: false,
      error: "Er ging iets mis bij het genereren van de pagina",
    });
  }
});
