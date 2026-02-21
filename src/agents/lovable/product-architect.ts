// ============================================================
// LOVABLE AGENT 1: THE PRODUCT ARCHITECT
// Definieert database-structuur (Supabase) en core functionaliteit
// Schrijft de "System Prompt" voor Lovable
// ============================================================

import { BaseAgent } from "../shared/base-agent";
import type {
  AgentConfig,
  WorkflowContext,
} from "../shared/types";

// ── Output types ─────────────────────────────────────────────

export interface DatabaseSchema {
  tables: TableDefinition[];
  relationships: Relationship[];
  indexes: IndexDefinition[];
  rlsPolicies: RLSPolicy[];
}

export interface TableDefinition {
  name: string;
  description: string;
  columns: ColumnDefinition[];
}

export interface ColumnDefinition {
  name: string;
  type: string;
  nullable: boolean;
  defaultValue?: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  references?: { table: string; column: string };
  description: string;
}

export interface Relationship {
  from: { table: string; column: string };
  to: { table: string; column: string };
  type: "one-to-one" | "one-to-many" | "many-to-many";
}

export interface IndexDefinition {
  table: string;
  columns: string[];
  unique: boolean;
  name: string;
}

export interface RLSPolicy {
  table: string;
  name: string;
  operation: "SELECT" | "INSERT" | "UPDATE" | "DELETE" | "ALL";
  using: string;
  description: string;
}

export interface SupabaseEdgeFunction {
  name: string;
  description: string;
  httpMethod: "GET" | "POST" | "PUT" | "DELETE";
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  triggers?: string[];
}

export interface LovableSystemPrompt {
  context: string;
  techStack: string[];
  databaseSchema: string;
  coreFeatures: string[];
  constraints: string[];
  integrations: string[];
}

export interface ProductArchitectOutput {
  databaseSchema: DatabaseSchema;
  edgeFunctions: SupabaseEdgeFunction[];
  lovableSystemPrompt: LovableSystemPrompt;
  /** Technisch plan als leesbare tekst */
  technicalBlueprint: string;
  /** Feature lijst met prioriteiten */
  features: FeatureSpec[];
}

export interface FeatureSpec {
  id: string;
  name: string;
  description: string;
  priority: "must-have" | "should-have" | "nice-to-have";
  components: string[];
  dataRequirements: string[];
}

// ── Agent implementatie ──────────────────────────────────────

export class ProductArchitect extends BaseAgent<ProductArchitectOutput> {
  config: AgentConfig = {
    name: "ProductArchitect",
    description:
      "Definieert de database-structuur (Supabase) en core functionaliteit. Schrijft de System Prompt voor Lovable die de logica van de app uitlegt.",
    role: "Systeem Agent",
    capabilities: [
      "Database schema ontwerpen (Supabase/PostgreSQL)",
      "Edge Functions specificeren",
      "Lovable System Prompt schrijven",
      "Feature specificaties opstellen",
      "RLS policies definiëren",
      "API design",
    ],
    dependsOn: [],
    maxRetries: 2,
    requiresReview: true,
  };

  protected async process(
    ctx: WorkflowContext
  ): Promise<ProductArchitectOutput> {
    this.log("Ontwerp technische architectuur en database schema...");

    const { intakeData } = ctx;

    // Database schema
    const databaseSchema = this.designDatabaseSchema(ctx);

    // Edge Functions
    const edgeFunctions = this.specifyEdgeFunctions(ctx);

    // Features
    const features = this.defineFeatures(ctx);

    // Lovable System Prompt
    const lovableSystemPrompt = this.buildLovableSystemPrompt(ctx, databaseSchema, features);

    // Technisch blueprint
    const technicalBlueprint = this.generateBlueprint(
      intakeData,
      databaseSchema,
      features
    );

    return {
      databaseSchema,
      edgeFunctions,
      lovableSystemPrompt,
      technicalBlueprint,
      features,
    };
  }

