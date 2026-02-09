export interface ApplicationSubmission {
  landingPageId: string;
  variantId?: string;
  sessionId: string;

  fullName: string;
  email: string;
  phone?: string;
  city?: string;
  motivation?: string;
  cvFile?: File;

  extraFields: Record<string, unknown>;

  privacyConsent: boolean;
  newsletterConsent: boolean;

  // Auto-populated attribution
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  landingUrl?: string;
  deviceType?: string;
  browser?: string;
}

export interface ApplicationResult {
  success: boolean;
  applicationId?: string;
  error?: string;
}

export type ATSSyncStatus = "pending" | "synced" | "failed" | "skipped";
