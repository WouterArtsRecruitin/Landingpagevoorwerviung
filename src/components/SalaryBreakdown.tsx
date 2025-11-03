import { Euro, TrendingUp, Gift, Briefcase } from "lucide-react";
import { Card } from "./ui/card";

export function SalaryBreakdown() {
  const breakdownItems = [
    {
      icon: Euro,
      label: "Basissalaris",
      value: "€2.800 - €3.800",
      description: "Per maand o.b.v. ervaring",
    },
    {
      icon: Gift,
      label: "Vakantiegeld",
      value: "8%",
      description: "€224 - €304 per maand",
    },
    {
      icon: TrendingUp,
      label: "Bonusregeling",
      value: "Tot €2.000",
      description: "Per jaar bij goed presteren",
    },
    {
      icon: Briefcase,
      label: "Totaal Pakket",
      value: "€39.000 - €54.000",
      description: "Bruto per jaar incl. voordelen",
    },
  ];

  const extraBenefits = [
    "Servicewagen voor privé gebruik (waarde ±€8.000/jaar)",
    "Pensioenopbouw zonder eigen bijdrage",
    "Opleidingsbudget van €2.000 per jaar",
    "Laptop, telefoon en werkkleding",
  ];

  return (
    <section className="py-16 lg:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 rounded-full px-4 py-2 mb-4 text-sm">
            <Euro className="w-4 h-4" />
            <span>100% Transparant</span>
          </div>
          <h2 className="text-3xl lg:text-4xl mb-4">Jouw Salaris & Voordelen</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We geloven in transparantie. Hieronder zie je precies wat je kunt verdienen en welke voordelen je krijgt.
          </p>
        </div>

        {/* Salary Breakdown Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {breakdownItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="p-6 bg-white border-none shadow-sm hover:shadow-md transition-shadow">
                <Icon className="w-8 h-8 text-red-600 mb-4" />
                <div className="text-sm text-slate-600 mb-1">{item.label}</div>
                <div className="text-2xl mb-2">{item.value}</div>
                <div className="text-sm text-slate-600">{item.description}</div>
              </Card>
            );
          })}
        </div>

        {/* Extra Benefits */}
        <div className="bg-gradient-to-br from-white to-red-50 rounded-2xl p-8 border border-red-100">
          <h3 className="text-xl mb-6 text-center">Extra voordelen bovenop je salaris</h3>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {extraBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Value Proposition */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-red-600 text-white rounded-xl p-6">
            <div className="text-sm opacity-90 mb-2">Totale waarde van je pakket</div>
            <div className="text-4xl mb-2">€50.000 - €70.000</div>
            <div className="text-sm opacity-90">Inclusief alle voordelen en secundaire arbeidsvoorwaarden</div>
          </div>
        </div>
      </div>
    </section>
  );
}