  private designDatabaseSchema(_ctx: WorkflowContext): DatabaseSchema {
    const tables: TableDefinition[] = [
      {
        name: "organizations",
        description: "Bedrijven/organisaties die vacaturepagina's aanmaken",
        columns: [
          { name: "id", type: "uuid", nullable: false, defaultValue: "gen_random_uuid()", isPrimaryKey: true, description: "Uniek ID" },
          { name: "name", type: "text", nullable: false, description: "Bedrijfsnaam" },
          { name: "slug", type: "text", nullable: false, description: "URL-vriendelijke identifier" },
          { name: "logo_url", type: "text", nullable: true, description: "Logo URL" },
          { name: "website_url", type: "text", nullable: true, description: "Website" },
          { name: "contact_email", type: "text", nullable: true, description: "Contact e-mail" },
          { name: "contact_phone", type: "text", nullable: true, description: "Contact telefoon" },
          { name: "brand_colors", type: "jsonb", nullable: true, defaultValue: "'{}'", description: "Brand kleuren configuratie" },
          { name: "created_at", type: "timestamptz", nullable: false, defaultValue: "now()", description: "Aanmaakdatum" },
        ],
      },
      {
        name: "landing_pages",
        description: "Vacature landing pages",
        columns: [
          { name: "id", type: "uuid", nullable: false, defaultValue: "gen_random_uuid()", isPrimaryKey: true, description: "Uniek ID" },
          { name: "organization_id", type: "uuid", nullable: false, isForeignKey: true, references: { table: "organizations", column: "id" }, description: "Organisatie" },
          { name: "slug", type: "text", nullable: false, description: "URL slug" },
          { name: "status", type: "text", nullable: false, defaultValue: "'draft'", description: "Publicatie status" },
          { name: "page_title", type: "text", nullable: false, description: "Pagina titel" },
          { name: "meta_description", type: "text", nullable: true, description: "SEO beschrijving" },
          { name: "sections", type: "jsonb", nullable: false, defaultValue: "'[]'", description: "Sectie configuratie" },
          { name: "theme", type: "jsonb", nullable: false, defaultValue: "'{}'", description: "Visueel thema" },
          { name: "form_fields", type: "jsonb", nullable: false, defaultValue: "'[]'", description: "Formulier velden" },
          { name: "form_success_message", type: "text", nullable: true, description: "Succes bericht na sollicitatie" },
          { name: "contact_person_name", type: "text", nullable: true, description: "Contactpersoon naam" },
          { name: "contact_person_email", type: "text", nullable: true, description: "Contactpersoon email" },
          { name: "contact_person_phone", type: "text", nullable: true, description: "Contactpersoon telefoon" },
          { name: "ga4_measurement_id", type: "text", nullable: true, description: "Google Analytics ID" },
          { name: "created_at", type: "timestamptz", nullable: false, defaultValue: "now()", description: "Aangemaakt" },
          { name: "published_at", type: "timestamptz", nullable: true, description: "Gepubliceerd" },
        ],
      },
      {
        name: "intake_submissions",
        description: "Intake formulier inzendingen",
        columns: [
          { name: "id", type: "uuid", nullable: false, defaultValue: "gen_random_uuid()", isPrimaryKey: true, description: "Uniek ID" },
          { name: "created_by", type: "text", nullable: true, description: "Aanmaker" },
          { name: "company_name", type: "text", nullable: false, description: "Bedrijfsnaam" },
          { name: "job_title", type: "text", nullable: false, description: "Functietitel" },
          { name: "job_location", type: "text", nullable: true, description: "Locatie" },
          { name: "status", type: "text", nullable: false, defaultValue: "'pending'", description: "Verwerkingsstatus" },
          { name: "landing_page_id", type: "uuid", nullable: true, isForeignKey: true, references: { table: "landing_pages", column: "id" }, description: "Gekoppelde pagina" },
          { name: "error_message", type: "text", nullable: true, description: "Foutmelding bij failure" },
          { name: "created_at", type: "timestamptz", nullable: false, defaultValue: "now()", description: "Aangemaakt" },
          { name: "processed_at", type: "timestamptz", nullable: true, description: "Verwerkt" },
        ],
      },
      {
        name: "applications",
        description: "Sollicitaties van kandidaten",
        columns: [
          { name: "id", type: "uuid", nullable: false, defaultValue: "gen_random_uuid()", isPrimaryKey: true, description: "Uniek ID" },
          { name: "landing_page_id", type: "uuid", nullable: false, isForeignKey: true, references: { table: "landing_pages", column: "id" }, description: "Landing page" },
          { name: "full_name", type: "text", nullable: false, description: "Volledige naam" },
          { name: "email", type: "text", nullable: false, description: "E-mail" },
          { name: "phone", type: "text", nullable: true, description: "Telefoon" },
          { name: "motivation", type: "text", nullable: true, description: "Motivatie" },
          { name: "cv_storage_path", type: "text", nullable: true, description: "Pad naar CV" },
          { name: "privacy_consent", type: "boolean", nullable: false, defaultValue: "false", description: "Privacy akkoord" },
          { name: "utm_source", type: "text", nullable: true, description: "UTM bron" },
          { name: "utm_campaign", type: "text", nullable: true, description: "UTM campagne" },
          { name: "created_at", type: "timestamptz", nullable: false, defaultValue: "now()", description: "Aangemaakt" },
        ],
      },
    ];

    const relationships: Relationship[] = [
      { from: { table: "landing_pages", column: "organization_id" }, to: { table: "organizations", column: "id" }, type: "many-to-many" },
      { from: { table: "applications", column: "landing_page_id" }, to: { table: "landing_pages", column: "id" }, type: "many-to-many" },
      { from: { table: "intake_submissions", column: "landing_page_id" }, to: { table: "landing_pages", column: "id" }, type: "one-to-one" },
    ];

    const indexes: IndexDefinition[] = [
      { table: "landing_pages", columns: ["slug"], unique: true, name: "idx_landing_pages_slug" },
      { table: "landing_pages", columns: ["organization_id"], unique: false, name: "idx_landing_pages_org" },
      { table: "landing_pages", columns: ["status"], unique: false, name: "idx_landing_pages_status" },
      { table: "applications", columns: ["landing_page_id"], unique: false, name: "idx_applications_page" },
      { table: "applications", columns: ["email"], unique: false, name: "idx_applications_email" },
      { table: "organizations", columns: ["slug"], unique: true, name: "idx_organizations_slug" },
    ];

    const rlsPolicies: RLSPolicy[] = [
      {
        table: "landing_pages",
        name: "Publieke pagina's leesbaar",
        operation: "SELECT",
        using: "status = 'published'",
        description: "Iedereen kan gepubliceerde pagina's lezen",
      },
      {
        table: "applications",
        name: "Sollicitaties inserts altijd toegestaan",
        operation: "INSERT",
        using: "true",
        description: "Iedereen kan solliciteren (publiek formulier)",
      },
    ];

    return { tables, relationships, indexes, rlsPolicies };
  }

