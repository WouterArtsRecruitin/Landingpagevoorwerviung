import { Building2, Globe, Award, Users2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AboutCompany() {
  const stats = [
    {
      icon: Users2,
      value: "3.000+",
      label: "Medewerkers wereldwijd",
    },
    {
      icon: Globe,
      value: "20+",
      label: "Landen",
    },
    {
      icon: Award,
      value: "150+",
      label: "Jaar ervaring",
    },
    {
      icon: Building2,
      value: "#1",
      label: "Marktleider",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl mb-4">Over Aebi Schmidt</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Wereldwijd toonaangevend in machines voor winterdienst en groenvoorziening
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                  <Icon className="w-8 h-8 text-red-600" />
                </div>
                <div className="text-3xl mb-1">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Company Description */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl mb-4">Innovatie en kwaliteit sinds 1883</h3>
            <div className="space-y-4 text-slate-700">
              <p>
                Aebi Schmidt is wereldwijd marktleider op het gebied van machines en voertuigen voor winterdienst, 
                straatreiniging en groenvoorziening. Met meer dan 150 jaar ervaring leveren we innovatieve oplossingen 
                aan gemeenten, aannemers en servicebedrijven.
              </p>
              <p>
                In Nederland zijn we actief vanuit verschillende locaties en leveren we niet alleen machines, maar ook 
                uitstekende service en ondersteuning. Onze servicemonteurs zijn het visitekaartje van ons bedrijf en 
                zorgen ervoor dat onze klanten altijd kunnen rekenen op goed werkende apparatuur.
              </p>
              <p>
                Bij Aebi Schmidt werken betekent werken in een internationale, innovatieve omgeving waar kwaliteit en 
                klantgerichtheid centraal staan. We investeren in onze medewerkers en bieden uitstekende mogelijkheden 
                voor persoonlijke en professionele ontwikkeling.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758691737535-57edd2a11d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtfGVufDF8fHx8MTc2MTU5NTA1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Aebi Schmidt team"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-red-600 text-white p-6 rounded-xl shadow-xl max-w-xs">
              <p className="text-sm">
                "Bij Aebi Schmidt werk je met de beste machines en de leukste collega's. Elke dag is anders!"
              </p>
              <p className="text-sm mt-2 opacity-90">- Dennis, Servicemonteur</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
