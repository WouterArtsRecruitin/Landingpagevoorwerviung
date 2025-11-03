import { Target, Heart, Zap, Award } from "lucide-react";

export function WhyJoinUs() {
  const reasons = [
    {
      icon: Target,
      title: "Zinvol werk",
      description: "Draag bij aan schone en veilige straten in je regio. Je werk heeft directe impact op de leefomgeving van duizenden mensen.",
    },
    {
      icon: Zap,
      title: "Continue ontwikkeling",
      description: "Werk met state-of-the-art machines en krijg toegang tot de nieuwste technologieën. Blijf leren en jezelf ontwikkelen.",
    },
    {
      icon: Heart,
      title: "Waardering & respect",
      description: "Bij Aebi Schmidt word je gewaardeerd om je vakmanschap. Onze klanten en collega's hebben respect voor goed technisch werk.",
    },
    {
      icon: Award,
      title: "Stabiliteit & groei",
      description: "Werk bij een internationaal bedrijf met 140+ jaar ervaring. Zekerheid en perspectief op de lange termijn.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl mb-6">
            Waarom bij Aebi Schmidt werken?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We zijn niet zomaar een werkgever. We bieden je een plek waar je vakmanschap wordt gewaardeerd, 
            waar je jezelf kunt ontwikkelen en waar je werk er écht toe doet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div 
                key={index} 
                className="relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                {/* Number badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                  {index + 1}
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-red-100 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-red-600" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl mb-3">{reason.title}</h3>
                    <p className="text-slate-700 leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-6 rounded-2xl shadow-xl">
            <p className="text-lg mb-2">
              Klaar om het verschil te maken?
            </p>
            <p className="text-sm opacity-90">
              Word onderdeel van een team dat trots is op zijn werk
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
