import { Button } from "@/components/ui/button";
import { useTracking } from "@/providers/TrackingProvider";
import { cn } from "@/lib/utils";
import { scrollToApplicationForm } from "@/lib/scroll";
import { generateUnsplashUrl } from "@/lib/images";
import type { HeroSectionData } from "@/types/section-data";

interface HeroCorporateProps {
  data: HeroSectionData;
  sectionId: string;
  className?: string;
}

export default function HeroCorporate({ data, sectionId, className }: HeroCorporateProps) {
  const { trackCTAClick } = useTracking();
  
  const backgroundImage = data.backgroundImageUrl || generateUnsplashUrl({
    sector: data.sector,
    template: 'corporate'
  });

  function handlePrimaryCta() {
    trackCTAClick(data.primaryCtaLabel, sectionId);
    if (data.primaryCtaAction === "scroll_to_form") {
      scrollToApplicationForm();
    } else if (data.primaryCtaUrl) {
      window.open(data.primaryCtaUrl, "_blank");
    }
  }

  function handleSecondaryCta() {
    if (data.secondaryCtaLabel) {
      trackCTAClick(data.secondaryCtaLabel, sectionId);
    }
  }

  return (
    <section
      id={sectionId}
      className={cn(
        "relative min-h-screen flex items-center bg-white",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        <div className="max-w-4xl">
          {/* Company Label */}
          <div className="mb-6">
            <span className="text-primary font-semibold text-lg tracking-wide uppercase">
              {data.companyName}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight">
            {data.title || data.companyTagline}
          </h1>

          {/* Subtitle */}
          <p className="text-2xl text-slate-600 mb-10 leading-relaxed max-w-3xl">
            {data.subtitle || data.companyDescription}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 px-8 text-lg"
              onClick={handlePrimaryCta}
            >
              {data.primaryCtaLabel}
            </Button>

            {data.secondaryCtaLabel && (
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 text-lg border-2"
                onClick={handleSecondaryCta}
              >
                {data.secondaryCtaLabel}
              </Button>
            )}
          </div>

          {/* Feature Bullets */}
          <div className="flex flex-wrap items-center gap-8 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Professioneel</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Betrouwbaar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Innovatief</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element - Gradient Sidebar */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-slate-50 to-transparent hidden lg:block pointer-events-none" />
      
      {/* Optional Background Image (subtle) */}
      {backgroundImage && (
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block pointer-events-none opacity-10">
          <img
            src={backgroundImage}
            alt={data.backgroundImageAlt || ""}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      )}
    </section>
  );
}
