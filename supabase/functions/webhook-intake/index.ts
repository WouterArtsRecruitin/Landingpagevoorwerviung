// Supabase Edge Function: webhook-intake
// Ontvangt webhook data van Jotform, Typeform of andere form providers
// en roept generate-landing-page aan om een pagina te genereren.
//
// Ondersteunt:
// - Jotform webhook (rawRequest of JSON)
// - Typeform webhook (form_response)
// - Generic JSON (directe velden)
//
// Na succesvolle verwerking: stuurt optioneel Slack notificatie en e-mail

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

    const contentType = req.headers.get("content-type") || "";
    let rawBody: Record<string, unknown>;

    // Parse body op basis van content type
    if (contentType.includes("application/x-www-form-urlencoded")) {
      // Jotform stuurt soms URL-encoded data
      const text = await req.text();
      const params = new URLSearchParams(text);
      rawBody = Object.fromEntries(params.entries());

      // Jotform wraps in rawRequest
      if (rawBody.rawRequest && typeof rawBody.rawRequest === "string") {
        try {
          rawBody = JSON.parse(rawBody.rawRequest as string);
        } catch {
          // Gebruik de URL-encoded data direct
        }
      }
    } else {
      rawBody = await req.json();
    }

    // Detecteer provider en normaliseer data
    const normalized = detectAndNormalize(rawBody);

    // Validatie van need-to-have velden
    const validation = validateIntake(normalized);

    if (!validation.valid) {
      // Stuur notificatie over ontbrekende velden
      await sendIncompleteNotification(supabase, normalized, validation.missing);

      return jsonResponse(200, {
        success: false,
        status: "incomplete",
        message: "Intake onvolledig - notificatie verstuurd",
        missing_fields: validation.missing,
      });
    }

    // Roep generate-landing-page aan via dezelfde Supabase instance
    const { data: intake, error: intakeError } = await supabase
      .from("intake_submissions")
      .insert({
        created_by: normalized.contact_email,
        company_name: normalized.company_name,
        company_website: normalized.company_website,
        company_logo_url: normalized.company_logo_url,
        company_sector: normalized.company_sector,
        primary_color: normalized.primary_color,
        job_title: normalized.job_title,
        job_location: normalized.job_location,
        salary_min: normalized.salary_min,
        salary_max: normalized.salary_max,
        employment_type: normalized.employment_type || "fulltime",
        job_description: normalized.job_description,
        responsibilities: normalized.responsibilities || [],
        requirements_must: normalized.requirements_must || [],
        requirements_nice: normalized.requirements_nice || [],
        benefits: normalized.benefits || [],
        contact_name: normalized.contact_name,
        contact_role: normalized.contact_role,
        contact_email: normalized.contact_email,
        contact_phone: normalized.contact_phone,
        contact_whatsapp: normalized.contact_whatsapp,
        status: "processing",
      })
      .select("id")
      .single();

    if (intakeError) {
      return jsonResponse(500, { success: false, error: intakeError.message });
    }

    // Genereer slug
    const slug = generateSlug(normalized.company_name, normalized.job_title);
    const uniqueSlug = await ensureUniqueSlug(supabase, slug);

    // Vind of maak organisatie
    const orgId = await findOrCreateOrg(supabase, normalized);

    // Genereer landing page (hergebruik logica)
    const sections = generateSections(normalized);
    const theme = generateTheme(normalized);
    const formFields = generateFormFields();

    const salaryText = normalized.salary_min && normalized.salary_max
      ? `\u20AC${normalized.salary_min} - \u20AC${normalized.salary_max}`
      : normalized.salary_min
        ? `Vanaf \u20AC${normalized.salary_min}`
        : "Marktconform";

    const { data: landingPage, error: lpError } = await supabase
      .from("landing_pages")
      .insert({
        organization_id: orgId,
        slug: uniqueSlug,
        status: "draft",
        page_title: `${normalized.job_title} | ${normalized.company_name} | ${normalized.job_location}`,
        meta_description: `Word ${normalized.job_title} bij ${normalized.company_name} in ${normalized.job_location}. ${salaryText}. Solliciteer direct!`,
        sections,
        theme,
        form_fields: formFields,
        form_success_message: "Bedankt voor je sollicitatie! We nemen binnen enkele werkdagen contact met je op.",
        contact_person_name: normalized.contact_name,
        contact_person_role: normalized.contact_role || "Recruiter",
        contact_person_email: normalized.contact_email,
        contact_person_phone: normalized.contact_phone,
        contact_whatsapp_url: normalized.contact_whatsapp
          ? `https://wa.me/${normalized.contact_whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hoi, ik heb interesse in de ${normalized.job_title} vacature!`)}`
          : null,
        cookie_consent: {
          enabled: true,
          privacyPolicyUrl: normalized.company_website
            ? `${normalized.company_website.replace(/\/$/, "")}/privacy`
            : "#",
          categories: { necessary: true, analytics: true, marketing: true },
        },
      })
      .select("id")
      .single();

    if (lpError) {
      await supabase.from("intake_submissions")
        .update({ status: "failed", error_message: lpError.message })
        .eq("id", intake.id);

      return jsonResponse(500, { success: false, error: lpError.message });
    }

    // Update intake
    await supabase.from("intake_submissions")
      .update({
        status: "completed",
        landing_page_id: landingPage.id,
        processed_at: new Date().toISOString(),
      })
      .eq("id", intake.id);

    // Stuur succes notificatie
    await sendSuccessNotification(supabase, normalized, uniqueSlug);

    return jsonResponse(200, {
      success: true,
      landing_page_id: landingPage.id,
      slug: uniqueSlug,
      url: `/v/${uniqueSlug}`,
      message: "Landingspagina succesvol aangemaakt",
    });
  } catch (error) {
    return jsonResponse(500, {
      success: false,
      error: "Interne server fout bij verwerking webhook",
    });
  }
});

// === Interfaces ===

interface NormalizedIntake {
  company_name: string;
  company_website: string;
  company_logo_url: string;
  company_sector: string;
  primary_color: string;
  job_title: string;
  job_location: string;
  salary_min: number | null;
  salary_max: number | null;
  employment_type: string;
  job_description: string;
  responsibilities: string[];
  requirements_must: string[];
  requirements_nice: string[];
  benefits: string[];
  contact_name: string;
  contact_role: string;
  contact_email: string;
  contact_phone: string;
  contact_whatsapp: string;
}

// === Provider detection & normalization ===

function detectAndNormalize(body: Record<string, unknown>): NormalizedIntake {
  // Typeform: form_response.answers[]
  if (body.form_response) {
    return normalizeTypeform(body);
  }

  // Jotform: answers object met q1_xxx keys
  if (body.answers || body.formID) {
    return normalizeJotform(body);
  }

  // Direct/generic JSON
  return normalizeGeneric(body);
}

function normalizeTypeform(body: Record<string, unknown>): NormalizedIntake {
  const response = body.form_response as Record<string, unknown>;
  const answers = (response?.answers as Array<Record<string, unknown>>) || [];

  // Typeform answers hebben een field.ref die we mappen
  function getAnswer(ref: string): string {
    const answer = answers.find(
      (a) => (a.field as Record<string, unknown>)?.ref === ref
    );
    if (!answer) return "";
    // Typeform answer types: text, email, number, choice, etc.
    return (
      (answer.text as string) ||
      (answer.email as string) ||
      (answer.number?.toString() as string) ||
      (answer.choice as Record<string, unknown>)?.label?.toString() ||
      ""
    );
  }

  function getListAnswer(ref: string): string[] {
    const val = getAnswer(ref);
    return val ? val.split("\n").map((s: string) => s.trim()).filter(Boolean) : [];
  }

  return {
    company_name: getAnswer("company_name"),
    company_website: getAnswer("company_website"),
    company_logo_url: getAnswer("company_logo_url"),
    company_sector: getAnswer("company_sector"),
    primary_color: getAnswer("primary_color") || "#003DA5",
    job_title: getAnswer("job_title"),
    job_location: getAnswer("job_location"),
    salary_min: parseInt(getAnswer("salary_min")) || null,
    salary_max: parseInt(getAnswer("salary_max")) || null,
    employment_type: getAnswer("employment_type") || "fulltime",
    job_description: getAnswer("job_description"),
    responsibilities: getListAnswer("responsibilities"),
    requirements_must: getListAnswer("requirements_must"),
    requirements_nice: getListAnswer("requirements_nice"),
    benefits: getListAnswer("benefits"),
    contact_name: getAnswer("contact_name"),
    contact_role: getAnswer("contact_role"),
    contact_email: getAnswer("contact_email"),
    contact_phone: getAnswer("contact_phone"),
    contact_whatsapp: getAnswer("contact_whatsapp"),
  };
}

function normalizeJotform(body: Record<string, unknown>): NormalizedIntake {
  // Jotform stuurt answers als object met keys als question IDs
  // We proberen de veldnamen te matchen via de "name" property
  const answers = body as Record<string, unknown>;

  function getField(name: string): string {
    // Direct veld
    if (typeof answers[name] === "string") return answers[name] as string;
    // Jotform answer object
    if (answers[name] && typeof answers[name] === "object") {
      const ans = answers[name] as Record<string, unknown>;
      return (ans.answer as string) || (ans.value as string) || "";
    }
    return "";
  }

  function getListField(name: string): string[] {
    const val = getField(name);
    return val ? val.split("\n").map((s: string) => s.trim()).filter(Boolean) : [];
  }

  return {
    company_name: getField("company_name") || getField("bedrijfsnaam"),
    company_website: getField("company_website") || getField("website"),
    company_logo_url: getField("company_logo_url") || getField("logo"),
    company_sector: getField("company_sector") || getField("branche"),
    primary_color: getField("primary_color") || "#003DA5",
    job_title: getField("job_title") || getField("functietitel"),
    job_location: getField("job_location") || getField("locatie"),
    salary_min: parseInt(getField("salary_min") || getField("salaris_min")) || null,
    salary_max: parseInt(getField("salary_max") || getField("salaris_max")) || null,
    employment_type: getField("employment_type") || getField("dienstverband") || "fulltime",
    job_description: getField("job_description") || getField("beschrijving"),
    responsibilities: getListField("responsibilities") || getListField("taken"),
    requirements_must: getListField("requirements_must") || getListField("eisen"),
    requirements_nice: getListField("requirements_nice") || getListField("pres"),
    benefits: getListField("benefits") || getListField("arbeidsvoorwaarden"),
    contact_name: getField("contact_name") || getField("contactpersoon"),
    contact_role: getField("contact_role") || getField("functie_contact"),
    contact_email: getField("contact_email") || getField("email"),
    contact_phone: getField("contact_phone") || getField("telefoon"),
    contact_whatsapp: getField("contact_whatsapp") || getField("whatsapp"),
  };
}

function normalizeGeneric(body: Record<string, unknown>): NormalizedIntake {
  const str = (key: string) => (body[key] as string) || "";
  const num = (key: string) => {
    const v = body[key];
    return typeof v === "number" ? v : parseInt(v as string) || null;
  };
  const list = (key: string): string[] => {
    const v = body[key];
    if (Array.isArray(v)) return v as string[];
    if (typeof v === "string") return v.split("\n").map((s: string) => s.trim()).filter(Boolean);
    return [];
  };

  return {
    company_name: str("company_name"),
    company_website: str("company_website"),
    company_logo_url: str("company_logo_url"),
    company_sector: str("company_sector"),
    primary_color: str("primary_color") || "#003DA5",
    job_title: str("job_title"),
    job_location: str("job_location"),
    salary_min: num("salary_min"),
    salary_max: num("salary_max"),
    employment_type: str("employment_type") || "fulltime",
    job_description: str("job_description"),
    responsibilities: list("responsibilities"),
    requirements_must: list("requirements_must"),
    requirements_nice: list("requirements_nice"),
    benefits: list("benefits"),
    contact_name: str("contact_name"),
    contact_role: str("contact_role"),
    contact_email: str("contact_email"),
    contact_phone: str("contact_phone"),
    contact_whatsapp: str("contact_whatsapp"),
  };
}

// === Validation ===

interface ValidationResult {
  valid: boolean;
  missing: Array<{ field: string; label: string; hint: string }>;
}

function validateIntake(data: NormalizedIntake): ValidationResult {
  const missing: Array<{ field: string; label: string; hint: string }> = [];

  // NEED-TO-HAVE (verplicht)
  if (!data.company_name) {
    missing.push({ field: "company_name", label: "Bedrijfsnaam", hint: "De officiële naam van het bedrijf" });
  }
  if (!data.job_title) {
    missing.push({ field: "job_title", label: "Functietitel", hint: "Bijv. 'Servicemonteur', 'Accountmanager'" });
  }
  if (!data.job_location) {
    missing.push({ field: "job_location", label: "Locatie", hint: "Bijv. 'Amsterdam', 'Regio Midden-Nederland'" });
  }
  if (!data.contact_name) {
    missing.push({ field: "contact_name", label: "Contactpersoon naam", hint: "Naam van de recruiter/contactpersoon" });
  }
  if (!data.contact_email) {
    missing.push({ field: "contact_email", label: "Contactpersoon e-mail", hint: "E-mailadres voor kandidaatcontact" });
  }

  // Validatie van e-mail formaat
  if (data.contact_email && !data.contact_email.includes("@")) {
    missing.push({ field: "contact_email", label: "Contactpersoon e-mail (ongeldig)", hint: "Moet een geldig e-mailadres zijn, bijv. naam@bedrijf.nl" });
  }

  return { valid: missing.length === 0, missing };
}

// === Notifications ===

async function sendIncompleteNotification(
  supabase: ReturnType<typeof createClient>,
  data: NormalizedIntake,
  missing: Array<{ field: string; label: string; hint: string }>
) {
  const slackWebhookUrl = Deno.env.get("SLACK_WEBHOOK_URL");
  const notifyEmail = Deno.env.get("NOTIFY_EMAIL") || "";

  const missingText = missing
    .map((m) => `- *${m.label}*: ${m.hint}`)
    .join("\n");

  // Slack notificatie
  if (slackWebhookUrl) {
    try {
      await fetch(slackWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `:warning: *Intake onvolledig*\n\nVan: ${data.contact_email || "onbekend"}\nBedrijf: ${data.company_name || "onbekend"}\nFunctie: ${data.job_title || "onbekend"}\n\n*Ontbrekende velden:*\n${missingText}\n\nVraag de indiener om de ontbrekende informatie aan te leveren.`,
        }),
      });
    } catch {
      // Slack notificatie mislukt, niet blokkeren
    }
  }

  // E-mail notificatie via Supabase (als edge function beschikbaar)
  if (notifyEmail) {
    try {
      // Log het voor nu - e-mail wordt via aparte service verstuurd
      await supabase.from("intake_submissions").insert({
        created_by: data.contact_email || "onbekend",
        company_name: data.company_name || "Onvolledig",
        job_title: data.job_title || "Onvolledig",
        job_location: data.job_location || "Onbekend",
        contact_name: data.contact_name || "Onbekend",
        contact_email: data.contact_email || "onbekend",
        status: "failed",
        error_message: `Ontbrekende velden: ${missing.map((m) => m.label).join(", ")}`,
      });
    } catch {
      // Niet blokkeren
    }
  }
}

async function sendSuccessNotification(
  supabase: ReturnType<typeof createClient>,
  data: NormalizedIntake,
  slug: string
) {
  const slackWebhookUrl = Deno.env.get("SLACK_WEBHOOK_URL");

  if (slackWebhookUrl) {
    try {
      await fetch(slackWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `:white_check_mark: *Nieuwe vacaturepagina aangemaakt*\n\nBedrijf: ${data.company_name}\nFunctie: ${data.job_title}\nLocatie: ${data.job_location}\nContact: ${data.contact_name} (${data.contact_email})\n\nURL: /v/${slug}\nStatus: concept (nog te publiceren via dashboard)`,
        }),
      });
    } catch {
      // Slack notificatie mislukt
    }
  }
}

// === Shared generation functions (same as generate-landing-page) ===

function jsonResponse(status: number, data: Record<string, unknown>) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function generateSlug(company: string, jobTitle: string): string {
  return `${company}-${jobTitle}`
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

async function findOrCreateOrg(
  supabase: ReturnType<typeof createClient>,
  data: NormalizedIntake
): Promise<string> {
  const orgSlug = data.company_name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 40);

  const { data: existing } = await supabase
    .from("organizations")
    .select("id")
    .eq("slug", orgSlug)
    .maybeSingle();

  if (existing) return existing.id;

  const { data: newOrg, error } = await supabase
    .from("organizations")
    .insert({
      name: data.company_name,
      slug: orgSlug,
      logo_url: data.company_logo_url || "",
      website_url: data.company_website || "",
      contact_email: data.contact_email || "",
      contact_phone: data.contact_phone || "",
      brand_colors: { primary: data.primary_color || "#003DA5" },
    })
    .select("id")
    .single();

  if (error) throw error;
  return newOrg.id;
}

function generateSections(data: NormalizedIntake): Record<string, unknown>[] {
  const salaryText = data.salary_min && data.salary_max
    ? `\u20AC${data.salary_min} - \u20AC${data.salary_max}`
    : data.salary_min ? `Vanaf \u20AC${data.salary_min}` : "Marktconform";

  const empLabel: Record<string, string> = {
    fulltime: "Fulltime", parttime: "Parttime", flex: "Flex / Oproep",
    interim: "Interim", stage: "Stage",
  };

  const sections: Record<string, unknown>[] = [];

  sections.push({
    id: "hero-1", type: "hero", order: 0, visible: true,
    data: {
      companyName: data.company_name.toUpperCase(),
      headline: `Word ${data.job_title}\nbij ${data.company_name}`,
      highlightedText: data.company_name,
      subheadline: data.job_description || `Een mooie kans als ${data.job_title} in ${data.job_location}.`,
      location: data.job_location, salary: salaryText,
      employmentType: empLabel[data.employment_type] || data.employment_type,
      primaryCtaLabel: "Ja, dit lijkt me wat!", primaryCtaAction: "scroll_to_form",
      secondaryCtaLabel: "Bekijk de details", secondaryCtaAction: "scroll_to_section",
      secondaryCtaTarget: "job-details-1",
      quickStats: [
        { value: salaryText, label: "bruto per maand" },
        { value: data.job_location, label: "locatie" },
        { value: empLabel[data.employment_type] || data.employment_type, label: "dienstverband" },
      ],
    },
  });

  if (data.responsibilities.length > 0 || data.job_description) {
    sections.push({
      id: "job-details-1", type: "job_details", order: 1, visible: true,
      data: {
        heading: "Wat ga je doen?",
        description: data.job_description || `Als ${data.job_title} bij ${data.company_name} in ${data.job_location}.`,
        quickInfo: [
          { icon: "map-pin", label: "Locatie", value: data.job_location },
          { icon: "briefcase", label: "Contract", value: empLabel[data.employment_type] || data.employment_type },
          { icon: "calendar", label: "Start", value: "In overleg" },
        ],
        responsibilities: data.responsibilities.map((r) => ({ title: r, description: "" })),
      },
    });
  }

  if (data.benefits.length > 0) {
    const icons = ["euro", "heart", "graduation-cap", "calendar", "shield", "zap", "car", "gift"];
    sections.push({
      id: "benefits-1", type: "benefits", order: 2, visible: true,
      data: {
        heading: "Wat bieden wij?",
        subheading: `Dit kun je verwachten als ${data.job_title}`,
        benefits: data.benefits.map((b, i) => ({ icon: icons[i % icons.length], title: b, description: "" })),
      },
    });
  }

  if (data.requirements_must.length > 0 || data.requirements_nice.length > 0) {
    sections.push({
      id: "requirements-1", type: "requirements", order: 3, visible: true,
      data: {
        heading: "Wat vragen wij?",
        subheading: "Herken je jezelf hierin? Dan willen we je graag spreken.",
        mustHave: data.requirements_must.map((r) => ({ text: r })),
        niceToHave: data.requirements_nice.map((r) => ({ text: r })),
      },
    });
  }

  sections.push({
    id: "faq-1", type: "faq", order: 4, visible: true,
    data: {
      heading: "Veelgestelde vragen",
      faqs: [
        { question: "Hoe ziet het sollicitatieproces eruit?", answer: "Na je sollicitatie nemen we snel contact op voor een kennismakingsgesprek." },
        { question: "Kan ik eerst vrijblijvend informatie krijgen?", answer: `Neem contact op met ${data.contact_name}. Een vrijblijvend gesprek is altijd mogelijk.` },
        { question: "Wanneer kan ik starten?", answer: "De startdatum is in overleg." },
      ],
    },
  });

  sections.push({
    id: "application-form-1", type: "application_form", order: 5, visible: true,
    data: {
      heading: "Direct solliciteren",
      subheading: "Vul het formulier in en we nemen snel contact met je op",
      showWhatsAppAlternative: !!data.contact_whatsapp,
    },
  });

  sections.push({
    id: "final-cta-1", type: "final_cta", order: 6, visible: true,
    data: {
      heading: "Klaar om te solliciteren",
      highlightedText: `bij ${data.company_name}?`,
      subheading: "Kies de manier die bij je past.",
      ctaOptions: [
        { type: "apply", heading: "Online solliciteren", description: "Vul het formulier in", buttonLabel: "Ja, dit lijkt me wat!" },
        ...(data.contact_whatsapp ? [{ type: "whatsapp", heading: "Via WhatsApp", description: "Stel je vraag direct", buttonLabel: "Stuur een bericht" }] : []),
      ],
      trustBadges: ["Snelle reactie", "Vrijblijvend kennismaken", "Je gegevens zijn veilig (AVG)"],
    },
  });

  return sections;
}

function generateTheme(data: NormalizedIntake): Record<string, unknown> {
  return {
    colors: {
      primary: data.primary_color || "#003DA5",
      secondary: "#1A1A2E", accent: "#F0F4F8", background: "#FFFFFF",
      foreground: "#0F172A", muted: "#F1F5F9", mutedForeground: "#64748B",
    },
    fonts: { heading: "'Inter', sans-serif", body: "'Inter', sans-serif" },
    borderRadius: "0.75rem",
    logoUrl: data.company_logo_url || "",
    logoAlt: data.company_name,
  };
}

function generateFormFields(): Record<string, unknown>[] {
  return [
    { name: "full_name", label: "Volledige naam", type: "text", placeholder: "Jan de Vries", required: true },
    { name: "email", label: "E-mailadres", type: "email", placeholder: "jan@voorbeeld.nl", required: true },
    { name: "phone", label: "Telefoonnummer", type: "tel", placeholder: "06 12 34 56 78", required: true },
    { name: "motivation", label: "Waarom spreekt deze functie je aan?", type: "textarea", placeholder: "Vertel kort waarom je interesse hebt...", required: false },
    { name: "cv", label: "CV uploaden", type: "file", required: false, acceptedFileTypes: [".pdf", ".doc", ".docx"], helpText: "PDF, DOC of DOCX (max 5MB)", maxFileSizeMB: 5 },
    { name: "privacy", label: "Ik ga akkoord met de privacyverklaring", type: "checkbox", required: true },
  ];
}
