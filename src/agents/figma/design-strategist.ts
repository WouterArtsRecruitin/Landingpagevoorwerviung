// ============================================================
// FIGMA AGENT 1: THE DESIGN STRATEGIST
// Analyseert de briefing en vertaalt naar UI-architectuur
// (User Flows, informatie-architectuur, pagina-structuur)
// ============================================================

import { BaseAgent } from "../shared/base-agent";
import type {
  AgentConfig,
  AgentResult,
  WorkflowContext,
} from "../shared/types";

// ── Output types ─────────────────────────────────────────────

export interface PageDefinition {
  id: string;
  name: string;
  description: string;
  sections: SectionBlueprint[];
  userFlow: UserFlowStep[];
}

export interface SectionBlueprint {
  id: string;
  type: string;
  order: number;
  purpose: string;
  contentHints: Record<string, string>;
  /** Aanbevolen component type voor de Layout Architect */
  suggestedComponent: string;
  /** Prioriteit: hoe belangrijk is deze sectie voor conversie */
  conversionPriority: "critical" | "high" | "medium" | "low";
}

export interface UserFlowStep {
  step: number;
  action: string;
  targetSection: string;
  expectedOutcome: string;
}

export interface DesignStrategyOutput {
  pages: PageDefinition[];
  informationArchitecture: {
    primaryGoal: string;
    secondaryGoals: string[];
    targetAudience: string;
    toneOfVoice: string;
    keyMessages: string[];
  };
  seoStrategy: {
    pageTitle: string;
    metaDescription: string;
    h1: string;
    keywords: string[];
  };
  conversionStrategy: {
    primaryCta: string;
    secondaryCta: string;
    urgencyElements: string[];
    trustSignals: string[];
    socialProof: string[];
  };
}

// ── Agent implementatie ──────────────────────────────────────

export class DesignStrategist extends BaseAgent<DesignStrategyOutput> {
  config: AgentConfig = {
    name: "DesignStrategist",
    description:
      "Analyseert de intake briefing en vertaalt deze naar een complete UI-architectuur met User Flows, informatie-architectuur en pagina-structuur.",
    role: "Strategisch Agent",
    capabilities: [
      "Analyse van bedrijfs- en vacaturedata",
      "Informatie-architectuur ontwerpen",
      "User flow mapping",
      "Conversie-strategie formuleren",
      "SEO-strategie bepalen",
      "Content hiërarchie definiëren",
    ],
    dependsOn: [],
    maxRetries: 2,
    requiresReview: false,
  };

  protected async process(
    ctx: WorkflowContext
  ): Promise<DesignStrategyOutput> {
    const { intakeData } = ctx;
    this.log("Analyseer briefing en genereer UI-architectuur...");

    // Bepaal tone of voice op basis van sector
    const toneOfVoice = this.determineToneOfVoice(intakeData.companySector);

    // Genereer secties op basis van beschikbare data
    const sections = this.generateSectionBlueprints(ctx);

    // Genereer user flow
    const userFlow = this.generateUserFlow(sections);

    // Bouw de pagina-definitie
    const page: PageDefinition = {
      id: `page-${intakeData.companyName.toLowerCase().replace(/\s+/g, "-")}-${intakeData.jobTitle.toLowerCase().replace(/\s+/g, "-")}`,
      name: `${intakeData.jobTitle} | ${intakeData.companyName}`,
      description: `Vacature landing page voor ${intakeData.jobTitle} bij ${intakeData.companyName} in ${intakeData.jobLocation}`,
      sections,
      userFlow,
    };

    // Conversie-strategie
    const conversionStrategy = this.buildConversionStrategy(ctx);

    // SEO-strategie
    const seoStrategy = this.buildSeoStrategy(ctx);

    return {
      pages: [page],
      informationArchitecture: {
        primaryGoal: `Kandidaten werven voor de functie ${intakeData.jobTitle}`,
        secondaryGoals: [
          "Employer branding versterken",
          "Informatieverstrekking over de functie",
          "Drempel tot solliciteren verlagen",
        ],
        targetAudience: this.determineTargetAudience(ctx),
        toneOfVoice,
        keyMessages: this.buildKeyMessages(ctx),
      },
      seoStrategy,
      conversionStrategy,
    };
  }

