import { Button } from "../ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import airportSnowplow from "figma:asset/674dfb80adcfa5b1237453a27ad870c404d7f0b9.png";

export function HeroB() {
  const handleApply = () => {
    window.open("https://jobs.aebi-schmidt.com/job/Holten-Servicemonteur-regio-Midden-Nederland/1137365801/", "_blank");
  };

  return (
    <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-900/20 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div>
            
            {/* Company Logo */}
            <div className="mb-8">
              <div className="text-white tracking-wider text-2xl mb-2">AEBI SCHMIDT</div>
              <div className="text-sm text-white/80">Wereldleider in sneeuwruimtechnologie</div>
            </div>

            {/* Headline - Career Focus */}
            <h1 className="text-5xl lg:text-7xl mb-6 leading-tight">
              In 18 Maanden<br />
              <span className="text-slate-900">Ben je Senior</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-white/90 mb-8">
              Trainingen in Zwitserland • CAN-Bus • Hydrauliek
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 mb-10 text-white/90">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">Holten • Regio Midden-Nederland</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-slate-900 hover:bg-slate-800 text-white text-lg px-10 py-7 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                onClick={handleApply}
              >
                Direct Solliciteren
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 text-lg px-10 py-7"
                onClick={() => {
                  document.getElementById('job-details')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Meer Informatie
              </Button>
            </div>

            {/* Quick Stats - Career Focused */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-white text-xl mb-1">18 mnd</div>
                <div className="text-white/70 text-sm">→ Senior</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-white text-xl mb-1">€2.000/jr</div>
                <div className="text-white/70 text-sm">Trainingen</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-white text-xl mb-1">Zwitserland</div>
                <div className="text-white/70 text-sm">Academy</div>
              </div>
            </div>

          </div>

          {/* Right Column - Image */}
          <div className="relative lg:block hidden">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={airportSnowplow}
                alt="Aebi Schmidt sneeuwschuiver in actie op luchthaven landingsbaan"
                className="w-full h-[500px] object-cover"
              />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 left-6 right-6 bg-white text-slate-900 p-6 rounded-xl shadow-2xl">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl text-red-600 mb-1">18</div>
                  <div className="text-xs text-slate-600">Maanden → Senior</div>
                </div>
                <div className="border-l border-slate-200">
                  <div className="text-2xl text-red-600 mb-1">100%</div>
                  <div className="text-xs text-slate-600">Training Budget</div>
                </div>
                <div className="border-l border-slate-200">
                  <div className="text-2xl text-red-600 mb-1">5</div>
                  <div className="text-xs text-slate-600">Trainingsweken/jr</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg 
            className="w-6 h-6 text-white" 
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
