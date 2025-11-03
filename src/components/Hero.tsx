import { Button } from "./ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import airportSnowplow from "figma:asset/674dfb80adcfa5b1237453a27ad870c404d7f0b9.png";

export function Hero() {
  const handleApply = () => {
    window.open("https://jobs.aebi-schmidt.com/job/Holten-Servicemonteur-regio-Midden-Nederland/1137365801/", "_blank");
  };

  return (
    <div className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={airportSnowplow}
          alt="Aebi Schmidt sneeuwschuiver in actie op luchthaven landingsbaan"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-3xl">
          
          {/* Company Logo */}
          <div className="mb-8">
            <div className="text-red-600 tracking-wider text-2xl mb-2">AEBI SCHMIDT</div>
            <div className="text-sm text-slate-400">Wereldleider in sneeuwruimtechnologie</div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-7xl mb-6 leading-tight">
            Van Schiphol<br />
            <span className="text-red-600">tot Snelwegen</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl lg:text-2xl text-slate-300 mb-8">
            Servicemonteur bij machines van €500k+
          </p>

          {/* Location */}
          <div className="flex items-center gap-2 mb-10 text-slate-300">
            <MapPin className="w-5 h-5 text-red-600" />
            <span className="text-lg">Holten • Regio Midden-Nederland</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white text-lg px-10 py-7 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              onClick={handleApply}
            >
              Direct Solliciteren
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white bg-white/10 text-white hover:bg-white hover:text-slate-900 text-lg px-10 py-7 backdrop-blur-sm"
              onClick={() => {
                document.getElementById('job-details')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Meer Informatie
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <div className="text-red-600 text-xl mb-1">€3.200 - €3.800</div>
              <div className="text-slate-300 text-sm">per maand</div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <div className="text-red-600 text-xl mb-1">Servicewagen</div>
              <div className="text-slate-300 text-sm">ook privé</div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <div className="text-red-600 text-xl mb-1">Trainingen</div>
              <div className="text-slate-300 text-sm">Zwitserland HQ</div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg 
            className="w-6 h-6 text-red-600" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
