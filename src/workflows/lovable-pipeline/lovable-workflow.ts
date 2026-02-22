// ============================================================
// LOVABLE PIPELINE – Workflow Orchestrator
// Coördineert de 3 Lovable agents in volgorde:
// 1. Product Architect → 2. UI/UX Prompt Engineer → 3. Iterative Debugger
// Met een refinement loop (Debugger → Prompt Engineer)
// ============================================================

import type {
  WorkflowContext,
  WorkflowDefinition,
  WorkflowResult,
  AgentResult,
  UserFeedback,
} from "../../agents/shared/types";
import { ProductArchitect } from "../../agents/lovable/product-architect";
import { UIPromptEngineer } from "../../agents/lovable/ui-prompt-engineer";
import { IterativeDebugger } from "../../agents/lovable/iterative-debugger";

// ── Workflow definitie ───────────────────────────────────────

export const LOVABLE_WORKFLOW_DEFINITION: WorkflowDefinition = {
  id: "lovable-build-pipeline",
  name: "Lovable Build Pipeline",
  description:
    "Volledige Lovable build workflow: van briefing naar werkende app. " +
    "Stap 1: Blueprint (database + features) → Stap 2: Initial Build (UI prompts) → " +
    "Stap 3: Refinement Loop (debug + fix prompts).",
  steps: [
    {
      agentName: "ProductArchitect",
      order: 1,
      parallel: false,
    },
    {
      agentName: "UIPromptEngineer",
      order: 2,
      parallel: false,
    },
    {
      agentName: "IterativeDebugger",
      order: 3,
      parallel: false,
    },
  ],
};

// ── Orchestrator ─────────────────────────────────────────────

export class LovableWorkflowOrchestrator {
  private productArchitect = new ProductArchitect();
  private uiPromptEngineer = new UIPromptEngineer();
  private iterativeDebugger = new IterativeDebugger();

  private onStepComplete?: (agentName: string, result: AgentResult) => void;
  private onReviewNeeded?: (agentName: string, result: AgentResult) => Promise<UserFeedback>;
  private onFixPromptReady?: (prompt: string) => Promise<void>;

  /** Maximaal aantal refinement iterations */
  private maxRefinementIterations = 3;

  onStep(callback: (agentName: string, result: AgentResult) => void): this {
    this.onStepComplete = callback;
    return this;
  }

  onReview(
    callback: (agentName: string, result: AgentResult) => Promise<UserFeedback>
  ): this {
    this.onReviewNeeded = callback;
    return this;
  }

  /**
   * Registreer callback wanneer een fix-prompt klaar is om naar Lovable gestuurd te worden.
   */
  onFixPrompt(callback: (prompt: string) => Promise<void>): this {
    this.onFixPromptReady = callback;
    return this;
  }

