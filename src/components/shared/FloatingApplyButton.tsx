import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTracking } from "@/providers/TrackingProvider";

export function FloatingApplyButton() {
  const { trackCTAClick } = useTracking();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    trackCTAClick("floating_apply_button", "floating");
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 md:hidden transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      )}
    >
      <Button size="lg" className="rounded-full shadow-xl" onClick={handleClick}>
        <Send className="h-5 w-5 mr-2" />
        Solliciteren
      </Button>
    </div>
  );
}
