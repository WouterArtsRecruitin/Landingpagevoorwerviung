import type { IntakeFormData } from "@/types/admin";

export const STEPS = [
  { id: 1, label: "Bedrijf" },
  { id: 2, label: "Vacature" },
  { id: 3, label: "Details" },
  { id: 4, label: "Contact" },
  { id: 5, label: "Controleer" },
] as const;

/** Verplichte velden (need-to-have) */
export const REQUIRED_FIELDS: Array<{
  key: keyof IntakeFormData;
  label: string;
  hint: string;
  step: number;
}> = [
  { key: "company_name", label: "Bedrijfsnaam", hint: "De officiële naam van het bedrijf", step: 1 },
  { key: "job_title", label: "Functietitel", hint: "Bijv. 'Servicemonteur', 'Accountmanager'", step: 2 },
  { key: "job_location", label: "Locatie", hint: "Bijv. 'Amsterdam', 'Regio Midden-Nederland'", step: 2 },
  { key: "contact_name", label: "Contactpersoon naam", hint: "Naam van de recruiter", step: 4 },
  { key: "contact_email", label: "Contactpersoon e-mail", hint: "E-mailadres voor kandidaatcontact", step: 4 },
];

/** Aanbevolen velden (nice-to-have) */
export const RECOMMENDED_FIELDS: Array<{
  key: keyof IntakeFormData;
  label: string;
  hint: string;
  step: number;
  isArray?: boolean;
}> = [
  { key: "company_website", label: "Bedrijfswebsite", hint: "Voor branding & privacy policy link", step: 1 },
  { key: "company_sector", label: "Branche", hint: "Helpt bij het genereren van relevante content", step: 1 },
  { key: "salary_min", label: "Salaris minimum", hint: "Salaris transparantie verhoogt conversie met 44%", step: 2 },
  { key: "salary_max", label: "Salaris maximum", hint: "Geeft kandidaten duidelijkheid", step: 2 },
  { key: "job_description", label: "Functiebeschrijving", hint: "2-3 zinnen over de functie", step: 2 },
  { key: "responsibilities", label: "Verantwoordelijkheden", hint: "Wat gaat de kandidaat doen?", step: 3, isArray: true },
  { key: "requirements_must", label: "Eisen (must-have)", hint: "Minimale vereisten voor de functie", step: 3, isArray: true },
  { key: "benefits", label: "Arbeidsvoorwaarden", hint: "Wat bied je aan? (salaris, auto, opleiding etc.)", step: 3, isArray: true },
  { key: "contact_phone", label: "Telefoonnummer", hint: "Voor direct contact met kandidaten", step: 4 },
];

export const EMPTY_FORM: IntakeFormData = {
  company_name: "",
  company_website: "",
  company_logo_url: "",
  company_sector: "",
  primary_color: "#003DA5",
  job_title: "",
  job_location: "",
  salary_min: null,
  salary_max: null,
  employment_type: "fulltime",
  job_description: "",
  responsibilities: [],
  requirements_must: [],
  requirements_nice: [],
  benefits: [],
  contact_name: "",
  contact_role: "",
  contact_email: "",
  contact_phone: "",
  contact_whatsapp: "",
  ga4_measurement_id: "",
  created_by: "",
};

/** Validatie helpers */
export function getMissingRequired(form: IntakeFormData) {
  return REQUIRED_FIELDS.filter((f) => {
    const val = form[f.key];
    return !val || (typeof val === "string" && val.trim() === "");
  });
}

export function getMissingRecommended(form: IntakeFormData) {
  return RECOMMENDED_FIELDS.filter((f) => {
    const val = form[f.key];
    if (f.isArray) return !val || (val as string[]).length === 0;
    return !val || (typeof val === "string" && val.trim() === "");
  });
}

export function getValidationErrors(form: IntakeFormData): string[] {
  const errors: string[] = [];
  if (form.contact_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact_email)) {
    errors.push("E-mailadres contactpersoon is ongeldig");
  }
  if (form.salary_min && form.salary_max && form.salary_min > form.salary_max) {
    errors.push("Salaris minimum mag niet hoger zijn dan maximum");
  }
  if (form.company_website && !form.company_website.startsWith("http")) {
    errors.push("Website moet beginnen met http:// of https://");
  }
  return errors;
}
