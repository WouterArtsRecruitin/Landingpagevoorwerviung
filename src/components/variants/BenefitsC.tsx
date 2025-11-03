import { Euro, Car, GraduationCap, Users, Heart, Clock } from "lucide-react";

export function BenefitsC() {
  const benefits = [
    {
      icon: Euro,
      title: "€2.800 - €3.800 p/m",
      items: ["Bruto op basis van 40u/week", "8% vakantiegeld + bonus", "Goede pensioenregeling"],
    },
    {
      icon: Car,
      title: "Servicewagen",
      items: ["Ook voor privé gebruik", "Volledig uitgerust", "Alle gereedschap aanwezig"],
    },
    {
      icon: GraduationCap,
      title: "Ontwikkeling",
      items: ["Doorgroeimogelijkheden", "Trainingen & cursussen", "Jaarlijks opleidingsbudget"],
    },
    {
      icon: Users,
      title: "Werksfeer",
      items: ["Hecht team", "Teamdagen & events", "Informele sfeer"],
    },
    {
      icon: Clock,
      title: "Werk-Privé Balans",
      items: ["25 vakantiedagen", "Reguliere werktijden", "Vaste regio"],
    },
    {
      icon: Heart,
      title: "Extra's",
      items: ["Laptop & telefoon", "Werkkleding", "Moderne apparatuur"],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl mb-4">Wat bieden wij?</h2>
          <p className="text-slate-600">
            Uitstekende arbeidsvoorwaarden en een inspirerende werkomgeving
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="p-6 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-red-600" />
                  </div>
                  <h3>{benefit.title}</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {benefit.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-600 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
