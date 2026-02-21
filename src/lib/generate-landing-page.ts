// Client-side fallback for generate-landing-page edge function
// Used when Supabase edge functions are unavailable

import { supabase } from "./supabase";
import type { IntakeFormData } from "@/types/admin";

// ── Slug generation ──────────────────────────────────────────

function generateSlug(company: string, jobTitle: string): string {
  return `${company}-${jobTitle}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 60);
}

async function ensureUniqueSlug(baseSlug: string): Promise<string> {
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

// ── Organization lookup/creation ─────────────────────────────

async function findOrCreateOrganization(form: IntakeFormData): Promise<string> {
  const orgSlug = form.company_name
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
      name: form.company_name,
      slug: orgSlug,
      logo_url: form.company_logo_url || "",
      website_url: form.company_website || "",
      contact_email: form.contact_email || "",
      contact_phone: form.contact_phone || "",
      brand_colors: {
        primary: form.primary_color || "#003DA5",
        secondary: form.secondary_color || "#FFFFFF",
      },
    })
    .select("id")
    .single();

  if (error) throw new Error(`Organisatie aanmaken mislukt: ${error.message}`);
  return newOrg.id;
}

// ── Section generators ───────────────────────────────────────

const EMPLOYMENT_LABELS: Record<string, string> = {
  fulltime: "Fulltime",
  parttime: "Parttime",
  flex: "Flex / Oproep",
  interim: "Interim",
  stage: "Stage",
};

function formatSalary(min: number | null, max: number | null): string {
  if (min && max) return `€${min} - €${max}`;
  if (min) return `Vanaf €${min}`;
  return "Marktconform";
}

function generateSections(form: IntakeFormData) {
  const salaryText = formatSalary(form.salary_min, form.salary_max);
  const emplLabel = EMPLOYMENT_LABELS[form.employment_type] || form.employment_type;
  const sections: Record<string, unknown>[] = [];

  // Hero
  sections.push({
    id: "hero-1",
    type: "hero",
    order: 0,
    visible: true,
    data: {
      companyName: form.company_name.toUpperCase(),
      headline: `Word ${form.job_title}\nbij ${form.company_name}`,
      highlightedText: form.company_name,
      subheadline: form.job_description || `Een mooie kans als ${form.job_title} in ${form.job_location}.`,
      location: form.job_location,
      salary: salaryText,
      employmentType: emplLabel,
      primaryCtaLabel: "Ja, dit lijkt me wat!",
      primaryCtaAction: "scroll_to_form",
      secondaryCtaLabel: "Bekijk de details",
      secondaryCtaAction: "scroll_to_section",
      secondaryCtaTarget: "job-details-1",
      quickStats: [
        { value: salaryText, label: "bruto per maand" },
        { value: form.job_location, label: "locatie" },
        { value: emplLabel, label: "dienstverband" },
      ],
    },
  });

  // Job details
  if (form.responsibilities.length > 0 || form.job_description) {
    sections.push({
      id: "job-details-1",
      type: "job_details",
      order: 1,
      visible: true,
      data: {
        heading: "Wat ga je doen?",
        description: form.job_description || `Als ${form.job_title} bij ${form.company_name} werk je in ${form.job_location}.`,
        quickInfo: [
          { icon: "map-pin", label: "Locatie", value: form.job_location },
          { icon: "briefcase", label: "Contract", value: emplLabel },
          { icon: "calendar", label: "Start", value: "In overleg" },
        ],
        responsibilities: form.responsibilities.map((r) => ({ title: r, description: "" })),
      },
    });
  }

  // Benefits
  if (form.benefits.length > 0) {
    const icons = ["euro", "heart", "graduation-cap", "calendar", "shield", "zap", "car", "gift"];
    sections.push({
      id: "benefits-1",
      type: "benefits",
      order: 2,
      visible: true,
      data: {
        heading: "Wat bieden wij?",
        subheading: `Dit kun je verwachten als ${form.job_title} bij ${form.company_name}`,
        benefits: form.benefits.map((b, i) => ({
          icon: icons[i % icons.length],
          title: b,
          description: "",
        })),
      },
    });
  }

  // Salary breakdown
  if (form.salary_min || form.salary_max) {
    sections.push({
      id: "salary-1",
      type: "salary_breakdown",
      order: 3,
      visible: true,
      data: {
        heading: "Wat verdien je?",
        subheading: "Transparant overzicht van je beloning",
        items: [
          { icon: "euro", label: "Basissalaris", value: salaryText, description: "Bruto maandsalaris o.b.v. ervaring" },
          { icon: "gift", label: "Vakantietoeslag", value: "8%", description: "Jaarlijkse vakantietoeslag" },
        ],
        totalLabel: "Indicatief jaarsalaris",
        totalValue: form.salary_min && form.salary_max
          ? `€${Math.round(form.salary_min * 12.96 / 1000) * 1000} - €${Math.round(form.salary_max * 12.96 / 1000) * 1000}`
          : salaryText,
        totalDescription: "Inclusief vakantietoeslag",
      },
    });
  }

  // Requirements
  if (form.requirements_must.length > 0 || form.requirements_nice.length > 0) {
    sections.push({
      id: "requirements-1",
      type: "requirements",
      order: 4,
      visible: true,
      data: {
        heading: "Wat vragen wij?",
        subheading: "Herken je jezelf hierin? Dan willen we je graag spreken.",
        mustHave: form.requirements_must.map((r) => ({ text: r })),
        niceToHave: form.requirements_nice.map((r) => ({ text: r })),
      },
    });
  }

  // FAQ
  sections.push({
    id: "faq-1",
    type: "faq",
    order: 5,
    visible: true,
    data: {
      heading: "Veelgestelde vragen",
      subheading: "Nog vragen? Hier vind je antwoorden.",
      faqs: [
        { question: "Hoe ziet het sollicitatieproces eruit?", answer: "Na je sollicitatie nemen we snel contact met je op voor een kennismakingsgesprek. Het proces is laagdrempelig en snel." },
        { question: "Kan ik ook eerst vrijblijvend informatie krijgen?", answer: `Natuurlijk! Neem gerust contact op met ${form.contact_name} via telefoon of WhatsApp. Een vrijblijvend gesprek is altijd mogelijk.` },
        { question: "Wanneer kan ik starten?", answer: "De startdatum is in overleg. We kijken samen naar wat het beste uitkomt." },
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
      showWhatsAppAlternative: !!form.contact_whatsapp,
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
      highlightedText: `bij ${form.company_name}?`,
      subheading: "Kies de manier die bij je past. Geen verplichtingen.",
      ctaOptions: [
        { type: "apply", heading: "Online solliciteren", description: "Vul het formulier in en we reageren snel", buttonLabel: "Ja, dit lijkt me wat!" },
        ...(form.contact_whatsapp
          ? [{ type: "whatsapp", heading: "Via WhatsApp", description: "Stel je vraag direct via WhatsApp", buttonLabel: "Stuur een bericht" }]
          : []),
      ],
      trustBadges: ["Snelle reactie", "Vrijblijvend kennismaken", "Je gegevens zijn veilig (AVG)"],
    },
  });

  return sections;
}

// ── Theme generation ─────────────────────────────────────────

const COLOR_THEMES: Record<string, { primary: string; secondary: string; accent: string; gradient: string }> = {
  engineering: { primary: "#3B82F6", secondary: "#2563EB", accent: "#60A5FA", gradient: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)" },
  tech: { primary: "#6366F1", secondary: "#8B5CF6", accent: "#EC4899", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  industrial: { primary: "#6B7280", secondary: "#F97316", accent: "#FB923C", gradient: "linear-gradient(135deg, #4B5563 0%, #F97316 100%)" },
  service: { primary: "#DC2626", secondary: "#991B1B", accent: "#F87171", gradient: "linear-gradient(135deg, #DC2626 0%, #7F1D1D 100%)" },
  logistics: { primary: "#10B981", secondary: "#059669", accent: "#34D399", gradient: "linear-gradient(135deg, #10B981 0%, #047857 100%)" },
  premium: { primary: "#1F2937", secondary: "#D97706", accent: "#FBBF24", gradient: "linear-gradient(135deg, #1F2937 0%, #D97706 100%)" },
  default: { primary: "#3B82F6", secondary: "#2563EB", accent: "#60A5FA", gradient: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)" },
};

const SECTOR_THEME_MAP: Record<string, string> = {
  "ICT & Telecom": "tech",
  "Techniek & Industrie": "engineering",
  "Bouw & Vastgoed": "industrial",
  "Logistiek & Transport": "logistics",
  "Agrarisch & Groen": "service",
  "Horeca & Toerisme": "premium",
  "Retail & E-commerce": "logistics",
  "Finance & Accounting": "premium",
  "Marketing & Communicatie": "tech",
  "Onderwijs & Overheid": "engineering",
  "Zorg & Welzijn": "service",
  "Overig": "engineering",
};

function generateTheme(form: IntakeFormData) {
  let theme = COLOR_THEMES.default;

  if (form.template_style && form.template_style !== "auto" && COLOR_THEMES[form.template_style]) {
    theme = COLOR_THEMES[form.template_style];
  } else if (form.primary_color && form.primary_color !== "#003DA5") {
    const sec = form.secondary_color && form.secondary_color !== "#FFFFFF"
      ? form.secondary_color
      : form.primary_color;
    theme = {
      primary: form.primary_color,
      secondary: sec,
      accent: sec,
      gradient: `linear-gradient(135deg, ${form.primary_color} 0%, ${sec}dd 100%)`,
    };
  } else if (form.company_sector) {
    const key = SECTOR_THEME_MAP[form.company_sector] || "default";
    theme = COLOR_THEMES[key];
  }

  return {
    colors: {
      primary: theme.primary,
      secondary: theme.secondary,
      accent: theme.accent,
      background: "#FFFFFF",
      foreground: "#0F172A",
      muted: "#F8FAFC",
      mutedForeground: "#64748B",
      gradient: theme.gradient,
    },
    fonts: { heading: "'Inter', sans-serif", body: "'Inter', sans-serif" },
    borderRadius: "1rem",
    logoUrl: form.company_logo_url || "",
    logoAlt: form.company_name,
    imageStyle: form.image_style || "photos",
    calendlyUrl: form.calendly_url || "",
  };
}

function generateFormFields() {
  return [
    { name: "full_name", label: "Volledige naam", type: "text", placeholder: "Jan de Vries", required: true },
    { name: "email", label: "E-mailadres", type: "email", placeholder: "jan@voorbeeld.nl", required: true },
    { name: "phone", label: "Telefoonnummer", type: "tel", placeholder: "06 12 34 56 78", required: true },
    { name: "motivation", label: "Waarom spreekt deze functie je aan? (kort)", type: "textarea", placeholder: "Vertel kort waarom je interesse hebt...", required: false },
    { name: "cv", label: "CV uploaden", type: "file", required: false, acceptedFileTypes: [".pdf", ".doc", ".docx"], helpText: "PDF, DOC of DOCX (max 5MB)", maxFileSizeMB: 5 },
    { name: "privacy", label: "Ik ga akkoord met de privacyverklaring", type: "checkbox", required: true },
  ];
}

// ── Main client-side generation function ─────────────────────

export async function generateLandingPageClientSide(
  form: IntakeFormData
): Promise<{ success: true; landing_page_id: string; slug: string; url: string } | { success: false; error: string }> {
  try {
    // 1. Save intake submission
    const { data: intake, error: intakeError } = await supabase
      .from("intake_submissions")
      .insert({
        created_by: form.contact_email,
        company_name: form.company_name,
        company_website: form.company_website,
        company_logo_url: form.company_logo_url,
        company_sector: form.company_sector,
        primary_color: form.primary_color,
        secondary_color: form.secondary_color || "#FFFFFF",
        template_style: form.template_style || "auto",
        image_style: form.image_style || "photos",
        calendly_url: form.calendly_url || null,
        vacancy_text_url: form.vacancy_text_url || null,
        job_title: form.job_title,
        job_location: form.job_location,
        salary_min: form.salary_min,
        salary_max: form.salary_max,
        employment_type: form.employment_type || "fulltime",
        job_description: form.job_description,
        responsibilities: form.responsibilities || [],
        requirements_must: form.requirements_must || [],
        requirements_nice: form.requirements_nice || [],
        benefits: form.benefits || [],
        contact_name: form.contact_name,
        contact_role: form.contact_role,
        contact_email: form.contact_email,
        contact_phone: form.contact_phone,
        contact_whatsapp: form.contact_whatsapp,
        status: "processing",
      })
      .select("id")
      .single();

    if (intakeError) {
      return { success: false, error: `Intake opslaan mislukt: ${intakeError.message}` };
    }

    // 2. Generate slug
    const baseSlug = generateSlug(form.company_name, form.job_title);
    const uniqueSlug = await ensureUniqueSlug(baseSlug);

    // 3. Find or create organization
    const orgId = await findOrCreateOrganization(form);

    // 4. Generate page config
    const sections = generateSections(form);
    const theme = generateTheme(form);
    const formFields = generateFormFields();

    const salaryText = form.salary_min && form.salary_max
      ? `€${form.salary_min} - €${form.salary_max}`
      : form.salary_min
        ? `Vanaf €${form.salary_min}`
        : "Marktconform";

    // 5. Insert landing page
    const { data: landingPage, error: lpError } = await supabase
      .from("landing_pages")
      .insert({
        organization_id: orgId,
        slug: uniqueSlug,
        status: "draft",
        page_title: `${form.job_title} | ${form.company_name} | ${form.job_location}`,
        meta_description: `Word ${form.job_title} bij ${form.company_name} in ${form.job_location}. ${salaryText} bruto per maand. Solliciteer direct!`,
        sections,
        theme,
        cookie_consent: {
          enabled: true,
          privacyPolicyUrl: form.company_website
            ? `${form.company_website.replace(/\/$/, "")}/privacy`
            : "#",
          categories: { necessary: true, analytics: true, marketing: true },
        },
        ga4_measurement_id: form.ga4_measurement_id || null,
        form_fields: formFields,
        form_success_message: "Bedankt voor je sollicitatie! We nemen binnen enkele werkdagen contact met je op.",
        contact_person_name: form.contact_name,
        contact_person_role: form.contact_role || "Recruiter",
        contact_person_email: form.contact_email,
        contact_person_phone: form.contact_phone,
        contact_whatsapp_url: form.contact_whatsapp
          ? `https://wa.me/${form.contact_whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hoi, ik heb interesse in de ${form.job_title} vacature bij ${form.company_name}!`)}`
          : null,
        contact_calendly_url: form.calendly_url || null,
      })
      .select("id")
      .single();

    if (lpError) {
      await supabase
        .from("intake_submissions")
        .update({ status: "failed", error_message: lpError.message })
        .eq("id", intake.id);

      return { success: false, error: `Pagina aanmaken mislukt: ${lpError.message}` };
    }

    // 6. Update intake submission
    await supabase
      .from("intake_submissions")
      .update({
        status: "completed",
        landing_page_id: landingPage.id,
        processed_at: new Date().toISOString(),
      })
      .eq("id", intake.id);

    return {
      success: true,
      landing_page_id: landingPage.id,
      slug: uniqueSlug,
      url: `/v/${uniqueSlug}`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: `Onverwachte fout: ${message}` };
  }
}
