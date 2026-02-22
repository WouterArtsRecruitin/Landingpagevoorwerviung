// ============================================================
// WORKFLOW RUNNER
// Hoofd entry-point om workflows te starten vanuit intake data
// Verbindt het intake formulier met de Figma en Lovable pipelines
// ============================================================

import type { IntakeFormData } from "@/types/admin";
import type { WorkflowResult, AgentResult, UserFeedback } from "../../agents/shared/types";
import { createWorkflowContext, validateIntakeForWorkflow } from "./intake-to-briefing";
import { FigmaWorkflowOrchestrator } from "../figma-pipeline/figma-workflow";
import { LovableWorkflowOrchestrator } from "../lovable-pipeline/lovable-workflow";

// ── Types ────────────────────────────────────────────────────

export type WorkflowType = "figma" | "lovable" | "both";

export interface WorkflowRunnerOptions {
  /** Welke workflow(s) draaien */
  workflowType: WorkflowType;
  /** Callback wanneer een agent klaar is */
  onStepComplete?: (agentName: string, result: AgentResult) => void;
  /** Callback wanneer review nodig is */
  onReviewNeeded?: (agentName: string, result: AgentResult) => Promise<UserFeedback>;
  /** Callback wanneer een fix-prompt klaar is (Lovable pipeline) */
  onFixPrompt?: (prompt: string) => Promise<void>;
  /** Callback voor voortgang */
  onProgress?: (message: string, percentage: number) => void;
}

export interface WorkflowRunnerResult {
  success: boolean;
  figmaResult?: WorkflowResult;
  lovableResult?: WorkflowResult;
  errors: string[];
  warnings: string[];
}

// ── Runner ───────────────────────────────────────────────────

/**
 * Start een of meerdere agent-workflows vanuit intake formulier data.
 *
 * Gebruik:
 * ```ts
 * const result = await runWorkflow(intakeFormData, {
 *   workflowType: "lovable",
 *   onStepComplete: (agent, result) => console.log(`${agent} klaar`),
 *   onProgress: (msg, pct) => setProgress({ message: msg, percentage: pct }),
 * });
 * ```
 */
export async function runWorkflow(
  formData: IntakeFormData,
  options: WorkflowRunnerOptions
): Promise<WorkflowRunnerResult> {
  const { workflowType, onStepComplete, onReviewNeeded, onFixPrompt, onProgress } = options;

  // 1. Valideer intake data
  onProgress?.("Intake data valideren...", 5);
  const validation = validateIntakeForWorkflow(formData);

  if (!validation.valid) {
    return {
      success: false,
      errors: validation.errors,
      warnings: validation.warnings,
    };
  }

  // 2. Maak workflow context
  onProgress?.("Workflow context aanmaken...", 10);
  const ctx = createWorkflowContext(formData);

  const result: WorkflowRunnerResult = {
    success: true,
    errors: [],
    warnings: validation.warnings,
  };

  // 3. Draai Figma pipeline
  if (workflowType === "figma" || workflowType === "both") {
    onProgress?.("Figma Design Pipeline starten...", 15);

    const figmaOrchestrator = new FigmaWorkflowOrchestrator();

    if (onStepComplete) figmaOrchestrator.onStep(onStepComplete);
    if (onReviewNeeded) figmaOrchestrator.onReview(onReviewNeeded);

    const figmaResult = await figmaOrchestrator.execute({ ...ctx });
    result.figmaResult = figmaResult;

    if (figmaResult.status === "failed") {
      result.success = false;
      result.errors.push(`Figma pipeline mislukt: ${figmaResult.summary}`);
    }

    onProgress?.("Figma Design Pipeline afgerond.", workflowType === "both" ? 50 : 95);
  }

  // 4. Draai Lovable pipeline
  if (workflowType === "lovable" || workflowType === "both") {
    onProgress?.("Lovable Build Pipeline starten...", workflowType === "both" ? 55 : 15);

    const lovableOrchestrator = new LovableWorkflowOrchestrator();

    if (onStepComplete) lovableOrchestrator.onStep(onStepComplete);
    if (onReviewNeeded) lovableOrchestrator.onReview(onReviewNeeded);
    if (onFixPrompt) lovableOrchestrator.onFixPrompt(onFixPrompt);

    // Als Figma resultaat beschikbaar is, voeg toe aan context
    const lovableCtx = { ...ctx };
    if (result.figmaResult?.context) {
      // Neem design tokens over van Figma pipeline
      lovableCtx.agentResults = {
        ...lovableCtx.agentResults,
        ...result.figmaResult.context.agentResults,
      };
      lovableCtx.metadata.figmaRunId = result.figmaResult.runId;
    }

    const lovableResult = await lovableOrchestrator.execute(lovableCtx);
    result.lovableResult = lovableResult;

    if (lovableResult.status === "failed") {
      result.success = false;
      result.errors.push(`Lovable pipeline mislukt: ${lovableResult.summary}`);
    }

    onProgress?.("Lovable Build Pipeline afgerond.", 95);
  }

  onProgress?.("Workflows afgerond!", 100);
  return result;
}
