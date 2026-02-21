// ============================================================
// FIGMA AGENT 2: THE LAYOUT ARCHITECT
// Gebruikt Figma MCP om structuur neer te zetten
// (Frames, Auto Layout, basiscomponenten/placeholders)
// ============================================================

import { BaseAgent } from "../shared/base-agent";
import type {
  AgentConfig,
  WorkflowContext,
} from "../shared/types";
import type { DesignStrategyOutput, SectionBlueprint } from "./design-strategist";

// ── Output types ─────────────────────────────────────────────

export interface FigmaFrame {
  name: string;
  type: "FRAME" | "COMPONENT" | "TEXT" | "RECTANGLE" | "GROUP";
  width: number;
  height: number;
  x: number;
  y: number;
  autoLayout?: AutoLayoutConfig;
  children: FigmaFrame[];
  styles?: Partial<FigmaStyles>;
  /** Tekst-inhoud (voor TEXT nodes) */
  textContent?: string;
  /** Placeholder info */
  placeholder?: boolean;
}

export interface AutoLayoutConfig {
  direction: "HORIZONTAL" | "VERTICAL";
  spacing: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  primaryAxisAlign: "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN";
  counterAxisAlign: "MIN" | "CENTER" | "MAX";
}

export interface FigmaStyles {
  backgroundColor: string;
  borderRadius: number;
  opacity: number;
  strokeColor: string;
  strokeWeight: number;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  textColor: string;
  lineHeight: number;
}

export interface LayoutArchitectOutput {
  /** De root pagina frame */
  pageFrame: FigmaFrame;
  /** MCP instructies om de frames te genereren */
  mcpInstructions: MCPInstruction[];
  /** Grid & spacing systeem */
  gridSystem: GridSystem;
  /** Component mapping: welke Figma componenten te gebruiken */
  componentMap: Record<string, string>;
}

export interface MCPInstruction {
  order: number;
  action: "create_frame" | "set_auto_layout" | "add_text" | "add_rectangle" | "add_component" | "set_styles";
  target: string;
  parameters: Record<string, unknown>;
  description: string;
}

export interface GridSystem {
  columns: number;
  gutterWidth: number;
  marginWidth: number;
  maxContentWidth: number;
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

// ── Agent implementatie ──────────────────────────────────────

export class LayoutArchitect extends BaseAgent<LayoutArchitectOutput> {
  config: AgentConfig = {
    name: "LayoutArchitect",
    description:
      "Gebruikt de Figma MCP om de wireframe-structuur neer te zetten. Maakt frames aan, past Auto Layout toe en plaatst basiscomponenten op basis van de strategie.",
    role: "MCP Agent (Layout)",
    capabilities: [
      "Figma frames aanmaken via MCP",
      "Auto Layout configureren",
      "Component placeholders plaatsen",
      "Grid systeem opzetten",
      "Responsieve breakpoints definiëren",
    ],
    dependsOn: ["DesignStrategist"],
    maxRetries: 3,
    requiresReview: true,
  };

  private readonly DESKTOP_WIDTH = 1440;
  private readonly CONTENT_MAX_WIDTH = 1200;
  private readonly SECTION_PADDING = 80;
  private readonly MOBILE_WIDTH = 375;

  protected async process(
    ctx: WorkflowContext
  ): Promise<LayoutArchitectOutput> {
    this.log("Genereer Figma layout structuur via MCP...");

    // Haal de strategie output op
    const strategyResult = ctx.agentResults[
      "DesignStrategist"
    ] as { data: DesignStrategyOutput } | undefined;

    if (!strategyResult?.data?.pages?.[0]) {
      throw new Error("Geen Design Strategie gevonden in workflow context");
    }

    const strategy = strategyResult.data;
    const page = strategy.pages[0];

    // Grid systeem
    const gridSystem: GridSystem = {
      columns: 12,
      gutterWidth: 24,
      marginWidth: 120,
      maxContentWidth: this.CONTENT_MAX_WIDTH,
      breakpoints: {
        mobile: this.MOBILE_WIDTH,
        tablet: 768,
        desktop: this.DESKTOP_WIDTH,
      },
    };

    // Genereer section frames
    const sectionFrames = page.sections.map((section, index) =>
      this.generateSectionFrame(section, index, ctx)
    );

    // Root page frame
    const pageFrame: FigmaFrame = {
      name: `Page: ${page.name}`,
      type: "FRAME",
      width: this.DESKTOP_WIDTH,
      height: this.calculateTotalHeight(sectionFrames),
      x: 0,
      y: 0,
      autoLayout: {
        direction: "VERTICAL",
        spacing: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        primaryAxisAlign: "MIN",
        counterAxisAlign: "CENTER",
      },
      children: sectionFrames,
    };

    // MCP instructies genereren
    const mcpInstructions = this.generateMCPInstructions(pageFrame, page.sections);

    // Component mapping
    const componentMap = this.buildComponentMap(page.sections);

    return {
      pageFrame,
      mcpInstructions,
      gridSystem,
      componentMap,
    };
  }

