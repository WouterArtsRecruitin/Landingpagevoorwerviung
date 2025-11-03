import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { HelpCircle } from "lucide-react";

export function FAQ() {
  const faqs = [
    {
      question: "Hoe technisch geavanceerd zijn de machines echt?",
      answer: "Je werkt met CAN-Bus diagnostics, GPS-gestuurde strooiautomaten, 48V elektrische systemen, IoT telemetrie voor predictive maintenance, en hydrauliek tot 350 bar. Het niveau is vergelijkbaar met moderne automotive tech, maar dan voor premium industriële machines van €150k-€300k per stuk. Verwacht complexe elektronica, software configuraties en geavanceerde mechatronica.",
    },
    {
      question: "Moet ik kunnen programmeren of met software werken?",
      answer: "Je hoeft geen programmeur te zijn, maar moet wel comfortabel zijn met tech. Je werkt met een laptop voor diagnostics, leest foutcodes uit, configureert systemen en voert firmware updates uit. We leren je dit tijdens trainingen. Heb je affiniteit met technologie? Dan kom je er prima.",
    },
    {
      question: "Wat is het totale salaris pakket?",
      answer: "Salaris: €2.800-€3.800 bruto per maand. Met vakantiegeld, pensioen, servicewagen voor privé (waarde ±€8k/jaar) en opleidingsbudget komt je totale pakket op €50k-€70k per jaar. Naarmate je certificeringen behaalt, groeit je salaris mee.",
    },
    {
      question: "Welke trainingen krijg ik?",
      answer: "Je start met Aebi Schmidt Academy training in Zwitserland/Duitsland (all-inclusive betaald). Daarna: CAN-Bus diagnostics, hydraulische systemen, elektrische aandrijvingen, IoT & telemetrie. Opleidingsbudget: €2.000+ per jaar. Certificeringen: Aebi Schmidt Certified Technician, Hydrauliek Expert, E-Mobility Specialist.",
    },
    {
      question: "Hoe snel kan ik starten?",
      answer: "Binnen 5 werkdagen bellen we je na je sollicitatie. Het proces: kennismakingsgesprek + rondleiding → tweede gesprek arbeidsvoorwaarden → start. Gemiddelde doorlooptijd: 2-3 weken. Direct beschikbare functie!",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <HelpCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-3xl lg:text-4xl mb-4">Veelgestelde vragen</h2>
          <p className="text-slate-600">
            Heb je vragen over de functie? Hier vind je antwoorden op de meest gestelde vragen.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-slate-50 rounded-lg px-6 border-none"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 bg-red-50 border border-red-100 rounded-xl p-6 text-center">
          <p className="text-slate-700">
            Staat je vraag er niet bij?{" "}
            <a 
              href="mailto:jobs@aebi-schmidt.com" 
              className="text-red-600 hover:text-red-700 underline"
            >
              Neem contact met ons op
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
