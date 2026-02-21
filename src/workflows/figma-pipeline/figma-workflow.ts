// ============================================================
// FIGMA PIPELINE – Workflow Orchestrator
// Coördineert de 3 Figma agents in volgorde:
// 1. Design Strategist → 2. Layout Architect → 3. Visual Stylist
// ============================================================

import type {
  WorkflowContext,
  WorkflowDefinition,
  WorkflowResult,
  AgentResult,
  UserFeedback,
} from "../../agents/shared/types";
import { DesignStrategist } from "../../agents/figma/design-strategist";
import { LayoutArchitect } from "../../agents/figma/layout-architect";
import { VisualStylist } from "../../agents/figma/visual-stylist";

// ── Workflow definitie ───────────────────────────────────────

export const FIGMA_WORKFLOW_DEFINITION: WorkflowDefinition = {
  id: "figma-design-pipeline",
  name: "Figma Design Pipeline",
  description:
    "Volledige Figma design workflow: van briefing naar high-fidelity design via MCP. " +
    "Stap 1: Strategie & architectuur → Stap 2: Layout & wireframes → Stap 3: Visuele verfijning.",
  steps: [
    {
      agentName: "DesignStrategist",
      order: 1,
      parallel: false,
    },
    {
      agentName: "LayoutArchitect",
      order: 2,
      parallel: false,
    },
    {
      agentName: "VisualStylist",
      order: 3,
      parallel: false,
    },
  ],
};

// ── Orchestrator ─────────────────────────────────────────────

export class FigmaWorkflowOrchestrator {
  private designStrategist = new DesignStrategist();
  private layoutArchitect = new LayoutArchitect();
  private visualStylist = new VisualStylist();

  private onStepComplete?: (agentName: string, result: AgentResult) => void;
  private onReviewNeeded?: (agentName: string, result: AgentResult) => Promise<UserFeedback>;

  /**
   * Registreer een callback voor wanneer een stap klaar is.
   */
  onStep(callback: (agentName: string, result: AgentResult) => void): this {
    this.onStepComplete = callback;
    return this;
  }

  /**
   * Registreer een callback voor wanneer review nodig is.
   */
  onReview(
    callback: (agentName: string, result: AgentResult) => Promise<UserFeedback>
  ): this {
    this.onReviewNeeded = callback;
    return this;
  }

  /**
   * Voer de volledige Figma workflow uit.
   */
  async execute(ctx: WorkflowContext): Promise<WorkflowResult> {
    const startedAt = new Date().toISOString();
    console.log("[FigmaWorkflow] Start Figma Design Pipeline...");

    try {
      // ── Stap 1: Design Strategist ──────────────────────────
      console.log("[FigmaWorkflow] Stap 1/3: Design Strategist...");
      ctx.stepStatuses["DesignStrategist"] = "running";

      const strategyResult = await this.designStrategist.execute(ctx);
      ctx.agentResults["DesignStrategist"] = strategyResult;
      ctx.stepStatuses["DesignStrategist"] = strategyResult.success
        ? "completed"
        : "failed";

      this.onStepComplete?.("DesignStrategist", strategyResult);

      if (!strategyResult.success) {
        return this.createFailedResult(ctx, startedAt, "DesignStrategist", strategyResult.errors);
      }

      // ── Stap 2: Layout Architect ───────────────────────────
      console.log("[FigmaWorkflow] Stap 2/3: Layout Architect...");
      ctx.stepStatuses["LayoutArchitect"] = "running";

      const layoutResult = await this.layoutArchitect.execute(ctx);
      ctx.agentResults["LayoutArchitect"] = layoutResult;
      ctx.stepStatuses["LayoutArchitect"] = layoutResult.success
        ? "completed"
        : "failed";

      this.onStepComplete?.("LayoutArchitect", layoutResult);

      if (!layoutResult.success) {
        return this.createFailedResult(ctx, startedAt, "LayoutArchitect", layoutResult.errors);
      }

      // Review stap voor Layout Architect
      if (this.layoutArchitect.config.requiresReview && this.onReviewNeeded) {
        console.log("[FigmaWorkflow] Review nodig voor Layout Architect...");
        ctx.stepStatuses["LayoutArchitect"] = "needs_review";
        const feedback = await this.onReviewNeeded("LayoutArchitect", layoutResult);
        ctx.userFeedback.push(feedback);

        if (!feedback.approved) {
          console.log("[FigmaWorkflow] Layout afgekeurd, aanpassingen nodig...");
          // In productie: re-run met feedback
        }
      }

      // ── Stap 3: Visual Stylist ─────────────────────────────
      console.log("[FigmaWorkflow] Stap 3/3: Visual Stylist...");
      ctx.stepStatuses["VisualStylist"] = "running";

      const styleResult = await this.visualStylist.execute(ctx);
      ctx.agentResults["VisualStylist"] = styleResult;
      ctx.stepStatuses["VisualStylist"] = styleResult.success
        ? "completed"
        : "failed";

      this.onStepComplete?.("VisualStylist", styleResult);

      if (!styleResult.success) {
        return this.createFailedResult(ctx, startedAt, "VisualStylist", styleResult.errors);
      }

      // Review stap voor Visual Stylist
      if (this.visualStylist.config.requiresReview && this.onReviewNeeded) {
        console.log("[FigmaWorkflow] Review nodig voor Visual Stylist...");
        ctx.stepStatuses["VisualStylist"] = "needs_review";
        const feedback = await this.onReviewNeeded("VisualStylist", styleResult);
        ctx.userFeedback.push(feedback);
      }

      // ── Succes ──────────────────────────────────────────────
      console.log("[FigmaWorkflow] Figma Design Pipeline succesvol afgerond!");

      return {
        runId: ctx.runId,
        workflowId: FIGMA_WORKFLOW_DEFINITION.id,
        status: "completed",
        startedAt,
        completedAt: new Date().toISOString(),
        context: ctx,
        summary: this.generateSummary(ctx),
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[FigmaWorkflow] Onverwachte fout: ${message}`);

      return {
        runId: ctx.runId,
        workflowId: FIGMA_WORKFLOW_DEFINITION.id,
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
      workflowId: FIGMA_WORKFLOW_DEFINITION.id,
      status: "failed",
      startedAt,
      completedAt: new Date().toISOString(),
      context: ctx,
      summary: `Workflow mislukt bij ${failedAgent}: ${errors.join(", ")}`,
    };
  }

  private generateSummary(ctx: WorkflowContext): string {
    const strategy = ctx.agentResults["DesignStrategist"];
    const layout = ctx.agentResults["LayoutArchitect"];
    const style = ctx.agentResults["VisualStylist"];

    return [
      "Figma Design Pipeline – Voltooid",
      "",
      `Strategist: ${strategy?.success ? "OK" : "MISLUKT"}`,
      `Layout: ${layout?.success ? "OK" : "MISLUKT"}`,
      `Stylist: ${style?.success ? "OK" : "MISLUKT"}`,
      "",
      `Reviews: ${ctx.userFeedback.length}`,
      `Warnings: ${[
        ...(strategy?.warnings || []),
        ...(layout?.warnings || []),
        ...(style?.warnings || []),
      ].length}`,
    ].join("\n");
  }
}