  /**
   * Voer de volledige Lovable workflow uit.
   */
  async execute(ctx: WorkflowContext): Promise<WorkflowResult> {
    const startedAt = new Date().toISOString();
    console.log("[LovableWorkflow] Start Lovable Build Pipeline...");

    try {
      // ── Blueprint Fase: Product Architect ──────────────────
      console.log("[LovableWorkflow] Fase 1/3: Blueprint (Product Architect)...");
      ctx.stepStatuses["ProductArchitect"] = "running";

      const architectResult = await this.productArchitect.execute(ctx);
      ctx.agentResults["ProductArchitect"] = architectResult;
      ctx.stepStatuses["ProductArchitect"] = architectResult.success
        ? "completed"
        : "failed";

      this.onStepComplete?.("ProductArchitect", architectResult);

      if (!architectResult.success) {
        return this.createFailedResult(ctx, startedAt, "ProductArchitect", architectResult.errors);
      }

      // Review voor Product Architect
      if (this.productArchitect.config.requiresReview && this.onReviewNeeded) {
        console.log("[LovableWorkflow] Review nodig voor Product Architect...");
        ctx.stepStatuses["ProductArchitect"] = "needs_review";
        const feedback = await this.onReviewNeeded("ProductArchitect", architectResult);
        ctx.userFeedback.push(feedback);

        if (!feedback.approved) {
          console.log("[LovableWorkflow] Blueprint afgekeurd, aanpassingen nodig...");
        }
      }

      // ── Initial Build: UI/UX Prompt Engineer ───────────────
      console.log("[LovableWorkflow] Fase 2/3: Initial Build (UI/UX Prompt Engineer)...");
      ctx.stepStatuses["UIPromptEngineer"] = "running";

      const uiResult = await this.uiPromptEngineer.execute(ctx);
      ctx.agentResults["UIPromptEngineer"] = uiResult;
      ctx.stepStatuses["UIPromptEngineer"] = uiResult.success
        ? "completed"
        : "failed";

      this.onStepComplete?.("UIPromptEngineer", uiResult);

      if (!uiResult.success) {
        return this.createFailedResult(ctx, startedAt, "UIPromptEngineer", uiResult.errors);
      }

      // ── Refinement Loop: Debugger ──────────────────────────
      console.log("[LovableWorkflow] Fase 3/3: Refinement Loop (Iterative Debugger)...");

      let iteration = 0;
      let deploymentReady = false;

      while (iteration < this.maxRefinementIterations && !deploymentReady) {
        iteration++;
        console.log(`[LovableWorkflow] Refinement iteratie ${iteration}/${this.maxRefinementIterations}...`);

        ctx.stepStatuses["IterativeDebugger"] = "running";

        const debugResult = await this.iterativeDebugger.execute(ctx);
        ctx.agentResults["IterativeDebugger"] = debugResult;
        ctx.stepStatuses["IterativeDebugger"] = debugResult.success
          ? "completed"
          : "failed";

        this.onStepComplete?.("IterativeDebugger", debugResult);

        if (!debugResult.success) {
          return this.createFailedResult(ctx, startedAt, "IterativeDebugger", debugResult.errors);
        }

        // Check deployment readiness
        const debugData = debugResult.data as { deploymentReady: boolean; fixPrompts: Array<{ prompt: string }> };
        deploymentReady = debugData.deploymentReady;

        if (!deploymentReady && debugData.fixPrompts.length > 0) {
          // Stuur fix-prompts naar Lovable
          console.log(`[LovableWorkflow] ${debugData.fixPrompts.length} fix-prompts gevonden, doorsturen...`);

          for (const fix of debugData.fixPrompts) {
            if (this.onFixPromptReady) {
              await this.onFixPromptReady(fix.prompt);
            }
          }

          // Metadata bijwerken
          ctx.metadata[`refinement_iteration_${iteration}`] = {
            fixCount: debugData.fixPrompts.length,
            timestamp: new Date().toISOString(),
          };
        }

        // Review stap
        if (this.iterativeDebugger.config.requiresReview && this.onReviewNeeded) {
          ctx.stepStatuses["IterativeDebugger"] = "needs_review";
          const feedback = await this.onReviewNeeded("IterativeDebugger", debugResult);
          ctx.userFeedback.push(feedback);

          if (feedback.approved) {
            deploymentReady = true;
          }
        }
      }

      // ── Resultaat ──────────────────────────────────────────
      const finalStatus = deploymentReady ? "completed" : "needs_review";

      console.log(
        `[LovableWorkflow] Lovable Build Pipeline ${finalStatus} na ${iteration} iteratie(s).`
      );

      return {
        runId: ctx.runId,
        workflowId: LOVABLE_WORKFLOW_DEFINITION.id,
        status: finalStatus,
        startedAt,
        completedAt: new Date().toISOString(),
        context: ctx,
        summary: this.generateSummary(ctx, iteration, deploymentReady),
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[LovableWorkflow] Onverwachte fout: ${message}`);

      return {
        runId: ctx.runId,
        workflowId: LOVABLE_WORKFLOW_DEFINITION.id,
        status: "failed",
        startedAt,
        completedAt: new Date().toISOString(),
        context: ctx,
        summary: `Workflow mislukt: ${message}`,
      };
    }
  }

  private createFailedResult(
    ctx: WorkflowContext,
    startedAt: string,
    failedAgent: string,
    errors: string[]
  ): WorkflowResult {
    return {
      runId: ctx.runId,
      workflowId: LOVABLE_WORKFLOW_DEFINITION.id,
      status: "failed",
      startedAt,
      completedAt: new Date().toISOString(),
      context: ctx,
      summary: `Workflow mislukt bij ${failedAgent}: ${errors.join(", ")}`,
    };
  }

  private generateSummary(
    ctx: WorkflowContext,
    iterations: number,
    deploymentReady: boolean
  ): string {
    const architect = ctx.agentResults["ProductArchitect"];
    const ui = ctx.agentResults["UIPromptEngineer"];
    const debugger_ = ctx.agentResults["IterativeDebugger"];

    return [
      "Lovable Build Pipeline – " + (deploymentReady ? "Klaar voor Deployment" : "Review Nodig"),
      "",
      `Product Architect: ${architect?.success ? "OK" : "MISLUKT"}`,
      `UI/UX Prompt Engineer: ${ui?.success ? "OK" : "MISLUKT"}`,
      `Iterative Debugger: ${debugger_?.success ? "OK" : "MISLUKT"}`,
      "",
      `Refinement iteraties: ${iterations}`,
      `Deployment ready: ${deploymentReady ? "JA" : "NEE"}`,
      `Reviews: ${ctx.userFeedback.length}`,
    ].join("\n");
  }
}