  private generateSectionFrame(
    section: SectionBlueprint,
    _index: number,
    ctx: WorkflowContext
  ): FigmaFrame {
    const sectionHeight = this.estimateSectionHeight(section);

    const contentChildren = this.generateSectionContent(section, ctx);

    return {
      name: `Section: ${section.type} (${section.id})`,
      type: "FRAME",
      width: this.DESKTOP_WIDTH,
      height: sectionHeight,
      x: 0,
      y: 0,
      autoLayout: {
        direction: "VERTICAL",
        spacing: 32,
        paddingTop: this.SECTION_PADDING,
        paddingRight: this.calculateMargin(),
        paddingBottom: this.SECTION_PADDING,
        paddingLeft: this.calculateMargin(),
        primaryAxisAlign: "CENTER",
        counterAxisAlign: "CENTER",
      },
      children: contentChildren,
    };
  }

  private generateSectionContent(
    section: SectionBlueprint,
    ctx: WorkflowContext
  ): FigmaFrame[] {
    const frames: FigmaFrame[] = [];

    switch (section.type) {
      case "hero":
        frames.push(...this.generateHeroContent(section, ctx));
        break;
      case "job_details":
        frames.push(...this.generateJobDetailsContent(section));
        break;
      case "benefits":
        frames.push(...this.generateBenefitsContent(section, ctx));
        break;
      case "salary_breakdown":
        frames.push(...this.generateSalaryContent(section));
        break;
      case "requirements":
        frames.push(...this.generateRequirementsContent(section));
        break;
      case "faq":
        frames.push(...this.generateFAQContent(section));
        break;
      case "application_form":
        frames.push(...this.generateFormContent(section));
        break;
      case "final_cta":
        frames.push(...this.generateFinalCTAContent(section));
        break;
      default:
        frames.push(this.createPlaceholder(section.type, section.purpose));
    }

    return frames;
  }

  private generateHeroContent(
    section: SectionBlueprint,
    ctx: WorkflowContext
  ): FigmaFrame[] {
    return [
      // Company badge
      this.createTextNode("company-badge", ctx.intakeData.companyName.toUpperCase(), {
        fontSize: 14,
        fontWeight: 600,
        textColor: "#FFFFFF",
      }),
      // Headline
      this.createTextNode("headline", section.contentHints.headline || "Functietitel", {
        fontSize: 56,
        fontWeight: 700,
        textColor: "#FFFFFF",
        lineHeight: 64,
      }),
      // Subheadline
      this.createTextNode("subheadline", section.contentHints.subheadline || "Beschrijving", {
        fontSize: 20,
        fontWeight: 400,
        textColor: "#FFFFFF",
      }),
      // Quick stats row
      {
        name: "quick-stats-row",
        type: "FRAME",
        width: this.CONTENT_MAX_WIDTH,
        height: 64,
        x: 0,
        y: 0,
        autoLayout: {
          direction: "HORIZONTAL",
          spacing: 24,
          paddingTop: 16,
          paddingRight: 0,
          paddingBottom: 16,
          paddingLeft: 0,
          primaryAxisAlign: "CENTER",
          counterAxisAlign: "CENTER",
        },
        children: [
          this.createPlaceholder("stat-1", "Salaris stat"),
          this.createPlaceholder("stat-2", "Locatie stat"),
          this.createPlaceholder("stat-3", "Dienstverband stat"),
        ],
      },
      // CTA buttons row
      {
        name: "cta-buttons",
        type: "FRAME",
        width: 500,
        height: 56,
        x: 0,
        y: 0,
        autoLayout: {
          direction: "HORIZONTAL",
          spacing: 16,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          primaryAxisAlign: "CENTER",
          counterAxisAlign: "CENTER",
        },
        children: [
          this.createButtonPlaceholder("primary-cta", section.contentHints.cta || "Solliciteer", "primary"),
          this.createButtonPlaceholder("secondary-cta", "Bekijk details", "secondary"),
        ],
      },
    ];
  }

