import { Quote } from "lucide-react";

export function TestimonialsC() {
  const testimonials = [
    {
      name: "Dennis",
      quote: "Het mooie van werken bij Aebi Schmidt is de afwisseling. Elke dag is anders!",
      role: "Servicemonteur",
    },
    {
      name: "Marco",
      quote: "Aebi Schmidt investeert echt in je ontwikkeling. Alle trainingen en support die je nodig hebt.",
      role: "Servicemonteur",
    },
    {
      name: "Thomas",
      quote: "Goede werk-privé balans en fijne collega's. De klanten waarderen ons werk enorm.",
      role: "Servicemonteur",
    },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
            <Quote className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-3xl mb-2">Wat zeggen collega's?</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <Quote className="w-8 h-8 text-red-200 mb-4" />
              <p className="text-slate-700 mb-4 italic">"{testimonial.quote}"</p>
              <div className="pt-4 border-t border-slate-100">
                <div className="text-slate-900">{testimonial.name}</div>
                <div className="text-sm text-slate-600">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
