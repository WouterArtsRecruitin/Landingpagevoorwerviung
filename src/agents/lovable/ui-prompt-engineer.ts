// ============================================================
// LOVABLE AGENT 2: THE UI/UX PROMPT ENGINEER
// Vertaalt visuele wensen naar Lovable/shadcn/ui instructies
// Focust op Tailwind CSS, component-keuzes, moderne interface
// ============================================================

import { BaseAgent } from "../shared/base-agent";
import type {
  AgentConfig,
  WorkflowContext,
} from "../shared/types";
import type { ProductArchitectOutput, FeatureSpec } from "./product-architect";

// ── Output types ─────────────────────────────────────────────

export interface LovablePrompt {
  /** De volledige prompt voor Lovable */
  fullPrompt: string;
  /** Prompt opgesplitst in secties */
  sections: PromptSection[];
  /** Component specificaties */
  componentSpecs: ComponentSpec[];
  /** Tailwind utility classes per component */
  tailwindClasses: Record<string, string[]>;
}

export interface PromptSection {
  title: string;
  content: string;
  priority: number;
}

export interface ComponentSpec {
  name: string;
  description: string;
  shadcnComponents: string[];
  tailwindClasses: string[];
  responsiveBehavior: string;
  interactionNotes: string;
}

export interface UIPromptEngineerOutput {
  /** Eerste grote prompt voor Lovable (Initial Build) */
  initialBuildPrompt: LovablePrompt;
  /** Verfijnings-prompts voor specifieke pagina's */
  refinementPrompts: LovablePrompt[];
  /** Component library mapping */
  componentLibrary: ComponentLibrarySpec;
  /** Design referentie instructies (vanuit Figma) */
  figmaReferenceNotes: string[];
}

export interface ComponentLibrarySpec {
  baseComponents: string[];
  layoutComponents: string[];
  formComponents: string[];
  feedbackComponents: string[];
  navigationComponents: string[];
}

// ── Agent implementatie ──────────────────────────────────────

export class UIPromptEngineer extends BaseAgent<UIPromptEngineerOutput> {
  config: AgentConfig = {
    name: "UIPromptEngineer",
    description:
      "Vertaalt visuele wensen naar specifieke instructies voor Lovable/shadcn/ui. Zorgt dat de interface er modern uitziet door Lovable instructies te geven over Tailwind CSS en component-keuzes.",
    role: "Frontend Agent",
    capabilities: [
      "Lovable prompts schrijven",
      "shadcn/ui componenten selecteren",
      "Tailwind CSS klassen specificeren",
      "Responsieve design instructies",
      "Dark mode instructies",
      "Figma designs vertalen naar code-instructies",
    ],
    dependsOn: ["ProductArchitect"],
    maxRetries: 2,
    requiresReview: false,
  };

  protected async process(
    ctx: WorkflowContext
  ): Promise<UIPromptEngineerOutput> {
    this.log("Genereer Lovable prompts en component specs...");

    const architectResult = ctx.agentResults["ProductArchitect"] as
      | { data: ProductArchitectOutput }
      | undefined;

    if (!architectResult?.data) {
      throw new Error("Product Architect resultaat ontbreekt");
    }

    const { intakeData } = ctx;
    const architectData = architectResult.data;

    // Component library
    const componentLibrary = this.defineComponentLibrary();

    // Initial build prompt
    const initialBuildPrompt = this.generateInitialBuildPrompt(ctx, architectData);

    // Refinement prompts per feature
    const refinementPrompts = this.generateRefinementPrompts(ctx, architectData.features);

    // Figma referentie notes
    const figmaReferenceNotes = this.generateFigmaReferenceNotes(ctx);

    return {
      initialBuildPrompt,
      refinementPrompts,
      componentLibrary,
      figmaReferenceNotes,
    };
  }

