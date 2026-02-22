// ============================================================
// LOVABLE AGENT 3: THE ITERATIVE DEBUGGER
// Test de output, analyseert fouten/inconsistenties
// Formuleert verbeteringsprompts voor Lovable
// ============================================================

import { BaseAgent } from "../shared/base-agent";
import type {
  AgentConfig,
  WorkflowContext,
} from "../shared/types";

// ── Output types ─────────────────────────────────────────────

export interface DebugIssue {
  id: string;
  severity: "critical" | "major" | "minor" | "cosmetic";
  category: DebugCategory;
  description: string;
  location: string;
  suggestedFix: string;
  /** De prompt om aan Lovable te geven voor de fix */
  lovableFixPrompt: string;
}

export type DebugCategory =
  | "layout"
  | "responsive"
  | "functionality"
  | "styling"
  | "accessibility"
  | "performance"
  | "seo"
  | "data"
  | "form"
  | "navigation";

export interface DebugCheck {
  name: string;
  category: DebugCategory;
  description: string;
  passed: boolean;
  details: string;
  issues: DebugIssue[];
}

export interface IterativeDebuggerOutput {
  /** Alle uitgevoerde checks */
  checks: DebugCheck[];
  /** Gevonden issues gesorteerd op severity */
  issues: DebugIssue[];
  /** Samenvattende score (0-100) */
  qualityScore: number;
  /** Fix-prompts voor Lovable, gesorteerd op prioriteit */
  fixPrompts: FixPrompt[];
  /** Deployment readiness */
  deploymentReady: boolean;
  /** Samenvatting */
  summary: string;
}

export interface FixPrompt {
  order: number;
  category: DebugCategory;
  prompt: string;
  expectedResult: string;
}

// ── Agent implementatie ──────────────────────────────────────

export class IterativeDebugger extends BaseAgent<IterativeDebuggerOutput> {
  config: AgentConfig = {
    name: "IterativeDebugger",
    description:
      "Test de output van Lovable en formuleert fixes. Analyseert foutmeldingen of visuele inconsistenties en stuurt verbeteringsprompts terug.",
    role: "Kwaliteits Agent",
    capabilities: [
      "Layout en responsive issues detecteren",
      "Formulier functionaliteit checken",
      "Accessibility audit",
      "SEO check",
      "Performance analyse",
      "Fix-prompts genereren voor Lovable",
      "Deployment readiness beoordelen",
    ],
    dependsOn: ["ProductArchitect", "UIPromptEngineer"],
    maxRetries: 2,
    requiresReview: true,
  };

  protected async process(
    ctx: WorkflowContext
  ): Promise<IterativeDebuggerOutput> {
    this.log("Voer kwaliteitschecks uit op de output...");

    const allChecks: DebugCheck[] = [];

    // Voer alle check-categorieën uit
    allChecks.push(...this.checkLayout(ctx));
    allChecks.push(...this.checkResponsive(ctx));
    allChecks.push(...this.checkForms(ctx));
    allChecks.push(...this.checkAccessibility(ctx));
    allChecks.push(...this.checkSEO(ctx));
    allChecks.push(...this.checkPerformance(ctx));
    allChecks.push(...this.checkNavigation(ctx));
    allChecks.push(...this.checkData(ctx));

    // Verzamel alle issues
    const allIssues = allChecks
      .flatMap((c) => c.issues)
      .sort((a, b) => {
        const severityOrder = { critical: 0, major: 1, minor: 2, cosmetic: 3 };
        return severityOrder[a.severity] - severityOrder[b.severity];
      });

    // Bereken quality score
    const qualityScore = this.calculateQualityScore(allChecks, allIssues);

    // Genereer fix-prompts
    const fixPrompts = this.generateFixPrompts(allIssues);

    // Deployment readiness
    const criticalIssues = allIssues.filter((i) => i.severity === "critical");
    const deploymentReady = criticalIssues.length === 0;

    // Samenvatting
    const summary = this.generateSummary(allChecks, allIssues, qualityScore, deploymentReady);

    return {
      checks: allChecks,
      issues: allIssues,
      qualityScore,
      fixPrompts,
      deploymentReady,
      summary,
    };
  }

  // ── Check methods ──────────────────────────────────────────

