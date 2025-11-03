import { Building2, Users, Award, Globe } from "lucide-react";

export function TrustSignals() {
  const stats = [
    {
      icon: Building2,
      value: "100+",
      label: "Jaar ervaring",
      description: "Marktleider sinds 1883",
    },
    {
      icon: Users,
      value: "3.500+",
      label: "Medewerkers wereldwijd",
      description: "Actief in 40+ landen",
    },
    {
      icon: Award,
      value: "#1",
      label: "In Europa",
      description: "Marktleider winterdienst",
    },
    {
      icon: Globe,
      value: "50+",
      label: "Servicemonteurs NL",
      description: "Landelijk dekkend netwerk",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-red-600 to-red-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl mb-4">
            Een betrouwbare werkgever met impact
          </h2>
          <p className="text-red-100 max-w-2xl mx-auto">
            Aebi Schmidt is een internationaal toonaangevend bedrijf in machines voor wegonderhoud 
            en groenvoorziening. Sluit je aan bij een stabiele organisatie met groeimogelijkheden.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl mb-2">{stat.value}</div>
                <div className="text-lg mb-1">{stat.label}</div>
                <div className="text-sm text-red-100">{stat.description}</div>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="mt-16 pt-12 border-t border-white/20">
          <div className="text-center mb-8">
            <p className="text-red-100">Gecertificeerd en erkend door:</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-lg">
              <p className="text-sm">ISO 9001 Certified</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-lg">
              <p className="text-sm">Top Employer 2024</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-lg">
              <p className="text-sm">VCA** Erkend</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-lg">
              <p className="text-sm">Duurzaam Ondernemen</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
