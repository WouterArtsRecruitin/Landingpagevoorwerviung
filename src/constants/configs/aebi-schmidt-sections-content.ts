import type { SectionConfig } from "@/types/landing-page";

/**
 * Aebi Schmidt Servicemonteur - Inhoud secties
 * Requirements, testimonials, why join, about, FAQ, application, final CTA
 */
export const AEBI_SCHMIDT_SECTIONS_CONTENT: SectionConfig[] = [
  {
    id: "requirements-1",
    type: "requirements",
    order: 6,
    visible: true,
    data: {
      heading: "Wat vragen wij?",
      subheading: "Herken je jezelf hierin? Dan willen we je graag spreken.",
      mustHave: [
        { text: "MBO niveau 3/4 in een technische richting (werktuigbouw, mechatronica o.i.d.)" },
        { text: "Kennis van mechanica, hydraulica en elektronica" },
        { text: "Rijbewijs B" },
        { text: "Je bent zelfstandig en kunt je eigen werk plannen" },
        { text: "Goede communicatieve vaardigheden (klantcontact)" },
      ],
      niceToHave: [
        { text: "Rijbewijs C met code 95" },
        { text: "Ervaring met mobiele werktuigen of zware machines" },
        { text: "Kennis van elektrische aandrijfsystemen" },
        { text: "Ervaring met diagnostische software" },
      ],
      noRequirements: [
        { text: "Geen ervaring met veeg-/strooimachines nodig – wij leiden je op" },
        { text: "Geen HBO diploma vereist" },
        { text: "Geen verplichte nachtdiensten" },
      ],
    },
  },
  {
    id: "testimonials-1",
    type: "testimonials",
    order: 7,
    visible: true,
    data: {
      heading: "Wat zeggen onze monteurs?",
      subheading: "Lees de ervaringen van je toekomstige collega's",
      testimonials: [
        {
          name: "Henk Brouwer",
          role: "Servicemonteur - 6 jaar in dienst",
          quote:
            "Het mooie aan dit werk is de afwisseling. De ene dag repareer ik een hydraulisch systeem van een strooier, de andere dag werk ik aan een gloednieuwe elektrische veegmachine. Geen dag is hetzelfde.",
          rating: 5,
        },
        {
          name: "Kevin van Dijk",
          role: "Servicemonteur - 3 jaar in dienst",
          quote:
            "Ik wilde altijd al aan zware machines werken. Bij Aebi Schmidt krijg je die kans. Het team in Holten is super collegiaal en je krijgt alle ruimte om je te ontwikkelen.",
          rating: 5,
        },
        {
          name: "Richard Smeets",
          role: "Senior Monteur - 12 jaar in dienst",
          quote:
            "Ik ben begonnen als junior en doorgegroeid. De overstap naar elektrische machines is fascinerend. Aebi Schmidt investeert echt in opleiding en de nieuwste technologie.",
          rating: 5,
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
      heading: "Waarom Aebi Schmidt?",
      subheading: "Dit maakt ons een bijzondere werkgever",
      reasons: [
        {
          icon: "globe",
          title: "Internationaal bedrijf, lokaal team",
          description:
            "Onderdeel van een groep met 3.000+ medewerkers in 90+ landen, maar met een hecht team van 250 in Holten",
        },
        {
          icon: "zap",
          title: "Van diesel naar elektrisch",
          description:
            "Werk aan de nieuwste generatie elektrische veegmachines en strooiers. De toekomst van gemeentelijk materieel.",
        },
        {
          icon: "shield",
          title: "Maatschappelijke impact",
          description:
            "Jouw werk zorgt ervoor dat wegen schoon zijn en steden veilig in de winter. Dat voelt goed.",
        },
        {
          icon: "graduation-cap",
          title: "Doorgroeien & leren",
          description:
            "Interne trainingen, externe certificeringen en een duidelijk carrièrepad naar senior monteur",
        },
        {
          icon: "users",
          title: "Collegiaal team",
          description:
            "Teamgerichte sfeer in Holten met regelmatige teamactiviteiten en korte lijnen",
        },
        {
          icon: "trending-up",
          title: "Stabiel & groeiend",
          description:
            "75+ jaar ervaring (Nido 1949), ISO 9001 & 27001 gecertificeerd, financieel gezond",
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
      heading: "Over Aebi Schmidt Nederland",
      description:
        "Aebi Schmidt Nederland B.V. is in 2007 ontstaan na de overname van Nido in Holten, dat zijn oorsprong kent in 1949. Dagelijks werkt hier een team van 250 mensen aan de ontwikkeling, productie, verkoop en onderhoud van materieel voor gladheidsbestrijding en veegtechniek.\n\nVoor Nederland en België zijn wij actief in de verkoop en after sales van strooimachines (Nido), sneeuwploegen (Nido), veegmachines (Schmidt) en multifunctionele voertuigen (Aebi).\n\nWij geloven in een veilige en schone leefomgeving. Onze missie: wereldleider zijn in slimme producten en diensten voor werk aan essentiële infrastructuur.",
      stats: [
        { value: "250", label: "Medewerkers Holten" },
        { value: "3.000+", label: "Wereldwijd" },
        { value: "75+ jaar", label: "Ervaring (1949)" },
        { value: "90+", label: "Landen actief" },
      ],
      highlights: [
        "Hoofdkantoor NL in Holten, Overijssel",
        "Merken: Nido, Schmidt, Aebi, Arctic, MB",
        "Van gladheidsbestrijding tot elektrische veegmachines",
        "ISO 9001 en ISO 27001 gecertificeerd",
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
      subheading: "Nog twijfels? Hier vind je antwoorden.",
      faqs: [
        {
          question: "Moet ik ervaring hebben met veeg- of strooimachines?",
          answer:
            "Nee, dat is niet nodig. Als je een technische achtergrond hebt met kennis van mechanica, hydraulica of elektronica, leiden wij je intern op voor onze specifieke machines.",
        },
        {
          question: "Hoe ziet het sollicitatieproces eruit?",
          answer:
            "Na je sollicitatie nemen we binnen enkele werkdagen contact op. Het proces bestaat uit een kennismakingsgesprek, een rondleiding door de werkplaats in Holten en een tweede gesprek. Binnen 2 weken heb je duidelijkheid.",
        },
        {
          question: "Werk ik alleen in de werkplaats of ook op locatie?",
          answer:
            "Beide! Je werkt deels in onze werkplaats in Holten en deels op locatie bij klanten in de regio. Met je eigen servicebus ben je flexibel inzetbaar.",
        },
        {
          question: "Heb ik rijbewijs C nodig?",
          answer:
            "Rijbewijs B is vereist. Rijbewijs C met code 95 is een pre maar geen vereiste. Als je het niet hebt, kijken we samen naar de mogelijkheden.",
        },
        {
          question: "Zijn er doorgroeimogelijkheden?",
          answer:
            "Jazeker. Je kunt doorgroeien naar senior monteur, werkplaatsleider of specialist op het gebied van elektrische machines. We investeren actief in opleiding en ontwikkeling.",
        },
        {
          question: "Hoe zit het met overwerk en weekenddiensten?",
          answer:
            "In het winterseizoen kan het voorkomen dat er meer urgente storingen zijn (gladheidsbestrijding). Overwerk wordt vergoed conform de CAO Metaalbewerkingsbedrijf.",
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
      heading: "Direct solliciteren",
      subheading:
        "Vul het formulier in en we nemen binnen enkele werkdagen contact met je op",
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
      heading: "Klaar om aan de slag te gaan",
      highlightedText: "bij Aebi Schmidt?",
      subheading:
        "Kies de manier die bij je past. Geen verplichtingen – een vrijblijvend gesprek is ook welkom.",
      ctaOptions: [
        {
          type: "apply",
          heading: "Online solliciteren",
          description: "Vul het formulier in en we reageren binnen enkele werkdagen",
          buttonLabel: "Ja, dit lijkt me wat!",
        },
        {
          type: "whatsapp",
          heading: "Via WhatsApp",
          description: "Stel je vraag direct via WhatsApp",
          buttonLabel: "Stuur een bericht",
        },
        {
          type: "calendly",
          heading: "Plan een gesprek",
          description: "Kies een moment dat jou uitkomt voor een belafspraak",
          buttonLabel: "Plan een gesprek",
        },
      ],
      trustBadges: [
        "Reactie binnen enkele werkdagen",
        "Vrijblijvend kennismaken",
        "Je gegevens zijn veilig (AVG)",
      ],
    },
  },
];
