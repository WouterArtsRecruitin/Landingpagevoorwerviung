import { CheckCircle2 } from "lucide-react";
import { Badge } from "./ui/badge";

export function Requirements() {
  const requirements = [
    "MBO niveau 3/4 opleiding in werktuigbouwkunde, mechatronica, automotive of elektrotechniek",
    "Minimaal 2 jaar hands-on ervaring met complexe technische systemen",
    "Affiniteit met elektronica, hydrauliek én mechanica (multidisciplinair denken)",
    "Ervaring met diagnostics, meetapparatuur en technische documentatie",
    "Rijbewijs B (BE is een pré)",
    "Goede beheersing van de Nederlandse taal, technisch Engels is een plus",
    "Niet bang voor nieuwe technologie - je houdt van leren en uitdagingen",
    "Zelfstandig werken én goed kunnen samenwerken met collega's en engineers",
  ];

  const niceToHave = [
    "Ervaring met CAN-Bus, diagnose software of PLC systemen",
    "Kennis van hydraulische systemen (high-pressure, proportioneel)",
    "Affiniteit met elektrische/hybride aandrijvingen",
    "VCA certificaat of bereid dit te behalen",
    "Ervaring met landbouw-, bouw- of speciale machines",
  ];

  return (
    <section className="py-16 lg:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl mb-4">Ben jij de tech nerd die we zoeken?</h2>
          <p className="text-slate-600 mb-10">
            We zoeken een technisch talent die geniet van complexe uitdagingen en geïntrigeerd 
            raakt door geavanceerde systemen.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Requirements */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="mb-4">Vereisten</h3>
              <ul className="space-y-3">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nice to Have */}
            <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-xl shadow-sm border border-red-100">
              <h3 className="mb-4">Extra Pluspunten</h3>
              <ul className="space-y-3 mb-6">
                {niceToHave.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div>
                <h4 className="text-xs mb-2 text-slate-600">Herken jij jezelf hierin?</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-white text-xs">Tech Nerd</Badge>
                  <Badge variant="secondary" className="bg-white text-xs">Puzzelaar</Badge>
                  <Badge variant="secondary" className="bg-white text-xs">Leergierig</Badge>
                  <Badge variant="secondary" className="bg-white text-xs">Hands-on</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
