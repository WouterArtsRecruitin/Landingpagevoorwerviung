import type { UTMParams } from "@/types/analytics";

const UTM_STORAGE_KEY = "rlf_utm_params";

/**
 * Parse UTM parameters uit de huidige URL
 */
export function parseUTMFromUrl(): UTMParams {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get("utm_source") || undefined,
    medium: params.get("utm_medium") || undefined,
    campaign: params.get("utm_campaign") || undefined,
    term: params.get("utm_term") || undefined,
    content: params.get("utm_content") || undefined,
  };
}

/**
 * Sla UTM parameters op in sessionStorage (voor de hele sessie beschikbaar)
 */
export function storeUTMParams(params: UTMParams): void {
  if (Object.values(params).some(Boolean)) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));
  }
}

/**
 * Haal opgeslagen UTM parameters op
 */
export function getStoredUTMParams(): UTMParams {
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Initialiseer UTM tracking: parse uit URL en sla op
 */
export function initUTMTracking(): UTMParams {
  const urlParams = parseUTMFromUrl();

  // Alleen overschrijven als er daadwerkelijk UTM params in de URL staan
  if (Object.values(urlParams).some(Boolean)) {
    storeUTMParams(urlParams);
    return urlParams;
  }

  return getStoredUTMParams();
}
