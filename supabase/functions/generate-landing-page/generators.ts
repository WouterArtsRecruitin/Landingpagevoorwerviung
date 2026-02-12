// Section, theme, and form field generators for landing page creation

import { buildSalarySection, buildFaqSection, buildFinalCtaSection } from "./section-builders.ts";

function formatSalary(min?: number, max?: number): string {
  if (min && max) return `\u20AC${min} - \u20AC${max}`;
  if (min) return `Vanaf \u20AC${min}`;
  return "Marktconform";
}

const EMPLOYMENT_LABELS: Record<string, string> = {
  fulltime: "Fulltime",
  parttime: "Parttime",
  flex: "Flex / Oproep",
  interim: "Interim",
  stage: "Stage",
};

export function generateSections(body: Record<string, unknown>): Record<string, unknown>[] {
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

  const salaryText = formatSalary(salaryMin, salaryMax);
  const emplLabel = EMPLOYMENT_LABELS[employmentType] || employmentType;

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
      employmentType: emplLabel,
      primaryCtaLabel: "Ja, dit lijkt me wat!",
      primaryCtaAction: "scroll_to_form",
      secondaryCtaLabel: "Bekijk de details",
      secondaryCtaAction: "scroll_to_section",
      secondaryCtaTarget: "job-details-1",
      quickStats: [
        { value: salaryText, label: "bruto per maand" },
        { value: location, label: "locatie" },
        { value: emplLabel, label: "dienstverband" },
      ],
    },
  });

  // Job details
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
          { icon: "briefcase", label: "Contract", value: emplLabel },
          { icon: "calendar", label: "Start", value: "In overleg" },
        ],
        responsibilities: responsibilities.map((r: string) => ({ title: r, description: "" })),
      },
    });
  }

  // Benefits
  if (benefits.length > 0) {
    const icons = ["euro", "heart", "graduation-cap", "calendar", "shield", "zap", "car", "gift"];
    sections.push({
      id: "benefits-1",
      type: "benefits",
      order: 2,
      visible: true,
      data: {
        heading: "Wat bieden wij?",
        subheading: `Dit kun je verwachten als ${jobTitle} bij ${companyName}`,
        benefits: benefits.map((b: string, i: number) => ({
          icon: icons[i % icons.length],
          title: b,
          description: "",
        })),
      },
    });
  }

  // Salary breakdown
  if (salaryMin || salaryMax) {
    sections.push(buildSalarySection(salaryText, salaryMin, salaryMax));
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

  // FAQ
  sections.push(buildFaqSection(body));

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
  sections.push(buildFinalCtaSection(body, companyName));

  return sections;
}

// Vette moderne kleurenschema's voor tech & industrie recruitment
const COLOR_THEMES = {
  engineering: {
    primary: "#3B82F6", // Professional blue
    secondary: "#2563EB", // Deep blue
    accent: "#60A5FA", // Light blue
    gradient: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)",
  },
  tech: {
    primary: "#6366F1", // Indigo
    secondary: "#8B5CF6", // Purple
    accent: "#EC4899", // Pink
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  industrial: {
    primary: "#6B7280", // Stoer grijs
    secondary: "#F97316", // Oranje
    accent: "#FB923C", // Light orange
    gradient: "linear-gradient(135deg, #4B5563 0%, #F97316 100%)",
  },
  service: {
    primary: "#DC2626", // Actie rood
    secondary: "#991B1B", // Dark red
    accent: "#F87171", // Light red
    gradient: "linear-gradient(135deg, #DC2626 0%, #7F1D1D 100%)",
  },
  logistics: {
    primary: "#10B981", // Helder groen
    secondary: "#059669", // Green
    accent: "#34D399", // Light green
    gradient: "linear-gradient(135deg, #10B981 0%, #047857 100%)",
  },
  premium: {
    primary: "#1F2937", // Luxe zwart
    secondary: "#D97706", // Goud
    accent: "#FBBF24", // Light gold
    gradient: "linear-gradient(135deg, #1F2937 0%, #D97706 100%)",
  },
  default: {
    primary: "#3B82F6", // Blue (default = engineering)
    secondary: "#2563EB",
    accent: "#60A5FA",
    gradient: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)",
  },
};

function selectTheme(
  templateStyle?: string,
  sector?: string,
  primaryColor?: string
): typeof COLOR_THEMES.default {
  // 1. Als er een expliciete template style is gekozen, gebruik die
  if (templateStyle && templateStyle !== 'auto' && COLOR_THEMES[templateStyle as keyof typeof COLOR_THEMES]) {
    return COLOR_THEMES[templateStyle as keyof typeof COLOR_THEMES];
  }

  // 2. Als er een custom kleur is, gebruik die
  if (primaryColor && primaryColor !== '#003DA5') {
    return {
      primary: primaryColor,
      secondary: primaryColor,
      accent: primaryColor,
      gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
    };
  }

  // 3. Kies theme op basis van sector (tech & industrie focused)
  const sectorMap: Record<string, keyof typeof COLOR_THEMES> = {
    'ICT & Telecom': 'tech',
    'Techniek & Industrie': 'engineering',
    'Bouw & Vastgoed': 'industrial',
    'Logistiek & Transport': 'logistics',
    'Agrarisch & Groen': 'service',
    'Horeca & Toerisme': 'premium',
    'Retail & E-commerce': 'logistics',
    'Finance & Accounting': 'premium',
    'Marketing & Communicatie': 'tech',
    'Onderwijs & Overheid': 'engineering',
    'Zorg & Welzijn': 'service',
    'Overig': 'engineering',
  };

  const themeKey = sector ? sectorMap[sector] || 'default' : 'default';
  return COLOR_THEMES[themeKey];
}

export function generateTheme(body: Record<string, unknown>): Record<string, unknown> {
  const templateStyle = body.template_style as string | undefined;
  const sector = body.company_sector as string | undefined;
  const customColor = body.primary_color as string | undefined;
  const imageStyle = body.image_style as string | undefined;
  const calendlyUrl = body.calendly_url as string | undefined;

  const theme = selectTheme(templateStyle, sector, customColor);

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
    fonts: {
      heading: "'Inter', sans-serif",
      body: "'Inter', sans-serif",
    },
    borderRadius: "1rem",
    logoUrl: (body.company_logo_url as string) || "",
    logoAlt: body.company_name as string,
    imageStyle: imageStyle || "photos",
    calendlyUrl: calendlyUrl || "",
  };
}

export function generateFormFields(): Record<string, unknown>[] {
  return [
    { name: "full_name", label: "Volledige naam", type: "text", placeholder: "Jan de Vries", required: true },
    { name: "email", label: "E-mailadres", type: "email", placeholder: "jan@voorbeeld.nl", required: true },
    { name: "phone", label: "Telefoonnummer", type: "tel", placeholder: "06 12 34 56 78", required: true },
    { name: "motivation", label: "Waarom spreekt deze functie je aan? (kort)", type: "textarea", placeholder: "Vertel kort waarom je interesse hebt...", required: false },
    { name: "cv", label: "CV uploaden", type: "file", required: false, acceptedFileTypes: [".pdf", ".doc", ".docx"], helpText: "PDF, DOC of DOCX (max 5MB)", maxFileSizeMB: 5 },
    { name: "privacy", label: "Ik ga akkoord met de privacyverklaring", type: "checkbox", required: true },
  ];
}
