import { MapPin, Briefcase, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTracking } from "@/providers/TrackingProvider";
import { cn } from "@/lib/utils";
import { scrollToApplicationForm, scrollToSection } from "@/lib/scroll";
import type { HeroSectionData } from "@/types/section-data";

interface HeroSectionProps {
  data: HeroSectionData;
  sectionId: string;
  className?: string;
}

export default function HeroSection({ data, sectionId, className }: HeroSectionProps) {
  const { trackCTAClick } = useTracking();

  function handlePrimaryCta() {
    trackCTAClick(data.primaryCtaLabel, sectionId);

    if (data.primaryCtaAction === "scroll_to_form") {
      scrollToApplicationForm();
    } else if (data.primaryCtaAction === "whatsapp" && data.primaryCtaUrl) {
      window.open(data.primaryCtaUrl, "_blank");
    } else if (data.primaryCtaUrl) {
      window.open(data.primaryCtaUrl, "_blank");
    }
  }

  function handleSecondaryCta() {
    if (data.secondaryCtaLabel) {
      trackCTAClick(data.secondaryCtaLabel, sectionId);
    }
    if (data.secondaryCtaAction === "scroll_to_section" && data.secondaryCtaTarget) {
      scrollToSection(data.secondaryCtaTarget);
    }
  }

  return (
    <section
      id={sectionId}
      className={cn(
        "relative min-h-[90vh] flex items-center overflow-hidden",
        className
      )}
    >
      {/* Background */}
      {data.backgroundImageUrl && (
        <div className="absolute inset-0 z-0">
          <img
            src={data.backgroundImageUrl}
            alt={data.backgroundImageAlt || ""}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
      )}

      {/* Fallback gradient als er geen afbeelding is */}
      {!data.backgroundImageUrl && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-secondary via-secondary/90 to-primary/20" />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl">
          {/* Company badge */}
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              {data.companyName}
            </Badge>
            {data.urgencyBadge && (
              <Badge variant="destructive" className="animate-pulse-soft">
                {data.urgencyBadge}
              </Badge>
            )}
          </div>

          {/* Tagline */}
          {data.companyTagline && (
            <p className="text-white/80 text-sm uppercase tracking-wider mb-4">
              {data.companyTagline}
            </p>
          )}

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            {data.headline.split("\n").map((line, i) => (
              <span key={i}>
                {data.highlightedText && line.includes(data.highlightedText) ? (
                  <>
                    {line.split(data.highlightedText)[0]}
                    <span className="text-primary">{data.highlightedText}</span>
                    {line.split(data.highlightedText)[1]}
                  </>
                ) : (
                  line
                )}
                {i < data.headline.split("\n").length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-white/90 mb-4">{data.subheadline}</p>

          {/* Location & employment info */}
          <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm mb-8">
            {data.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {data.location}
              </span>
            )}
            {data.employmentType && (
              <span className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                {data.employmentType}
              </span>
            )}
            {data.salary && (
              <span className="font-semibold text-white">{data.salary}</span>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="xl" onClick={handlePrimaryCta}>
              {data.primaryCtaLabel}
            </Button>
            {data.secondaryCtaLabel && (
              <Button size="xl" variant="outline" className="text-white border-white/30 hover:bg-white/10" onClick={handleSecondaryCta}>
                {data.secondaryCtaLabel}
                <ArrowDown className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>

          {/* Quick stats */}
          {data.quickStats && data.quickStats.length > 0 && (
            <div className="flex flex-wrap gap-6">
              {data.quickStats.map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                  <p className="text-white font-bold text-lg">{stat.value}</p>
                  <p className="text-white/70 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