  private determineToneOfVoice(sector: string): string {
    const toneMap: Record<string, string> = {
      "ICT & Telecom": "Informeel, technisch onderlegd, innovatief",
      "Techniek & Industrie": "Praktisch, direct, resultaatgericht",
      "Bouw & Vastgoed": "Stoer, no-nonsense, hands-on",
      "Logistiek & Transport": "Efficiënt, betrouwbaar, to-the-point",
      "Zorg & Welzijn": "Warm, empathisch, menselijk",
      "Horeca & Toerisme": "Gastvrij, energiek, persoonlijk",
      "Retail & E-commerce": "Modern, klantgericht, dynamisch",
      "Finance & Accounting": "Professioneel, betrouwbaar, nauwkeurig",
      "Marketing & Communicatie": "Creatief, inspirerend, vernieuwend",
      "Onderwijs & Overheid": "Betrouwbaar, helder, dienstbaar",
      "Agrarisch & Groen": "Authentiek, eerlijk, down-to-earth",
    };
    return toneMap[sector] || "Professioneel, toegankelijk, enthousiast";
  }

  private generateSectionBlueprints(
    ctx: WorkflowContext
  ): SectionBlueprint[] {
    const { intakeData } = ctx;
    const sections: SectionBlueprint[] = [];
    let order = 0;

    // Hero – altijd aanwezig
    sections.push({
      id: "hero",
      type: "hero",
      order: order++,
      purpose: "Aandacht trekken, functietitel + locatie + salaris communiceren, primaire CTA",
      contentHints: {
        headline: `Word ${intakeData.jobTitle} bij ${intakeData.companyName}`,
        subheadline: intakeData.jobDescription || `Werk in ${intakeData.jobLocation}`,
        cta: "Ja, dit lijkt me wat!",
      },
      suggestedComponent: this.selectHeroComponent(intakeData.templateStyle),
      conversionPriority: "critical",
    });

    // Job Details – als er beschrijving of verantwoordelijkheden zijn
    if (intakeData.jobDescription || intakeData.responsibilities.length > 0) {
      sections.push({
        id: "job-details",
        type: "job_details",
        order: order++,
        purpose: "Functie-inhoud verduidelijken, kandidaten helpen zich voor te stellen in de rol",
        contentHints: {
          heading: "Wat ga je doen?",
          items: intakeData.responsibilities.join(", "),
        },
        suggestedComponent: "JobDetailsSection",
        conversionPriority: "high",
      });
    }

    // Benefits – als er arbeidsvoorwaarden zijn
    if (intakeData.benefits.length > 0) {
      sections.push({
        id: "benefits",
        type: "benefits",
        order: order++,
        purpose: "Arbeidsvoorwaarden tonen om kandidaat te overtuigen",
        contentHints: {
          heading: "Wat bieden wij?",
          items: intakeData.benefits.join(", "),
        },
        suggestedComponent: "BenefitsSection",
        conversionPriority: "high",
      });
    }

    // Salary Breakdown – als salaris beschikbaar
    if (intakeData.salaryRange.min || intakeData.salaryRange.max) {
      sections.push({
        id: "salary",
        type: "salary_breakdown",
        order: order++,
        purpose: "Salaristransparantie bieden – verhoogt conversie met 44%",
        contentHints: {
          heading: "Wat verdien je?",
          min: String(intakeData.salaryRange.min || ""),
          max: String(intakeData.salaryRange.max || ""),
        },
        suggestedComponent: "SalaryBreakdownSection",
        conversionPriority: "high",
      });
    }

    // Requirements – als er eisen zijn
    if (intakeData.requirementsMust.length > 0 || intakeData.requirementsNice.length > 0) {
      sections.push({
        id: "requirements",
        type: "requirements",
        order: order++,
        purpose: "Duidelijkheid geven over wat er verwacht wordt, zelfselectie bevorderen",
        contentHints: {
          heading: "Wat vragen wij?",
          mustHave: intakeData.requirementsMust.join(", "),
          niceToHave: intakeData.requirementsNice.join(", "),
        },
        suggestedComponent: "RequirementsSection",
        conversionPriority: "medium",
      });
    }

    // FAQ – altijd
    sections.push({
      id: "faq",
      type: "faq",
      order: order++,
      purpose: "Veelgestelde vragen beantwoorden, twijfels wegnemen",
      contentHints: {
        heading: "Veelgestelde vragen",
      },
      suggestedComponent: "FAQSection",
      conversionPriority: "medium",
    });

    // Application Form – altijd
    sections.push({
      id: "application-form",
      type: "application_form",
      order: order++,
      purpose: "Sollicitatie formulier – het conversie-moment",
      contentHints: {
        heading: "Direct solliciteren",
        subheading: "Vul het formulier in en we nemen snel contact op",
      },
      suggestedComponent: "ApplicationFormSection",
      conversionPriority: "critical",
    });

    // Final CTA – altijd
    sections.push({
      id: "final-cta",
      type: "final_cta",
      order: order++,
      purpose: "Laatste overtuiging, meerdere sollicitatie-opties bieden",
      contentHints: {
        heading: "Klaar om te solliciteren?",
      },
      suggestedComponent: "FinalCTASection",
      conversionPriority: "critical",
    });

    return sections;
  }

