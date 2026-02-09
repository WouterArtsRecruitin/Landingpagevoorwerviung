import type { LandingPageConfig } from "@/types/landing-page";
import { DEMO_CONFIG } from "@/constants/demo-config";
import { AEBI_SCHMIDT_CONFIG } from "./aebi-schmidt-servicemonteur";

/**
 * Registry van alle lokale vacature configs.
 * Wordt gebruikt als fallback wanneer Supabase niet beschikbaar is.
 *
 * Voeg hier nieuwe configs toe: slug → config object
 */
export const LOCAL_CONFIGS: Record<string, LandingPageConfig> = {
  demo: DEMO_CONFIG,
  "aebi-schmidt-servicemonteur": AEBI_SCHMIDT_CONFIG,
};
