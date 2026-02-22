// ============================================================
// INTAKE PROCESSOR
// Vertaalt IntakeFormData naar IntakeBriefing voor de agent workflows
// Brug tussen het bestaande intake formulier en het agent-systeem
// ============================================================

import type { IntakeFormData } from "@/types/admin";
import type { IntakeBriefing, WorkflowContext } from "../../agents/shared/types";

/**
 * Genereer een uniek run ID voor een workflow-sessie.
 */
function generateRunId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `run-${timestamp}-${random}`;
}

/**
 * Vertaal IntakeFormData (bestaand formulier) naar IntakeBriefing (agent-formaat).
 * Dit is de brug tussen het huidige systeem en de nieuwe agent-workflows.
 */
export function intakeFormToBriefing(form: IntakeFormData): IntakeBriefing {
  return {
    // Bedrijf
    companyName: form.company_name,
    companyWebsite: form.company_website,
    companyLogoUrl: form.company_logo_url,
    companySector: form.company_sector,
    brandColors: {
      primary: form.primary_color || "#003DA5",
    },

    // Vacature
    jobTitle: form.job_title,
    jobLocation: form.job_location,
    salaryRange: {
      min: form.salary_min,
      max: form.salary_max,
    },
    employmentType: form.employment_type || "fulltime",
    jobDescription: form.job_description,

    // Details
    responsibilities: form.responsibilities || [],
    requirementsMust: form.requirements_must || [],
    requirementsNice: form.requirements_nice || [],
    benefits: form.benefits || [],

    // Contact
    contactName: form.contact_name,
    contactRole: form.contact_role,
    contactEmail: form.contact_email,
    contactPhone: form.contact_phone,
    contactWhatsapp: form.contact_whatsapp,

    // Stijl
    templateStyle: form.template_style || "auto",
    imageStyle: form.image_style || "photos",
    calendlyUrl: form.calendly_url || "",

    // Analytics
    ga4MeasurementId: form.ga4_measurement_id,
  };
}

/**
 * Maak een nieuwe WorkflowContext aan op basis van intake data.
 * Dit is het startpunt voor zowel de Figma als Lovable workflow.
 */
export function createWorkflowContext(form: IntakeFormData): WorkflowContext {
  return {
    runId: generateRunId(),
    startedAt: new Date().toISOString(),
    intakeData: intakeFormToBriefing(form),
    agentResults: {},
    stepStatuses: {},
    userFeedback: [],
    metadata: {
      source: "intake-form",
      createdBy: form.contact_email || form.created_by,
    },
  };
}

/**
 * Valideer of de intake data voldoende is om een workflow te starten.
 * Geeft een lijst van ontbrekende/ongeldige velden terug.
 */
export function validateIntakeForWorkflow(
  form: IntakeFormData
): { valid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Verplichte velden
  if (!form.company_name?.trim()) {
    errors.push("Bedrijfsnaam is verplicht");
  }
  if (!form.job_title?.trim()) {
    errors.push("Functietitel is verplicht");
  }
  if (!form.job_location?.trim()) {
    errors.push("Locatie is verplicht");
  }
  if (!form.contact_name?.trim()) {
    errors.push("Contactpersoon naam is verplicht");
  }
  if (!form.contact_email?.trim()) {
    errors.push("Contactpersoon e-mail is verplicht");
  }

  // E-mail validatie
  const email = form.contact_email?.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("E-mailadres contactpersoon is ongeldig");
  }

  // Salaris validatie
  if (form.salary_min && form.salary_max && form.salary_min > form.salary_max) {
    errors.push("Salaris minimum mag niet hoger zijn dan maximum");
  }

  // Aanbevelingen (warnings)
  if (!form.company_sector) {
    warnings.push("Branche ontbreekt – automatische stijlkeuze is minder nauwkeurig");
  }
  if (!form.salary_min && !form.salary_max) {
    warnings.push("Salaris ontbreekt – salaristransparantie verhoogt conversie met 44%");
  }
  if (form.responsibilities.length === 0) {
    warnings.push("Geen verantwoordelijkheden – de 'Wat ga je doen?' sectie wordt overgeslagen");
  }
  if (form.benefits.length === 0) {
    warnings.push("Geen arbeidsvoorwaarden – de 'Wat bieden wij?' sectie wordt overgeslagen");
  }
  if (!form.contact_phone) {
    warnings.push("Geen telefoonnummer – kandidaten kunnen niet direct bellen");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
