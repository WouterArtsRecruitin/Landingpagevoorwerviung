import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { LandingPageLoader } from "@/components/LandingPageLoader";
import { SectionRenderer } from "@/components/SectionRenderer";
import { ConfigProvider } from "@/providers/ConfigProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { TrackingProvider } from "@/providers/TrackingProvider";
import { ABTestProvider, useABTest } from "@/providers/ABTestProvider";
import { StickyHeader } from "@/components/shared/StickyHeader";
import { FloatingApplyButton } from "@/components/shared/FloatingApplyButton";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { SEOHead } from "@/components/shared/SEOHead";
import { ChatbotWidget } from "@/components/shared/ChatbotWidget";
import { CookieConsent, getStoredConsent, type ConsentState } from "@/components/shared/CookieConsent";
import type { LandingPageConfig } from "@/types/landing-page";

function LandingPageContent({ config }: { config: LandingPageConfig }) {
  const assignment = useABTest();

  return (
    <>
      <SEOHead />
      <StickyHeader />
      <main>
        <SectionRenderer
          sections={assignment?.resolvedSections || config.sections}
        />
      </main>
      <FloatingApplyButton />
      <WhatsAppButton position="bottom-left" />
      {config.chatbot?.enabled && <ChatbotWidget config={config.chatbot} />}
    </>
  );
}

export default function LandingPage() {
  const { slug = "demo" } = useParams<{ slug: string }>();
  const [consent, setConsent] = useState<ConsentState>(getStoredConsent);

  const handleConsentChange = useCallback((newConsent: ConsentState) => {
    setConsent(newConsent);
  }, []);

  return (
    <LandingPageLoader slug={slug}>
      {(config) => (
        <ConfigProvider config={config}>
          <ThemeProvider theme={config.theme}>
            <TrackingProvider
              landingPageId={config.id}
              analyticsConfig={config.analytics}
              consentGiven={{
                analytics: consent.analytics,
                marketing: consent.marketing,
              }}
            >
              <ABTestProvider
                landingPageId={config.id}
                baseSections={config.sections}
                variants={[]}
              >
                <LandingPageContent config={config} />
                <CookieConsent
                  config={config.cookieConsent}
                  onConsentChange={handleConsentChange}
                />
              </ABTestProvider>
            </TrackingProvider>
          </ThemeProvider>
        </ConfigProvider>
      )}
    </LandingPageLoader>
  );
}
