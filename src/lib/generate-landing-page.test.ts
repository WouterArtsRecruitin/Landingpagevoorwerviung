import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock supabase before importing
vi.mock("./supabase", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          maybeSingle: vi.fn(() => Promise.resolve({ data: null })),
        })),
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() =>
            Promise.resolve({ data: { id: "test-id" }, error: null })
          ),
        })),
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ error: null })),
      })),
    })),
  },
}));

import type { IntakeFormData } from "@/types/admin";

const VALID_FORM: IntakeFormData = {
  company_name: "Test BV",
  company_website: "https://test.nl",
  company_logo_url: "",
  company_logo_file: null,
  company_sector: "ICT & Telecom",
  primary_color: "#3B82F6",
  secondary_color: "#FFFFFF",
  template_style: "auto",
  image_style: "photos",
  calendly_url: "",
  job_title: "Software Developer",
  job_location: "Amsterdam",
  salary_min: 3500,
  salary_max: 5000,
  employment_type: "fulltime",
  job_description: "Werk aan coole projecten",
  vacancy_text_url: "",
  vacancy_text_file: null,
  responsibilities: ["Coderen", "Testen", "Deployen"],
  requirements_must: ["3 jaar ervaring", "TypeScript"],
  requirements_nice: ["React", "Node.js"],
  benefits: ["Laptop", "Pensioen", "Thuiswerken"],
  contact_name: "Jan de Vries",
  contact_role: "Recruiter",
  contact_email: "jan@test.nl",
  contact_phone: "0612345678",
  contact_whatsapp: "31612345678",
  ga4_measurement_id: "",
  created_by: "jan@test.nl",
};

describe("IntakeFormData validation", () => {
  it("has all required fields defined", () => {
    expect(VALID_FORM.company_name).toBeTruthy();
    expect(VALID_FORM.job_title).toBeTruthy();
    expect(VALID_FORM.job_location).toBeTruthy();
    expect(VALID_FORM.contact_email).toBeTruthy();
    expect(VALID_FORM.employment_type).toBeTruthy();
  });

  it("has valid salary range", () => {
    expect(VALID_FORM.salary_min).toBeLessThan(VALID_FORM.salary_max!);
    expect(VALID_FORM.salary_min).toBeGreaterThan(0);
  });

  it("has non-empty arrays for key fields", () => {
    expect(VALID_FORM.responsibilities.length).toBeGreaterThan(0);
    expect(VALID_FORM.requirements_must.length).toBeGreaterThan(0);
    expect(VALID_FORM.benefits.length).toBeGreaterThan(0);
  });

  it("has valid employment type", () => {
    const validTypes = ["fulltime", "parttime", "flex", "interim", "stage"];
    expect(validTypes).toContain(VALID_FORM.employment_type);
  });

  it("has valid email format", () => {
    expect(VALID_FORM.contact_email).toMatch(/@/);
  });
});

describe("generateLandingPageClientSide", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("module exports the function", async () => {
    const mod = await import("./generate-landing-page");
    expect(typeof mod.generateLandingPageClientSide).toBe("function");
  });
});
