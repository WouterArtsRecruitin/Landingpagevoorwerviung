import type { LandingPageConfig } from "@/types/landing-page";

/**
 * Demo configuratie - wordt gebruikt als fallback wanneer Supabase niet geconfigureerd is.
 * Dit is een volledig voorbeeld van hoe een landingspagina configuratie eruitziet.
 *
 * In productie wordt dit vervangen door data uit Supabase.
 * Pas deze config aan om snel een nieuwe vacature landingspagina te maken.
 */
export const DEMO_CONFIG: LandingPageConfig = {
  id: "demo-page-001",
  organizationId: "demo-org-001",
  slug: "demo",
  status: "published",

  pageTitle: "Servicemonteur Vacature | Demo Bedrijf | Regio Amsterdam",
  metaDescription:
    "Word Servicemonteur bij Demo Bedrijf. Salaris tot €4.200, servicewagen, opleidingsbudget en uitstekende secundaire arbeidsvoorwaarden.",

  theme: {
    colors: {
      primary: "#2563EB",
      secondary: "#1E293B",
      accent: "#F8FAFC",
      background: "#FFFFFF",
      foreground: "#0F172A",
      muted: "#F1F5F9",
      mutedForeground: "#64748B",
    },
    fonts: {
      heading: "'Inter', sans-serif",
      body: "'Inter', sans-serif",
    },
    borderRadius: "0.75rem",
    logoUrl: "",
    logoAlt: "Demo Bedrijf",
  },

  analytics: {
    ga4MeasurementId: "",
    fbPixelId: "",
    linkedinPartnerId: "",
  },

  cookieConsent: {
    enabled: true,
    privacyPolicyUrl: "#privacy",
    categories: {
      necessary: true,
      analytics: true,
      marketing: true,
    },
  },

  chatbot: {
    enabled: false,
    provider: "tawk",
  },

  formFields: [
    {
      name: "full_name",
      label: "Volledige naam",
      type: "text",
      placeholder: "Jan de Vries",
      required: true,
    },
    {
      name: "email",
      label: "E-mailadres",
      type: "email",
      placeholder: "jan@voorbeeld.nl",
      required: true,
    },
    {
      name: "phone",
      label: "Telefoonnummer",
      type: "tel",
      placeholder: "06 12 34 56 78",
      required: true,
    },
    {
      name: "city",
      label: "Woonplaats",
      type: "text",
      placeholder: "Amsterdam",
      required: false,
    },
    {
      name: "motivation",
      label: "Waarom wil je hier werken?",
      type: "textarea",
      placeholder: "Vertel ons waarom deze functie bij je past...",
      required: false,
    },
    {
      name: "cv",
      label: "CV uploaden",
      type: "file",
      required: false,
      acceptedFileTypes: [".pdf", ".doc", ".docx"],
      helpText: "PDF, DOC of DOCX (max 5MB)",
      maxFileSizeMB: 5,
    },
    {
      name: "privacy",
      label: "Ik ga akkoord met de privacyverklaring",
      type: "checkbox",
      required: true,
    },
    {
      name: "newsletter",
      label: "Ik wil op de hoogte blijven van soortgelijke vacatures",
      type: "checkbox",
      required: false,
    },
  ],
  formSuccessMessage:
    "Bedankt voor je sollicitatie! We nemen binnen 2 werkdagen contact met je op.",

  contact: {
    personName: "Lisa Jansen",
    personRole: "Recruitment Consultant",
    personEmail: "lisa@demobedrijf.nl",
    personPhone: "020-1234567",
    whatsappUrl:
      "https://wa.me/31612345678?text=Hoi%2C%20ik%20heb%20interesse%20in%20de%20Servicemonteur%20vacature!",
    calendlyUrl: "https://calendly.com/demo/15min",
  },

  organization: {
    name: "Demo Bedrijf B.V.",
    slug: "demo-bedrijf",
    logoUrl: "",
    websiteUrl: "https://demobedrijf.nl",
  },

  sections: [
    {
      id: "hero-1",
      type: "hero",
      order: 0,
      visible: true,
      data: {
        companyName: "DEMO BEDRIJF",
        companyTagline: "Marktleider in technische dienstverlening",
        headline: "Word Servicemonteur\nbij een Topwerkgever",
        highlightedText: "Topwerkgever",
        subheadline:
          "Werk aan innovatieve installaties en groei door naar Senior Monteur",
        location: "Regio Amsterdam",
        salary: "€3.400 - €4.200",
        employmentType: "Fulltime",
        primaryCtaLabel: "Direct Solliciteren",
        primaryCtaAction: "scroll_to_form",
        secondaryCtaLabel: "Meer over de functie",
        secondaryCtaAction: "scroll_to_section",
        secondaryCtaTarget: "job-details-1",
        urgencyBadge: "Nog 2 plekken beschikbaar",
        quickStats: [
          { value: "€3.400 - €4.200", label: "bruto per maand" },
          { value: "Servicewagen", label: "ook privé gebruik" },
          { value: "32 vakantiedagen", label: "per jaar" },
        ],
      },
    },
    {
      id: "trust-1",
      type: "trust_signals",
      order: 1,
      visible: true,
      data: {
        heading: "Waarom medewerkers voor ons kiezen",
        subheading: "Al meer dan 15 jaar een betrouwbare werkgever",
        stats: [
          { icon: "users", value: "250+", label: "Medewerkers" },
          { icon: "star", value: "4.6/5", label: "Werkgeverscore" },
          { icon: "award", value: "15+", label: "Jaar ervaring" },
          { icon: "trending-up", value: "94%", label: "Doorgroei kans" },
        ],
        certifications: [
          { label: "ISO 9001 Gecertificeerd" },
          { label: "Top Employer 2026" },
          { label: "VCA** Gecertificeerd" },
        ],
      },
    },
    {
      id: "job-details-1",
      type: "job_details",
      order: 2,
      visible: true,
      data: {
        heading: "Wat ga je doen?",
        description:
          "Als Servicemonteur ben je verantwoordelijk voor het onderhoud, de reparatie en installatie van technische systemen bij onze klanten in de regio Amsterdam.",
        quickInfo: [
          { icon: "map-pin", label: "Locatie", value: "Regio Amsterdam" },
          { icon: "clock", label: "Uren", value: "38-40 uur/week" },
          { icon: "briefcase", label: "Dienstverband", value: "Vast contract" },
          { icon: "calendar", label: "Start", value: "Per direct" },
        ],
        responsibilities: [
          {
            title: "Preventief onderhoud",
            description:
              "Uitvoeren van periodieke inspecties en onderhoudswerkzaamheden volgens planning",
          },
          {
            title: "Storingen verhelpen",
            description:
              "Zelfstandig diagnosticeren en oplossen van technische storingen",
          },
          {
            title: "Installatie nieuwbouw",
            description:
              "Meewerken aan installatie van nieuwe systemen en projecten",
          },
          {
            title: "Klantcontact",
            description:
              "Eerste aanspreekpunt voor klanten, adviseren over onderhoud en verbeteringen",
          },
          {
            title: "Rapportage",
            description:
              "Vastleggen van uitgevoerde werkzaamheden in ons digitale systeem",
          },
          {
            title: "Veiligheid",
            description:
              "Werken volgens VCA-normen en bijdragen aan een veilige werkomgeving",
          },
        ],
      },
    },
    {
      id: "benefits-1",
      type: "benefits",
      order: 3,
      visible: true,
      data: {
        heading: "Wat bieden wij?",
        subheading: "Een compleet arbeidsvoorwaardenpakket",
        benefits: [
          {
            icon: "euro",
            title: "Salaris €3.400 - €4.200",
            description: "Marktconform salaris op basis van ervaring",
          },
          {
            icon: "car",
            title: "Servicewagen",
            description: "Volledig uitgeruste bus, ook privé te gebruiken",
          },
          {
            icon: "graduation-cap",
            title: "Opleidingsbudget €2.500",
            description: "Jaarlijks budget voor persoonlijke ontwikkeling",
          },
          {
            icon: "calendar",
            title: "32 Vakantiedagen",
            description: "Inclusief ATV-dagen en verjaardagsverlof",
          },
          {
            icon: "heart",
            title: "Pensioenregeling",
            description: "Uitstekende pensioenopbouw via bedrijfspensioenfonds",
          },
          {
            icon: "gift",
            title: "Bonusregeling",
            description: "Winstdeling en eindejaarsuitkering",
          },
        ],
      },
    },
    {
      id: "salary-1",
      type: "salary_breakdown",
      order: 4,
      visible: true,
      data: {
        heading: "Wat verdien je echt?",
        subheading: "Transparant overzicht van je totale beloning",
        items: [
          {
            icon: "euro",
            label: "Basissalaris",
            value: "€3.400 - €4.200",
            description: "Bruto maandsalaris o.b.v. ervaring",
          },
          {
            icon: "clock",
            label: "Overwerkvergoeding",
            value: "125 - 150%",
            description: "Extra betaald voor avond- en weekendwerk",
          },
          {
            icon: "car",
            label: "Servicewagen",
            value: "€350/mnd",
            description: "Waarde privégebruik bedrijfswagen",
          },
          {
            icon: "gift",
            label: "Eindejaarsuitkering",
            value: "8,33%",
            description: "Vakantiegeld plus extra eindejaarsbonus",
          },
        ],
        totalLabel: "Totaal jaarpakket",
        totalValue: "€55.000 - €68.000",
        totalDescription: "Inclusief alle vergoedingen en benefits",
      },
    },
    {
      id: "day-in-life-1",
      type: "day_in_life",
      order: 5,
      visible: true,
      data: {
        heading: "Een dag als Servicemonteur",
        subheading: "Zo ziet een typische werkdag eruit",
        timeline: [
          {
            time: "07:30",
            title: "Start vanuit huis",
            description: "Je rijdt met je eigen servicewagen naar de eerste klant",
            icon: "car",
          },
          {
            time: "08:00",
            title: "Eerste klant",
            description:
              "Preventief onderhoud aan klimaatsysteem bij een kantoorgebouw",
            icon: "wrench",
          },
          {
            time: "10:30",
            title: "Storingsmelding",
            description:
              "Diagnose en reparatie van een hydraulisch systeem op locatie",
            icon: "zap",
          },
          {
            time: "12:30",
            title: "Lunchpauze",
            description: "Tijd voor jezelf, lunch vergoed door werkgever",
            icon: "coffee",
          },
          {
            time: "13:30",
            title: "Installatie project",
            description:
              "Samen met collega werken aan nieuwbouw installatie",
            icon: "settings",
          },
          {
            time: "16:00",
            title: "Rapportage",
            description:
              "Digitaal vastleggen van werkzaamheden, materiaalgebruik en advies",
            icon: "monitor",
          },
          {
            time: "16:30",
            title: "Einde werkdag",
            description: "Je rijdt naar huis in je servicewagen",
            icon: "home",
          },
        ],
      },
    },
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
  ],
};
