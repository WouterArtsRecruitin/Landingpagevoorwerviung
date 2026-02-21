// ============================================================
// WORKFLOWS – Top-level exports
// Alle workflow orchestrators en het intake processor systeem
// ============================================================

// Figma pipeline
export {
  FigmaWorkflowOrchestrator,
  FIGMA_WORKFLOW_DEFINITION,
} from "./figma-pipeline/figma-workflow";

// Lovable pipeline
export {
  LovableWorkflowOrchestrator,
  LOVABLE_WORKFLOW_DEFINITION,
} from "./lovable-pipeline/lovable-workflow";

// Intake processor
export {
  intakeFormToBriefing,
  createWorkflowContext,
  validateIntakeForWorkflow,
  runWorkflow,
} from "./intake-processor";
export type {
  WorkflowType,
  WorkflowRunnerOptions,
  WorkflowRunnerResult,
} from "./intake-processor";
