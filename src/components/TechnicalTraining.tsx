import { GraduationCap, Award, BookOpen, Wrench } from "lucide-react";
import { Card } from "./ui/card";

export function TechnicalTraining() {
  const trainingPath = [
    {
      phase: "Week 1-2",
      title: "Onboarding & Basis",
      items: [
        "Kennismaking met producten en organisatie",
        "Veiligheid & VCA training",
        "Basis hydrauliek & elektronica refresh",
        "Werken met diagnose apparatuur",
      ],
    },
    {
      phase: "Maand 1-3",
      title: "Product Specialisatie",
      items: [
        "Aebi Schmidt Academy training (Zwitserland of Duitsland)",
        "Veegmachine technologie & systemen",
        "Winterdienstvoertuigen & strooiautomaten",
        "Hands-on training met senior monteur",
      ],
    },
    {
      phase: "Maand 4-6",
      title: "Geavanceerde Systemen",
      items: [
        "CAN-Bus diagnostics & software tools",
        "Hydraulische troubleshooting expert level",
        "Elektrische aandrijvingen & battery management",
        "Zelfstandig klanten bezoeken",
      ],
    },
    {
      phase: "Jaar 1+",
      title: "Continue Ontwikkeling",
      items: [
        "Nieuwe product introducties",
        "Internationale trainingen & kennisuitwisseling",
        "Specialisaties (bijv. IoT, elektrificatie)",
        "Lead monteur of specialist rol",
      ],
    },
  ];

  const certifications = [
    {
      icon: Award,
      title: "Aebi Schmidt Certified Technician",
      description: "Officiële certificering na voltooien Academy programma",
    },
    {
      icon: GraduationCap,
      title: "Hydrauliek Expert Niveau III",
      description: "Geavanceerde hydraulische systemen certificaat",
    },
    {
      icon: Wrench,
      title: "E-Mobility Specialist",
      description: "Certificering voor elektrische aandrijfsystemen",
    },
    {
      icon: BookOpen,
      title: "CAN-Bus & Diagnostics",
      description: "Gecertificeerd voor moderne diagnose systemen",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl mb-4">
            Jouw technische ontwikkeling bij ons
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We investeren €2.000+ per jaar in jouw ontwikkeling. Van basis tot expert: 
            je krijgt toegang tot trainingen die je nergens anders vindt.
          </p>
        </div>

        {/* Training Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl mb-8 text-center">Jouw ontwikkelpad</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainingPath.map((phase, index) => (
              <Card key={index} className="p-6 border-none shadow-sm hover:shadow-lg transition-shadow bg-slate-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-xs text-red-600">{phase.phase}</div>
                    <h4 className="text-sm">{phase.title}</h4>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {phase.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 lg:p-12 text-white">
          <h3 className="text-2xl mb-8 text-center">Certificeringen die je kunt behalen</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-red-600 mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h4 className="mb-2 text-sm">{cert.title}</h4>
                  <p className="text-xs text-slate-400">{cert.description}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <p className="text-lg mb-2">
              💡 <strong>Uniek:</strong> Toegang tot Aebi Schmidt Academy in Zwitserland
            </p>
            <p className="text-sm text-slate-300">
              Je vliegt naar ons hoofdkantoor voor hands-on training met de nieuwste technologie. 
              Netwerken met monteurs uit heel Europa en leren van de beste engineers ter wereld.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-red-50 rounded-xl">
            <div className="text-3xl mb-2 text-red-600">€2.000+</div>
            <div className="text-sm text-slate-700">Opleidingsbudget per jaar</div>
          </div>
          <div className="text-center p-6 bg-red-50 rounded-xl">
            <div className="text-3xl mb-2 text-red-600">40+</div>
            <div className="text-sm text-slate-700">Training dagen per jaar</div>
          </div>
          <div className="text-center p-6 bg-red-50 rounded-xl">
            <div className="text-3xl mb-2 text-red-600">100%</div>
            <div className="text-sm text-slate-700">Betaalde trainingen & certificaten</div>
          </div>
        </div>
      </div>
    </section>
  );
}
