// Supabase Edge Function: generate-landing-page
// Ontvangt intake formulierdata, genereert een complete landingspagina config,
// en slaat deze op in de landing_pages tabel.
//
// Input: intake form data (bedrijf, vacature, eisen, contact)
// Output: { success, slug, url, landing_page_id }

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
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

    // 2. Genereer slug
    const slug = generateSlug(body.company_name, body.job_title);

    // 3. Check of slug al bestaat, maak uniek
    const uniqueSlug = await ensureUniqueSlug(supabase, slug);

    // 4. Zoek of maak organisatie
    const orgId = await findOrCreateOrganization(supabase, body);

    // 5. Genereer sectie configuraties
    const sections = generateSections(body);

    // 6. Genereer theme
    const theme = generateTheme(body);

    // 7. Genereer form fields
    const formFields = generateFormFields();

    // 8. Salarisbeschrijving
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
      // Update intake status naar failed
      await supabase
        .from("intake_submissions")
        .update({ status: "failed", error_message: lpError.message })
        .eq("id", intake.id);

      return jsonResponse(500, { success: false, error: lpError.message });
    }

    // 10. Update intake submission met landing page referentie
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

// === Helper functions ===

function jsonResponse(status: number, data: Record<string, unknown>) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function generateSlug(company: string, jobTitle: string): string {
  const text = `${company}-${jobTitle}`;
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 60);
}

async function ensureUniqueSlug(
  supabase: ReturnType<typeof createClient>,
  baseSlug: string
): Promise<string> {
  let slug = baseSlug;
  let suffix = 0;

  while (true) {
    const { data } = await supabase
      .from("landing_pages")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (!data) return slug;
    suffix++;
    slug = `${baseSlug}-${suffix}`;
  }
}

async function findOrCreateOrganization(
  supabase: ReturnType<typeof createClient>,
  body: Record<string, unknown>
): Promise<string> {
  const companyName = body.company_name as string;
  const orgSlug = (companyName as string)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 40);

  // Zoek bestaande organisatie
  const { data: existing } = await supabase
    .from("organizations")
    .select("id")
    .eq("slug", orgSlug)
    .maybeSingle();

  if (existing) return existing.id;

  // Maak nieuwe organisatie aan
  const { data: newOrg, error } = await supabase
    .from("organizations")
    .insert({
      name: companyName,
      slug: orgSlug,
      logo_url: (body.company_logo_url as string) || "",
      website_url: (body.company_website as string) || "",
      contact_email: (body.contact_email as string) || "",
      contact_phone: (body.contact_phone as string) || "",
      brand_colors: {
        primary: (body.primary_color as string) || "#003DA5",
      },
    })
    .select("id")
    .single();

  if (error) throw error;
  return newOrg.id;
}

