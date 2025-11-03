import { Button } from "../ui/button";
import { ArrowRight, Mail, Phone, MessageSquare } from "lucide-react";

export function ApplicationCTAB() {
  const handleApply = () => {
    window.open("https://jobs.aebi-schmidt.com/job/Holten-Servicemonteur-regio-Midden-Nederland/1137365801/", "_blank");
  };

  return (
    <section className="py-16 lg:py-24 bg-red-600 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-900/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl lg:text-5xl mb-6">
          Klaar om te starten?
        </h2>
        <p className="text-xl text-white/95 mb-12 max-w-2xl mx-auto">
          Solliciteer vandaag nog en ontdek wat Aebi Schmidt voor jou kan betekenen!
        </p>

        {/* CTA Button */}
        <div className="mb-12">
          <Button 
            size="lg" 
            className="bg-slate-900 hover:bg-slate-800 text-white text-lg px-10 py-6 h-auto shadow-xl"
            onClick={handleApply}
          >
            Direct Solliciteren
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
          <p className="text-sm text-white/80 mt-4">
            Reactie binnen 48 uur gegarandeerd
          </p>
        </div>

        {/* Contact Options */}
        <div className="border-t border-white/20 pt-8">
          <p className="text-white/90 mb-6">
            Eerst nog even sparren? Neem contact op!
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
            <a 
              href="mailto:jobs@aebi-schmidt.com"
              className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Mail className="w-6 h-6" />
              <span className="text-sm">E-mail</span>
            </a>
            <a 
              href="tel:+31548123456"
              className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Phone className="w-6 h-6" />
              <span className="text-sm">Bel ons</span>
            </a>
            <a 
              href="https://jobs.aebi-schmidt.com/job/Holten-Servicemonteur-regio-Midden-Nederland/1137365801/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="text-sm">Chat</span>
            </a>
          </div>
          <div className="text-sm text-white/70">
            🌐 nieuwebaanalsservicemonteur.nl
          </div>
        </div>
      </div>
    </section>
  );
}
