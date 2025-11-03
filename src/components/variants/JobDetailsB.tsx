import { CheckCircle2, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export function JobDetailsB() {
  const responsibilities = [
    "Uitvoeren van onderhoud en reparaties aan machines en apparatuur",
    "Analyseren en oplossen van technische storingen",
    "Installeren van nieuwe machines bij klanten",
    "Geven van technische instructies en trainingen aan klanten",
    "Registreren en rapporteren van uitgevoerde werkzaamheden",
    "Samenwerken met collega's en de technische dienst",
  ];

  const requirements = [
    "MBO niveau 3/4 opleiding in werktuigbouwkunde of mechatronica",
    "Minimaal 2 jaar werkervaring als monteur of servicetechnicus",
    "Technisch inzicht en ervaring met mechanische, hydraulische en elektrische systemen",
    "Rijbewijs B (BE is een pré)",
    "Goede beheersing van de Nederlandse taal",
    "Klantgericht, zelfstandig en probleemoplossend",
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl mb-4">De Functie in Detail</h2>
          <p className="text-slate-600">
            Alles wat je moet weten over deze rol
          </p>
        </div>

        <Accordion type="single" collapsible defaultValue="item-1" className="space-y-4">
          <AccordionItem value="item-1" className="bg-white rounded-xl border-none shadow-sm">
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <span className="text-red-600">💼</span>
                </div>
                <span>Wat ga je doen?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <p className="text-slate-700 mb-4">
                Als Servicemonteur ben je het visitekaartje van Aebi Schmidt. Je bent verantwoordelijk voor het onderhoud, 
                de reparatie en het oplossen van storingen aan onze machines bij klanten in de regio Midden-Nederland.
              </p>
              <ul className="space-y-2">
                {responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="bg-white rounded-xl border-none shadow-sm">
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <span className="text-red-600">✓</span>
                </div>
                <span>Wat vragen wij?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <ul className="space-y-3">
                {requirements.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="bg-white rounded-xl border-none shadow-sm">
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <span className="text-red-600">🎁</span>
                </div>
                <span>Wat bieden wij?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-3 text-slate-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Een marktconform salaris passend bij je kennis en ervaring</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Volledig uitgeruste servicewagen die je ook privé mag gebruiken</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>25 vakantiedagen, 8% vakantiegeld en uitstekende pensioenregeling</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Doorgroeimogelijkheden en trainingen om je verder te ontwikkelen</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Werk samen met een gedreven en hecht team van professionals</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
