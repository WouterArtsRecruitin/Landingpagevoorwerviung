import type { LandingPageConfig } from "@/types/landing-page";
import { AEBI_SCHMIDT_SECTIONS_INTRO } from "./aebi-schmidt-sections-intro";
import { AEBI_SCHMIDT_SECTIONS_CONTENT } from "./aebi-schmidt-sections-content";

/**
 * Aebi Schmidt - Servicemonteur Regio Midden-Nederland
 *
 * Eerste live vacature landingspagina.
 * Aebi Schmidt Nederland B.V. - Holten, Overijssel
 * Veeg- en strooimachines | Mechanisch, hydraulisch, elektronisch
 */
export const AEBI_SCHMIDT_CONFIG: LandingPageConfig = {
  id: "aebi-schmidt-servicemonteur-001",
  organizationId: "aebi-schmidt-nl",
  slug: "aebi-schmidt-servicemonteur",
  status: "published",

  pageTitle: "Servicemonteur Vacature | Aebi Schmidt Nederland | Regio Midden-Nederland",
  metaDescription:
    "Word Servicemonteur bij Aebi Schmidt in Holten. Werk aan veeg- en strooimachines. Goed salaris conform CAO, servicebus, opleidingen en een stabiele werkgever met 75+ jaar ervaring.",

  theme: {
    colors: {
      primary: "#003DA5",
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
    logoUrl: "",
    logoAlt: "Aebi Schmidt Nederland",
  },

  analytics: {
    ga4MeasurementId: "",
    fbPixelId: "",
    linkedinPartnerId: "",
  },

  cookieConsent: {
    enabled: true,
    privacyPolicyUrl: "https://www.aebi-schmidt.com/nl-nl/privacy-policy/",
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
      placeholder: "Holten",
      required: false,
    },
    {
      name: "experience",
      label: "Relevante werkervaring (kort)",
      type: "textarea",
      placeholder: "Bijv. 3 jaar als monteur bij een installatiebedrijf, kennis van hydraulica...",
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
      name: "drivers_license",
      label: "Ik heb rijbewijs B",
      type: "checkbox",
      required: true,
    },
    {
      name: "privacy",
      label: "Ik ga akkoord met de privacyverklaring",
      type: "checkbox",
      required: true,
    },
  ],
  formSuccessMessage:
    "Bedankt voor je sollicitatie! We nemen binnen enkele werkdagen contact met je op.",

  contact: {
    personName: "Wouter Arts",
    personRole: "Recruitment Consultant",
    personEmail: "wouter@example.nl",
    personPhone: "06-12345678",
    whatsappUrl:
      "https://wa.me/31612345678?text=Hoi%2C%20ik%20heb%20interesse%20in%20de%20Servicemonteur%20vacature%20bij%20Aebi%20Schmidt!",
    calendlyUrl: "https://calendly.com/example/15min",
  },

  organization: {
    name: "Aebi Schmidt Nederland B.V.",
    slug: "aebi-schmidt",
    logoUrl: "",
    websiteUrl: "https://www.aebi-schmidt.com/nl-nl/",
  },

  sections: [...AEBI_SCHMIDT_SECTIONS_INTRO, ...AEBI_SCHMIDT_SECTIONS_CONTENT],
};