  private defineComponentLibrary(): ComponentLibrarySpec {
    return {
      baseComponents: [
        "Button",
        "Card",
        "Badge",
        "Separator",
        "Skeleton",
        "Avatar",
      ],
      layoutComponents: [
        "Accordion",
        "Tabs",
        "Dialog",
        "Tooltip",
      ],
      formComponents: [
        "Input",
        "Textarea",
        "Label",
        "Checkbox",
        "Select",
        "Progress",
      ],
      feedbackComponents: [
        "Sonner (toast)",
        "Alert",
        "Progress",
      ],
      navigationComponents: [
        "React Router (BrowserRouter, Routes, Route)",
        "StickyHeader",
        "FloatingApplyButton",
      ],
    };
  }

  private generateInitialBuildPrompt(
    ctx: WorkflowContext,
    architectData: ProductArchitectOutput
  ): LovablePrompt {
    const { intakeData } = ctx;
    const { lovableSystemPrompt } = architectData;

    const sections: PromptSection[] = [
      {
        title: "Context",
        content: lovableSystemPrompt.context,
        priority: 1,
      },
      {
        title: "Tech Stack",
        content: `Gebruik de volgende tech stack:\n${lovableSystemPrompt.techStack.map((t) => `- ${t}`).join("\n")}`,
        priority: 2,
      },
      {
        title: "UI Framework",
        content: [
          "Gebruik shadcn/ui componenten voor alle UI-elementen.",
          "Styling uitsluitend via Tailwind CSS utility classes.",
          "Responsief design: mobile-first benadering.",
          "Gebruik de Inter font family voor alle tekst.",
          "Kleurenpalet gebaseerd op de brand kleur: " + intakeData.brandColors.primary,
        ].join("\n"),
        priority: 3,
      },
      {
        title: "Landing Page Structuur",
        content: this.generateLandingPageInstructions(ctx),
        priority: 4,
      },
      {
        title: "Formulier",
        content: [
          "Het sollicitatieformulier gebruikt React Hook Form met Zod validatie.",
          "Velden: Naam (text, verplicht), E-mail (email, verplicht), Telefoon (tel, verplicht), Motivatie (textarea, optioneel), CV Upload (file, optioneel), Privacy checkbox (verplicht).",
          "Gebruik de Input, Textarea, Label, Checkbox componenten van shadcn/ui.",
          "Toon een success toast (Sonner) na succesvolle inzending.",
        ].join("\n"),
        priority: 5,
      },
      {
        title: "Navigatie & Layout",
        content: [
          "Gebruik een sticky header met het bedrijfslogo en een CTA button.",
          "Voeg een floating 'Solliciteer' button toe die verschijnt na 300px scrollen.",
          "Smooth scroll naar secties bij klik op CTA buttons.",
          "Footer met copyright en privacy link.",
        ].join("\n"),
        priority: 6,
      },
      {
        title: "Animaties & Interacties",
        content: [
          "Gebruik Tailwind CSS transitions voor hover states.",
          "Cards hebben een subtiele shadow-card en hover:scale-[1.02] effect.",
          "Buttons hebben een hover:shadow-lg transition.",
          "Secties fade-in bij scrollen (intersection observer).",
        ].join("\n"),
        priority: 7,
      },
    ];

    const componentSpecs = this.generateComponentSpecs(ctx);

    const tailwindClasses: Record<string, string[]> = {
      hero: ["min-h-[70vh]", "bg-gradient-to-br", "from-primary", "to-primary-dark", "text-white", "flex", "flex-col", "items-center", "justify-center", "px-4", "py-20"],
      sectionContainer: ["max-w-[1200px]", "mx-auto", "px-4", "sm:px-6", "lg:px-8", "py-16", "sm:py-20"],
      card: ["bg-white", "rounded-xl", "shadow-card", "p-6", "hover:shadow-lg", "transition-all", "duration-200"],
      button: ["rounded-xl", "px-6", "py-3", "font-semibold", "transition-all", "duration-200"],
      heading: ["text-3xl", "sm:text-4xl", "lg:text-5xl", "font-bold", "tracking-tight"],
      subheading: ["text-lg", "sm:text-xl", "text-muted-foreground", "max-w-2xl"],
    };

    const fullPrompt = sections
      .sort((a, b) => a.priority - b.priority)
      .map((s) => `## ${s.title}\n${s.content}`)
      .join("\n\n");

    return {
      fullPrompt,
      sections,
      componentSpecs,
      tailwindClasses,
    };
  }

