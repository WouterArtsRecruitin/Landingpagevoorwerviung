// ============================================================
// AGENT REGISTRY
// Centraal register van alle beschikbare agents en workflows
// Gebruik dit als entry-point om agents op te zoeken en te configureren
// ============================================================

import type { AgentConfig, WorkflowDefinition } from "./types";

// Figma agents
import { DesignStrategist } from "../figma/design-strategist";
import { LayoutArchitect } from "../figma/layout-architect";
import { VisualStylist } from "../figma/visual-stylist";

// Lovable agents
import { ProductArchitect } from "../lovable/product-architect";
import { UIPromptEngineer } from "../lovable/ui-prompt-engineer";
import { IterativeDebugger } from "../lovable/iterative-debugger";

// Workflows
import { FIGMA_WORKFLOW_DEFINITION } from "../../workflows/figma-pipeline/figma-workflow";
import { LOVABLE_WORKFLOW_DEFINITION } from "../../workflows/lovable-pipeline/lovable-workflow";

// ── Agent Registry ───────────────────────────────────────────

export interface RegisteredAgent {
  config: AgentConfig;
  pipeline: "figma" | "lovable";
  category: string;
  /** Factory functie om een instantie te maken */
  create: () => InstanceType<typeof DesignStrategist | typeof LayoutArchitect | typeof VisualStylist | typeof ProductArchitect | typeof UIPromptEngineer | typeof IterativeDebugger>;
}

/**
 * Alle geregistreerde agents.
 */
export const AGENT_REGISTRY: Record<string, RegisteredAgent> = {
  // ── Figma Pipeline ──
  DesignStrategist: {
    config: new DesignStrategist().config,
    pipeline: "figma",
    category: "Strategie",
    create: () => new DesignStrategist(),
  },
  LayoutArchitect: {
    config: new LayoutArchitect().config,
    pipeline: "figma",
    category: "Layout",
    create: () => new LayoutArchitect(),
  },
  VisualStylist: {
    config: new VisualStylist().config,
    pipeline: "figma",
    category: "Styling",
    create: () => new VisualStylist(),
  },

  // ── Lovable Pipeline ──
  ProductArchitect: {
    config: new ProductArchitect().config,
    pipeline: "lovable",
    category: "Architectuur",
    create: () => new ProductArchitect(),
  },
  UIPromptEngineer: {
    config: new UIPromptEngineer().config,
    pipeline: "lovable",
    category: "Frontend",
    create: () => new UIPromptEngineer(),
  },
  IterativeDebugger: {
    config: new IterativeDebugger().config,
    pipeline: "lovable",
    category: "Kwaliteit",
    create: () => new IterativeDebugger(),
  },
};

/**
 * Alle geregistreerde workflows.
 */
export const WORKFLOW_REGISTRY: Record<string, WorkflowDefinition> = {
  "figma-design-pipeline": FIGMA_WORKFLOW_DEFINITION,
  "lovable-build-pipeline": LOVABLE_WORKFLOW_DEFINITION,
};

// ── Helper functies ──────────────────────────────────────────

/**
 * Haal alle agents op voor een specifieke pipeline.
 */
export function getAgentsByPipeline(pipeline: "figma" | "lovable"): RegisteredAgent[] {
  return Object.values(AGENT_REGISTRY).filter((a) => a.pipeline === pipeline);
}

/**
 * Haal een agent op bij naam.
 */
export function getAgent(name: string): RegisteredAgent | undefined {
  return AGENT_REGISTRY[name];
}

/**
 * Haal een workflow op bij ID.
 */
export function getWorkflow(id: string): WorkflowDefinition | undefined {
  return WORKFLOW_REGISTRY[id];
}

/**
 * Toon een overzicht van alle agents en hun capabilities.
 */
export function getAgentOverview(): Array<{
  name: string;
  pipeline: string;
  role: string;
  description: string;
  capabilities: string[];
  dependsOn: string[];
  requiresReview: boolean;
}> {
  return Object.entries(AGENT_REGISTRY).map(([name, agent]) => ({
    name,
    pipeline: agent.pipeline,
    role: agent.config.role,
    description: agent.config.description,
    capabilities: agent.config.capabilities,
    dependsOn: agent.config.dependsOn,
    requiresReview: agent.config.requiresReview,
  }));
}
