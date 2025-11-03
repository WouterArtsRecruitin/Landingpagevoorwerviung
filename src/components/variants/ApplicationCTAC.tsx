import { Button } from "../ui/button";
import { ArrowRight, Mail, Phone } from "lucide-react";

export function ApplicationCTAC() {
  const handleApply = () => {
    window.open("https://jobs.aebi-schmidt.com/job/Holten-Servicemonteur-regio-Midden-Nederland/1137365801/", "_blank");
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 lg:p-12 rounded-2xl text-center">
          <h2 className="text-3xl lg:text-4xl mb-4">
            Klaar voor een nieuwe uitdaging?
          </h2>
          <p className="text-lg text-white/95 mb-8 max-w-2xl mx-auto">
            Solliciteer nu en word onderdeel van ons team!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-white text-red-600 hover:bg-slate-50"
              onClick={handleApply}
            >
              Solliciteer Direct
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="pt-8 border-t border-white/20">
            <p className="text-white/90 mb-4 text-sm">Vragen? Neem contact op</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm mb-4">
              <a href="mailto:jobs@aebi-schmidt.com" className="flex items-center gap-2 justify-center hover:text-white/80">
                <Mail className="w-4 h-4" />
                jobs@aebi-schmidt.com
              </a>
              <a href="tel:+31548123456" className="flex items-center gap-2 justify-center hover:text-white/80">
                <Phone className="w-4 h-4" />
                +31 (0)548 12 34 56
              </a>
            </div>
            <div className="text-xs text-white/70">
              🌐 nieuwebaanalsservicemonteur.nl
            </div>
          </div>

          {/* Simple Process */}
          <div className="mt-10 grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center mb-2 mx-auto">1</div>
              <div className="text-white/90">Solliciteer</div>
            </div>
            <div>
              <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center mb-2 mx-auto">2</div>
              <div className="text-white/90">Gesprek</div>
            </div>
            <div>
              <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center mb-2 mx-auto">3</div>
              <div className="text-white/90">Start!</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