function generateSections(body: Record<string, unknown>): Record<string, unknown>[] {
  const companyName = body.company_name as string;
  const jobTitle = body.job_title as string;
  const location = body.job_location as string;
  const salaryMin = body.salary_min as number | undefined;
  const salaryMax = body.salary_max as number | undefined;
  const employmentType = (body.employment_type as string) || "fulltime";
  const description = body.job_description as string;
  const responsibilities = (body.responsibilities as string[]) || [];
  const mustHave = (body.requirements_must as string[]) || [];
  const niceToHave = (body.requirements_nice as string[]) || [];
  const benefits = (body.benefits as string[]) || [];

  const salaryText = salaryMin && salaryMax
    ? `\u20AC${salaryMin} - \u20AC${salaryMax}`
    : salaryMin
      ? `Vanaf \u20AC${salaryMin}`
      : "Marktconform";

  const employmentLabel: Record<string, string> = {
    fulltime: "Fulltime",
    parttime: "Parttime",
    flex: "Flex / Oproep",
    interim: "Interim",
    stage: "Stage",
  };

  const sections: Record<string, unknown>[] = [];

  // Hero
  sections.push({
    id: "hero-1",
    type: "hero",
    order: 0,
    visible: true,
    data: {
      companyName: companyName.toUpperCase(),
      headline: `Word ${jobTitle}\nbij ${companyName}`,
      highlightedText: companyName,
      subheadline: description || `Een mooie kans als ${jobTitle} in ${location}.`,
      location,
      salary: salaryText,
      employmentType: `${employmentLabel[employmentType] || employmentType}`,
      primaryCtaLabel: "Ja, dit lijkt me wat!",
      primaryCtaAction: "scroll_to_form",
      secondaryCtaLabel: "Bekijk de details",
      secondaryCtaAction: "scroll_to_section",
      secondaryCtaTarget: "job-details-1",
      quickStats: [
        { value: salaryText, label: "bruto per maand" },
        { value: location, label: "locatie" },
        { value: employmentLabel[employmentType] || employmentType, label: "dienstverband" },
      ],
    },
  });

  // Job details (als er verantwoordelijkheden zijn)
  if (responsibilities.length > 0 || description) {
    sections.push({
      id: "job-details-1",
      type: "job_details",
      order: 1,
      visible: true,
      data: {
        heading: "Wat ga je doen?",
        description: description || `Als ${jobTitle} bij ${companyName} werk je in ${location}.`,
        quickInfo: [
          { icon: "map-pin", label: "Locatie", value: location },
          { icon: "briefcase", label: "Contract", value: employmentLabel[employmentType] || employmentType },
          { icon: "calendar", label: "Start", value: "In overleg" },
        ],
        responsibilities: responsibilities.map((r: string) => ({
          title: r,
          description: "",
        })),
      },
    });
  }

  // Benefits
  if (benefits.length > 0) {
    const benefitIcons = ["euro", "heart", "graduation-cap", "calendar", "shield", "zap", "car", "gift"];
    sections.push({
      id: "benefits-1",
      type: "benefits",
      order: 2,
      visible: true,
      data: {
        heading: "Wat bieden wij?",
        subheading: `Dit kun je verwachten als ${jobTitle} bij ${companyName}`,
        benefits: benefits.map((b: string, i: number) => ({
          icon: benefitIcons[i % benefitIcons.length],
          title: b,
          description: "",
        })),
      },
    });
  }

  // Salary breakdown
  if (salaryMin || salaryMax) {
    sections.push({
      id: "salary-1",
      type: "salary_breakdown",
      order: 3,
      visible: true,
      data: {
        heading: "Wat verdien je?",
        subheading: "Transparant overzicht van je beloning",
        items: [
          {
            icon: "euro",
            label: "Basissalaris",
            value: salaryText,
            description: "Bruto maandsalaris o.b.v. ervaring",
          },
          {
            icon: "gift",
            label: "Vakantietoeslag",
            value: "8%",
            description: "Jaarlijkse vakantietoeslag",
          },
        ],
        totalLabel: "Indicatief jaarsalaris",
        totalValue: salaryMin && salaryMax
          ? `\u20AC${Math.round(salaryMin * 12.96 / 1000) * 1000} - \u20AC${Math.round(salaryMax * 12.96 / 1000) * 1000}`
          : salaryText,
        totalDescription: "Inclusief vakantietoeslag",
      },
    });
  }

  // Requirements
  if (mustHave.length > 0 || niceToHave.length > 0) {
    sections.push({
      id: "requirements-1",
      type: "requirements",
      order: 4,
      visible: true,
      data: {
        heading: "Wat vragen wij?",
        subheading: "Herken je jezelf hierin? Dan willen we je graag spreken.",
        mustHave: mustHave.map((r: string) => ({ text: r })),
        niceToHave: niceToHave.map((r: string) => ({ text: r })),
      },
    });
  }

  // FAQ (standaard vragen)
  sections.push({
    id: "faq-1",
    type: "faq",
    order: 5,
    visible: true,
    data: {
      heading: "Veelgestelde vragen",
      subheading: "Nog vragen? Hier vind je antwoorden.",
      faqs: [
        {
          question: "Hoe ziet het sollicitatieproces eruit?",
          answer: `Na je sollicitatie nemen we snel contact met je op voor een kennismakingsgesprek. Het proces is laagdrempelig en snel.`,
        },
        {
          question: "Kan ik ook eerst vrijblijvend informatie krijgen?",
          answer: `Natuurlijk! Neem gerust contact op met ${body.contact_name} via telefoon of WhatsApp. Een vrijblijvend gesprek is altijd mogelijk.`,
        },
        {
          question: "Wanneer kan ik starten?",
          answer: "De startdatum is in overleg. We kijken samen naar wat het beste uitkomt.",
        },
      ],
    },
  });

  // Application form
  sections.push({
    id: "application-form-1",
    type: "application_form",
    order: 6,
    visible: true,
    data: {
      heading: "Direct solliciteren",
      subheading: "Vul het formulier in en we nemen snel contact met je op",
      showWhatsAppAlternative: !!body.contact_whatsapp,
    },
  });

  // Final CTA
  sections.push({
    id: "final-cta-1",
    type: "final_cta",
    order: 7,
    visible: true,
    data: {
      heading: "Klaar om te solliciteren",
      highlightedText: `bij ${companyName}?`,
      subheading: "Kies de manier die bij je past. Geen verplichtingen.",
      ctaOptions: [
        {
          type: "apply",
          heading: "Online solliciteren",
          description: "Vul het formulier in en we reageren snel",
          buttonLabel: "Ja, dit lijkt me wat!",
        },
        ...(body.contact_whatsapp
          ? [{
              type: "whatsapp",
              heading: "Via WhatsApp",
              description: "Stel je vraag direct via WhatsApp",
              buttonLabel: "Stuur een bericht",
            }]
          : []),
      ],
      trustBadges: [
        "Snelle reactie",
        "Vrijblijvend kennismaken",
        "Je gegevens zijn veilig (AVG)",
      ],
    },
  });

  return sections;
}

