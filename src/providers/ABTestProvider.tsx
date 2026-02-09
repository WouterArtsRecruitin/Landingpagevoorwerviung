import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { ABTestVariant, VariantAssignment } from "@/types/ab-test";
import type { SectionConfig } from "@/types/landing-page";
import { getOrCreateAnonymousId, hashStringToNumber } from "@/lib/utils";

interface ABTestContextValue {
  assignment: VariantAssignment | null;
}

const ABTestContext = createContext<ABTestContextValue>({ assignment: null });

interface ABTestProviderProps {
  landingPageId: string;
  baseSections: SectionConfig[];
  variants: ABTestVariant[];
  children: ReactNode;
}

/**
 * Wijs een variant toe op basis van anoniem bezoeker ID.
 * Deterministisch: dezelfde bezoeker krijgt altijd dezelfde variant.
 */
function assignVariant(
  landingPageId: string,
  variants: ABTestVariant[]
): ABTestVariant | null {
  const activeVariants = variants.filter((v) => v.isActive);
  if (activeVariants.length === 0) return null;

  const anonymousId = getOrCreateAnonymousId();
  const hash = hashStringToNumber(`${anonymousId}-${landingPageId}`);
  const totalWeight = activeVariants.reduce((sum, v) => sum + v.trafficWeight, 0);
  const target = hash % totalWeight;

  let cumulative = 0;
  for (const variant of activeVariants) {
    cumulative += variant.trafficWeight;
    if (target < cumulative) return variant;
  }

  return activeVariants[0];
}

/**
 * Merge base sections met variant overrides
 */
function resolveSections(
  baseSections: SectionConfig[],
  variant: ABTestVariant | null
): SectionConfig[] {
  if (!variant || variant.sectionOverrides.length === 0) return baseSections;

  return baseSections.map((section) => {
    const override = variant.sectionOverrides.find(
      (o) => o.id === section.id || o.type === section.type
    );
    if (!override) return section;

    return {
      ...section,
      ...override,
      data: { ...section.data, ...(override.data || {}) },
    };
  });
}

export function ABTestProvider({
  landingPageId,
  baseSections,
  variants,
  children,
}: ABTestProviderProps) {
  const assignment = useMemo<VariantAssignment | null>(() => {
    if (variants.length === 0) {
      return {
        variantId: "default",
        variantKey: "A",
        resolvedSections: baseSections,
      };
    }

    const variant = assignVariant(landingPageId, variants);
    if (!variant) {
      return {
        variantId: "default",
        variantKey: "A",
        resolvedSections: baseSections,
      };
    }

    return {
      variantId: variant.id,
      variantKey: variant.variantKey,
      resolvedSections: resolveSections(baseSections, variant),
    };
  }, [landingPageId, baseSections, variants]);

  return (
    <ABTestContext.Provider value={{ assignment }}>
      {children}
    </ABTestContext.Provider>
  );
}

export function useABTest(): VariantAssignment | null {
  const context = useContext(ABTestContext);
  return context.assignment;
}