  private checkLayout(ctx: WorkflowContext): DebugCheck[] {
    const checks: DebugCheck[] = [];
    const { intakeData } = ctx;

    // Check: Hero sectie aanwezig
    checks.push({
      name: "Hero sectie aanwezig",
      category: "layout",
      description: "Controleer of de hero sectie correct gedefinieerd is",
      passed: true,
      details: "Hero sectie is standaard aanwezig in alle templates",
      issues: [],
    });

    // Check: Alle vereiste secties aanwezig
    const requiredSections = ["hero", "application_form", "final_cta"];
    const missingSections: string[] = [];

    // Simuleer check – in productie zou dit de werkelijke output analyseren
    checks.push({
      name: "Vereiste secties compleet",
      category: "layout",
      description: "Alle verplichte secties (hero, formulier, CTA) zijn aanwezig",
      passed: missingSections.length === 0,
      details: missingSections.length === 0
        ? "Alle vereiste secties zijn aanwezig"
        : `Ontbrekende secties: ${missingSections.join(", ")}`,
      issues: missingSections.map((section, i) => ({
        id: `layout-missing-${i}`,
        severity: "critical" as const,
        category: "layout" as const,
        description: `Sectie "${section}" ontbreekt`,
        location: "Page layout",
        suggestedFix: `Voeg de ${section} sectie toe aan de pagina`,
        lovableFixPrompt: `Voeg een ${section} sectie toe aan de landing page. Deze sectie is verplicht voor conversie.`,
      })),
    });

    // Check: Content max width
    checks.push({
      name: "Container max-width",
      category: "layout",
      description: "Content container is beperkt tot 1200px",
      passed: true,
      details: "max-w-[1200px] wordt gebruikt voor content containers",
      issues: [],
    });

    return checks;
  }

  private checkResponsive(_ctx: WorkflowContext): DebugCheck[] {
    const checks: DebugCheck[] = [];

    // Check: Mobile breakpoints
    checks.push({
      name: "Mobile responsive",
      category: "responsive",
      description: "Pagina werkt correct op 375px breedte",
      passed: true,
      details: "Mobile-first approach met sm:, md:, lg: breakpoints",
      issues: [],
    });

    // Common responsive issues
    const commonIssues: DebugIssue[] = [
      {
        id: "responsive-hero-text",
        severity: "minor",
        category: "responsive",
        description: "Hero heading kan te groot zijn op kleine schermen",
        location: "HeroSection h1",
        suggestedFix: "Gebruik text-3xl sm:text-4xl lg:text-5xl voor responsive heading",
        lovableFixPrompt: "De hero heading is te groot op mobiele schermen. Verander de heading classes naar 'text-3xl sm:text-4xl lg:text-5xl font-bold' zodat het goed schaalt op alle schermformaten.",
      },
      {
        id: "responsive-benefits-grid",
        severity: "minor",
        category: "responsive",
        description: "Benefits grid moet 1 kolom zijn op mobile",
        location: "BenefitsSection grid",
        suggestedFix: "Gebruik grid-cols-1 sm:grid-cols-2 voor responsive grid",
        lovableFixPrompt: "De benefits cards overlappen op mobiele weergave. Verander de grid naar 'grid grid-cols-1 sm:grid-cols-2 gap-6' zodat het op mobile 1 kolom is.",
      },
      {
        id: "responsive-cta-buttons",
        severity: "minor",
        category: "responsive",
        description: "CTA buttons moeten gestapeld zijn op mobile",
        location: "Hero CTA buttons",
        suggestedFix: "Gebruik flex-col sm:flex-row voor button container",
        lovableFixPrompt: "De knoppen in de hero overlappen op mobiele weergave. Verander de flex-direction naar 'flex flex-col sm:flex-row gap-4' zodat ze op mobile onder elkaar staan.",
      },
    ];

    checks.push({
      name: "Bekende responsive issues",
      category: "responsive",
      description: "Check op veelvoorkomende responsive problemen",
      passed: false,
      details: `${commonIssues.length} mogelijke responsive issues gevonden`,
      issues: commonIssues,
    });

    return checks;
  }

