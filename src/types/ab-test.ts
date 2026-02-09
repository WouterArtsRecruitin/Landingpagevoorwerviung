import type { SectionConfig } from "./landing-page";

export interface ABTestVariant {
  id: string;
  landingPageId: string;
  variantKey: string;
  name: string;
  description?: string;
  sectionOverrides: Partial<SectionConfig>[];
  trafficWeight: number;
  isControl: boolean;
  isActive: boolean;
}

export interface VariantAssignment {
  variantId: string;
  variantKey: string;
  resolvedSections: SectionConfig[];
}
