import { CheckCircle2, Wrench, GraduationCap, Car, Euro } from "lucide-react";

export function QuickFacts() {
  const facts = [
    {
      icon: Euro,
      title: "Competitief Salaris",
      description: "Marktconform salaris + 8% vakantiegeld",
    },
    {
      icon: Car,
      title: "Servicewagen",
      description: "Ook voor privégebruik beschikbaar",
    },
    {
      icon: GraduationCap,
      title: "Training & Ontwikkeling",
      description: "Doorgroeimogelijkheden en opleidingen",
    },
    {
      icon: Wrench,
      title: "Moderne Machines",
      description: "Werk met de nieuwste technologie",
    },
  ];

  return (
    <section id="quick-facts" className="py-12 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <div key={index} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="mb-1">{fact.title}</h3>
                  <p className="text-sm text-slate-600">{fact.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
