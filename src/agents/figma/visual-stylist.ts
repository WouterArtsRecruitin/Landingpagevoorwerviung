// ============================================================
// FIGMA AGENT 3: THE VISUAL STYLIST
// Verfijning van esthetiek: kleuren, typografie, stijlen
// Past design tokens toe via MCP-tooling
// ============================================================

import { BaseAgent } from "../shared/base-agent";
import type {
  AgentConfig,
  WorkflowContext,
} from "../shared/types";
import type { DesignStrategyOutput } from "./design-strategist";
import type { LayoutArchitectOutput } from "./layout-architect";

// ── Output types ─────────────────────────────────────────────

export interface DesignTokens {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  borders: BorderTokens;
  shadows: ShadowTokens;
  effects: EffectTokens;
}

export interface ColorTokens {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceElevated: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  textOnPrimary: string;
  border: string;
  borderLight: string;
  success: string;
  error: string;
  warning: string;
  gradient: string;
  heroOverlay: string;
}

export interface TypographyTokens {
  fontFamilyHeading: string;
  fontFamilyBody: string;
  h1: TypographyStyle;
  h2: TypographyStyle;
  h3: TypographyStyle;
  h4: TypographyStyle;
  bodyLarge: TypographyStyle;
  bodyRegular: TypographyStyle;
  bodySmall: TypographyStyle;
  caption: TypographyStyle;
  buttonLabel: TypographyStyle;
  badge: TypographyStyle;
}

export interface TypographyStyle {
  fontSize: number;
  lineHeight: number;
  fontWeight: number;
  letterSpacing: number;
}

export interface SpacingTokens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  sectionPadding: number;
  cardPadding: number;
  containerMaxWidth: number;
}

export interface BorderTokens {
  radiusSm: number;
  radiusMd: number;
  radiusLg: number;
  radiusXl: number;
  radiusFull: number;
}

export interface ShadowTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  card: string;
  button: string;
}

export interface EffectTokens {
  transitionSpeed: string;
  hoverScale: number;
  backdropBlur: string;
}

export interface SectionStyleOverride {
  sectionId: string;
  background: string;
  textColor: string;
  accentColor: string;
  patternOverlay?: string;
}

export interface VisualStylistOutput {
  designTokens: DesignTokens;
  sectionStyles: SectionStyleOverride[];
  /** MCP instructies voor het toepassen van stijlen */
  mcpStyleInstructions: MCPStyleInstruction[];
  /** CSS custom properties (voor export naar code) */
  cssVariables: Record<string, string>;
  /** Tailwind kleur configuratie (voor Lovable pipeline) */
  tailwindExtend: Record<string, unknown>;
}

export interface MCPStyleInstruction {
  order: number;
  action: "set_fill" | "set_text_style" | "set_effect" | "set_stroke" | "apply_tokens";
  target: string;
  parameters: Record<string, unknown>;
  description: string;
}

// ── Agent implementatie ──────────────────────────────────────

export class VisualStylist extends BaseAgent<VisualStylistOutput> {
  config: AgentConfig = {
    name: "VisualStylist",
    description:
      "Verfijnt de esthetiek van het design. Past kleuren, typografie en specifieke stijlen toe via MCP-tooling. Genereert Design Tokens.",
    role: "Stijl Agent",
    capabilities: [
      "Design Tokens genereren",
      "Kleurpaletten samenstellen op basis van brand",
      "Typografie schaal bepalen",
      "Schaduw en effect systeem opzetten",
      "CSS variabelen genereren",
      "Tailwind configuratie uitbreiden",
      "Figma stijlen toepassen via MCP",
    ],
    dependsOn: ["DesignStrategist", "LayoutArchitect"],
    maxRetries: 2,
    requiresReview: true,
  };

  protected async process(
    ctx: WorkflowContext
  ): Promise<VisualStylistOutput> {
    this.log("Genereer design tokens en visuele stijlen...");

    const strategyResult = ctx.agentResults["DesignStrategist"] as
      | { data: DesignStrategyOutput }
      | undefined;
    const layoutResult = ctx.agentResults["LayoutArchitect"] as
      | { data: LayoutArchitectOutput }
      | undefined;

    if (!strategyResult?.data || !layoutResult?.data) {
      throw new Error("Strategie of Layout resultaat ontbreekt");
    }

    const { intakeData } = ctx;

    // Genereer design tokens
    const designTokens = this.generateDesignTokens(intakeData.brandColors.primary, intakeData.companySector);

    // Sectie-specifieke stijlen
    const sectionStyles = this.generateSectionStyles(
      strategyResult.data,
      designTokens
    );

    // MCP instructies
    const mcpStyleInstructions = this.generateMCPStyleInstructions(
      designTokens,
      sectionStyles
    );

    // CSS variabelen
    const cssVariables = this.generateCSSVariables(designTokens);

    // Tailwind extend config
    const tailwindExtend = this.generateTailwindExtend(designTokens);

    return {
      designTokens,
      sectionStyles,
      mcpStyleInstructions,
      cssVariables,
      tailwindExtend,
    };
  }

