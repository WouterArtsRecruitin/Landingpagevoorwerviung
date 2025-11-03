import { Button } from "../ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import airportSnowplow from "figma:asset/674dfb80adcfa5b1237453a27ad870c404d7f0b9.png";

export function HeroC() {
  const handleApply = () => {
    window.open("https://jobs.aebi-schmidt.com/job/Holten-Servicemonteur-regio-Midden-Nederland/1137365801/", "_blank");
  };

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left - Image */}
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={airportSnowplow}
                alt="Aebi Schmidt sneeuwschuiver in actie op luchthaven landingsbaan"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="lg:col-span-3">
            
            {/* Company Logo */}
            <div className="mb-8">
              <span className="text-red-600 tracking-wider text-2xl block mb-2">AEBI SCHMIDT</span>
              <span className="text-sm text-slate-600">Wereldleider in sneeuwruimtechnologie</span>
            </div>

            {/* Headline - Salary Focus */}
            <h1 className="text-5xl lg:text-7xl mb-6 leading-tight">
              Tot <span className="text-red-600">€3.800</span><br />
              <span className="text-slate-600 text-4xl lg:text-5xl">+ Auto van de zaak</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-slate-700 mb-8">
              Werk aan machines van een half miljoen
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 mb-10 text-slate-600">
              <MapPin className="w-5 h-5 text-red-600" />
              <span className="text-lg">Holten • Regio Midden-Nederland</span>
            </div>

            {/* Salary Highlights */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-lg mb-10">
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-red-400 text-lg mb-1">€3.200 - €3.800</div>
                  <div className="text-slate-300">+ 8% vakantiegeld</div>
                </div>
                <div>
                  <div className="text-red-400 text-lg mb-1">Servicewagen</div>
                  <div className="text-slate-300">Ook privé gebruik</div>
                </div>
                <div>
                  <div className="text-red-400 text-lg mb-1">€2.000/jaar</div>
                  <div className="text-slate-300">Trainingsbudget</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
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
                className="border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white text-lg px-10 py-7"
                onClick={() => {
                  document.getElementById('job-details')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Meer Informatie
              </Button>
            </div>

            {/* Quick Stats - Salary Focused */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="text-red-600 text-xl mb-1">€3.800</div>
                <div className="text-slate-600 text-sm">Max salaris</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="text-red-600 text-xl mb-1">25 dagen</div>
                <div className="text-slate-600 text-sm">Vakantie</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="text-red-600 text-xl mb-1">40 uur</div>
                <div className="text-slate-600 text-sm">Fulltime</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
