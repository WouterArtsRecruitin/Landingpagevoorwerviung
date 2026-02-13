import { Button } from "@/components/ui/button";
import { useTracking } from "@/providers/TrackingProvider";
import { cn } from "@/lib/utils";
import { scrollToApplicationForm } from "@/lib/scroll";
import { generateUnsplashUrl } from "@/lib/images";
import type { HeroSectionData } from "@/types/section-data";

interface HeroModernProps {
  data: HeroSectionData;
  sectionId: string;
  className?: string;
}

export default function HeroModern({ data, sectionId, className }: HeroModernProps) {
  const { trackCTAClick } = useTracking();
  
  // Dynamische Unsplash image of gebruik opgegeven URL
  const backgroundImage = data.backgroundImageUrl || generateUnsplashUrl({
    sector: undefined, // Sector info niet beschikbaar in HeroSectionData
    template: 'modern'
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
    // Scroll to next section or custom action
  }

  return (
    <section
      id={sectionId}
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        className
      )}
    >
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={data.backgroundImageAlt || ""}
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        <div className="text-center max-w-4xl mx-auto">
          {/* Glowing Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-white">
              {data.urgencyBadge || "We zoeken versterking"}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {data.headline || data.companyTagline}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {data.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 text-lg"
              onClick={handlePrimaryCta}
            >
              {data.primaryCtaLabel}
            </Button>
            
            {data.secondaryCtaLabel && (
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/10 px-8 text-lg backdrop-blur-sm"
                onClick={handleSecondaryCta}
              >
                {data.secondaryCtaLabel}
              </Button>
            )}
          </div>

          {/* Optional: Quick stats */}
          {data.quickStats && data.quickStats.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              {data.quickStats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
                  <span>{stat.label}: {stat.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
