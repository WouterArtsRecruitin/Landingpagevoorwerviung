import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConfig } from "@/providers/ConfigProvider";
import { useTracking } from "@/providers/TrackingProvider";

interface WhatsAppButtonProps {
  className?: string;
  position?: "bottom-left" | "bottom-right";
}

export function WhatsAppButton({
  className,
  position = "bottom-left",
}: WhatsAppButtonProps) {
  const config = useConfig();
  const { trackEvent } = useTracking();

  if (!config.contact.whatsappUrl) return null;

  function handleClick() {
    trackEvent("whatsapp_click", { source: "floating_button" });
    window.open(config.contact.whatsappUrl!, "_blank");
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "fixed z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center",
        position === "bottom-left" ? "bottom-6 left-6" : "bottom-6 right-20",
        className
      )}
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </button>
  );
}
