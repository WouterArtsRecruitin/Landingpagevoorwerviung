import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import { initGA4, sendGA4Event } from "@/lib/analytics/ga4";
import { initFacebookPixel, trackFBEvent, trackFBCustomEvent } from "@/lib/analytics/facebook-pixel";
import { initLinkedInPixel } from "@/lib/analytics/linkedin-pixel";
import { initUTMTracking } from "@/lib/analytics/utm";
import { queueEvent, startEventFlushing, stopEventFlushing } from "@/lib/analytics/tracker";
import { initScrollTracking } from "@/lib/analytics/scroll-tracker";
import { initTimeTracking } from "@/lib/analytics/time-tracker";
import { getOrCreateAnonymousId, getDeviceType, getBrowserName } from "@/lib/utils";
import { ANALYTICS } from "@/constants";
import type { TrackingContextValue, AnalyticsEventName, UTMParams } from "@/types/analytics";
import type { AnalyticsConfig } from "@/types/landing-page";

const TrackingContext = createContext<TrackingContextValue | null>(null);

interface TrackingProviderProps {
  landingPageId: string;
  variantId?: string;
  analyticsConfig: AnalyticsConfig;
  consentGiven: { analytics: boolean; marketing: boolean };
  children: ReactNode;
}

export function TrackingProvider({
  landingPageId,
  variantId,
  analyticsConfig,
  consentGiven,
  children,
}: TrackingProviderProps) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [utmParams, setUtmParams] = useState<UTMParams>({});
  const cleanupRef = useRef<Array<() => void>>([]);

  // Initialiseer tracking
  useEffect(() => {
    const utm = initUTMTracking();
    setUtmParams(utm);

    // Initialiseer analytics scripts (alleen met consent)
    if (consentGiven.analytics) {
      if (analyticsConfig.ga4MeasurementId) {
        initGA4(analyticsConfig.ga4MeasurementId);
      }
    }

    if (consentGiven.marketing) {
      if (analyticsConfig.fbPixelId) {
        initFacebookPixel(analyticsConfig.fbPixelId);
      }
      if (analyticsConfig.linkedinPartnerId) {
        initLinkedInPixel(analyticsConfig.linkedinPartnerId);
      }
    }

    // Maak visitor session aan
    const anonymousId = getOrCreateAnonymousId();

    async function createSession() {
      const { data, error } = await supabase
        .from("visitor_sessions")
        .insert({
          landing_page_id: landingPageId,
          variant_id: variantId,
          anonymous_id: anonymousId,
          utm_source: utm.source,
          utm_medium: utm.medium,
          utm_campaign: utm.campaign,
          utm_term: utm.term,
          utm_content: utm.content,
          referrer: document.referrer || null,
          landing_url: window.location.href,
          device_type: getDeviceType(),
          browser: getBrowserName(),
          screen_width: window.innerWidth,
        })
        .select("id")
        .single();

      if (data && !error) {
        setSessionId(data.id);
      }
    }

    createSession();
    startEventFlushing();

    return () => {
      stopEventFlushing();
      cleanupRef.current.forEach((fn) => fn());
    };
  }, [landingPageId, variantId, analyticsConfig, consentGiven]);

  // Start scroll en time tracking zodra we een session hebben
  useEffect(() => {
    if (!sessionId) return;

    const cleanupScroll = initScrollTracking((depth) => {
      queueEvent(sessionId, landingPageId, variantId, "scroll_depth", { depth });
      if (consentGiven.analytics) {
        sendGA4Event("scroll_depth", { depth, variant: variantId });
      }
    });

    const cleanupTime = initTimeTracking((seconds) => {
      queueEvent(sessionId, landingPageId, variantId, "time_milestone", { seconds });
      if (consentGiven.analytics) {
        sendGA4Event("time_milestone", { seconds, variant: variantId });
      }
    });

    // Track page_view
    queueEvent(sessionId, landingPageId, variantId, "page_view", {
      url: window.location.href,
    });

    cleanupRef.current = [cleanupScroll, cleanupTime];

    return () => {
      cleanupScroll();
      cleanupTime();
    };
  }, [sessionId, landingPageId, variantId, consentGiven]);

  const trackEvent = useCallback(
    (name: AnalyticsEventName, data: Record<string, unknown> = {}) => {
      if (!sessionId) return;
      queueEvent(sessionId, landingPageId, variantId, name, data);

      if (consentGiven.analytics) {
        sendGA4Event(name, { ...data, variant: variantId });
      }
    },
    [sessionId, landingPageId, variantId, consentGiven]
  );

  const trackCTAClick = useCallback(
    (label: string, section: string) => {
      trackEvent("cta_click", { label, section });
      if (consentGiven.marketing) {
        trackFBCustomEvent("CTAClick", { label, section });
      }
    },
    [trackEvent, consentGiven]
  );

  const trackScrollDepth = useCallback(
    (depth: number) => {
      trackEvent("scroll_depth", { depth });
    },
    [trackEvent]
  );

  const trackSectionView = useCallback(
    (sectionId: string) => {
      trackEvent("section_view", { section: sectionId });
    },
    [trackEvent]
  );

  const trackFormSubmit = useCallback(() => {
    trackEvent("form_submit", {});

    if (consentGiven.analytics) {
      sendGA4Event("generate_lead", { currency: ANALYTICS.DEFAULT_CURRENCY });
    }
    if (consentGiven.marketing) {
      trackFBEvent("Lead", {});
    }
  }, [trackEvent, consentGiven]);

  const value: TrackingContextValue = {
    sessionId,
    variantId: variantId || null,
    utmParams,
    consentGiven,
    trackEvent,
    trackCTAClick,
    trackScrollDepth,
    trackSectionView,
    trackFormSubmit,
  };

  return (
    <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>
  );
}

export function useTracking(): TrackingContextValue {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error("useTracking must be used within a TrackingProvider");
  }
  return context;
}
