/**
 * GA4 integratie
 * Laadt gtag.js en biedt helper functies voor event tracking
 */

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;

/**
 * Initialiseer GA4 met measurement ID
 */
export function initGA4(measurementId: string): void {
  if (initialized || !measurementId) return;

  // Maak dataLayer aan
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments as unknown as Record<string, unknown>);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false, // We sturen zelf page_view events
    cookie_flags: "SameSite=None;Secure",
  });

  // Laad gtag.js script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  initialized = true;
}

/**
 * Stuur een GA4 event
 */
export function sendGA4Event(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (!initialized || !window.gtag) return;
  window.gtag("event", eventName, params);
}

/**
 * Track een conversie (voor Google Ads / GA4)
 */
export function sendGA4Conversion(
  eventName: string,
  value?: number,
  currency: string = "EUR"
): void {
  sendGA4Event(eventName, {
    value,
    currency,
    send_to: "default",
  });
}