  private generateDesignTokens(
    primaryColor: string,
    sector: string
  ): DesignTokens {
    const palette = this.generateColorPalette(primaryColor, sector);

    return {
      colors: palette,
      typography: {
        fontFamilyHeading: "'Inter', -apple-system, sans-serif",
        fontFamilyBody: "'Inter', -apple-system, sans-serif",
        h1: { fontSize: 56, lineHeight: 64, fontWeight: 700, letterSpacing: -1.5 },
        h2: { fontSize: 40, lineHeight: 48, fontWeight: 700, letterSpacing: -0.5 },
        h3: { fontSize: 28, lineHeight: 36, fontWeight: 600, letterSpacing: 0 },
        h4: { fontSize: 20, lineHeight: 28, fontWeight: 600, letterSpacing: 0 },
        bodyLarge: { fontSize: 18, lineHeight: 28, fontWeight: 400, letterSpacing: 0 },
        bodyRegular: { fontSize: 16, lineHeight: 24, fontWeight: 400, letterSpacing: 0 },
        bodySmall: { fontSize: 14, lineHeight: 20, fontWeight: 400, letterSpacing: 0 },
        caption: { fontSize: 12, lineHeight: 16, fontWeight: 500, letterSpacing: 0.5 },
        buttonLabel: { fontSize: 16, lineHeight: 24, fontWeight: 600, letterSpacing: 0.25 },
        badge: { fontSize: 12, lineHeight: 16, fontWeight: 700, letterSpacing: 1 },
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 48,
        xxl: 80,
        sectionPadding: 80,
        cardPadding: 24,
        containerMaxWidth: 1200,
      },
      borders: {
        radiusSm: 4,
        radiusMd: 8,
        radiusLg: 12,
        radiusXl: 16,
        radiusFull: 9999,
      },
      shadows: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        md: "0 4px 6px rgba(0,0,0,0.07)",
        lg: "0 10px 15px rgba(0,0,0,0.1)",
        xl: "0 20px 25px rgba(0,0,0,0.1)",
        card: "0 4px 20px rgba(0,0,0,0.08)",
        button: "0 4px 14px rgba(0,0,0,0.1)",
      },
      effects: {
        transitionSpeed: "200ms",
        hoverScale: 1.02,
        backdropBlur: "12px",
      },
    };
  }

  private generateColorPalette(
    primaryColor: string,
    sector: string
  ): ColorTokens {
    // Basis kleurberekeningen vanuit de primary color
    const primary = primaryColor || "#3B82F6";

    // Sector-specifieke accent kleuren
    const sectorAccents: Record<string, string> = {
      "ICT & Telecom": "#EC4899",
      "Techniek & Industrie": "#F97316",
      "Bouw & Vastgoed": "#F59E0B",
      "Logistiek & Transport": "#10B981",
      "Zorg & Welzijn": "#EF4444",
      "Horeca & Toerisme": "#8B5CF6",
      "Retail & E-commerce": "#06B6D4",
      "Finance & Accounting": "#D97706",
      "Marketing & Communicatie": "#EC4899",
      "Onderwijs & Overheid": "#3B82F6",
      "Agrarisch & Groen": "#22C55E",
    };

    const accent = sectorAccents[sector] || "#60A5FA";

    return {
      primary,
      primaryLight: this.lightenColor(primary, 0.15),
      primaryDark: this.darkenColor(primary, 0.2),
      secondary: this.darkenColor(primary, 0.15),
      accent,
      background: "#FFFFFF",
      surface: "#F8FAFC",
      surfaceElevated: "#FFFFFF",
      text: "#0F172A",
      textSecondary: "#475569",
      textMuted: "#94A3B8",
      textOnPrimary: "#FFFFFF",
      border: "#E2E8F0",
      borderLight: "#F1F5F9",
      success: "#10B981",
      error: "#EF4444",
      warning: "#F59E0B",
      gradient: `linear-gradient(135deg, ${primary} 0%, ${this.darkenColor(primary, 0.3)} 100%)`,
      heroOverlay: `linear-gradient(135deg, ${primary}E6 0%, ${this.darkenColor(primary, 0.3)}CC 100%)`,
    };
  }

  private generateSectionStyles(
    strategy: DesignStrategyOutput,
    tokens: DesignTokens
  ): SectionStyleOverride[] {
    const page = strategy.pages[0];
    if (!page) return [];

    return page.sections.map((section) => {
      // Hero heeft altijd gradient achtergrond
      if (section.type === "hero") {
        return {
          sectionId: section.id,
          background: tokens.colors.gradient,
          textColor: tokens.colors.textOnPrimary,
          accentColor: tokens.colors.accent,
          patternOverlay: "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
        };
      }

      // Final CTA ook met gradient
      if (section.type === "final_cta") {
        return {
          sectionId: section.id,
          background: tokens.colors.surface,
          textColor: tokens.colors.text,
          accentColor: tokens.colors.primary,
        };
      }

      // Afwisselend wit en surface achtergrond
      const isEven = page.sections.indexOf(section) % 2 === 0;
      return {
        sectionId: section.id,
        background: isEven ? tokens.colors.background : tokens.colors.surface,
        textColor: tokens.colors.text,
        accentColor: tokens.colors.primary,
      };
    });
  }

  private generateMCPStyleInstructions(
    tokens: DesignTokens,
    sectionStyles: SectionStyleOverride[]
  ): MCPStyleInstruction[] {
    const instructions: MCPStyleInstruction[] = [];
    let order = 0;

    // 1. Apply global tokens
    instructions.push({
      order: order++,
      action: "apply_tokens",
      target: "document",
      parameters: {
        colors: tokens.colors,
        typography: tokens.typography,
      },
      description: "Pas globale design tokens toe op het document",
    });

    // 2. Per sectie stijlen toepassen
    for (const style of sectionStyles) {
      instructions.push({
        order: order++,
        action: "set_fill",
        target: `Section: ${style.sectionId}`,
        parameters: {
          fill: style.background,
        },
        description: `Stel achtergrond in voor sectie ${style.sectionId}`,
      });

      instructions.push({
        order: order++,
        action: "set_text_style",
        target: `Section: ${style.sectionId}`,
        parameters: {
          color: style.textColor,
          fontFamily: tokens.typography.fontFamilyBody,
        },
        description: `Stel tekststijl in voor sectie ${style.sectionId}`,
      });
    }

    // 3. Shadows toepassen op cards
    instructions.push({
      order: order++,
      action: "set_effect",
      target: "all-cards",
      parameters: {
        shadow: tokens.shadows.card,
        borderRadius: tokens.borders.radiusLg,
      },
      description: "Pas card schaduwen en afronding toe",
    });

    return instructions;
  }

  private generateCSSVariables(tokens: DesignTokens): Record<string, string> {
    return {
      "--color-primary": tokens.colors.primary,
      "--color-primary-light": tokens.colors.primaryLight,
      "--color-primary-dark": tokens.colors.primaryDark,
      "--color-secondary": tokens.colors.secondary,
      "--color-accent": tokens.colors.accent,
      "--color-background": tokens.colors.background,
      "--color-surface": tokens.colors.surface,
      "--color-text": tokens.colors.text,
      "--color-text-secondary": tokens.colors.textSecondary,
      "--color-text-muted": tokens.colors.textMuted,
      "--color-border": tokens.colors.border,
      "--color-success": tokens.colors.success,
      "--color-error": tokens.colors.error,
      "--color-warning": tokens.colors.warning,
      "--font-heading": tokens.typography.fontFamilyHeading,
      "--font-body": tokens.typography.fontFamilyBody,
      "--radius-sm": `${tokens.borders.radiusSm}px`,
      "--radius-md": `${tokens.borders.radiusMd}px`,
      "--radius-lg": `${tokens.borders.radiusLg}px`,
      "--radius-xl": `${tokens.borders.radiusXl}px`,
      "--shadow-card": tokens.shadows.card,
      "--shadow-button": tokens.shadows.button,
      "--transition-speed": tokens.effects.transitionSpeed,
      "--spacing-section": `${tokens.spacing.sectionPadding}px`,
      "--spacing-card": `${tokens.spacing.cardPadding}px`,
      "--max-width": `${tokens.spacing.containerMaxWidth}px`,
    };
  }

  private generateTailwindExtend(tokens: DesignTokens): Record<string, unknown> {
    return {
      colors: {
        primary: {
          DEFAULT: tokens.colors.primary,
          light: tokens.colors.primaryLight,
          dark: tokens.colors.primaryDark,
        },
        secondary: { DEFAULT: tokens.colors.secondary },
        accent: { DEFAULT: tokens.colors.accent },
        surface: {
          DEFAULT: tokens.colors.surface,
          elevated: tokens.colors.surfaceElevated,
        },
      },
      fontFamily: {
        heading: [tokens.typography.fontFamilyHeading],
        body: [tokens.typography.fontFamilyBody],
      },
      borderRadius: {
        card: `${tokens.borders.radiusLg}px`,
        button: `${tokens.borders.radiusXl}px`,
      },
      boxShadow: {
        card: tokens.shadows.card,
        "button-hover": tokens.shadows.button,
      },
    };
  }

  // ── Color utility methods ────────────────────────────────────

  private lightenColor(hex: string, amount: number): string {
    return this.adjustColor(hex, amount);
  }

  private darkenColor(hex: string, amount: number): string {
    return this.adjustColor(hex, -amount);
  }

  private adjustColor(hex: string, amount: number): string {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + Math.round(255 * amount)));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + Math.round(255 * amount)));
    const b = Math.min(255, Math.max(0, (num & 0xff) + Math.round(255 * amount)));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  }
}