  private generateJobDetailsContent(section: SectionBlueprint): FigmaFrame[] {
    return [
      this.createSectionHeading(section.contentHints.heading || "Wat ga je doen?"),
      this.createPlaceholder("responsibilities-list", "Lijst van verantwoordelijkheden"),
      this.createPlaceholder("quick-info-bar", "Locatie | Contract | Startdatum"),
    ];
  }

  private generateBenefitsContent(
    section: SectionBlueprint,
    ctx: WorkflowContext
  ): FigmaFrame[] {
    const benefitCount = ctx.intakeData.benefits.length || 4;
    const benefitPlaceholders: FigmaFrame[] = [];

    for (let i = 0; i < Math.min(benefitCount, 8); i++) {
      benefitPlaceholders.push(
        this.createPlaceholder(`benefit-card-${i + 1}`, `Benefit ${i + 1}`)
      );
    }

    return [
      this.createSectionHeading(section.contentHints.heading || "Wat bieden wij?"),
      {
        name: "benefits-grid",
        type: "FRAME",
        width: this.CONTENT_MAX_WIDTH,
        height: Math.ceil(benefitCount / 2) * 200,
        x: 0,
        y: 0,
        autoLayout: {
          direction: "HORIZONTAL",
          spacing: 24,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          primaryAxisAlign: "SPACE_BETWEEN",
          counterAxisAlign: "MIN",
        },
        children: benefitPlaceholders,
      },
    ];
  }

  private generateSalaryContent(section: SectionBlueprint): FigmaFrame[] {
    return [
      this.createSectionHeading(section.contentHints.heading || "Wat verdien je?"),
      this.createPlaceholder("salary-breakdown-card", "Salaris overzicht"),
    ];
  }

  private generateRequirementsContent(section: SectionBlueprint): FigmaFrame[] {
    return [
      this.createSectionHeading(section.contentHints.heading || "Wat vragen wij?"),
      {
        name: "requirements-columns",
        type: "FRAME",
        width: this.CONTENT_MAX_WIDTH,
        height: 400,
        x: 0,
        y: 0,
        autoLayout: {
          direction: "HORIZONTAL",
          spacing: 48,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          primaryAxisAlign: "SPACE_BETWEEN",
          counterAxisAlign: "MIN",
        },
        children: [
          this.createPlaceholder("must-have-list", "Must-have eisen"),
          this.createPlaceholder("nice-to-have-list", "Nice-to-have eisen"),
        ],
      },
    ];
  }

  private generateFAQContent(section: SectionBlueprint): FigmaFrame[] {
    return [
      this.createSectionHeading(section.contentHints.heading || "Veelgestelde vragen"),
      this.createPlaceholder("faq-accordion", "FAQ accordion items"),
    ];
  }

  private generateFormContent(section: SectionBlueprint): FigmaFrame[] {
    return [
      this.createSectionHeading(section.contentHints.heading || "Direct solliciteren"),
      this.createPlaceholder("application-form", "Sollicitatieformulier"),
    ];
  }

  private generateFinalCTAContent(section: SectionBlueprint): FigmaFrame[] {
    return [
      this.createSectionHeading(section.contentHints.heading || "Klaar om te solliciteren?"),
      {
        name: "cta-options-row",
        type: "FRAME",
        width: this.CONTENT_MAX_WIDTH,
        height: 200,
        x: 0,
        y: 0,
        autoLayout: {
          direction: "HORIZONTAL",
          spacing: 32,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          primaryAxisAlign: "CENTER",
          counterAxisAlign: "CENTER",
        },
        children: [
          this.createPlaceholder("cta-apply", "Solliciteer optie"),
          this.createPlaceholder("cta-whatsapp", "WhatsApp optie"),
        ],
      },
    ];
  }

  // ── Helper methods ──────────────────────────────────────────

  private createTextNode(
    name: string,
    text: string,
    styles: Partial<FigmaStyles>
  ): FigmaFrame {
    return {
      name,
      type: "TEXT",
      width: this.CONTENT_MAX_WIDTH,
      height: (styles.fontSize || 16) * 1.5,
      x: 0,
      y: 0,
      children: [],
      textContent: text,
      styles,
    };
  }

