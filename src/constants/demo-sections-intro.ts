import type { SectionConfig } from "@/types/landing-page";

/**
 * Demo secties: introductie deel (hero t/m dag-in-het-leven)
 * Secties 0-5 van de demo landingspagina
 */
export const DEMO_SECTIONS_INTRO: SectionConfig[] = [
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
];
