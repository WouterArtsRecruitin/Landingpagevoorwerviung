import { SECTION_IDS } from "@/constants";

/**
 * Scroll smooth naar het sollicitatieformulier
 */
export function scrollToApplicationForm(): void {
  document
    .getElementById(SECTION_IDS.APPLICATION_FORM)
    ?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Scroll smooth naar een sectie op basis van ID
 */
export function scrollToSection(sectionId: string): void {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
}