  private createSectionHeading(text: string): FigmaFrame {
    return this.createTextNode(`heading-${text.toLowerCase().replace(/\s+/g, "-")}`, text, {
      fontSize: 40,
      fontWeight: 700,
      textColor: "#0F172A",
      lineHeight: 48,
    });
  }

  private createPlaceholder(name: string, purpose: string): FigmaFrame {
    return {
      name: `[placeholder] ${name}`,
      type: "RECTANGLE",
      width: 400,
      height: 200,
      x: 0,
      y: 0,
      children: [],
      placeholder: true,
      styles: {
        backgroundColor: "#F1F5F9",
        borderRadius: 8,
        strokeColor: "#CBD5E1",
        strokeWeight: 1,
        opacity: 1,
        fontFamily: "",
        fontSize: 0,
        fontWeight: 0,
        textColor: "",
        lineHeight: 0,
      },
      textContent: purpose,
    };
  }

  private createButtonPlaceholder(
    name: string,
    label: string,
    variant: "primary" | "secondary"
  ): FigmaFrame {
    return {
      name: `btn-${name}`,
      type: "FRAME",
      width: 220,
      height: 56,
      x: 0,
      y: 0,
      children: [this.createTextNode(`${name}-label`, label, {
        fontSize: 16,
        fontWeight: 600,
        textColor: variant === "primary" ? "#FFFFFF" : "#0F172A",
      })],
      styles: {
        backgroundColor: variant === "primary" ? "#3B82F6" : "transparent",
        borderRadius: 12,
        strokeColor: variant === "secondary" ? "#3B82F6" : "",
        strokeWeight: variant === "secondary" ? 2 : 0,
        opacity: 1,
        fontFamily: "",
        fontSize: 0,
        fontWeight: 0,
        textColor: "",
        lineHeight: 0,
      },
    };
  }

  private estimateSectionHeight(section: SectionBlueprint): number {
    const heightMap: Record<string, number> = {
      hero: 700,
      job_details: 600,
      benefits: 500,
      salary_breakdown: 450,
      requirements: 500,
      faq: 400,
      application_form: 600,
      final_cta: 400,
    };
    return heightMap[section.type] || 500;
  }

  private calculateTotalHeight(frames: FigmaFrame[]): number {
    return frames.reduce((sum, f) => sum + f.height, 0);
  }

  private calculateMargin(): number {
    return (this.DESKTOP_WIDTH - this.CONTENT_MAX_WIDTH) / 2;
  }

  private generateMCPInstructions(
    pageFrame: FigmaFrame,
    sections: SectionBlueprint[]
  ): MCPInstruction[] {
    const instructions: MCPInstruction[] = [];
    let order = 0;

    // 1. Create root frame
    instructions.push({
      order: order++,
      action: "create_frame",
      target: "root",
      parameters: {
        name: pageFrame.name,
        width: pageFrame.width,
        height: pageFrame.height,
      },
      description: "Maak de root pagina frame aan",
    });

    // 2. Set auto layout op root
    instructions.push({
      order: order++,
      action: "set_auto_layout",
      target: pageFrame.name,
      parameters: pageFrame.autoLayout as unknown as Record<string, unknown>,
      description: "Configureer Auto Layout op de root frame (verticaal, geen spacing)",
    });

    // 3. Per sectie: maak frame + auto layout + children
    for (const section of sections) {
      instructions.push({
        order: order++,
        action: "create_frame",
        target: pageFrame.name,
        parameters: {
          name: `Section: ${section.type}`,
          width: this.DESKTOP_WIDTH,
          height: this.estimateSectionHeight(section),
        },
        description: `Maak sectie frame aan: ${section.type} (${section.purpose})`,
      });

      instructions.push({
        order: order++,
        action: "set_auto_layout",
        target: `Section: ${section.type}`,
        parameters: {
          direction: "VERTICAL",
          spacing: 32,
          padding: this.SECTION_PADDING,
        },
        description: `Stel Auto Layout in voor sectie: ${section.type}`,
      });

      instructions.push({
        order: order++,
        action: "add_component",
        target: `Section: ${section.type}`,
        parameters: {
          componentName: section.suggestedComponent,
          placeholder: true,
        },
        description: `Voeg placeholder component toe: ${section.suggestedComponent}`,
      });
    }

    return instructions;
  }

  private buildComponentMap(sections: SectionBlueprint[]): Record<string, string> {
    const map: Record<string, string> = {};
    for (const section of sections) {
      map[section.id] = section.suggestedComponent;
    }
    return map;
  }
}