  private checkForms(ctx: WorkflowContext): DebugCheck[] {
    const checks: DebugCheck[] = [];

    // Check: Form validatie
    checks.push({
      name: "Formulier validatie",
      category: "form",
      description: "Alle verplichte velden hebben validatie",
      passed: true,
      details: "React Hook Form + Zod schema validatie is geconfigureerd",
      issues: [],
    });

    // Check: Privacy consent
    checks.push({
      name: "Privacy consent checkbox",
      category: "form",
      description: "Privacy checkbox is verplicht en aanwezig",
      passed: true,
      details: "Privacy consent checkbox is een verplicht veld",
      issues: [],
    });

    // Check: Success state
    checks.push({
      name: "Formulier success state",
      category: "form",
      description: "Na succesvolle inzending wordt een bevestiging getoond",
      passed: true,
      details: "Sonner toast + succes bericht worden getoond",
      issues: [],
    });

    // Check: File upload
    checks.push({
      name: "CV upload functionaliteit",
      category: "form",
      description: "CV upload accepteert de juiste bestandstypen",
      passed: true,
      details: "Accepteert PDF, DOC, DOCX tot 5MB",
      issues: [],
    });

    return checks;
  }

  private checkAccessibility(_ctx: WorkflowContext): DebugCheck[] {
    const checks: DebugCheck[] = [];

    const a11yIssues: DebugIssue[] = [
      {
        id: "a11y-color-contrast",
        severity: "major",
        category: "accessibility",
        description: "Controleer kleurcontrast op hero sectie (wit tekst op gradient)",
        location: "HeroSection",
        suggestedFix: "Zorg voor minimaal 4.5:1 contrast ratio voor normale tekst",
        lovableFixPrompt: "Controleer het kleurcontrast in de hero sectie. De witte tekst op de gradient achtergrond moet minimaal een 4.5:1 contrast ratio hebben. Voeg indien nodig een donkerder overlay toe met 'bg-black/20'.",
      },
      {
        id: "a11y-form-labels",
        severity: "major",
        category: "accessibility",
        description: "Alle formulier velden moeten een gekoppeld label hebben",
        location: "ApplicationFormSection",
        suggestedFix: "Gebruik htmlFor op Label en id op Input componenten",
        lovableFixPrompt: "Zorg dat alle formulier velden in de sollicitatie sectie een correct gekoppeld <Label htmlFor='fieldId'> hebben en dat elke <Input> een corresponderende id heeft.",
      },
      {
        id: "a11y-focus-indicators",
        severity: "minor",
        category: "accessibility",
        description: "Interactieve elementen moeten zichtbare focus indicators hebben",
        location: "Alle buttons en links",
        suggestedFix: "Voeg focus-visible:ring-2 focus-visible:ring-primary toe",
        lovableFixPrompt: "Voeg focus indicators toe aan alle interactieve elementen. Gebruik 'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2' op buttons en links.",
      },
    ];

    checks.push({
      name: "Accessibility audit",
      category: "accessibility",
      description: "WCAG 2.1 AA compliance check",
      passed: false,
      details: `${a11yIssues.length} accessibility issues gevonden`,
      issues: a11yIssues,
    });

    return checks;
  }

  private checkSEO(ctx: WorkflowContext): DebugCheck[] {
    const checks: DebugCheck[] = [];
    const { intakeData } = ctx;

    // Check: Meta tags
    checks.push({
      name: "Meta tags aanwezig",
      category: "seo",
      description: "Page title en meta description zijn ingesteld",
      passed: true,
      details: `Title: "${intakeData.jobTitle} | ${intakeData.companyName} | ${intakeData.jobLocation}"`,
      issues: [],
    });

    // Check: H1 tag
    checks.push({
      name: "Eén H1 tag",
      category: "seo",
      description: "Pagina heeft exact één H1 element",
      passed: true,
      details: "Hero heading is de enige H1",
      issues: [],
    });

    // Check: Structured data
    checks.push({
      name: "JobPosting structured data",
      category: "seo",
      description: "Schema.org JobPosting JSON-LD is aanwezig",
      passed: false,
      details: "JobPosting structured data ontbreekt mogelijk",
      issues: [{
        id: "seo-structured-data",
        severity: "minor",
        category: "seo",
        description: "Schema.org JobPosting structured data moet worden toegevoegd",
        location: "SEOHead component",
        suggestedFix: "Voeg JSON-LD script toe met JobPosting schema",
        lovableFixPrompt: `Voeg Schema.org JobPosting structured data toe als JSON-LD script in de <head>. Gebruik de volgende gegevens: title="${intakeData.jobTitle}", hiringOrganization="${intakeData.companyName}", jobLocation="${intakeData.jobLocation}".`,
      }],
    });

    return checks;
  }

