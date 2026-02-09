import type { LandingPageConfig } from "@/types/landing-page";
import { DEMO_SECTIONS_INTRO } from "./demo-sections-intro";
import { DEMO_SECTIONS_CONTENT } from "./demo-sections-content";

/**
 * Demo configuratie - wordt gebruikt als fallback wanneer Supabase niet geconfigureerd is.
 * Dit is een volledig voorbeeld van hoe een landingspagina configuratie eruitziet.
 *
 * In productie wordt dit vervangen door data uit Supabase.
 * Pas deze config aan om snel een nieuwe vacature landingspagina te maken.
 */
export const DEMO_CONFIG: LandingPageConfig = {
  id: "demo-page-001",
  organizationId: "demo-org-001",
  slug: "demo",
  status: "published",

  pageTitle: "Servicemonteur Vacature | Demo Bedrijf | Regio Amsterdam",
  metaDescription:
    "Word Servicemonteur bij Demo Bedrijf. Salaris tot €4.200, servicewagen, opleidingsbudget en uitstekende secundaire arbeidsvoorwaarden.",

  theme: {
    colors: {
      primary: "#2563EB",
      secondary: "#1E293B",
      accent: "#F8FAFC",
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
    logoUrl: "",
    logoAlt: "Demo Bedrijf",
  },

  analytics: {
    ga4MeasurementId: "",
    fbPixelId: "",
    linkedinPartnerId: "",
  },

  cookieConsent: {
    enabled: true,
    privacyPolicyUrl: "#privacy",
    categories: {
      necessary: true,
      analytics: true,
      marketing: true,
    },
  },

  chatbot: {
    enabled: false,
    provider: "tawk",
  },

  formFields: [
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
      name: "city",
      label: "Woonplaats",
      type: "text",
      placeholder: "Amsterdam",
      required: false,
    },
    {
      name: "motivation",
      label: "Waarom wil je hier werken?",
      type: "textarea",
      placeholder: "Vertel ons waarom deze functie bij je past...",
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
    {
      name: "newsletter",
      label: "Ik wil op de hoogte blijven van soortgelijke vacatures",
      type: "checkbox",
      required: false,
    },
  ],
  formSuccessMessage:
    "Bedankt voor je sollicitatie! We nemen binnen 2 werkdagen contact met je op.",

  contact: {
    personName: "Lisa Jansen",
    personRole: "Recruitment Consultant",
    personEmail: "lisa@demobedrijf.nl",
    personPhone: "020-1234567",
    whatsappUrl:
      "https://wa.me/31612345678?text=Hoi%2C%20ik%20heb%20interesse%20in%20de%20Servicemonteur%20vacature!",
    calendlyUrl: "https://calendly.com/demo/15min",
  },

  organization: {
    name: "Demo Bedrijf B.V.",
    slug: "demo-bedrijf",
    logoUrl: "",
    websiteUrl: "https://demobedrijf.nl",
  },

  sections: [...DEMO_SECTIONS_INTRO, ...DEMO_SECTIONS_CONTENT],
};
