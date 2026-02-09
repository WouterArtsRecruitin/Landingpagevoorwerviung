// ============================================================
// LANDING PAGE CONFIGURATION TYPES
// Elke vacature landingspagina wordt volledig vanuit config aangestuurd
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

// === THEME ===

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
  fonts: {
    heading: string;
    body: string;
  };
  borderRadius: string;
  logoUrl: string;
  logoAlt: string;
}

// === FORM FIELDS ===

export type FormFieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "file"
  | "checkbox"
  | "select"
  | "url";

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

// === CONTACT ===

export interface ContactConfig {
  personName: string;
  personRole: string;
  personEmail: string;
  personPhone: string;
  whatsappUrl?: string;
  calendlyUrl?: string;
  avatarUrl?: string;
}

// === ANALYTICS ===

export interface AnalyticsConfig {
  ga4MeasurementId?: string;
  gtmContainerId?: string;
  fbPixelId?: string;
  linkedinPartnerId?: string;
  hotjarSiteId?: string;
}

// === COOKIE / PRIVACY ===

export interface CookieConsentConfig {
  enabled: boolean;
  privacyPolicyUrl: string;
  cookiePolicyUrl?: string;
  categories: {
    necessary: boolean; // altijd true
    analytics: boolean;
    marketing: boolean;
  };
}

// === CHATBOT ===

export interface ChatbotConfig {
  enabled: boolean;
  provider: "tawk" | "crisp" | "intercom" | "custom";
  widgetId?: string;
  customScript?: string;
  welcomeMessage?: string;
  position?: "bottom-right" | "bottom-left";
}

// === ATS ===

export type ATSProvider =
  | "bullhorn"
  | "recruitee"
  | "greenhouse"
  | "pipedrive"
  | "custom";

export interface ATSConfig {
  provider: ATSProvider;
  webhookUrl?: string;
  fieldMappings: Record<string, string>;
  customHeaders?: Record<string, string>;
}

// === FULL LANDING PAGE CONFIG ===

export interface LandingPageConfig {
  id: string;
  organizationId: string;
  slug: string;
  status: "draft" | "published" | "paused" | "archived";

  // SEO
  pageTitle: string;
  metaDescription: string;
  ogImageUrl?: string;
  canonicalUrl?: string;
  faviconUrl?: string;
  jobPostingSchema?: Record<string, unknown>;

  // Content
  sections: SectionConfig[];

  // Styling
  theme: ThemeConfig;
  customCss?: string;

  // Analytics
  analytics: AnalyticsConfig;

  // Cookie consent
  cookieConsent: CookieConsentConfig;

  // Chatbot
  chatbot?: ChatbotConfig;

  // ATS
  ats?: ATSConfig;

  // Form
  formFields: FormFieldConfig[];
  formSuccessMessage: string;
  formRedirectUrl?: string;

  // Contact
  contact: ContactConfig;

  // Organization
  organization: {
    name: string;
    slug: string;
    logoUrl: string;
    websiteUrl: string;
  };
}

// === SECTION DATA TYPES ===

export interface HeroSectionData {
  companyName: string;
  companyTagline: string;
  headline: string;
  highlightedText?: string;
  subheadline: string;
  location: string;
  salary?: string;
  employmentType?: string;
  backgroundImageUrl?: string;
  backgroundImageAlt?: string;
  primaryCtaLabel: string;
  primaryCtaAction: "scroll_to_form" | "external_url" | "whatsapp";
  primaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaAction?: "scroll_to_section" | "external_url";
  secondaryCtaTarget?: string;
  quickStats?: Array<{ value: string; label: string; icon?: string }>;
  urgencyBadge?: string;
}

export interface BenefitsSectionData {
  heading: string;
  subheading?: string;
  benefits: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export interface JobDetailsSectionData {
  heading: string;
  description: string;
  quickInfo?: Array<{ icon: string; label: string; value: string }>;
  responsibilities: Array<{
    title: string;
    description: string;
  }>;
}

export interface SalaryBreakdownSectionData {
  heading: string;
  subheading?: string;
  items: Array<{
    icon: string;
    label: string;
    value: string;
    description: string;
  }>;
  totalLabel: string;
  totalValue: string;
  totalDescription?: string;
}

export interface TestimonialsSectionData {
  heading: string;
  subheading?: string;
  testimonials: Array<{
    name: string;
    role: string;
    imageUrl?: string;
    quote: string;
    rating?: number;
  }>;
}

export interface RequirementsSectionData {
  heading: string;
  subheading?: string;
  mustHave: Array<{ text: string }>;
  niceToHave?: Array<{ text: string }>;
  noRequirements?: Array<{ text: string }>;
}

export interface FAQSectionData {
  heading: string;
  subheading?: string;
  faqs: Array<{ question: string; answer: string }>;
}

export interface TrustSignalsSectionData {
  heading: string;
  subheading?: string;
  stats: Array<{
    icon: string;
    value: string;
    label: string;
  }>;
  certifications?: Array<{ label: string; imageUrl?: string }>;
}

export interface FinalCTASectionData {
  heading: string;
  highlightedText?: string;
  subheading: string;
  ctaOptions: Array<{
    type: "apply" | "whatsapp" | "calendly" | "call" | "email";
    heading: string;
    description: string;
    buttonLabel: string;
    url?: string;
  }>;
  trustBadges?: string[];
}

export interface AboutCompanySectionData {
  heading: string;
  description: string;
  imageUrl?: string;
  stats?: Array<{ value: string; label: string }>;
  highlights?: string[];
}

export interface ApplicationFormSectionData {
  heading: string;
  subheading?: string;
  showWhatsAppAlternative?: boolean;
  showCalendlyAlternative?: boolean;
}

export interface DayInLifeSectionData {
  heading: string;
  subheading?: string;
  timeline: Array<{
    time: string;
    title: string;
    description: string;
    icon?: string;
  }>;
}

export interface WorkGallerySectionData {
  heading: string;
  subheading?: string;
  images: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;
}

export interface WhyJoinUsSectionData {
  heading: string;
  subheading?: string;
  reasons: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export interface CustomHTMLSectionData {
  html: string;
  containerClass?: string;
}

export interface VideoEmbedSectionData {
  heading?: string;
  subheading?: string;
  videoUrl: string;
  posterImageUrl?: string;
}
