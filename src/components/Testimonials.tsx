import { Quote, Star } from "lucide-react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Testimonials() {
  const testimonials = [
    {
      name: "Dennis van der Berg",
      role: "Senior Servicemonteur sinds 2019",
      image: "https://images.unsplash.com/photo-1660074127797-1c429fbb8cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWNobmljaWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYxNjEyODAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      quote: "Wat me echt triggerde was de technische complexiteit. Je werkt met CAN-Bus systemen, programmeert besturingssoftware, en lost hydraulische puzzels op. Ik kwam van de automotive, maar dit niveau van technologie had ik niet verwacht. En dan die Academy training in Zwitserland - next level!",
      rating: 5,
    },
    {
      name: "Marco Jansen",
      role: "Servicemonteur E-Mobility sinds 2021",
      image: "https://images.unsplash.com/photo-1759405185685-c6009021adec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pYyUyMHdvcmtlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTY1MzcxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      quote: "Ik wilde mee met de elektrificatie-trend en dat kan perfect hier. Van elektrische veegmachines tot batterijmanagement systemen - de toekomst is nu. Plus ik heb m'n certificering voor high-voltage systemen gehaald, volledig betaald door Aebi Schmidt. Niemand kent dit bedrijf, maar technisch zitten we voor!",
      rating: 5,
    },
    {
      name: "Thomas Dekker",
      role: "Lead Technician Diagnostics sinds 2018",
      image: "https://images.unsplash.com/photo-1627776880991-808c5996527b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2aWNlJTIwZW5naW5lZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE2NTM3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      quote: "Het coole is dat je echt de expert bent. Klanten vragen jouw advies omdat je machines kent die zij voor tonnen hebben aangeschaft. Met IoT en remote diagnostics zie je storingen vaak al voordat de klant belt. Dat geeft zoveel voldoening. En de Zwitserse engineering precisie? Echt vakmanschap.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <Quote className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-3xl lg:text-4xl mb-4">Wat zeggen onze monteurs?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Hoor het van de mensen die het weten: onze servicemonteurs vertellen over hun ervaringen bij Aebi Schmidt
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 border-none shadow-sm hover:shadow-lg transition-shadow bg-white">
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-red-600 text-red-600" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-slate-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-slate-900">{testimonial.name}</div>
                  <div className="text-sm text-slate-600">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-white p-6 rounded-xl shadow-sm">
            <p className="text-slate-700">
              <span className="text-red-600">Word jij onze volgende collega?</span>
              <br />
              Sluit je aan bij ons team van gedreven servicemonteurs!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
