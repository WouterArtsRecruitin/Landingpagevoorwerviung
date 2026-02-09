// ============================================================
// LANDING PAGE CORE TYPES
// Config structuur, section types, theme, form, contact, analytics
// ============================================================

export type SectionType =
  | "hero"
  | "job_details"
  | "benefits"
  | "salary_breakdown"
  | "tech_showcase"
  | "day_in_life"
  | "testimonials"
  | "why_join_us"
  | "requirements"
  | "team_culture"
  | "work_gallery"
  | "trust_signals"
  | "faq"
  | "application_form"
  | "final_cta"
  | "about_company"
  | "hidden_gem"
  | "recruitment_approach"
  | "custom_html"
  | "video_embed";

export interface SectionConfig {
  id: string;
  type: SectionType;
  order: number;
  visible: boolean;
  data: Record<string, unknown>;
  className?: string;
}

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
  };
  fonts: { heading: string; body: string };
  borderRadius: string;
  logoUrl: string;
  logoAlt: string;
}

export type FormFieldType =
  | "text" | "email" | "tel" | "textarea"
  | "file" | "checkbox" | "select" | "url";

export interface FormFieldConfig {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    patternMessage?: string;
  };
  options?: Array<{ value: string; label: string }>;
  helpText?: string;
  maxFileSizeMB?: number;
  acceptedFileTypes?: string[];
}

export interface ContactConfig {
  personName: string;
  personRole: string;
  personEmail: string;
  personPhone: string;
  whatsappUrl?: string;
  calendlyUrl?: string;
  avatarUrl?: string;
}

export interface AnalyticsConfig {
  ga4MeasurementId?: string;
  gtmContainerId?: string;
  fbPixelId?: string;
  linkedinPartnerId?: string;
  hotjarSiteId?: string;
}

export interface CookieConsentConfig {
  enabled: boolean;
  privacyPolicyUrl: string;
  cookiePolicyUrl?: string;
  categories: { necessary: boolean; analytics: boolean; marketing: boolean };
}

export interface ChatbotConfig {
  enabled: boolean;
  provider: "tawk" | "crisp" | "intercom" | "custom";
  widgetId?: string;
  customScript?: string;
  welcomeMessage?: string;
  position?: "bottom-right" | "bottom-left";
}

export type ATSProvider =
  | "bullhorn" | "recruitee" | "greenhouse" | "pipedrive" | "custom";

export interface ATSConfig {
  provider: ATSProvider;
  webhookUrl?: string;
  fieldMappings: Record<string, string>;
  customHeaders?: Record<string, string>;
}

export interface LandingPageConfig {
  id: string;
  organizationId: string;
  slug: string;
  status: "draft" | "published" | "paused" | "archived";
  pageTitle: string;
  metaDescription: string;
  ogImageUrl?: string;
  canonicalUrl?: string;
  faviconUrl?: string;
  jobPostingSchema?: Record<string, unknown>;
  sections: SectionConfig[];
  theme: ThemeConfig;
  customCss?: string;
  analytics: AnalyticsConfig;
  cookieConsent: CookieConsentConfig;
  chatbot?: ChatbotConfig;
  ats?: ATSConfig;
  formFields: FormFieldConfig[];
  formSuccessMessage: string;
  formRedirectUrl?: string;
  contact: ContactConfig;
  organization: {
    name: string;
    slug: string;
    logoUrl: string;
    websiteUrl: string;
  };
}
