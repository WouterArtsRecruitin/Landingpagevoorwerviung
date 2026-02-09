import type { SectionConfig } from "@/types/landing-page";

/**
 * Demo secties: inhoud deel (eisen t/m final CTA)
 * Secties 6-12 van de demo landingspagina
 */
export const DEMO_SECTIONS_CONTENT: SectionConfig[] = [
  {
    id: "requirements-1",
    type: "requirements",
    order: 6,
    visible: true,
    data: {
      heading: "Wat vragen wij?",
      subheading: "Herken je jezelf hierin?",
      mustHave: [
        { text: "MBO niveau 3/4 in een technische richting" },
        { text: "Minimaal 2 jaar werkervaring als monteur" },
        { text: "Rijbewijs B" },
        { text: "Je bent zelfstandig en klantgericht" },
        { text: "Je beheerst Nederlands (B2 niveau)" },
      ],
      niceToHave: [
        { text: "Ervaring met klimaat-/koeltechniek" },
        { text: "VCA-certificaat" },
        { text: "Kennis van PLC-sturing" },
      ],
      noRequirements: [
        { text: "Je hoeft geen HBO te hebben" },
        { text: "Geen ervaring met ons merk nodig - wij leiden je op" },
        { text: "Geen avond-/weekenddiensten verplicht" },
      ],
    },
  },
  {
    id: "testimonials-1",
    type: "testimonials",
    order: 7,
    visible: true,
    data: {
      heading: "Wat zeggen onze medewerkers?",
      subheading: "Lees de ervaringen van je toekomstige collega's",
      testimonials: [
        {
          name: "Mark Peters",
          role: "Servicemonteur - 4 jaar in dienst",
          quote:
            "De afwisseling in mijn werk is fantastisch. Elke dag is anders en ik leer continu bij. De sfeer in het team is top.",
          rating: 5,
        },
        {
          name: "Sandra de Groot",
          role: "Senior Monteur - 7 jaar in dienst",
          quote:
            "Ik ben begonnen als junior en doorgegroeid tot senior monteur. Het bedrijf investeert echt in je ontwikkeling.",
          rating: 5,
        },
        {
          name: "Pieter van Dam",
          role: "Servicemonteur - 2 jaar in dienst",
          quote:
            "Het salaris is goed, maar wat me echt bindt is de vrijheid. Je plant je eigen route en bent je eigen baas op locatie.",
          rating: 4,
        },
      ],
    },
  },
  {
    id: "why-join-1",
    type: "why_join_us",
    order: 8,
    visible: true,
    data: {
      heading: "Waarom bij ons werken?",
      subheading: "Dit maakt ons een bijzondere werkgever",
      reasons: [
        {
          icon: "trending-up",
          title: "Doorgroeimogelijkheden",
          description:
            "Duidelijk carrièrepad van Junior naar Senior naar Teamleider",
        },
        {
          icon: "graduation-cap",
          title: "Continu leren",
          description:
            "Interne academie, externe opleidingen en certificeringstrajecten",
        },
        {
          icon: "heart",
          title: "Work-life balance",
          description:
            "Geen verplichte weekenddiensten, flexibele werktijden",
        },
        {
          icon: "users",
          title: "Team spirit",
          description: "Hecht team met regelmatige teamactiviteiten en BBQ's",
        },
        {
          icon: "wrench",
          title: "Professioneel gereedschap",
          description:
            "Altijd de beste tools en een volledig uitgeruste servicewagen",
        },
        {
          icon: "shield",
          title: "Stabiliteit",
          description:
            "15+ jaar in de markt, financieel gezond, vast contract",
        },
      ],
    },
  },
  {
    id: "about-1",
    type: "about_company",
    order: 9,
    visible: true,
    data: {
      heading: "Over Demo Bedrijf",
      description:
        "Demo Bedrijf is al meer dan 15 jaar marktleider in technische dienstverlening in de Randstad. Met 250+ professionals bedienen we meer dan 500 zakelijke klanten.\n\nOnze missie: technisch talent de beste werkplek bieden om zich te ontwikkelen en uit te blinken.",
      stats: [
        { value: "250+", label: "Medewerkers" },
        { value: "500+", label: "Klanten" },
        { value: "15+", label: "Jaar ervaring" },
        { value: "4.6", label: "Google rating" },
      ],
      highlights: [
        "Actief in heel Nederland met focus op de Randstad",
        "Gespecialiseerd in klimaat-, koeling en industriële systemen",
        "Eigen trainingscentrum in Amsterdam",
        "ISO 9001, VCA** en F-gassen gecertificeerd",
      ],
    },
  },
  {
    id: "faq-1",
    type: "faq",
    order: 10,
    visible: true,
    data: {
      heading: "Veelgestelde vragen",
      subheading: "Nog twijfels? Hier vind je de antwoorden",
      faqs: [
        {
          question: "Hoe snel hoor ik iets na mijn sollicitatie?",
          answer:
            "We reageren binnen 2 werkdagen op je sollicitatie. Het hele sollicitatieproces duurt gemiddeld 2 weken van eerste contact tot aanbod.",
        },
        {
          question: "Moet ik specifieke certificaten hebben?",
          answer:
            "Een relevante MBO opleiding is vereist. VCA en andere certificaten zijn mooi meegenomen, maar wij bieden ook de mogelijkheid om deze via ons te behalen.",
        },
        {
          question: "Hoe ziet het inwerken eruit?",
          answer:
            "Je start met een inwerkprogramma van 4 weken: 1 week op kantoor/trainingscentrum en 3 weken meerijden met een ervaren collega. Daarna ga je zelfstandig aan de slag met ondersteuning op afstand.",
        },
        {
          question: "Is er mogelijkheid tot thuiswerken?",
          answer:
            "Als Servicemonteur werk je voornamelijk op locatie bij klanten. Je start en eindigt de dag vanuit huis met je servicewagen. Administratief werk kun je thuis doen.",
        },
        {
          question: "Wat als ik nog geen rijbewijs B heb?",
          answer:
            "Een rijbewijs B is vereist voor deze functie. Als je bezig bent met je rijbewijs, neem dan toch contact op - we kijken graag naar de mogelijkheden.",
        },
      ],
    },
  },
  {
    id: "application-form-1",
    type: "application_form",
    order: 11,
    visible: true,
    data: {
      heading: "Direct Solliciteren",
      subheading:
        "Vul het formulier in en we nemen binnen 2 werkdagen contact met je op",
      showWhatsAppAlternative: true,
      showCalendlyAlternative: true,
    },
  },
  {
    id: "final-cta-1",
    type: "final_cta",
    order: 12,
    visible: true,
    data: {
      heading: "Klaar voor de volgende stap",
      highlightedText: "in je carrière?",
      subheading:
        "Kies de manier die bij je past om contact op te nemen. Geen sollicitatieplicht - een vrijblijvend gesprek is ook welkom.",
      ctaOptions: [
        {
          type: "apply",
          heading: "Online Solliciteren",
          description: "Vul het formulier in en we reageren binnen 2 werkdagen",
          buttonLabel: "Naar sollicitatieformulier",
        },
        {
          type: "whatsapp",
          heading: "Via WhatsApp",
          description: "Stel je vraag direct via WhatsApp aan Lisa",
          buttonLabel: "WhatsApp Lisa",
        },
        {
          type: "calendly",
          heading: "Plan een gesprek",
          description: "Kies een moment dat jou uitkomt voor een belafspraak",
          buttonLabel: "Plan een gesprek",
        },
      ],
      trustBadges: [
        "Reactie binnen 2 werkdagen",
        "Vrijblijvend kennismaken",
        "Je gegevens zijn veilig (AVG)",
      ],
    },
  },
];
