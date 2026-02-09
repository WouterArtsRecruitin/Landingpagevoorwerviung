import { useState, useEffect, useCallback } from "react";
import { Cookie, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { CookieConsentConfig } from "@/types/landing-page";

const CONSENT_KEY = "rlf_cookie_consent";

export interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  decided: boolean;
}

interface CookieConsentProps {
  config: CookieConsentConfig;
  onConsentChange: (consent: ConsentState) => void;
}

export function getStoredConsent(): ConsentState {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { analytics: false, marketing: false, decided: false };
}

export function CookieConsent({ config, onConsentChange }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentState>(getStoredConsent);

  useEffect(() => {
    if (!config.enabled) {
      // Als cookies niet geconfigureerd zijn, geef alles vrij
      onConsentChange({ analytics: true, marketing: true, decided: true });
      return;
    }

    const stored = getStoredConsent();
    if (stored.decided) {
      onConsentChange(stored);
    } else {
      setVisible(true);
    }
  }, [config.enabled, onConsentChange]);

  const saveConsent = useCallback(
    (newConsent: ConsentState) => {
      const final = { ...newConsent, decided: true };
      localStorage.setItem(CONSENT_KEY, JSON.stringify(final));
      setConsent(final);
      setVisible(false);
      onConsentChange(final);
    },
    [onConsentChange]
  );

  function acceptAll() {
    saveConsent({ analytics: true, marketing: true, decided: true });
  }

  function acceptNecessary() {
    saveConsent({ analytics: false, marketing: false, decided: true });
  }

  function saveCustom() {
    saveConsent(consent);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 animate-slide-up">
      <div className="max-w-2xl mx-auto bg-background rounded-xl shadow-2xl border p-6">
        <div className="flex items-start gap-3 mb-4">
          <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground mb-1">Cookie voorkeuren</h3>
            <p className="text-sm text-muted-foreground">
              Wij gebruiken cookies om je ervaring te verbeteren en om het succes van onze
              vacaturepagina&apos;s te meten.{" "}
              {config.privacyPolicyUrl && (
                <a
                  href={config.privacyPolicyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Privacybeleid
                </a>
              )}
            </p>
          </div>
        </div>

        {showDetails && (
          <div className="space-y-3 mb-4 pl-9">
            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" checked disabled className="h-4 w-4 rounded" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">Noodzakelijk</strong> - Vereist voor basisfunctionaliteit
              </span>
            </label>
            <label className="flex items-center gap-3 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={consent.analytics}
                onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                className="h-4 w-4 rounded"
              />
              <span className="text-muted-foreground">
                <strong className="text-foreground">Analytics</strong> - GA4 en eigen statistieken
              </span>
            </label>
            <label className="flex items-center gap-3 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={consent.marketing}
                onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                className="h-4 w-4 rounded"
              />
              <span className="text-muted-foreground">
                <strong className="text-foreground">Marketing</strong> - Facebook Pixel, LinkedIn Insight Tag
              </span>
            </label>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 pl-9">
          <Button onClick={acceptAll} size="sm">
            Alles accepteren
          </Button>
          {showDetails ? (
            <Button onClick={saveCustom} variant="outline" size="sm">
              Voorkeuren opslaan
            </Button>
          ) : (
            <Button
              onClick={() => setShowDetails(true)}
              variant="outline"
              size="sm"
            >
              <Settings className="h-4 w-4 mr-1" />
              Aanpassen
            </Button>
          )}
          <Button onClick={acceptNecessary} variant="ghost" size="sm">
            Alleen noodzakelijk
          </Button>
        </div>
      </div>
    </div>
  );
}