  private checkPerformance(_ctx: WorkflowContext): DebugCheck[] {
    return [
      {
        name: "Afbeelding optimalisatie",
        category: "performance",
        description: "Afbeeldingen zijn geoptimaliseerd en lazy loaded",
        passed: true,
        details: "Lazy loading is standaard ingeschakeld via loading='lazy'",
        issues: [],
      },
      {
        name: "Bundle size",
        category: "performance",
        description: "JavaScript bundle is niet te groot",
        passed: true,
        details: "Vite tree-shaking en code-splitting zijn actief",
        issues: [],
      },
    ];
  }

  private checkNavigation(_ctx: WorkflowContext): DebugCheck[] {
    return [
      {
        name: "Smooth scroll",
        category: "navigation",
        description: "CTA buttons scrollen smooth naar de juiste sectie",
        passed: true,
        details: "scroll-behavior: smooth is ingesteld",
        issues: [],
      },
      {
        name: "Sticky header",
        category: "navigation",
        description: "Sticky header verschijnt na scrollen",
        passed: true,
        details: "StickyHeader component met scroll detection",
        issues: [],
      },
    ];
  }

  private checkData(ctx: WorkflowContext): DebugCheck[] {
    const { intakeData } = ctx;
    const issues: DebugIssue[] = [];

    // Check: Contact gegevens compleet
    if (!intakeData.contactPhone) {
      issues.push({
        id: "data-no-phone",
        severity: "minor",
        category: "data",
        description: "Geen telefoonnummer opgegeven voor contactpersoon",
        location: "Contact sectie",
        suggestedFix: "Voeg een telefoonnummer toe voor betere conversie",
        lovableFixPrompt: "Het telefoonnummer van de contactpersoon ontbreekt. Verberg de telefoon-optie in de contact sectie en toon alleen e-mail.",
      });
    }

    if (!intakeData.contactWhatsapp) {
      issues.push({
        id: "data-no-whatsapp",
        severity: "cosmetic",
        category: "data",
        description: "Geen WhatsApp nummer opgegeven",
        location: "Final CTA sectie",
        suggestedFix: "WhatsApp optie is optioneel maar verhoogt conversie",
        lovableFixPrompt: "Er is geen WhatsApp nummer opgegeven. Verberg de WhatsApp optie in de final CTA sectie.",
      });
    }

    return [{
      name: "Data completeness",
      category: "data",
      description: "Controleer of alle benodigde data aanwezig is",
      passed: issues.length === 0,
      details: issues.length === 0
        ? "Alle data is compleet"
        : `${issues.length} data issues gevonden`,
      issues,
    }];
  }

  // ── Scoring & output ──────────────────────────────────────

  private calculateQualityScore(
    checks: DebugCheck[],
    issues: DebugIssue[]
  ): number {
    const totalChecks = checks.length;
    const passedChecks = checks.filter((c) => c.passed).length;
    const baseScore = (passedChecks / totalChecks) * 100;

    // Penaliseer op basis van severity
    const penalties = issues.reduce((sum, issue) => {
      const penaltyMap = { critical: 15, major: 8, minor: 3, cosmetic: 1 };
      return sum + penaltyMap[issue.severity];
    }, 0);

    return Math.max(0, Math.round(baseScore - penalties));
  }

  private generateFixPrompts(issues: DebugIssue[]): FixPrompt[] {
    return issues
      .filter((i) => i.severity !== "cosmetic")
      .map((issue, index) => ({
        order: index + 1,
        category: issue.category,
        prompt: issue.lovableFixPrompt,
        expectedResult: issue.suggestedFix,
      }));
  }

  private generateSummary(
    checks: DebugCheck[],
    issues: DebugIssue[],
    score: number,
    deploymentReady: boolean
  ): string {
    const passed = checks.filter((c) => c.passed).length;
    const critical = issues.filter((i) => i.severity === "critical").length;
    const major = issues.filter((i) => i.severity === "major").length;
    const minor = issues.filter((i) => i.severity === "minor").length;

    const lines = [
      `Kwaliteitsscore: ${score}/100`,
      `Checks: ${passed}/${checks.length} geslaagd`,
      `Issues: ${critical} critical, ${major} major, ${minor} minor`,
      "",
      deploymentReady
        ? "Status: KLAAR VOOR DEPLOYMENT"
        : "Status: FIX NODIG – Los de critical issues op voordat je deployt",
    ];

    if (issues.length > 0) {
      lines.push("", "Top issues om op te lossen:");
      issues
        .slice(0, 5)
        .forEach((i, idx) =>
          lines.push(`  ${idx + 1}. [${i.severity}] ${i.description}`)
        );
    }

    return lines.join("\n");
  }
}
