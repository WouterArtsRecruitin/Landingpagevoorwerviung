export type AnalyticsEventName =
  | "page_view"
  | "scroll_depth"
  | "cta_click"
  | "form_open"
  | "form_submit"
  | "form_error"
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "calendly_click"
  | "section_view"
  | "time_milestone"
  | "page_exit"
  | "video_play"
  | "chatbot_open"
  | "cookie_consent";

export type EventCategory = "engagement" | "conversion" | "navigation";

export interface AnalyticsEvent {
  sessionId: string;
  landingPageId: string;
  variantId?: string;
  eventName: AnalyticsEventName;
  eventCategory: EventCategory;
  eventData: Record<string, unknown>;
}

export interface UTMParams {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export interface VisitorSession {
  id: string;
  landingPageId: string;
  variantId?: string;
  anonymousId: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  landingUrl: string;
  deviceType: "mobile" | "desktop" | "tablet";
  browser: string;
  screenWidth: number;
  pageEnteredAt: string;
  maxScrollDepth: number;
  didClickCta: boolean;
  didSubmitForm: boolean;
}

export interface TrackingContextValue {
  sessionId: string | null;
  variantId: string | null;
  utmParams: UTMParams;
  consentGiven: {
    analytics: boolean;
    marketing: boolean;
  };
  trackEvent: (name: AnalyticsEventName, data?: Record<string, unknown>) => void;
  trackCTAClick: (label: string, section: string) => void;
  trackScrollDepth: (depth: number) => void;
  trackSectionView: (sectionId: string) => void;
  trackFormSubmit: () => void;
}