  private specifyEdgeFunctions(_ctx: WorkflowContext): SupabaseEdgeFunction[] {
    return [
      {
        name: "generate-landing-page",
        description: "Genereert een complete landing page configuratie uit intake data",
        httpMethod: "POST",
        inputSchema: { type: "IntakeFormData" },
        outputSchema: { type: "{ success: boolean; landing_page_id: string; slug: string; url: string }" },
      },
      {
        name: "jotform-webhook",
        description: "Ontvangt Jotform submissions en verwerkt ze tot landing pages",
        httpMethod: "POST",
        inputSchema: { type: "JotformPayload" },
        outputSchema: { type: "{ ok: boolean }" },
        triggers: ["Jotform webhook"],
      },
      {
        name: "submit-application",
        description: "Verwerkt sollicitaties en triggert email notificaties",
        httpMethod: "POST",
        inputSchema: { type: "ApplicationData" },
        outputSchema: { type: "{ success: boolean; application_id: string }" },
      },
      {
        name: "send-email",
        description: "Verstuurt emails via Resend (bevestiging, notificaties, follow-ups)",
        httpMethod: "POST",
        inputSchema: { type: "EmailPayload" },
        outputSchema: { type: "{ success: boolean }" },
      },
    ];
  }

  private defineFeatures(_ctx: WorkflowContext): FeatureSpec[] {
    return [
      {
        id: "intake-form",
        name: "Intake Formulier",
        description: "Multi-stap formulier voor het invoeren van vacaturegegevens",
        priority: "must-have",
        components: ["IntakeFormPage", "intake-steps", "intake-form-fields"],
        dataRequirements: ["intake_submissions"],
      },
      {
        id: "page-generation",
        name: "Automatische Pagina Generatie",
        description: "Genereer een complete landing page uit intake data",
        priority: "must-have",
        components: ["generate-landing-page", "SectionRenderer", "LandingPageLoader"],
        dataRequirements: ["landing_pages", "organizations"],
      },
      {
        id: "landing-page-display",
        name: "Landing Page Weergave",
        description: "Dynamische rendering van landing pages met alle secties",
        priority: "must-have",
        components: ["LandingPage", "HeroSection", "BenefitsSection", "ApplicationFormSection"],
        dataRequirements: ["landing_pages"],
      },
      {
        id: "application-handling",
        name: "Sollicitatie Verwerking",
        description: "Ontvangen en verwerken van sollicitaties met email notificaties",
        priority: "must-have",
        components: ["ApplicationFormSection", "submit-application", "send-email"],
        dataRequirements: ["applications"],
      },
      {
        id: "admin-dashboard",
        name: "Admin Dashboard",
        description: "Overzicht van alle pagina's, kandidaten en statistieken",
        priority: "should-have",
        components: ["DashboardPage", "PagesListPage", "CandidatesPage"],
        dataRequirements: ["landing_pages", "applications", "organizations"],
      },
      {
        id: "analytics-tracking",
        name: "Analytics & Tracking",
        description: "GA4, Facebook Pixel, scroll tracking, UTM parameters",
        priority: "should-have",
        components: ["TrackingProvider", "ga4", "facebook-pixel", "scroll-tracker"],
        dataRequirements: [],
      },
      {
        id: "client-approval",
        name: "Klant Goedkeuring",
        description: "Goedkeuringsflow voor klanten om draft pagina's te reviewen",
        priority: "nice-to-have",
        components: ["ApprovalPage", "ShareWithClientButton"],
        dataRequirements: ["landing_pages"],
      },
    ];
  }

