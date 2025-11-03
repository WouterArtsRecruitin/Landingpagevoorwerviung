import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky header after scrolling past hero section (approx 600px)
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleApply = () => {
    window.open(
      "https://jobs.aebi-schmidt.com/job/Holten-Servicemonteur-regio-Midden-Nederland/1137365801/",
      "_blank"
    );
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bg-white shadow-lg z-40 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-red-600">AEBI SCHMIDT</div>
              <div className="text-xs text-slate-500">nieuwebaanalsservicemonteur.nl</div>
            </div>
            <div className="hidden sm:block w-px h-6 bg-slate-200"></div>
            <div className="hidden sm:block">
              <div className="text-sm">Servicemonteur</div>
              <div className="text-xs text-slate-600">Regio Midden-Nederland</div>
            </div>
          </div>
          
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleApply}
          >
            <span className="hidden sm:inline">Solliciteer Direct</span>
            <span className="sm:hidden">Solliciteer</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
