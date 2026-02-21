// ============================================================
// AGENTS – Top-level exports
// Alle agents, types en utilities voor het AI Design Partner System
// ============================================================

// Shared types en base
export * from "./shared/types";
export { BaseAgent } from "./shared/base-agent";

// Figma agents
export { DesignStrategist } from "./figma/design-strategist";
export { LayoutArchitect } from "./figma/layout-architect";
export { VisualStylist } from "./figma/visual-stylist";

// Lovable agents
export { ProductArchitect } from "./lovable/product-architect";
export { UIPromptEngineer } from "./lovable/ui-prompt-engineer";
export { IterativeDebugger } from "./lovable/iterative-debugger";

// Registry
export {
  AGENT_REGISTRY,
  WORKFLOW_REGISTRY,
  getAgentsByPipeline,
  getAgent,
  getWorkflow,
  getAgentOverview,
} from "./shared/agent-registry";

// Prompt templates
export {
  buildFigmaMCPPrompt,
  buildLovableInitialPrompt,
  buildLovableFixPrompt,
  buildStrategyPrompt,
  buildReviewPrompt,
} from "./shared/prompt-templates";
