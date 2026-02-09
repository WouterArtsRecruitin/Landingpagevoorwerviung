/**
 * Facebook / Meta Pixel integratie
 */

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

let initialized = false;

export function initFacebookPixel(pixelId: string): void {
  if (initialized || !pixelId) return;

  // Facebook Pixel base code
  const f = window;
  const b = document;
  const n = "script";

  if (f.fbq) return;

  const fbq: any = function () {
    // eslint-disable-next-line prefer-rest-params
    fbq.callMethod
      ? fbq.callMethod.apply(fbq, arguments)
      : fbq.queue.push(arguments);
  };

  if (!f._fbq) f._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  f.fbq = fbq;

  const script = b.createElement(n) as HTMLScriptElement;
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const firstScript = b.getElementsByTagName(n)[0];
  firstScript?.parentNode?.insertBefore(script, firstScript);

  window.fbq("init", pixelId);
  window.fbq("track", "PageView");

  initialized = true;
}

export function trackFBEvent(eventName: string, params?: Record<string, unknown>): void {
  if (!initialized || !window.fbq) return;
  window.fbq("track", eventName, params);
}

export function trackFBCustomEvent(eventName: string, params?: Record<string, unknown>): void {
  if (!initialized || !window.fbq) return;
  window.fbq("trackCustom", eventName, params);
}