  private selectHeroComponent(templateStyle: string): string {
    const componentMap: Record<string, string> = {
      modern: "HeroModern",
      dynamic: "HeroDynamic",
      corporate: "HeroCorporate",
      auto: "HeroSection",
    };
    return componentMap[templateStyle] || "HeroSection";
  }

  private generateUserFlow(sections: SectionBlueprint[]): UserFlowStep[] {
    return [
      {
        step: 1,
        action: "Kandidaat landt op pagina",
        targetSection: "hero",
        expectedOutcome: "Directe herkenning van functie en bedrijf, interesse gewekt",
      },
      {
        step: 2,
        action: "Scrollt naar functie-inhoud",
        targetSection: "job-details",
        expectedOutcome: "Begrijpt wat de functie inhoudt",
      },
      {
        step: 3,
        action: "Bekijkt arbeidsvoorwaarden",
        targetSection: "benefits",
        expectedOutcome: "Ziet voordelen en wordt gemotiveerd",
      },
      {
        step: 4,
        action: "Leest eisen door",
        targetSection: "requirements",
        expectedOutcome: "Zelfselectie: past dit bij mij?",
      },
      {
        step: 5,
        action: "Klikt op CTA of scrollt naar formulier",
        targetSection: "application-form",
        expectedOutcome: "Vult formulier in en solliciteert",
      },
    ];
  }

  private buildConversionStrategy(ctx: WorkflowContext) {
    const { intakeData } = ctx;
    return {
      primaryCta: "Ja, dit lijkt me wat!",
      secondaryCta: intakeData.contactWhatsapp
        ? "Stel een vraag via WhatsApp"
        : "Bekijk de details",
      urgencyElements: [
        "Snelle reactie gegarandeerd",
        "Vrijblijvend kennismaken mogelijk",
      ],
      trustSignals: [
        "Je gegevens zijn veilig (AVG)",
        "Persoonlijke benadering",
        `Direct contact met ${intakeData.contactName}`,
      ],
      socialProof: [
        `${intakeData.companyName} – betrouwbare werkgever`,
      ],
    };
  }

  private buildSeoStrategy(ctx: WorkflowContext) {
    const { intakeData } = ctx;
    const salary =
      intakeData.salaryRange.min && intakeData.salaryRange.max
        ? ` | €${intakeData.salaryRange.min} - €${intakeData.salaryRange.max}`
        : "";

    return {
      pageTitle: `${intakeData.jobTitle} | ${intakeData.companyName} | ${intakeData.jobLocation}`,
      metaDescription: `Word ${intakeData.jobTitle} bij ${intakeData.companyName} in ${intakeData.jobLocation}${salary}. Solliciteer direct!`,
      h1: `Word ${intakeData.jobTitle} bij ${intakeData.companyName}`,
      keywords: [
        intakeData.jobTitle,
        intakeData.companyName,
        intakeData.jobLocation,
        `vacature ${intakeData.jobTitle.toLowerCase()}`,
        `werken bij ${intakeData.companyName.toLowerCase()}`,
        intakeData.companySector,
      ].filter(Boolean),
    };
  }

  private buildKeyMessages(ctx: WorkflowContext): string[] {
    const { intakeData } = ctx;
    const messages: string[] = [
      `Word ${intakeData.jobTitle} bij ${intakeData.companyName}`,
    ];

    if (intakeData.salaryRange.min || intakeData.salaryRange.max) {
      const salary =
        intakeData.salaryRange.min && intakeData.salaryRange.max
          ? `€${intakeData.salaryRange.min} - €${intakeData.salaryRange.max}`
          : intakeData.salaryRange.min
            ? `Vanaf €${intakeData.salaryRange.min}`
            : "Marktconform salaris";
      messages.push(salary);
    }

    if (intakeData.benefits.length > 0) {
      messages.push(`${intakeData.benefits.length} arbeidsvoorwaarden`);
    }

    messages.push(`Locatie: ${intakeData.jobLocation}`);
    messages.push("Solliciteer direct – snel en eenvoudig");

    return messages;
  }

  private determineTargetAudience(ctx: WorkflowContext): string {
    const { intakeData } = ctx;
    const parts: string[] = [];

    if (intakeData.requirementsMust.length > 0) {
      parts.push(
        `Professionals met: ${intakeData.requirementsMust.slice(0, 3).join(", ")}`
      );
    }

    parts.push(`Geïnteresseerd in werken bij ${intakeData.companyName}`);
    parts.push(`In de regio ${intakeData.jobLocation}`);

    return parts.join(". ");
  }
}
