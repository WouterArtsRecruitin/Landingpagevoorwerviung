import { useEffect, useRef } from "react";
import { useTracking } from "@/providers/TrackingProvider";

interface CalendlyEmbedProps {
  url: string;
  className?: string;
}

export function CalendlyEmbed({ url, className }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { trackEvent } = useTracking();

  useEffect(() => {
    // Laad Calendly embed script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);

    trackEvent("calendly_click", { source: "embed" });

    return () => {
      document.head.removeChild(script);
    };
  }, [trackEvent]);

  return (
    <div
      ref={containerRef}
      className={className}
      data-url={url}
      style={{ minWidth: "320px", height: "700px" }}
    >
      <div
        className="calendly-inline-widget"
        data-url={url}
        style={{ minWidth: "320px", height: "700px" }}
      />
    </div>
  );
}
