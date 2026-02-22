// ============================================================
// AGENT SYSTEM – SHARED TYPES
// Base interfaces voor alle agents in het AI Design Partner System
// ============================================================

/**
 * Status van een agent-stap in de workflow.
 */
export type AgentStepStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "needs_review";

/**
 * Basis resultaat van elke agent-actie.
 */
export interface AgentResult<T = unknown> {
  success: boolean;
  agentName: string;
  timestamp: string;
  data: T;
  errors: string[];
  warnings: string[];
  /** Optionele boodschap voor de volgende agent in de keten */
  nextAgentHint?: string;
}

/**
 * Context die door de hele workflow heen wordt doorgegeven.
 * Elke agent leest en verrijkt deze context.
 */
export interface WorkflowContext {
  /** Uniek ID voor deze workflow-run */
  runId: string;
  /** Timestamp van de start */
  startedAt: string;
  /** Oorspronkelijke intake data */
  intakeData: IntakeBriefing;
  /** Resultaten van eerdere agents */
  agentResults: Record<string, AgentResult>;
  /** Huidige status per stap */
  stepStatuses: Record<string, AgentStepStatus>;
  /** Feedback van de gebruiker (review-loop) */
  userFeedback: UserFeedback[];
  /** Metadata */
  metadata: Record<string, unknown>;
}

/**
 * Intake briefing – de input die alle agents als startpunt gebruiken.
 * Dit is de vertaling van IntakeFormData naar een agent-vriendelijk formaat.
 */
export interface IntakeBriefing {
  // Bedrijf
  companyName: string;
  companyWebsite: string;
  companyLogoUrl: string;
  companySector: string;
  brandColors: {
    primary: string;
    secondary?: string;
    accent?: string;
  };

  // Vacature
  jobTitle: string;
  jobLocation: string;
  salaryRange: { min: number | null; max: number | null };
  employmentType: string;
  jobDescription: string;

  // Details
  responsibilities: string[];
  requirementsMust: string[];
  requirementsNice: string[];
  benefits: string[];

  // Contact
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;
  contactWhatsapp: string;

  // Stijl voorkeuren
  templateStyle: string;
  imageStyle: string;
  calendlyUrl: string;

  // Analytics
  ga4MeasurementId: string;
}

/**
 * Feedback object van de gebruiker na een review-stap.
 */
export interface UserFeedback {
  agentName: string;
  timestamp: string;
  approved: boolean;
  comments: string;
  requestedChanges: string[];
}

/**
 * Configuratie voor een individuele agent.
 */
export interface AgentConfig {
  name: string;
  description: string;
  role: string;
  capabilities: string[];
  /** Afhankelijkheden: welke agents moeten klaar zijn */
  dependsOn: string[];
  /** Maximaal aantal retries bij fout */
  maxRetries: number;
  /** Of deze agent user-review nodig heeft */
  requiresReview: boolean;
}

/**
 * Abstracte interface die elke agent implementeert.
 */
export interface Agent<TInput = WorkflowContext, TOutput = unknown> {
  config: AgentConfig;
  execute(input: TInput): Promise<AgentResult<TOutput>>;
  validate(input: TInput): { valid: boolean; errors: string[] };
}

/**
 * Workflow-definitie: een geordende keten van agents.
 */
export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
}

export interface WorkflowStep {
  agentName: string;
  order: number;
  /** Of deze stap parallel met andere kan draaien */
  parallel: boolean;
  /** Optioneel: alleen uitvoeren als conditie waar is */
  condition?: (ctx: WorkflowContext) => boolean;
}

/**
 * Resultaat van een complete workflow-run.
 */
export interface WorkflowResult {
  runId: string;
  workflowId: string;
  status: "completed" | "failed" | "needs_review";
  startedAt: string;
  completedAt: string;
  context: WorkflowContext;
  summary: string;
}
