import { Button } from "./ui/button";
import { ArrowRight, Mail, Phone } from "lucide-react";

export function ApplicationCTA() {
  const handleApply = () => {
    window.open("https://jobs.aebi-schmidt.com/job/Holten-Servicemonteur-regio-Midden-Nederland/1137365801/", "_blank");
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600 rounded-full opacity-10 blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl lg:text-5xl mb-6">
          Klaar voor een nieuwe uitdaging?
        </h2>
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          Word onderdeel van ons team en werk aan de machines van morgen. 
          Solliciteer nu en ontdek wat Aebi Schmidt voor jou kan betekenen.
        </p>

        {/* CTA Button */}
        <div className="mb-12">
          <Button 
            size="lg" 
            className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 h-auto shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            onClick={handleApply}
          >
            Solliciteer Direct
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
          <p className="text-sm text-slate-400 mt-4">
            ⚡ Gemiddelde reactietijd: 24 uur • 📝 Solliciteren duurt 3 minuten
          </p>
        </div>

        {/* Contact Info */}
        <div className="border-t border-slate-700 pt-8">
          <p className="text-slate-300 mb-4">
            Heb je vragen over deze vacature?
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-slate-300 mb-6">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-red-600" />
              <a href="mailto:jobs@aebi-schmidt.com" className="hover:text-white transition-colors">
                jobs@aebi-schmidt.com
              </a>
            </div>
            <div className="hidden sm:block w-px h-6 bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-red-600" />
              <a href="tel:+31548123456" className="hover:text-white transition-colors">
                +31 (0)548 12 34 56
              </a>
            </div>
          </div>
          <div className="text-sm text-slate-400">
            🌐 nieuwebaanalsservicemonteur.nl
          </div>
        </div>

        {/* Application Process */}
        <div className="mt-16 grid sm:grid-cols-3 gap-8 text-left">
          <div>
            <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center mb-4 mx-auto sm:mx-0">
              1
            </div>
            <h3 className="mb-2 text-center sm:text-left">Solliciteer</h3>
            <p className="text-slate-400 text-sm text-center sm:text-left">
              Verstuur je CV en motivatie via onze sollicitatieportal
            </p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center mb-4 mx-auto sm:mx-0">
              2
            </div>
            <h3 className="mb-2 text-center sm:text-left">Kennismaking</h3>
            <p className="text-slate-400 text-sm text-center sm:text-left">
              We nodigen je uit voor een gesprek en een rondleiding
            </p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center mb-4 mx-auto sm:mx-0">
              3
            </div>
            <h3 className="mb-2 text-center sm:text-left">Start</h3>
            <p className="text-slate-400 text-sm text-center sm:text-left">
              Begin je nieuwe carrière bij Aebi Schmidt
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