function generateTheme(body: Record<string, unknown>): Record<string, unknown> {
  const primary = (body.primary_color as string) || "#003DA5";

  return {
    colors: {
      primary,
      secondary: "#1A1A2E",
      accent: "#F0F4F8",
      background: "#FFFFFF",
      foreground: "#0F172A",
      muted: "#F1F5F9",
      mutedForeground: "#64748B",
    },
    fonts: {
      heading: "'Inter', sans-serif",
      body: "'Inter', sans-serif",
    },
    borderRadius: "0.75rem",
    logoUrl: (body.company_logo_url as string) || "",
    logoAlt: body.company_name as string,
  };
}

function generateFormFields(): Record<string, unknown>[] {
  return [
    {
      name: "full_name",
      label: "Volledige naam",
      type: "text",
      placeholder: "Jan de Vries",
      required: true,
    },
    {
      name: "email",
      label: "E-mailadres",
      type: "email",
      placeholder: "jan@voorbeeld.nl",
      required: true,
    },
    {
      name: "phone",
      label: "Telefoonnummer",
      type: "tel",
      placeholder: "06 12 34 56 78",
      required: true,
    },
    {
      name: "motivation",
      label: "Waarom spreekt deze functie je aan? (kort)",
      type: "textarea",
      placeholder: "Vertel kort waarom je interesse hebt...",
      required: false,
    },
    {
      name: "cv",
      label: "CV uploaden",
      type: "file",
      required: false,
      acceptedFileTypes: [".pdf", ".doc", ".docx"],
      helpText: "PDF, DOC of DOCX (max 5MB)",
      maxFileSizeMB: 5,
    },
    {
      name: "privacy",
      label: "Ik ga akkoord met de privacyverklaring",
      type: "checkbox",
      required: true,
    },
  ];
}
