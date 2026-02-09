import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useConfig } from "@/providers/ConfigProvider";
import { useTracking } from "@/providers/TrackingProvider";
import { scrollToApplicationForm } from "@/lib/scroll";
import { UI } from "@/constants";

export function StickyHeader() {
  const config = useConfig();
  const { trackCTAClick } = useTracking();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > UI.STICKY_HEADER_SCROLL_PX);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleCta() {
    trackCTAClick("sticky_header_cta", "header");
    scrollToApplicationForm();
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/95 backdrop-blur-md border-b shadow-sm",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {config.theme.logoUrl && (
            <img
              src={config.theme.logoUrl}
              alt={config.theme.logoAlt}
              className="h-8 w-auto"
            />
          )}
          <span className="font-semibold text-foreground text-sm hidden sm:block">
            {config.organization.name}
          </span>
        </div>

        <Button size="sm" onClick={handleCta}>
          Direct Solliciteren
        </Button>
      </div>
    </header>
  );
}