  private generateLandingPageInstructions(ctx: WorkflowContext): string {
    const { intakeData } = ctx;
    const lines: string[] = [
      `Bouw een vacature landing page voor "${intakeData.jobTitle}" bij ${intakeData.companyName}.`,
      "",
      "De pagina heeft de volgende secties (in deze volgorde):",
      "",
      "1. **Hero Sectie** – Groot, visueel met gradient achtergrond. Toont: bedrijfsnaam (badge), functietitel (h1), subheadline, quick stats (salaris, locatie, dienstverband), 2 CTA buttons.",
    ];

    if (intakeData.responsibilities.length > 0) {
      lines.push("2. **Wat ga je doen?** – Lijst van verantwoordelijkheden met iconen. Gebruik een grid layout.");
    }

    if (intakeData.benefits.length > 0) {
      lines.push("3. **Wat bieden wij?** – Arbeidsvoorwaarden als cards in een 2-koloms grid (mobile: 1 kolom).");
    }

    if (intakeData.salaryRange.min || intakeData.salaryRange.max) {
      lines.push("4. **Wat verdien je?** – Salaris breakdown met items en totaal.");
    }

    if (intakeData.requirementsMust.length > 0) {
      lines.push("5. **Wat vragen wij?** – Must-have en nice-to-have eisen in 2 kolommen.");
    }

    lines.push(
      "6. **Veelgestelde vragen** – FAQ als accordion (shadcn/ui Accordion component).",
      "7. **Sollicitatieformulier** – React Hook Form met Zod validatie.",
      "8. **Final CTA** – Laatste overtuiging met meerdere sollicitatie-opties."
    );

    return lines.join("\n");
  }

  private generateComponentSpecs(ctx: WorkflowContext): ComponentSpec[] {
    const { intakeData } = ctx;

    return [
      {
        name: "HeroSection",
        description: `Hero voor ${intakeData.jobTitle} bij ${intakeData.companyName}`,
        shadcnComponents: ["Badge", "Button"],
        tailwindClasses: [
          "min-h-[70vh]", "relative", "overflow-hidden",
          "bg-gradient-to-br", "from-primary", "to-primary/80",
          "flex", "flex-col", "items-center", "justify-center",
          "text-center", "text-white", "px-4", "py-20",
        ],
        responsiveBehavior: "Op mobile: kleinere heading (text-3xl → text-5xl), stats in kolom i.p.v. rij",
        interactionNotes: "Primary CTA scrollt naar formulier, secondary CTA scrollt naar job details",
      },
      {
        name: "BenefitsSection",
        description: "Arbeidsvoorwaarden als card grid",
        shadcnComponents: ["Card"],
        tailwindClasses: [
          "grid", "grid-cols-1", "sm:grid-cols-2", "gap-6",
        ],
        responsiveBehavior: "1 kolom op mobile, 2 kolommen op tablet+",
        interactionNotes: "Cards hebben hover scale effect",
      },
      {
        name: "ApplicationFormSection",
        description: "Sollicitatieformulier",
        shadcnComponents: ["Input", "Textarea", "Label", "Checkbox", "Button"],
        tailwindClasses: [
          "max-w-lg", "mx-auto", "space-y-4",
        ],
        responsiveBehavior: "Volledige breedte op alle schermen, max-w-lg gecentreerd",
        interactionNotes: "Validatie errors tonen onder elk veld. Success state met groene check en toast.",
      },
      {
        name: "FAQSection",
        description: "Veelgestelde vragen als accordion",
        shadcnComponents: ["Accordion"],
        tailwindClasses: [
          "max-w-3xl", "mx-auto",
        ],
        responsiveBehavior: "Consistent op alle schermen",
        interactionNotes: "Eén item tegelijk open (type='single')",
      },
      {
        name: "StickyHeader",
        description: "Vaste header met logo en CTA",
        shadcnComponents: ["Button"],
        tailwindClasses: [
          "fixed", "top-0", "left-0", "right-0", "z-50",
          "bg-white/95", "backdrop-blur-sm", "shadow-sm",
          "flex", "items-center", "justify-between", "px-4", "py-3",
        ],
        responsiveBehavior: "Logo kleiner op mobile, CTA tekst korter",
        interactionNotes: "Verschijnt na 100px scrollen",
      },
    ];
  }

