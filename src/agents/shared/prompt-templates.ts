// ============================================================
// PROMPT TEMPLATES
// Herbruikbare prompt templates voor alle agents
// Gebruikt voor het genereren van instructies naar Figma MCP en Lovable
// ============================================================

import type { IntakeBriefing } from "./types";

/**
 * Genereer een Figma MCP prompt voor het aanmaken van een complete pagina.
 */
export function buildFigmaMCPPrompt(briefing: IntakeBriefing): string {
  return `
Maak een nieuwe Figma pagina aan voor de volgende vacature:

BEDRIJF: ${briefing.companyName}
SECTOR: ${briefing.companySector}
WEBSITE: ${briefing.companyWebsite}

VACATURE: ${briefing.jobTitle}
LOCATIE: ${briefing.jobLocation}
SALARIS: ${formatSalary(briefing.salaryRange)}
DIENSTVERBAND: ${briefing.employmentType}

BESCHRIJVING: ${briefing.jobDescription || "Niet opgegeven"}

VERANTWOORDELIJKHEDEN:
${briefing.responsibilities.length > 0 ? briefing.responsibilities.map((r) => `- ${r}`).join("\n") : "- Niet opgegeven"}

EISEN (must-have):
${briefing.requirementsMust.length > 0 ? briefing.requirementsMust.map((r) => `- ${r}`).join("\n") : "- Niet opgegeven"}

ARBEIDSVOORWAARDEN:
${briefing.benefits.length > 0 ? briefing.benefits.map((b) => `- ${b}`).join("\n") : "- Niet opgegeven"}

CONTACT: ${briefing.contactName} (${briefing.contactRole})
EMAIL: ${briefing.contactEmail}
TELEFOON: ${briefing.contactPhone}

BRAND KLEUR: ${briefing.brandColors.primary}
TEMPLATE STIJL: ${briefing.templateStyle}

Instructies:
1. Maak een frame van 1440px breed.
2. Gebruik Auto Layout (verticaal) voor alle secties.
3. Begin met een Hero sectie met gradient achtergrond.
4. Voeg secties toe: Job Details, Benefits, Salaris, Eisen, FAQ, Formulier, Final CTA.
5. Gebruik het Inter font.
6. Pas de brand kleur ${briefing.brandColors.primary} toe als primaire kleur.
`.trim();
}

/**
 * Genereer een Lovable initiële build prompt.
 */
export function buildLovableInitialPrompt(briefing: IntakeBriefing): string {
  return `
Bouw een recruitment landing page met de volgende specificaties:

## Context
Een vacature landing page voor "${briefing.jobTitle}" bij ${briefing.companyName} in ${briefing.jobLocation}.

## Tech Stack
- React 18 met TypeScript
- Tailwind CSS voor styling
- shadcn/ui componenten
- React Hook Form + Zod voor het formulier
- Lucide React voor iconen

## Design
- Gebruik shadcn/ui componenten
- Mobile-first responsive design
- Brand kleur: ${briefing.brandColors.primary}
- Font: Inter (sans-serif)
- Modern, clean design met veel whitespace

## Secties (in volgorde)
1. **Hero** – Gradient achtergrond (${briefing.brandColors.primary}), bedrijfsnaam als badge, functietitel als H1, locatie + salaris + dienstverband als quick stats, 2 CTA buttons
${briefing.responsibilities.length > 0 ? `2. **Wat ga je doen?** – Verantwoordelijkheden: ${briefing.responsibilities.join(", ")}` : ""}
${briefing.benefits.length > 0 ? `3. **Wat bieden wij?** – Arbeidsvoorwaarden als cards: ${briefing.benefits.join(", ")}` : ""}
${briefing.salaryRange.min || briefing.salaryRange.max ? `4. **Wat verdien je?** – Salaris: ${formatSalary(briefing.salaryRange)}` : ""}
${briefing.requirementsMust.length > 0 ? `5. **Wat vragen wij?** – Must-have: ${briefing.requirementsMust.join(", ")}` : ""}
6. **FAQ** – Accordion met veelgestelde vragen over het sollicitatieproces
7. **Sollicitatieformulier** – Velden: naam, email, telefoon, motivatie, CV upload, privacy checkbox
8. **Final CTA** – Laatste overtuiging met solliciteer button${briefing.contactWhatsapp ? " en WhatsApp optie" : ""}

## Formulier Specificaties
- React Hook Form met Zod validatie
- Verplichte velden: naam, email, telefoon, privacy
- Optionele velden: motivatie, CV (PDF/DOC, max 5MB)
- Success state: groene check + toast melding

## Navigatie
- Sticky header met logo en CTA button (verschijnt na 100px scroll)
- Floating "Solliciteer" button (verschijnt na 300px scroll)
- Smooth scroll naar secties

## Contact
Contactpersoon: ${briefing.contactName} (${briefing.contactRole})
Email: ${briefing.contactEmail}
${briefing.contactPhone ? `Telefoon: ${briefing.contactPhone}` : ""}
${briefing.contactWhatsapp ? `WhatsApp: ${briefing.contactWhatsapp}` : ""}
`.trim();
}

