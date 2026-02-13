import { Suspense, lazy, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTracking } from "@/providers/TrackingProvider";
import { UI } from "@/constants";
import type { SectionConfig, SectionType } from "@/types/landing-page";

// Lazy-loaded section registry
const SECTION_REGISTRY: Record<SectionType, React.LazyExoticComponent<React.ComponentType<any>>> = {
  hero: lazy(() => import("@/components/sections/HeroSection")),
  hero_modern: lazy(() => import("@/components/sections/HeroModern")),        // Template A
  hero_dynamic: lazy(() => import("@/components/sections/HeroDynamic")),      // Template B
  hero_corporate: lazy(() => import("@/components/sections/HeroCorporate")),  // Template C
  job_details: lazy(() => import("@/components/sections/JobDetailsSection")),
  benefits: lazy(() => import("@/components/sections/BenefitsSection")),
  salary_breakdown: lazy(() => import("@/components/sections/SalaryBreakdownSection")),
  tech_showcase: lazy(() => import("@/components/sections/BenefitsSection")), // hergebruik layout
  day_in_life: lazy(() => import("@/components/sections/DayInLifeSection")),
  testimonials: lazy(() => import("@/components/sections/TestimonialsSection")),
  why_join_us: lazy(() => import("@/components/sections/WhyJoinUsSection")),
  requirements: lazy(() => import("@/components/sections/RequirementsSection")),
  team_culture: lazy(() => import("@/components/sections/AboutCompanySection")),
  work_gallery: lazy(() => import("@/components/sections/WorkGallerySection")),
  trust_signals: lazy(() => import("@/components/sections/TrustSignalsSection")),
  faq: lazy(() => import("@/components/sections/FAQSection")),
  application_form: lazy(() => import("@/components/sections/ApplicationFormSection")),
  final_cta: lazy(() => import("@/components/sections/FinalCTASection")),
  about_company: lazy(() => import("@/components/sections/AboutCompanySection")),
  hidden_gem: lazy(() => import("@/components/sections/WhyJoinUsSection")),
  recruitment_approach: lazy(() => import("@/components/sections/AboutCompanySection")),
  custom_html: lazy(() => import("@/components/sections/CustomHTMLSection")),
  video_embed: lazy(() => import("@/components/sections/VideoEmbedSection")),
};

function SectionSkeleton() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-4 w-96 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    </div>
  );
}

/**
 * Wrapper die section_view events stuurt wanneer een sectie in beeld komt
 */
function SectionVisibilityTracker({
  sectionId,
  children,
}: {
  sectionId: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { trackSectionView } = useTracking();
  const tracked = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          trackSectionView(sectionId);
        }
      },
      { threshold: UI.SECTION_VISIBILITY_THRESHOLD }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [sectionId, trackSectionView]);

  return <div ref={ref}>{children}</div>;
}

interface SectionRendererProps {
  sections: SectionConfig[];
}

export function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <>
      {sections
        .filter((s) => s.visible)
        .sort((a, b) => a.order - b.order)
        .map((section) => {
          const Component = SECTION_REGISTRY[section.type];
          if (!Component) {
            console.warn(`Unknown section type: ${section.type}`);
            return null;
          }

          return (
            <Suspense key={section.id} fallback={<SectionSkeleton />}>
              <SectionVisibilityTracker sectionId={section.id}>
                <Component
                  data={section.data}
                  sectionId={section.id}
                  className={section.className}
                />
              </SectionVisibilityTracker>
            </Suspense>
          );
        })}
    </>
  );
}
