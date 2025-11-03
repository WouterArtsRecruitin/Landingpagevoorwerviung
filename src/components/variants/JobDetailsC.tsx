import { CheckCircle2, Briefcase, GraduationCap } from "lucide-react";

export function JobDetailsC() {
  const responsibilities = [
    "Onderhoud en reparaties aan machines en apparatuur",
    "Analyseren en oplossen van technische storingen",
    "Installeren van nieuwe machines bij klanten",
    "Technische instructies en trainingen geven",
    "Samenwerken met collega's en technische dienst",
  ];

  const requirements = [
    "MBO 3/4 werktuigbouwkunde of mechatronica",
    "Min. 2 jaar ervaring als monteur/servicetechnicus",
    "Ervaring met mechanische, hydraulische en elektrische systemen",
    "Rijbewijs B (BE is een pré)",
    "Klantgericht en zelfstandig",
  ];

  return (
    <section id="job-info" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* What You'll Do */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl">Wat ga je doen?</h2>
            </div>
            <p className="text-slate-700 mb-6">
              Als Servicemonteur ben je verantwoordelijk voor onderhoud, reparatie en het oplossen van storingen 
              bij klanten in de regio Midden-Nederland.
            </p>
            <ul className="space-y-3">
              {responsibilities.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What We Ask */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl">Wat vragen wij?</h2>
            </div>
            <p className="text-slate-700 mb-6">
              We zoeken een gedreven professional die techniek in het bloed heeft en graag met klanten werkt.
            </p>
            <ul className="space-y-3">
              {requirements.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-slate-700">
                <span className="text-red-600">💡 Extra pluspunten:</span> Ervaring met landbouw/bouwmachines, 
                kennis van diagnoseapparatuur, VCA certificaat
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
