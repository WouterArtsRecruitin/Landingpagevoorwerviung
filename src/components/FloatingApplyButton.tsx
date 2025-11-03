import { useState, useEffect } from "react";
import { ArrowRight, X } from "lucide-react";
import { Button } from "./ui/button";

export function FloatingApplyButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 400px
      const shouldShow = window.scrollY > 400;
      setIsVisible(shouldShow && !isDismissed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleApply = () => {
    window.open(
      "https://jobs.aebi-schmidt.com/job/Holten-Servicemonteur-regio-Midden-Nederland/1137365801/",
      "_blank"
    );
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 animate-in slide-in-from-bottom-5">
      <div className="bg-white rounded-full shadow-2xl border border-slate-200 flex items-center gap-3 pl-6 pr-2 py-2">
        <div className="hidden sm:block">
          <div className="text-sm">Interesse? Solliciteer direct!</div>
          <div className="text-xs text-slate-600">Reactie binnen 24 uur</div>
        </div>
        
        <Button 
          className="bg-red-600 hover:bg-red-700 text-white rounded-full"
          onClick={handleApply}
        >
          <span className="hidden sm:inline">Solliciteer Nu</span>
          <span className="sm:hidden">Solliciteer</span>
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>

        <button
          onClick={handleDismiss}
          className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors ml-2"
          aria-label="Sluiten"
        >
          <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    </div>
  );
}