  private generateRefinementPrompts(
    ctx: WorkflowContext,
    features: FeatureSpec[]
  ): LovablePrompt[] {
    const prompts: LovablePrompt[] = [];

    // Admin dashboard prompt
    const adminFeature = features.find((f) => f.id === "admin-dashboard");
    if (adminFeature) {
      prompts.push(this.createRefinementPrompt(
        "Admin Dashboard",
        [
          "Bouw een admin dashboard met de volgende pagina's:",
          "- **Dashboard** (overzicht): statistieken cards (totaal pagina's, gepubliceerd, sollicitaties, deze week), recente activiteit lijst.",
          "- **Pagina's lijst**: tabel met alle landing pages (titel, status badge, datum, aantal sollicitaties). Filter op status. Acties: bekijk, bewerk, publiceer/pauzeer.",
          "- **Kandidaten**: tabel met alle sollicitaties. Filter op pagina. Kolommen: naam, email, telefoon, pagina, datum, status.",
          "",
          "Gebruik een sidebar navigatie met:",
          "- Dashboard icoon + tekst",
          "- Pagina's icoon + tekst",
          "- Kandidaten icoon + tekst",
          "- Intake (nieuw aanmaken)",
          "- Analytics",
          "- GDPR",
          "",
          "Styling: bg-gray-50 achtergrond, witte content cards, shadcn/ui Table component voor tabellen.",
        ].join("\n")
      ));
    }

    // Analytics prompt
    const analyticsFeature = features.find((f) => f.id === "analytics-tracking");
    if (analyticsFeature) {
      prompts.push(this.createRefinementPrompt(
        "Analytics & Tracking",
        [
          "Voeg analytics tracking toe:",
          "- Google Analytics 4 integratie via gtag.js",
          "- Scroll depth tracking (25%, 50%, 75%, 100%)",
          "- Time on page tracking (30s, 60s, 120s, 5min)",
          "- CTA click tracking als custom events",
          "- UTM parameter parsing en opslag",
          "- Facebook Pixel en LinkedIn Insight Tag support",
          "",
          "Gebruik een TrackingProvider component die alle tracking initialiseert.",
        ].join("\n")
      ));
    }

    return prompts;
  }

  private createRefinementPrompt(
    title: string,
    content: string
  ): LovablePrompt {
    return {
      fullPrompt: `## ${title}\n\n${content}`,
      sections: [{ title, content, priority: 1 }],
      componentSpecs: [],
      tailwindClasses: {},
    };
  }

  private generateFigmaReferenceNotes(ctx: WorkflowContext): string[] {
    const notes: string[] = [];

    // Check of er Figma design tokens zijn van de Visual Stylist
    const visualResult = ctx.agentResults["VisualStylist"];
    if (visualResult) {
      notes.push(
        "Figma design beschikbaar: gebruik de design tokens van de Visual Stylist als referentie.",
        "Zorg dat kleuren, typografie en spacing exact overeenkomen met het Figma design.",
        "De hero gradient, card shadows en border-radius moeten matchen."
      );
    } else {
      notes.push(
        "Geen Figma design beschikbaar: gebruik de standaard design tokens uit de intake briefing.",
        `Primary kleur: ${ctx.intakeData.brandColors.primary}`,
        `Sector: ${ctx.intakeData.companySector} – pas de tone en stijl hierop aan.`
      );
    }

    return notes;
  }
}
