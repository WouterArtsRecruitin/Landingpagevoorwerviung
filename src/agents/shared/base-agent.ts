// ============================================================
// BASE AGENT – Abstracte basisklasse voor alle agents
// Biedt logging, retry-logica en standaard validatie
// ============================================================

import type {
  Agent,
  AgentConfig,
  AgentResult,
  WorkflowContext,
} from "./types";

/**
 * Abstracte basisklasse waar alle specifieke agents van erven.
 * Biedt:
 * - Standaard logging
 * - Retry-logica met exponential backoff
 * - Dependency checking
 * - Result formatting
 */
export abstract class BaseAgent<TOutput = unknown>
  implements Agent<WorkflowContext, TOutput>
{
  abstract config: AgentConfig;

  /**
   * De core logica van de agent. Wordt door subklassen geïmplementeerd.
   */
  protected abstract process(
    ctx: WorkflowContext
  ): Promise<TOutput>;

  /**
   * Valideer de input context. Subklassen kunnen dit overriden.
   */
  validate(ctx: WorkflowContext): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check of alle dependencies klaar zijn
    for (const dep of this.config.dependsOn) {
      const depStatus = ctx.stepStatuses[dep];
      if (depStatus !== "completed") {
        errors.push(
          `Dependency "${dep}" is niet klaar (status: ${depStatus || "niet gevonden"})`
        );
      }
    }

    // Check of intake data aanwezig is
    if (!ctx.intakeData) {
      errors.push("Geen intake data gevonden in workflow context");
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Uitvoeren van de agent met retry-logica en result formatting.
   */
  async execute(ctx: WorkflowContext): Promise<AgentResult<TOutput>> {
    const validation = this.validate(ctx);
    if (!validation.valid) {
      return this.createResult(null as unknown as TOutput, validation.errors, []);
    }

    let lastError: string = "";

    for (let attempt = 1; attempt <= this.config.maxRetries; attempt++) {
      try {
        this.log(`Poging ${attempt}/${this.config.maxRetries}...`);
        const data = await this.process(ctx);
        this.log("Succesvol afgerond.");
        return this.createResult(data, [], []);
      } catch (err: unknown) {
        lastError = err instanceof Error ? err.message : String(err);
        this.log(`Poging ${attempt} mislukt: ${lastError}`);

        if (attempt < this.config.maxRetries) {
          const delay = Math.pow(2, attempt) * 500;
          await this.sleep(delay);
        }
      }
    }

    return this.createResult(
      null as unknown as TOutput,
      [`Alle ${this.config.maxRetries} pogingen mislukt. Laatste fout: ${lastError}`],
      []
    );
  }

  /**
   * Creëer een gestandaardiseerd resultaat-object.
   */
  protected createResult(
    data: TOutput,
    errors: string[],
    warnings: string[]
  ): AgentResult<TOutput> {
    return {
      success: errors.length === 0,
      agentName: this.config.name,
      timestamp: new Date().toISOString(),
      data,
      errors,
      warnings,
    };
  }

  protected log(message: string): void {
    console.log(`[${this.config.name}] ${message}`);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
