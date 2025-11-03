import { Wrench, MapPin, Clock, Briefcase } from "lucide-react";
import { Card } from "./ui/card";

export function JobDetails() {
  const details = [
    {
      icon: Briefcase,
      label: "Functie",
      value: "Servicemonteur",
    },
    {
      icon: MapPin,
      label: "Locatie",
      value: "Holten & Regio Midden-Nederland",
    },
    {
      icon: Clock,
      label: "Dienstverband",
      value: "Fulltime",
    },
    {
      icon: Wrench,
      label: "Type",
      value: "Technisch / Service",
    },
  ];

  return (
    <section id="job-details" className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {details.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <Card key={index} className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
                <Icon className="w-8 h-8 text-red-600 mb-3" />
                <div className="text-slate-600 text-sm mb-1">{detail.label}</div>
                <div>{detail.value}</div>
              </Card>
            );
          })}
        </div>

        {/* Job Description */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl mb-6">Wat ga je doen?</h2>
          <div className="space-y-4 text-slate-700">
            <p>
              Als Servicemonteur ben je het visitekaartje van Aebi Schmidt. Je bent verantwoordelijk voor het onderhoud, 
              de reparatie en het oplossen van storingen aan onze machines bij klanten in de regio Midden-Nederland.
            </p>
            <p>
              Je werkt zelfstandig vanuit je servicewagen en bent regelmatig on-site bij klanten zoals gemeenten, 
              aannemers en hoveniersbedrijven. Elk probleem is een nieuwe uitdaging waar je met jouw technische kennis 
              en probleemoplossend vermogen een oplossing voor vindt.
            </p>
            
            <div className="bg-white p-6 rounded-lg mt-8">
              <h3 className="text-xl mb-4">Jouw technische werkzaamheden:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="block mb-1"><strong>Diagnostics & Troubleshooting:</strong> Uitlezen foutcodes via CAN-Bus, analyseren hydraulische drukken, testen elektrische circuits</span>
                    <span className="text-sm text-slate-600">→ Werken met laptop, diagnose-apparatuur en meetinstrumenten</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="block mb-1"><strong>Preventief & Correctief Onderhoud:</strong> Service volgens fabrieksschema's, vervangen slijtageonderdelen, kalibreren sensoren</span>
                    <span className="text-sm text-slate-600">→ Van simpele smeerbeurten tot complexe hydraulische reparaties</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="block mb-1"><strong>Software Updates & Configuratie:</strong> Installeren firmware updates, programmeren besturingssystemen, configureren IoT-modules</span>
                    <span className="text-sm text-slate-600">→ Ja, onze monteurs werken ook met software!</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="block mb-1"><strong>Installatie & Inbedrijfstelling:</strong> Nieuwe machines afleveren, systemen testen en afstellen, klanten trainen op technologie</span>
                    <span className="text-sm text-slate-600">→ Jij bent de technische expert die klanten vertrouwen</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="block mb-1"><strong>Remote Support & Analytics:</strong> Telemetriedata analyseren, remote diagnostics uitvoeren, predictive maintenance</span>
                    <span className="text-sm text-slate-600">→ De toekomst is nu: veel storingen los je op voordat de klant ze merkt</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg mt-6">
              <h4 className="mb-3 flex items-center gap-2">
                <span>💡</span>
                <span>Dit is geen standaard monteur werk</span>
              </h4>
              <p className="text-sm text-red-100">
                Je werkt met machines ter waarde van €150.000 - €300.000 per stuk. Elke machine 
                is een complex samenstel van mechanica, hydrauliek, elektronica en software. Als je 
                houdt van puzzelen, technische uitdagingen en continu leren, dan ga je dit geweldig vinden.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