  private buildLovableSystemPrompt(
    ctx: WorkflowContext,
    schema: DatabaseSchema,
    features: FeatureSpec[]
  ): LovableSystemPrompt {
    const { intakeData } = ctx;
    const mustHaveFeatures = features.filter((f) => f.priority === "must-have");

    const schemaDescription = schema.tables
      .map((t) => `- ${t.name}: ${t.description} (${t.columns.length} kolommen)`)
      .join("\n");

    return {
      context: `We bouwen een recruitment landing page platform voor ${intakeData.companyName}. Het systeem genereert automatisch high-conversion vacature landing pages uit een intake formulier. De tech stack is React + Vite + Tailwind CSS + Supabase.`,
      techStack: [
        "React 18 met TypeScript",
        "Vite 6 als build tool",
        "Tailwind CSS 3 voor styling",
        "shadcn/ui componenten (Radix UI)",
        "Supabase voor database en auth",
        "React Router DOM voor navigatie",
        "React Hook Form + Zod voor formulieren",
        "Lucide React voor iconen",
        "Resend voor email",
      ],
      databaseSchema: schemaDescription,
      coreFeatures: mustHaveFeatures.map(
        (f) => `${f.name}: ${f.description}`
      ),
      constraints: [
        "Mobile-first responsive design",
        "AVG/GDPR compliant (privacy consent, data retention)",
        "SEO geoptimaliseerd (meta tags, structured data)",
        "Laadtijd < 3 seconden",
        "Accessibility (WCAG 2.1 AA)",
        "Nederlandse taal als standaard",
      ],
      integrations: [
        "Supabase (database, auth, edge functions, storage)",
        "Jotform (externe intake formulieren)",
        "Resend (transactional emails)",
        "Google Analytics 4",
        "Facebook Pixel",
        "LinkedIn Insight Tag",
      ],
    };
  }

  private generateBlueprint(
    intakeData: WorkflowContext["intakeData"],
    schema: DatabaseSchema,
    features: FeatureSpec[]
  ): string {
    const mustHave = features.filter((f) => f.priority === "must-have");
    const shouldHave = features.filter((f) => f.priority === "should-have");

    return [
      `# Technisch Blueprint: ${intakeData.companyName} – ${intakeData.jobTitle}`,
      "",
      "## Database",
      ...schema.tables.map((t) => `- **${t.name}**: ${t.description}`),
      "",
      "## Must-Have Features",
      ...mustHave.map((f) => `- ${f.name}: ${f.description}`),
      "",
      "## Should-Have Features",
      ...shouldHave.map((f) => `- ${f.name}: ${f.description}`),
      "",
      "## Tech Stack",
      "React 18 + Vite + Tailwind CSS + Supabase + shadcn/ui",
      "",
      "## Integrations",
      "Jotform, Resend, GA4, Facebook Pixel, Slack",
    ].join("\n");
  }
}