/**
 * Genereer een Lovable fix/refinement prompt.
 */
export function buildLovableFixPrompt(
  issue: string,
  location: string,
  suggestedFix: string
): string {
  return `
Fix het volgende probleem:

PROBLEEM: ${issue}
LOCATIE: ${location}
OPLOSSING: ${suggestedFix}

Pas alleen het genoemde onderdeel aan, wijzig niets anders.
`.trim();
}

/**
 * Genereer een prompt voor de Design Strategist agent.
 */
export function buildStrategyPrompt(briefing: IntakeBriefing): string {
  return `
Analyseer de volgende vacature briefing en maak een complete UI-strategie:

BEDRIJF: ${briefing.companyName} (${briefing.companySector})
VACATURE: ${briefing.jobTitle} in ${briefing.jobLocation}
SALARIS: ${formatSalary(briefing.salaryRange)}

Beschikbare data:
- Verantwoordelijkheden: ${briefing.responsibilities.length} items
- Eisen: ${briefing.requirementsMust.length} must-have, ${briefing.requirementsNice.length} nice-to-have
- Arbeidsvoorwaarden: ${briefing.benefits.length} items
- Contact: ${briefing.contactName}${briefing.contactWhatsapp ? " (WhatsApp beschikbaar)" : ""}

Lever op:
1. Informatie-architectuur (welke secties, in welke volgorde)
2. User flow (hoe een kandidaat door de pagina navigeert)
3. Conversie-strategie (CTA's, urgentie, trust signals)
4. SEO-strategie (title, description, keywords)
5. Tone of voice (gebaseerd op sector: ${briefing.companySector})
`.trim();
}

/**
 * Genereer een prompt voor review-feedback.
 */
export function buildReviewPrompt(
  agentName: string,
  resultSummary: string
): string {
  return `
Review het resultaat van ${agentName}:

${resultSummary}

Beoordeel op:
1. Volledigheid – zijn alle vereiste elementen aanwezig?
2. Kwaliteit – is het niveau professioneel genoeg?
3. Consistentie – past het bij de brand en sector?
4. Conversie – zijn de CTA's en user flow optimaal?

Geef feedback als JSON:
{
  "approved": true/false,
  "comments": "...",
  "requestedChanges": ["...", "..."]
}
`.trim();
}

// ── Helpers ──────────────────────────────────────────────────

function formatSalary(range: { min: number | null; max: number | null }): string {
  if (range.min && range.max) return `€${range.min} - €${range.max}`;
  if (range.min) return `Vanaf €${range.min}`;
  if (range.max) return `Tot €${range.max}`;
  return "Marktconform";
}
