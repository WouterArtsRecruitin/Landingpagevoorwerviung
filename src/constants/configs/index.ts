import type { LandingPageConfig } from "@/types/landing-page";
import { DEMO_CONFIG } from "@/constants/demo-config";
import { AEBI_SCHMIDT_CONFIG } from "./aebi-schmidt-servicemonteur";
import { TEMPLATE_A_MODERN_CONFIG } from "./template-a-modern";
import { TEMPLATE_B_DYNAMIC_CONFIG } from "./template-b-dynamic";
import { TEMPLATE_C_CORPORATE_CONFIG } from "./template-c-corporate";

/**
 * Registry van alle lokale vacature configs.
 * Wordt gebruikt als fallback wanneer Supabase niet beschikbaar is.
 *
 * Voeg hier nieuwe configs toe: slug → config object
 */
export const LOCAL_CONFIGS: Record<string, LandingPageConfig> = {
  demo: DEMO_CONFIG,
  "aebi-schmidt-servicemonteur": AEBI_SCHMIDT_CONFIG,

  // Nieuwe templates (A, B, C) - Altijd beschikbaar
  "template-a-modern": TEMPLATE_A_MODERN_CONFIG,
  "template-b-dynamic": TEMPLATE_B_DYNAMIC_CONFIG,
  "template-c-corporate": TEMPLATE_C_CORPORATE_CONFIG,
};
