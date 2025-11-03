import { Euro, GraduationCap, Car, Users, Heart, TrendingUp, Clock, MapPin } from "lucide-react";
import { Card } from "../ui/card";

export function BenefitsB() {
  const benefits = [
    {
      icon: Euro,
      title: "€2.800 - €3.800 bruto p/m",
      description: "Marktconform + 8% vakantiegeld + bonus",
      highlight: "Per maand",
    },
    {
      icon: Car,
      title: "Servicewagen",
      description: "Ook voor privé gebruik",
      highlight: "Inclusief",
    },
    {
      icon: Clock,
      title: "Vakantiedagen",
      description: "Per jaar vrij te besteden",
      highlight: "25 dagen",
    },
    {
      icon: GraduationCap,
      title: "Opleidingsbudget",
      description: "Jaarlijks voor training",
      highlight: "€2.000",
    },
    {
      icon: Heart,
      title: "Pensioenregeling",
      description: "Uitstekende voorwaarden",
      highlight: "Premievrij",
    },
    {
      icon: Users,
      title: "Team Events",
      description: "Teamdagen en borrels",
      highlight: "4x per jaar",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl mb-4">Jouw Arbeidsvoorwaarden</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We investeren in onze mensen met uitstekende voorwaarden en ruimte voor ontwikkeling
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="text-red-600 text-sm px-3 py-1 bg-red-50 rounded-full">
                    {benefit.highlight}
                  </div>
                </div>
                <h3 className="mb-2">{benefit.title}</h3>
                <p className="text-slate-600 text-sm">{benefit.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Extra Info Box */}
        <div className="mt-12 bg-gradient-to-r from-red-50 to-red-100 p-8 rounded-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl mb-4">En nog veel meer...</h3>
            <p className="text-slate-700 mb-6">
              Naast deze arbeidsvoorwaarden bieden we een inspirerende werkomgeving, moderne apparatuur, 
              en alle tools die je nodig hebt om succesvol te zijn. Je krijgt alle ruimte om te groeien en jezelf te ontwikkelen.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>Vaste regio</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-red-600" />
                <span>Reguliere werktijden</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
                <TrendingUp className="w-4 h-4 text-red-600" />
                <span>Groei mogelijkheden</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
