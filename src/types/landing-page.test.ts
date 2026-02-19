import { describe, it, expect } from "vitest";
import type {
  SectionType,
  SectionConfig,
  LandingPageConfig,
  ThemeConfig,
  FormFieldConfig,
} from "./landing-page";

describe("Landing Page Types", () => {
  it("validates SectionConfig structure", () => {
    const section: SectionConfig = {
      id: "hero-1",
      type: "hero_modern",
      order: 0,
      visible: true,
      data: { headline: "Test Headline" },
    };

    expect(section.id).toBe("hero-1");
    expect(section.type).toBe("hero_modern");
    expect(section.order).toBe(0);
    expect(section.visible).toBe(true);
    expect(section.data).toHaveProperty("headline");
  });

  it("validates ThemeConfig structure", () => {
    const theme: ThemeConfig = {
      colors: {
        primary: "#3B82F6",
        secondary: "#2563EB",
        accent: "#60A5FA",
        background: "#FFFFFF",
        foreground: "#0F172A",
        muted: "#F8FAFC",
        mutedForeground: "#64748B",
      },
      fonts: { heading: "Inter", body: "Inter" },
      borderRadius: "1rem",
      logoUrl: "https://example.com/logo.png",
      logoAlt: "Test Company",
    };

    expect(theme.colors.primary).toBe("#3B82F6");
    expect(theme.fonts.heading).toBe("Inter");
    expect(theme.borderRadius).toBe("1rem");
  });

  it("validates FormFieldConfig structure", () => {
    const field: FormFieldConfig = {
      name: "email",
      label: "E-mailadres",
      type: "email",
      placeholder: "test@example.com",
      required: true,
    };

    expect(field.name).toBe("email");
    expect(field.type).toBe("email");
    expect(field.required).toBe(true);
  });

  it("validates all section types exist", () => {
    const expectedTypes: SectionType[] = [
      "hero",
      "hero_modern",
      "hero_dynamic",
      "hero_corporate",
      "job_details",
      "benefits",
      "salary_breakdown",
      "tech_showcase",
      "day_in_life",
      "testimonials",
      "why_join_us",
      "requirements",
      "team_culture",
      "work_gallery",
      "trust_signals",
      "faq",
      "application_form",
      "final_cta",
      "about_company",
      "hidden_gem",
      "recruitment_approach",
      "custom_html",
      "video_embed",
    ];

    // Verify each type can be assigned
    expectedTypes.forEach((type) => {
      const section: SectionConfig = {
        id: "test",
        type,
        order: 0,
        visible: true,
        data: {},
      };
      expect(section.type).toBe(type);
    });

    expect(expectedTypes.length).toBe(23);
  });

  it("validates LandingPageConfig can be constructed", () => {
    const config: Partial<LandingPageConfig> = {
      id: "test-id",
      slug: "test-slug",
      status: "draft",
      pageTitle: "Test Page",
      sections: [],
    };

    expect(config.status).toBe("draft");
    expect(config.sections).toEqual([]);
  });

  it("validates page statuses", () => {
    const statuses: LandingPageConfig["status"][] = [
      "draft",
      "published",
      "paused",
      "archived",
    ];

    expect(statuses).toHaveLength(4);
    statuses.forEach((status) => {
      expect(typeof status).toBe("string");
    });
  });
});
