import type { SectionConfig } from "@/types/landing-page";

/**
 * Aebi Schmidt Servicemonteur - Introductie secties
 * Hero, trust signals, job details, benefits, salary, day-in-life
 */
export const AEBI_SCHMIDT_SECTIONS_INTRO: SectionConfig[] = [
  {
    id: "hero-1",
    type: "hero",
    order: 0,
    visible: true,
    data: {
      companyName: "AEBI SCHMIDT",
      companyTagline: "Wereldleider in gladheidsbestrijding & veegtechniek",
      headline: "Word Servicemonteur\nbij Aebi Schmidt",
      highlightedText: "Aebi Schmidt",
      subheadline:
        "Werk aan veeg- en strooimachines die steden schoon en veilig houden. Mechanisch, hydraulisch én elektronisch.",
      location: "Regio Midden-Nederland",
      salary: "€2.800 - €3.800",
      employmentType: "Fulltime, 40 uur",
      primaryCtaLabel: "Ja, dit lijkt me wat!",
      primaryCtaAction: "scroll_to_form",
      secondaryCtaLabel: "Bekijk wat je gaat doen",
      secondaryCtaAction: "scroll_to_section",
      secondaryCtaTarget: "job-details-1",
      urgencyBadge: "Direct beschikbaar - start per direct",
      quickStats: [
        { value: "€2.800 - €3.800", label: "bruto per maand" },
        { value: "Servicewagen", label: "incl. gereedschap" },
        { value: "250+ collega's", label: "in Holten" },
      ],
    },
  },
  {
    id: "trust-1",
    type: "trust_signals",
    order: 1,
    visible: true,
    data: {
      heading: "Waarom monteurs kiezen voor Aebi Schmidt",
      subheading: "Al sinds 1949 een stabiele werkgever in Holten",
      stats: [
        { icon: "users", value: "3.000+", label: "Medewerkers wereldwijd" },
        { icon: "globe", value: "90+", label: "Landen actief" },
        { icon: "award", value: "75+ jaar", label: "Ervaring (Nido 1949)" },
        { icon: "factory", value: "14", label: "Productiefaciliteiten" },
      ],
      certifications: [
        { label: "ISO 9001 Gecertificeerd" },
        { label: "ISO 27001 Gecertificeerd" },
        { label: "CAO Metaalbewerkingsbedrijf" },
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
        "Als Servicemonteur werk je zelfstandig aan onderhoud en het oplossen van storingen bij veeg- en strooimachines. Je werkt aan alle onderdelen: mechanisch, hydraulisch en elektronisch. Steeds vaker ook aan elektrische machines.",
      quickInfo: [
        { icon: "map-pin", label: "Locatie", value: "Regio Midden-Nederland" },
        { icon: "clock", label: "Uren", value: "40 uur/week" },
        { icon: "briefcase", label: "Contract", value: "Vast dienstverband" },
        { icon: "calendar", label: "Start", value: "Per direct" },
      ],
      responsibilities: [
        {
          title: "Onderhoud veeg- en strooimachines",
          description:
            "Preventief en correctief onderhoud aan het complete machinepark: mechanisch, hydraulisch en elektronisch",
        },
        {
          title: "Storingen oplossen",
          description:
            "Zelfstandig diagnosticeren en verhelpen van storingen, zowel in de werkplaats als op locatie bij de klant",
        },
        {
          title: "Elektrische machines",
          description:
            "Steeds vaker onderhoud aan de nieuwste generatie elektrisch aangedreven veegmachines",
        },
        {
          title: "Planning & spoedopdrachten",
          description:
            "In overleg met je planner je eigen werkdag organiseren en flexibel inspringen bij spoedmeldingen",
        },
        {
          title: "Klantcontact & advies",
          description:
            "Eerste aanspreekpunt voor klanten, adviseren over onderdelen en mogelijke vervangingen",
        },
        {
          title: "Administratie",
          description:
            "Bijhouden van werkbonnen, magazijnvoorraad en rapportage van uitgevoerde werkzaamheden",
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
      subheading: "Arbeidsvoorwaarden conform CAO Metaalbewerkingsbedrijf",
      benefits: [
        {
          icon: "euro",
          title: "Goed salaris volgens CAO",
          description: "€2.800 - €3.800 bruto/maand op basis van ervaring en kennis",
        },
        {
          icon: "car",
          title: "Servicewagen + gereedschap",
          description: "Volledig uitgeruste servicebus met professioneel gereedschap",
        },
        {
          icon: "graduation-cap",
          title: "Opleidingen & certificeringen",
          description: "Interne trainingen op mechanisch, hydraulisch en elektronisch gebied",
        },
        {
          icon: "calendar",
          title: "Vakantiedagen + ATV",
          description: "Ruime verlofregeling conform CAO Metaalbewerkingsbedrijf",
        },
        {
          icon: "heart",
          title: "Pensioenregeling PME",
          description: "Goede pensioenopbouw via Pensioenfonds Metalektro",
        },
        {
          icon: "zap",
          title: "Innovatief werk",
          description: "Werk met de nieuwste technologie: van diesel tot volledig elektrisch",
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
          value: "€2.800 - €3.800",
          description: "Bruto maandsalaris o.b.v. ervaring en kennis",
        },
        {
          icon: "clock",
          label: "Overwerkvergoeding",
          value: "Conform CAO",
          description: "Toeslag voor overwerk, avond- en weekendwerk",
        },
        {
          icon: "car",
          label: "Servicebus",
          value: "Incl.",
          description: "Volledig uitgeruste bus met gereedschap",
        },
        {
          icon: "gift",
          label: "Vakantietoeslag",
          value: "8%",
          description: "Jaarlijkse vakantietoeslag conform CAO",
        },
      ],
      totalLabel: "Totaal jaarpakket",
      totalValue: "€40.000 - €52.000",
      totalDescription: "Inclusief vakantietoeslag en overwerkvergoeding",
    },
  },
  {
    id: "day-in-life-1",
    type: "day_in_life",
    order: 5,
    visible: true,
    data: {
      heading: "Een dag als Servicemonteur",
      subheading: "Geen dag is hetzelfde bij Aebi Schmidt",
      timeline: [
        {
          time: "07:00",
          title: "Start vanuit huis",
          description: "Je pakt je servicebus en rijdt naar je eerste klant of de werkplaats in Holten",
          icon: "car",
        },
        {
          time: "07:30",
          title: "Werkplaats of klantlocatie",
          description: "Planning doorspreken met je planner, onderdelen checken in het magazijn",
          icon: "clipboard",
        },
        {
          time: "08:00",
          title: "Onderhoud veegmachine",
          description: "Preventief onderhoud aan een elektrische Schmidt Cleango veegmachine",
          icon: "wrench",
        },
        {
          time: "10:30",
          title: "Spoedmelding!",
          description: "Een Nido strooier in de regio heeft een hydraulische storing. Je rijdt erheen.",
          icon: "zap",
        },
        {
          time: "12:00",
          title: "Lunch onderweg",
          description: "Even pauze bij de klant, of onderweg naar de volgende locatie",
          icon: "coffee",
        },
        {
          time: "13:00",
          title: "Revisie in werkplaats",
          description: "Terug in Holten voor het reviseren van een complete Nido strooier",
          icon: "settings",
        },
        {
          time: "15:30",
          title: "Administratie & advies",
          description: "Werkbonnen bijwerken, klant bellen over vervanging onderdelen",
          icon: "monitor",
        },
        {
          time: "16:00",
          title: "Einde werkdag",
          description: "Gereedschap opruimen, morgen weer een nieuwe dag",
          icon: "home",
        },
      ],
    },
  },
];
