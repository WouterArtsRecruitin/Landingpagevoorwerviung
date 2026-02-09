// ============================================================
// SECTION DATA TYPES
// Per-sectie data interfaces die de `data` prop van SectionConfig typeren
// ============================================================

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
  benefits: Array<{ icon: string; title: string; description: string }>;
}

export interface JobDetailsSectionData {
  heading: string;
  description: string;
  quickInfo?: Array<{ icon: string; label: string; value: string }>;
  responsibilities: Array<{ title: string; description: string }>;
}

export interface SalaryBreakdownSectionData {
  heading: string;
  subheading?: string;
  items: Array<{ icon: string; label: string; value: string; description: string }>;
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
  stats: Array<{ icon: string; value: string; label: string }>;
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
  timeline: Array<{ time: string; title: string; description: string; icon?: string }>;
}

export interface WorkGallerySectionData {
  heading: string;
  subheading?: string;
  images: Array<{ url: string; alt: string; caption?: string }>;
}

export interface WhyJoinUsSectionData {
  heading: string;
  subheading?: string;
  reasons: Array<{ icon: string; title: string; description: string }>;
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
