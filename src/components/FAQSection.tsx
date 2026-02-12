import { useState } from 'react';

const FAQS = [
  {
    question: 'Hoe lang duurt het om een vacaturepagina te maken?',
    answer: 'Het invullen van het formulier duurt ongeveer 5 minuten. De pagina wordt vervolgens binnen 10 seconden automatisch gegenereerd. Van start tot publicatie ben je dus binnen 10 minuten klaar.'
  },
  {
    question: 'Kan ik de pagina aanpassen na het genereren?',
    answer: 'Je kunt de status wijzigen (concept, gepubliceerd, gepauzeerd) via het dashboard. Voor inhoudelijke aanpassingen kun je momenteel een nieuwe pagina genereren. Een edit-functie komt binnenkort beschikbaar.'
  },
  {
    question: 'Welke template moet ik kiezen?',
    answer: 'Kies "Automatisch" en het systeem selecteert de beste match op basis van je functie. Of bekijk de 6 demo\'s op de homepage om te zien welke stijl het beste bij jouw vacature past: Engineering (blauw), Tech (purple), Industrial (oranje), Service (rood), Logistics (groen) of Premium (goud/zwart).'
  },
  {
    question: 'Waar komen de sollicitaties binnen?',
    answer: 'Sollicitaties komen binnen op het e-mailadres dat je opgeeft bij "Contactgegevens" (stap 4). Je ziet ze ook in het dashboard onder "Kandidaten" waar je alle sollicitaties kunt bekijken en CV\'s kunt downloaden.'
  },
  {
    question: 'Kan ik meerdere vacatures tegelijk beheren?',
    answer: 'Ja! Je kunt onbeperkt vacaturepagina\'s aanmaken. Alle pagina\'s zijn te beheren via het dashboard op /admin/paginas. Daar zie je de status van elke pagina en kun je ze publiceren, pauzeren of archiveren.'
  },
  {
    question: 'Werkt het ook op mobiel?',
    answer: 'Absoluut! Alle gegenereerde pagina\'s zijn mobile-first ontworpen. Gemiddeld komt 60-70% van het verkeer vanaf mobiel. De pagina\'s laden snel en zien er professioneel uit op alle devices.'
  },
  {
    question: 'Kan ik Google Analytics toevoegen?',
    answer: 'Ja, in stap 4 van het formulier kun je een Google Analytics 4 Measurement ID toevoegen. Vul het GA4 ID in (bijv. G-XXXXXXXXXX) en de tracking wordt automatisch geïnstalleerd op je vacaturepagina.'
  },
  {
    question: 'Waarom zou ik salaris transparant maken?',
    answer: 'Onderzoek toont aan dat salaris transparantie het aantal sollicitaties verhoogt met 44%. Kandidaten waarderen duidelijkheid en verspillen geen tijd aan functies die niet binnen hun salarisverwachting vallen. Win-win!'
  },
  {
    question: 'Kan ik mijn eigen logo toevoegen?',
    answer: 'Ja! Upload je logo ergens online (bijv. Google Drive, Dropbox, of je eigen website) en plak de directe link in het "Logo URL" veld. Het logo verschijnt dan automatisch bovenaan je vacaturepagina.'
  },
  {
    question: 'Is er een limiet aan het aantal pagina\'s?',
    answer: 'Nee, je kunt onbeperkt vacaturepagina\'s aanmaken. Alle pagina\'s blijven beschikbaar in je dashboard. Voor grote volumes (>50 actieve vacatures) neem contact op voor enterprise oplossingen.'
  },
  {
    question: 'Hoe deel ik een concept pagina met mijn klant?',
    answer: 'Ga naar het dashboard, klik op "Delen" bij de concept pagina. Je krijgt een unieke approval link die je naar je klant kunt sturen. Ze kunnen dan de pagina reviewen en goedkeuren zonder in te loggen.'
  },
  {
    question: 'Wat gebeurt er met oude/afgesloten vacatures?',
    answer: 'Je kunt vacatures "archiveren" via het dashboard. Gearchiveerde pagina\'s blijven bewaard maar zijn niet meer publiek toegankelijk. Sollicitaties blijven beschikbaar in je administratie.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="container mx-auto px-4 sm:px-6 py-20 sm:py-32">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Veelgestelde Vragen
          </h2>
          <p className="text-xl text-gray-600">
            Alles wat je moet weten over vacaturepagina's genereren
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-blue-300 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-lg">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-blue-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Nog een vraag?
          </h3>
          <p className="text-gray-600 mb-4">
            We helpen je graag verder!
          </p>
          <a
            href="mailto:wouter@kandidatentekort.nl"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Neem contact op →
          </a>
        </div>
      </div>
    </section>
  );
}
