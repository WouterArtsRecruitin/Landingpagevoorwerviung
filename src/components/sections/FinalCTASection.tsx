import { MessageCircle, Calendar, Phone, Mail, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTracking } from "@/providers/TrackingProvider";
import { useConfig } from "@/providers/ConfigProvider";
import { scrollToApplicationForm } from "@/lib/scroll";
import type { FinalCTASectionData } from "@/types/section-data";

const TYPE_ICONS: Record<string, React.ElementType> = {
  apply: ArrowRight,
  whatsapp: MessageCircle,
  calendly: Calendar,
  call: Phone,
  email: Mail,
};

interface Props {
  data: FinalCTASectionData;
  sectionId: string;
  className?: string;
}

export default function FinalCTASection({ data, sectionId, className }: Props) {
  const { trackCTAClick, trackEvent } = useTracking();
  const config = useConfig();

  function handleCtaClick(option: FinalCTASectionData["ctaOptions"][0]) {
    trackCTAClick(option.buttonLabel, sectionId);

    switch (option.type) {
      case "apply":
        scrollToApplicationForm();
        break;
      case "whatsapp":
        trackEvent("whatsapp_click", { section: sectionId });
        window.open(option.url || config.contact.whatsappUrl, "_blank");
        break;
      case "calendly":
        trackEvent("calendly_click", { section: sectionId });
        window.open(option.url || config.contact.calendlyUrl, "_blank");
        break;
      case "call":
        trackEvent("phone_click", { section: sectionId });
        window.location.href = `tel:${option.url || config.contact.personPhone}`;
        break;
      case "email":
        trackEvent("email_click", { section: sectionId });
        window.location.href = `mailto:${option.url || config.contact.personEmail}`;
        break;
    }
  }

  return (
    <section id={sectionId} className={cn("py-16 lg:py-24 bg-gradient-to-b from-muted/30 to-background", className)}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {data.heading}
            {data.highlightedText && (
              <span className="text-primary"> {data.highlightedText}</span>
            )}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {data.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.ctaOptions.map((option, i) => {
            const Icon = TYPE_ICONS[option.type] || ArrowRight;
            return (
              <Card key={i} className="group hover:shadow-lg transition-all duration-300 border-0">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{option.heading}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                  <Button
                    variant={option.type === "whatsapp" ? "whatsapp" : "default"}
                    className="w-full"
                    onClick={() => handleCtaClick(option)}
                  >
                    {option.buttonLabel}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust badges */}
        {data.trustBadges && data.trustBadges.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            {data.trustBadges.map((badge, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
