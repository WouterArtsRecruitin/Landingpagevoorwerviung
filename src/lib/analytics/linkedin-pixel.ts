/**
 * LinkedIn Insight Tag integratie
 */

declare global {
  interface Window {
    _linkedin_data_partner_ids: string[];
    lintrk: (action: string, data: Record<string, unknown>) => void;
  }
}

let initialized = false;

export function initLinkedInPixel(partnerId: string): void {
  if (initialized || !partnerId) return;

  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(partnerId);

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
  document.head.appendChild(script);

  // Noscript pixel
  const noscript = document.createElement("noscript");
  const img = document.createElement("img");
  img.height = 1;
  img.width = 1;
  img.style.display = "none";
  img.alt = "";
  img.src = `https://px.ads.linkedin.com/collect/?pid=${partnerId}&fmt=gif`;
  noscript.appendChild(img);
  document.body.appendChild(noscript);

  initialized = true;
}

export function trackLinkedInConversion(conversionId: string): void {
  if (!initialized || !window.lintrk) return;
  window.lintrk("track", { conversion_id: conversionId });
}
