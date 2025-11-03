import { ArrowRight, Phone, MessageCircle, Coffee, Mail, MapPin, Clock } from "lucide-react";

export function FinalCTA() {
  const handleApply = () => {
    window.open("https://jobs.aebi-schmidt.com/job/Holten-Servicemonteur-regio-Midden-Nederland/1137365801/", "_blank");
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hoi Monique, ik heb interesse in de Servicemonteur vacature bij Aebi Schmidt!");
    window.open(`https://wa.me/31612345678?text=${message}`, "_blank");
  };

  const handleCallendly = () => {
    window.open("https://calendly.com/monique-aebi-schmidt/15min", "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+31850609123";
  };

  return (
    <section id="final-cta" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-[#003B5C] to-slate-900 text-white overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Headline */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#E30613]/20 border border-[#E30613]/30 px-4 py-2 rounded-full font-medium mb-6">
            <div className="w-2 h-2 rounded-full bg-[#E30613] animate-pulse"></div>
            <span className="text-red-200">Laatste kans!</span>
          </div>
          
          <h2 className="leading-tight mb-6">
            Klaar voor jouw
            <br className="hidden sm:block" />
            <span className="text-[#E30613]"> volgende carrièrestap?</span>
          </h2>
          
          <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Sluit je aan bij <strong className="text-white">25 gedreven collega's</strong> en werk aan 
            machines die steden bereikbaar houden tijdens sneeuwstormen
          </p>
        </div>

        {/* CTA Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          
          {/* Option 1: Direct Solliciteren */}
          <div className="group bg-gradient-to-br from-[#E30613] to-[#C00510] rounded-3xl p-8 shadow-2xl hover:shadow-[#E30613]/20 hover:scale-105 transition-all duration-300 border-2 border-[#FF0D1B]">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="mb-3">Direct Solliciteren</h3>
              <p className="text-red-100 mb-6">
                5 minuten • Upload CV + korte motivatie
              </p>
              <button
                onClick={handleApply}
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#E30613] hover:bg-red-50 px-6 py-4 rounded-xl font-semibold shadow-xl transition-all"
              >
                <span>Solliciteer Nu</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="mt-4 text-red-200">
                ⚡ Reactie binnen 24 uur
              </div>
            </div>
          </div>

          {/* Option 2: WhatsApp */}
          <div className="group bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 shadow-2xl hover:shadow-green-500/20 hover:scale-105 transition-all duration-300 border-2 border-green-400">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="mb-3">WhatsApp Monique</h3>
              <p className="text-green-100 mb-6">
                Direct contact • Snelste reactie • Persoonlijk
              </p>
              <button
                onClick={handleWhatsApp}
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-green-600 hover:bg-green-50 px-6 py-4 rounded-xl font-semibold shadow-xl transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Start Chat</span>
              </button>
              <div className="mt-4 text-green-200">
                💬 Ma-Vrij 08:00-17:00
              </div>
            </div>
          </div>

          {/* Option 3: Koffie Gesprek */}
          <div className="group bg-gradient-to-br from-[#003B5C] to-[#002A42] rounded-3xl p-8 shadow-2xl hover:shadow-[#003B5C]/20 hover:scale-105 transition-all duration-300 border-2 border-[#004D77]">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Coffee className="w-8 h-8 text-[#E30613]" />
              </div>
              <h3 className="mb-3">Eerst Koffie Drinken?</h3>
              <p className="text-slate-300 mb-6">
                Informeel kennismaken • Rondleiding depot
              </p>
              <button
                onClick={handleCallendly}
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-slate-800 hover:bg-slate-100 px-6 py-4 rounded-xl font-semibold shadow-xl transition-all"
              >
                <Coffee className="w-5 h-5" />
                <span>Plan Afspraak</span>
              </button>
              <div className="mt-4 text-slate-400">
                ☕ Geen verplichting • 30 min
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/20">
            <div className="text-center mb-8">
              <h3 className="mb-2">Vragen? Neem contact op!</h3>
              <p className="text-slate-300">We helpen je graag verder</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Contact Person */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E30613] to-[#C00510] flex items-center justify-center text-white text-2xl flex-shrink-0 border-4 border-white/20">
                  M
                </div>
                <div>
                  <h4 className="mb-1">Monique van Dijk</h4>
                  <p className="text-slate-300 mb-3">HR & Recruitment Manager</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone className="w-4 h-4 text-[#E30613]" />
                      <a href="tel:+31850609123" className="hover:text-[#E30613] transition-colors">085-0609123</a>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail className="w-4 h-4 text-[#E30613]" />
                      <a href="mailto:monique.vandijk@aebi-schmidt.com" className="hover:text-[#E30613] transition-colors">monique.vandijk@aebi-schmidt.com</a>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <MessageCircle className="w-4 h-4 text-[#E30613]" />
                      <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer" className="hover:text-[#E30613] transition-colors">+31 6 12345678</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Info */}
              <div>
                <h4 className="mb-4">Bezoekadres</h4>
                <div className="space-y-3 text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#E30613] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-white">Aebi Schmidt Nederland B.V.</div>
                      <div>Industrieweg 12</div>
                      <div>7451 PK Holten</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#E30613] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-white">Bereikbaar</div>
                      <div>Ma-Vrij: 08:00-17:00</div>
                      <div className="text-slate-400 mt-1">Reactie binnen 24 uur</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleCall}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                <Phone className="w-5 h-5" />
                <span>Bel Direct</span>
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={() => window.location.href = "mailto:monique.vandijk@aebi-schmidt.com"}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges Final */}
        <div className="mt-12 sm:mt-16">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-slate-300">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>4.8/5 Google Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Top Werkgever 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>140 jaar betrouwbaarheid</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Internationale carrièrekansen</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>25 gemotiveerde collega's</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
