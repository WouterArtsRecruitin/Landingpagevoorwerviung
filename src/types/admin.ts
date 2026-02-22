// ============================================================
// ADMIN TYPES
// Types voor intake formulier, dashboard, kandidaat management
// ============================================================

export interface IntakeFormData {
  // Stap 1: Bedrijf
  company_name: string;
  company_website: string;
  company_logo_url: string;
  company_logo_file?: File | null;
  company_sector: string;
  primary_color: string;
  secondary_color: string;
  template_style?: string;
  image_style?: string;
  calendly_url?: string;

  // Stap 2: Vacature
  job_title: string;
  job_location: string;
  salary_min: number | null;
  salary_max: number | null;
  employment_type: "fulltime" | "parttime" | "flex" | "interim" | "stage";
  job_description: string;
  vacancy_text_url: string;
  vacancy_text_file?: File | null;

  // Stap 3: Details
  responsibilities: string[];
  requirements_must: string[];
  requirements_nice: string[];
  benefits: string[];

  // Stap 4: Contact
  contact_name: string;
  contact_role: string;
  contact_email: string;
  contact_phone: string;
  contact_whatsapp: string;

  // Stap 4: Analytics (bij contact stap)
  ga4_measurement_id: string;

  // Meta
  created_by: string;
}

export interface IntakeSubmission extends IntakeFormData {
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  landing_page_id: string | null;
  error_message: string | null;
  created_at: string;
  processed_at: string | null;
}

export interface LandingPageSummary {
  id: string;
  slug: string;
  status: "draft" | "published" | "paused" | "archived";
  page_title: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  application_count: number;
  contact_person_name: string;
}

export interface CandidateRow {
  id: string;
  landing_page_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  city: string | null;
  motivation: string | null;
  cv_storage_path: string | null;
  extra_fields: Record<string, unknown>;
  privacy_consent: boolean;
  utm_source: string | null;
  utm_campaign: string | null;
  device_type: string | null;
  ats_sync_status: string;
  created_at: string;
  retention_expires_at: string | null;
  anonymized_at: string | null;
  // Joined data
  page_title?: string;
  page_slug?: string;
}

export interface GdprRequest {
  id: string;
  request_type: "export" | "delete" | "rectify";
  requester_email: string;
  requester_name: string | null;
  scope: "candidate" | "all";
  landing_page_id: string | null;
  application_id: string | null;
  status: "pending" | "in_progress" | "completed" | "rejected";
  processed_by: string | null;
  notes: string | null;
  export_file_url: string | null;
  data_deleted_at: string | null;
  created_at: string;
  processed_at: string | null;
  deadline_at: string | null;
}

export interface DashboardStats {
  totalPages: number;
  publishedPages: number;
  totalCandidates: number;
  candidatesThisWeek: number;
  pendingGdprRequests: number;
}

export const INTAKE_STEPS = [
  { id: 1, label: "Bedrijf", description: "Bedrijfsgegevens" },
  { id: 2, label: "Vacature", description: "Functie & salaris" },
  { id: 3, label: "Details", description: "Taken & eisen" },
  { id: 4, label: "Contact", description: "Contactpersoon" },
] as const;

export const EMPLOYMENT_TYPES = [
  { value: "fulltime", label: "Fulltime" },
  { value: "parttime", label: "Parttime" },
  { value: "flex", label: "Flex / Oproep" },
  { value: "interim", label: "Interim" },
  { value: "stage", label: "Stage" },
] as const;

export const SECTORS = [
  "Techniek & Industrie",
  "Bouw & Vastgoed",
  "ICT & Telecom",
  "Logistiek & Transport",
  "Zorg & Welzijn",
  "Horeca & Toerisme",
  "Retail & E-commerce",
  "Finance & Accounting",
  "Marketing & Communicatie",
  "Onderwijs & Overheid",
  "Agrarisch & Groen",
  "Overig",
] as const;
