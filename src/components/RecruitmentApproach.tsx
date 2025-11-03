import { Target, Users, Zap, CheckCircle2 } from "lucide-react";

export function RecruitmentApproach() {
  const features = [
    {
      icon: Target,
      title: "Professionele Matching",
      description: "Deze campagne wordt uitgevoerd door gespecialiseerde recruitment partners die begrijpen wat technisch werk betekent.",
    },
    {
      icon: Users,
      title: "Persoonlijk Contact",
      description: "Binnen 24 uur persoonlijk contact. Geen automatische systemen, maar echte gesprekken met mensen die de automotive sector kennen.",
    },
    {
      icon: Zap,
      title: "Snelle Opvolging",
      description: "Direct feedback na je sollicitatie. We plannen interviews in en begeleiden je door het hele proces.",
    },
    {
      icon: CheckCircle2,
      title: "Kwaliteit Boven Alles",
      description: "We zoeken naar de beste match tussen jou en Aebi Schmidt. Niet alleen op papier, maar ook qua cultuur en ambities.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl mb-4">
            Waarom deze campagne anders is
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Aebi Schmidt werkt samen met gespecialiseerde recruitment partners om de beste monteurs te vinden. 
            Dit betekent voor jou: een professioneel proces van begin tot eind.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-white rounded-xl p-8 shadow-sm border-l-4 border-red-600">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <CheckCircle2 className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-xl mb-2">
                Je sollicitatie in goede handen
              </h3>
              <p className="text-slate-600">
                Deze vacature wordt beheerd door <strong>Recruitin</strong> (15 jaar ervaring in technische recruitment) 
                en <strong>Leftlane</strong> (Meta Verified Partner met 5.000+ recruitment campagnes). 
                Samen zorgen zij ervoor dat je snel en professioneel wordt begeleid naar je volgende stap bij Aebi Schmidt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
