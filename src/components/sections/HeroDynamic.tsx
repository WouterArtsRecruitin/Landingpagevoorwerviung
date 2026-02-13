import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTracking } from "@/providers/TrackingProvider";
import { cn } from "@/lib/utils";
import { scrollToApplicationForm } from "@/lib/scroll";
import { generateUnsplashUrl } from "@/lib/images";
import type { HeroSectionData } from "@/types/section-data";

interface HeroDynamicProps {
  data: HeroSectionData;
  sectionId: string;
  className?: string;
}

export default function HeroDynamic({ data, sectionId, className }: HeroDynamicProps) {
  const { trackCTAClick } = useTracking();
  
  const backgroundImage = data.backgroundImageUrl || generateUnsplashUrl({
    sector: data.sector,
    template: 'dynamic'
  });

  function handlePrimaryCta() {
    trackCTAClick(data.primaryCtaLabel, sectionId);
    if (data.primaryCtaAction === "scroll_to_form") {
      scrollToApplicationForm();
    } else if (data.primaryCtaUrl) {
      window.open(data.primaryCtaUrl, "_blank");
    }
  }

  return (
    <section
      id={sectionId}
      className={cn(
        "relative min-h-screen flex items-center overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600",
        className
      )}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6">
              ✨ Werken bij {data.companyName}
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {data.title || data.companyTagline}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {data.subtitle || data.companyDescription}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-white text-emerald-600 hover:bg-white/90 font-semibold px-8"
                onClick={handlePrimaryCta}
              >
                {data.primaryCtaLabel}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              {data.secondaryCtaLabel && (
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white/20 px-8"
                >
                  {data.secondaryCtaLabel}
                </Button>
              )}
            </div>
          </div>

          {/* Right: Visual Element */}
          <div className="hidden lg:block">
            <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <img
                src={backgroundImage}
                alt={data.backgroundImageAlt || "Team collaboration"}
                className="w-full h-full object-cover rounded-2xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
