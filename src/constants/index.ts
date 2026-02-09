// ============================================================
// FRAMEWORK CONSTANTS
// Alle hardcoded waarden op één plek voor eenvoudig aanpassen
// ============================================================

// DOM element IDs
export const SECTION_IDS = {
  APPLICATION_FORM: "application-form",
} as const;

// LocalStorage keys
export const STORAGE_KEYS = {
  ANONYMOUS_ID: "rlf_anonymous_id",
  COOKIE_CONSENT: "rlf_cookie_consent",
  UTM_PARAMS: "rlf_utm_params",
} as const;

// Analytics defaults
export const ANALYTICS = {
  EVENT_FLUSH_INTERVAL_MS: 5000,
  EVENT_BATCH_SIZE: 20,
  SCROLL_THRESHOLDS: [25, 50, 75, 100] as readonly number[],
  TIME_MILESTONES: [30, 60, 120, 300] as readonly number[],
  DEFAULT_CURRENCY: "EUR",
} as const;

// UI thresholds
export const UI = {
  STICKY_HEADER_SCROLL_PX: 300,
  FLOATING_BUTTON_SCROLL_PX: 600,
  SECTION_VISIBILITY_THRESHOLD: 0.3,
} as const;

// Default messages
export const DEFAULTS = {
  FORM_SUCCESS_MESSAGE: "Bedankt! We nemen snel contact op.",
} as const;
