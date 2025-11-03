import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { 
  Phone, 
  Mail, 
  Target, 
  Users, 
  TrendingUp, 
  CheckCircle2,
  Zap,
  Award,
  Eye,
  Search,
  Calendar,
  BarChart3
} from "lucide-react";
import airportSnowplow from "figma:asset/674dfb80adcfa5b1237453a27ad870c404d7f0b9.png";

export default function Proposal() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={airportSnowplow}
            alt="Aebi Schmidt operations"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="mb-6">
              <span className="text-red-600 tracking-wider text-xl">AEBI SCHMIDT NEDERLAND</span>
            </div>
            <h1 className="text-4xl lg:text-6xl mb-6 leading-tight">
              Monteurs Vinden voor<br />
              <span className="text-red-600">Jullie Winterseizoen</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Een voorstel van Recruitin + Leftlane
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-600" />
                <span>06-14314593</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-red-600" />
                <span>wouter@recruitin.nl</span>
              </div>
            </div>
            <div className="mt-6 text-sm text-slate-400">
              Van: Wouter Arts - Recruitin B.V. | Datum: 2 november 2025
            </div>
          </div>
        </div>
      </section>

      {/* Situatie */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl mb-6">Jullie Situatie</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="mb-1">Monteur Werkplaats (Alphen + Weesp)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="mb-1">Service Monteur (heel Nederland, auto van de zaak)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="mb-1">Snel - winterseizoen staat voor de deur</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="mb-1">Geen tijd intern voor recruitment</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-red-600">
              <h3 className="text-2xl mb-4">Het Probleem</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                Monteurs die Aebi Schmidt <strong>nog niet kennen</strong>. Ze weten niet dat jullie bestaan.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                En jullie hebben geen tijd om ze actief te vinden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Oplossing */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl mb-4">Onze Oplossing</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              De meeste bureaus doen <strong>of</strong> zoeken <strong>of</strong> adverteren.<br />
              <span className="text-red-600">Wij doen beide</span> - en dat maakt het verschil.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="p-8">
              <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-2xl mb-3">Alleen Adverteren</h3>
              <p className="text-slate-600 mb-4">
                Levert leads, maar wie belt ze? Wie screent? Wie plant in?
              </p>
              <div className="text-sm text-slate-500">
                ❌ Geen persoonlijke opvolging
              </div>
            </Card>

            <Card className="p-8">
              <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-2xl mb-3">Alleen Zoeken</h3>
              <p className="text-slate-600 mb-4">
                Bereikt alleen actieve sollicitanten (klein groepje, vaak al in gesprek)
              </p>
              <div className="text-sm text-slate-500">
                ❌ Mist 80% van de markt
              </div>
            </Card>

            <Card className="p-8 border-2 border-red-600 shadow-xl relative">
              <div className="absolute -top-3 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                Beste Resultaat
              </div>
              <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl mb-3">Samen</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600">Aebi Schmidt wordt bekend (adverteren)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600">We vinden actief de beste kandidaten (zoeken)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600">We volgen op tot interview (begeleiding)</span>
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-red-600">
                  ✅ Meer kandidaten, betere kwaliteit, sneller
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Wie zijn wij */}
      <section className="py-16 lg:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl mb-12 text-center">Wie Zijn Wij?</h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Recruitin */}
            <div className="bg-slate-800 p-8 rounded-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl">RECRUITIN</h3>
                  <div className="text-blue-400">Jullie Recruitment Partner</div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl mb-2 text-blue-400">Wat Wij Doen</h4>
                  <p className="text-slate-300">
                    Vinden en screenen kandidaten voor technische functies. 
                    Gespecialiseerd in automotive, techniek, industrie.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl mb-2 text-blue-400">Onze Aanpak</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>LinkedIn sourcing - persoonlijke berichten</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>Telefonische screening - elk gesprek</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>Interview coördinatie - wij plannen alles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>Jullie krijgen alleen gekwalificeerde kandidaten</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl mb-2 text-blue-400">Waarom Wij</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start gap-2">
                      <Award className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>15 jaar ervaring technische recruitment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Award className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>Automotive kennis - we snappen monteur werk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Award className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>Persoonlijk contact - bellen binnen 24 uur</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Award className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>Dedicated team - Wouter, Remco, Kitty</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Leftlane */}
            <div className="bg-slate-800 p-8 rounded-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl">LEFTLANE</h3>
                  <div className="text-red-400">Jullie Marketing Kracht</div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl mb-2 text-red-400">Wat Leftlane Doet</h4>
                  <p className="text-slate-300">
                    Online campagnes op Facebook en Instagram om kandidaten te bereiken die 
                    nu niet actief zoeken maar wel open staan.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl mb-2 text-red-400">Track Record</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>5.000+ recruitment campagnes sinds 2018</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>Meta Verified Partner (officieel Facebook/Instagram)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>Gespecialiseerd blue collar (operators, monteurs)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>€50 miljoen+ ad budget beheerd</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl mb-2 text-red-400">Hun Aanpak</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start gap-2">
                      <Zap className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>Advertenties die monteurs aanspreken</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>A/B testing (welke werkt beste?)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>Doelgroep targeting (automotive monteurs, regio)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>Dagelijks optimaliseren</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waarom Samen */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl mb-12 text-center">Waarom Samen?</h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-50 p-8 rounded-xl">
              <h3 className="text-2xl mb-6 text-center">De Kracht van Combinatie</h3>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border-l-4 border-red-600">
                  <div className="mb-2">
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                      Leftlane Campagne
                    </span>
                  </div>
                  <p className="text-slate-600">
                    → Monteurs zien Aebi Schmidt online<br />
                    → Merk wordt bekend
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600">
                  <div className="mb-2">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      Recruitin Zoeken
                    </span>
                  </div>
                  <p className="text-slate-600">
                    → We benaderen op LinkedIn<br />
                    → "Heb je Aebi Schmidt gezien?" (ze kennen jullie al!)<br />
                    → Veel hogere respons
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600">
                  <div className="mb-2">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      Sollicitaties via Campagne
                    </span>
                  </div>
                  <p className="text-slate-600">
                    → Recruitin belt, screent, plant in<br />
                    → Actieve opvolging
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                  <div className="mb-2">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      ✅ Resultaat
                    </span>
                  </div>
                  <p className="text-slate-700">
                    → Meer kandidaten (online + zoeken)<br />
                    → Betere conversie (ze kennen jullie)<br />
                    → Sneller resultaat (beide sporen)
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="mb-3">Voorbeeld:</h4>
                <div className="space-y-2 text-slate-700">
                  <p>❌ Zonder campagne: "Ken je Aebi Schmidt?" → "Nee, wie?" → Moeilijk</p>
                  <p>✅ Met campagne: "Zag je Aebi Schmidt ads?" → "Oh ja!" → Makkelijk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 80% Kandidaten */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl mb-12 text-center">
            80% Kandidaten Die Anderen Missen
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <Card className="p-8">
              <div className="text-4xl mb-4">10-20%</div>
              <h3 className="text-2xl mb-3">Actieve Zoekers</h3>
              <p className="text-slate-600 mb-4">
                Op jobboards, sturen CV's - makkelijk te vinden
              </p>
              <div className="text-sm text-red-600">
                ⚠️ Vaak al in gesprek met 5 anderen
              </div>
            </Card>

            <Card className="p-8 border-2 border-green-600">
              <div className="text-4xl mb-4 text-green-600">80-90%</div>
              <h3 className="text-2xl mb-3">Passieve Kandidaten</h3>
              <p className="text-slate-600 mb-4">
                Niet actief zoekend, wel open voor beter
              </p>
              <div className="text-sm text-green-600">
                ✅ Niet in gesprek met concurrenten
              </div>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl mb-4 text-center">Onze Strategie</h3>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center">
                  1
                </div>
                <div>
                  <strong>Leftlane campagne</strong> → Passieve kandidaten zien jullie
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center">
                  2
                </div>
                <div>
                  Ze worden <strong>nieuwsgierig</strong>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center">
                  3
                </div>
                <div>
                  <strong>Recruitin benadert</strong> → "Oh ja, die ken ik!" → Hogere respons
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                  ✓
                </div>
                <div>
                  <strong className="text-green-600">Resultaat:</strong> We vinden de 80% die anderen missen
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 lg:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl mb-4">
              Transparante Vaste Prijzen
            </h2>
            <p className="text-xl text-slate-300">
              Alles inbegrepen: Recruitin + Leftlane + advertentiebudget
            </p>
            <div className="mt-4 text-sm text-slate-400">
              Geldig 14 dagen | Prijzen exclusief 21% BTW
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Optie 1: Sprint */}
            <Card className="p-8 bg-slate-800 border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl">Optie 1: Sprint</h3>
                <div className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                  10 Weken
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl mb-3 text-blue-400">1 Vacature</h4>
                  <div className="bg-slate-900 p-4 rounded-lg space-y-2 text-sm mb-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Recruitment Marketing Campagne</span>
                      <span>€3.700</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Advertentiebudget (€400/mnd)</span>
                      <span>€1.000</span>
                    </div>
                    <div className="border-t border-slate-700 pt-2 flex justify-between">
                      <span>Totaal</span>
                      <span className="text-2xl text-blue-400">€4.700</span>
                    </div>
                  </div>
                  <div className="text-sm text-slate-400">
                    Per maand: €1.880
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-700">
                  <h4 className="text-xl mb-3 text-blue-400">2 Vacatures</h4>
                  <div className="bg-slate-900 p-4 rounded-lg space-y-2 text-sm mb-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Campagnes (€3.700 + €1.300)</span>
                      <span>€5.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Advertentiebudget</span>
                      <span>€2.625</span>
                    </div>
                    <div className="border-t border-slate-700 pt-2 flex justify-between">
                      <span>Totaal</span>
                      <span className="text-2xl text-blue-400">€7.625</span>
                    </div>
                  </div>
                  <div className="text-sm text-green-400 mb-2">
                    ✅ Besparing: €1.775 (19% korting)
                  </div>
                  <div className="text-sm text-slate-400">
                    Per maand: €3.050
                  </div>
                </div>
              </div>
            </Card>

            {/* Optie 2: Partnership */}
            <Card className="p-8 bg-slate-800 border-2 border-red-600 relative">
              <div className="absolute -top-3 right-4 bg-red-600 text-white px-4 py-1 rounded-full text-sm">
                Meeste Waarde
              </div>

              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl">Optie 2: Partnership</h3>
                <div className="bg-red-600 px-3 py-1 rounded-full text-sm">
                  6 Maanden
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl mb-3 text-red-400">1 Vacature</h4>
                  <div className="bg-slate-900 p-4 rounded-lg space-y-2 text-sm mb-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Recruitment Marketing Campagne</span>
                      <span>€7.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Advertentiebudget (€400/mnd × 6)</span>
                      <span>€2.400</span>
                    </div>
                    <div className="border-t border-slate-700 pt-2 flex justify-between">
                      <span>Totaal</span>
                      <span className="text-2xl text-red-400">€9.400</span>
                    </div>
                  </div>
                  <div className="text-sm text-green-400 mb-2">
                    ✅ Besparing: €1.879 (19% korting vs Sprint)
                  </div>
                  <div className="text-sm text-slate-400">
                    Per maand: €1.567
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-700">
                  <h4 className="text-xl mb-3 text-red-400">2 Vacatures</h4>
                  <div className="bg-slate-900 p-4 rounded-lg space-y-2 text-sm mb-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Campagnes (€7.000 + €3.120)</span>
                      <span>€10.120</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Advertentiebudget</span>
                      <span>€6.300</span>
                    </div>
                    <div className="border-t border-slate-700 pt-2 flex justify-between">
                      <span>Totaal</span>
                      <span className="text-2xl text-red-400">€16.420</span>
                    </div>
                  </div>
                  <div className="text-sm text-green-400 mb-2">
                    ✅ Besparing: €313/maand (10% korting vs Sprint)
                  </div>
                  <div className="text-sm text-slate-400">
                    Per maand: €2.737
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-red-900/30 p-4 rounded-lg border border-red-700">
                <h5 className="mb-2">Extra Voordelen:</h5>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li>✅ Campagne pauzeren/hervatten binnen 24 maanden</li>
                  <li>✅ Bij invulling: gratis omzetten naar andere vacature</li>
                </ul>
              </div>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-xl">
            <h3 className="text-2xl mb-6">Wat Zit Erin? (Beide Opties)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="mb-3 text-red-400">Van Leftlane:</h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Complete campagne setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Advertentie varianten & A/B testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Landing page</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Dagelijkse optimalisatie</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-blue-400">Van Recruitin:</h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>LinkedIn sourcing (actief vinden)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Telefonische screening alle kandidaten</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Interview scheduling & coördinatie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Dossier per kandidaat</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl mb-6">
            Klaar om te Starten?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Vol team voor het winterseizoen. Transparant vast bedrag. Complete ontzorging.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-slate-100 text-xl px-8 py-7"
              onClick={() => window.location.href = 'tel:0614314593'}
            >
              <Phone className="mr-2 w-6 h-6" />
              Bel: 06-14314593
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 text-xl px-8 py-7"
              onClick={() => window.location.href = 'mailto:wouter@recruitin.nl'}
            >
              <Mail className="mr-2 w-6 h-6" />
              Email Wouter
            </Button>
          </div>
          <div className="mt-8 text-red-100">
            Wouter Arts - Recruitin B.V.<br />
            <em>"Samen vinden we de juiste kandidaten."</em>
          </div>
        </div>
      </section>
    </div>
  );
}
