import { Play, Quote, Users, Calendar, TrendingUp, Star } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Hans de Vries",
    role: "Senior Servicemonteur",
    tenure: "3 jaar bij Aebi Schmidt",
    background: "Ex-DAF dealer (8 jaar)",
    avatar: "H",
    quote: "Van DAF dealer naar Aebi Schmidt - beste carrièrestap ever. Kleinschalig, high-tech, en je hebt écht impact. Geen nummer in een groot bedrijf, maar écht onderdeel van het team.",
    highlights: ["Kleinschalig", "High-tech", "Impact"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
  },
  {
    name: "Peter Janssen",
    role: "Servicemonteur",
    tenure: "1,5 jaar",
    background: "Ex-Agco dealer technicus",
    avatar: "P",
    quote: "Het leukste aan dit werk? De afwisseling! Elke dag andere klanten, andere machines, andere technische uitdagingen. Plus: het team is geweldig - altijd bereid om elkaar te helpen.",
    highlights: ["Afwisseling", "Techniek", "Team"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80"
  },
  {
    name: "Jeroen Bakker",
    role: "Junior Servicemonteur",
    tenure: "6 maanden",
    background: "Recent MBO Mechatronica",
    avatar: "J",
    quote: "Work-life balance is hier echt top. Om 16:30 op tijd thuis, geen weekenden. En toch uitdagend werk - beste van beide werelden! Plus: ik leer elke dag bij van de seniors.",
    highlights: ["Work-life balance", "Leren", "Doorgroeien"],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80"
  }
];

const teamStats = [
  { icon: Users, number: "25", label: "Team members", sublabel: "Nederland" },
  { icon: Calendar, number: "5,2 jaar", label: "Gemiddeld dienstverband", sublabel: "Hoge tevredenheid" },
  { icon: TrendingUp, number: "38 jaar", label: "Gemiddelde leeftijd", sublabel: "Mix ervaring/energie" },
  { icon: Star, number: "4.8/5", label: "Medewerkerstevredenheid", sublabel: "Google Reviews" }
];

export function TeamCulture() {
  const [activeVideo, setActiveVideo] = useState(false);

  return (
    <section id="team-culture" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 text-[#E30613] px-4 py-2 rounded-full font-medium mb-4">
            <Users className="w-4 h-4" />
            <span>Ontmoet het team</span>
          </div>
          <h2 className="text-slate-900 mb-4">
            Ontmoet je <span className="text-[#E30613]">toekomstige collega's</span>
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Geen corporate BS - gewoon echte verhalen van echte monteurs
          </p>
        </div>

        {/* Video Section */}
        <div className="mb-12 sm:mb-16">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            {!activeVideo ? (
              <>
                {/* Video Thumbnail */}
                <img 
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80"
                  alt="Een dag uit het leven - Hans (Senior Servicemonteur)"
                  className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"></div>
                
                {/* Play Button */}
                <button
                  onClick={() => setActiveVideo(true)}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 bg-[#E30613] hover:bg-[#C00510] rounded-full flex items-center justify-center shadow-2xl transition-all group-hover:scale-110"
                >
                  <Play className="w-10 h-10 sm:w-12 sm:h-12 text-white ml-1" fill="white" />
                </button>

                {/* Video Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-1 rounded-full bg-[#E30613] animate-pulse"></div>
                    <span className="font-semibold uppercase tracking-wider">Video</span>
                  </div>
                  <h3 className="mb-2">
                    Een dag uit het leven van Hans
                  </h3>
                  <p className="text-slate-200">
                    2:34 • Senior Servicemonteur laat zijn dagelijkse werk zien
                  </p>
                </div>
              </>
            ) : (
              /* Embedded Video */
              <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Een dag uit het leven - Hans"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
              </div>
            )}
          </div>
          
          <p className="text-center text-slate-500 mt-4">
            💡 <strong>Tip:</strong> Zet geluid aan voor de beste ervaring
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-center mb-8 sm:mb-12">
            Wat zeggen onze monteurs? 💬
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 group">
                
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-[#E30613] opacity-50" />
                </div>

                {/* Quote Text */}
                <p className="text-slate-700 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {testimonial.highlights.map((highlight, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 bg-red-50 text-[#E30613] px-3 py-1 rounded-full font-medium">
                      <div className="w-1 h-1 rounded-full bg-[#E30613]"></div>
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E30613] to-[#C00510] flex items-center justify-center text-white text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    {testimonial.avatar}
                  </div>
                  
                  {/* Info */}
                  <div className="min-w-0">
                    <h4 className="text-slate-900 truncate">{testimonial.name}</h4>
                    <p className="text-slate-600 truncate">{testimonial.role}</p>
                    <p className="text-slate-500">{testimonial.tenure}</p>
                    <p className="text-[#E30613] font-medium mt-1">{testimonial.background}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Stats */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-center mb-8 sm:mb-12">
            Ons team in cijfers 📊
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {teamStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-[#003B5C] to-[#002A42] rounded-2xl p-6 sm:p-8 text-white text-center group hover:scale-105 transition-transform duration-300">
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-[#E30613] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className="mb-2">{stat.number}</div>
                  <div className="text-slate-200 mb-1">{stat.label}</div>
                  <div className="text-slate-400">{stat.sublabel}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Culture Highlights */}
        <div className="bg-gradient-to-br from-[#E30613] to-[#C00510] rounded-3xl p-8 sm:p-12 text-white">
          <h3 className="text-center mb-6">
            Onze cultuur in 3 woorden 🎯
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-5xl mb-3">🤝</div>
              <h4 className="mb-2">Samen Sterk</h4>
              <p className="text-red-100">
                We helpen elkaar altijd. Geen concurrentie, maar samenwerking.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">🚀</div>
              <h4 className="mb-2">Innovatie First</h4>
              <p className="text-red-100">
                High-tech machines, nieuwste tools, continue ontwikkeling.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">⚖️</div>
              <h4 className="mb-2">Balans Belangrijk</h4>
              <p className="text-red-100">
                Op tijd thuis, geen weekenden, gezin staat voorop.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-red-100 mb-6">
              Klinkt dit als jouw ideale werkplek?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open("https://jobs.aebi-schmidt.com/job/Holten-Servicemonteur-regio-Midden-Nederland/1137365801/", "_blank")}
                className="inline-flex items-center justify-center gap-2 bg-white text-[#E30613] hover:bg-red-50 px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <span>Solliciteer Nu</span>
                <span>→</span>
              </button>
              <button 
                onClick={() => {
                  const message = encodeURIComponent("Hoi Monique, ik wil graag meer weten over het team!");
                  window.open(`https://wa.me/31612345678?text=${message}`, "_blank");
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#003B5C] hover:bg-[#002A42] text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                <span>💬</span>
                <span>Vragen over het team?</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
