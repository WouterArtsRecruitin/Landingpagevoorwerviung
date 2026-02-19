import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import type { SectionType } from "@/types/landing-page";

interface EditableSection {
  id: string;
  type: SectionType;
  order: number;
  visible: boolean;
  data: Record<string, unknown>;
}

interface PageData {
  id: string;
  slug: string;
  page_title: string;
  meta_description: string;
  sections: EditableSection[];
  theme: Record<string, unknown>;
  status: string;
}

const SECTION_LABELS: Partial<Record<SectionType, string>> = {
  hero: "Hero",
  hero_modern: "Hero (Modern)",
  hero_dynamic: "Hero (Dynamic)",
  hero_corporate: "Hero (Corporate)",
  job_details: "Functieomschrijving",
  benefits: "Arbeidsvoorwaarden",
  salary_breakdown: "Salaris overzicht",
  requirements: "Functie-eisen",
  testimonials: "Testimonials",
  faq: "Veelgestelde vragen",
  application_form: "Sollicitatieformulier",
  final_cta: "Call to Action",
  about_company: "Over het bedrijf",
  why_join_us: "Waarom bij ons?",
  work_gallery: "Foto galerij",
  trust_signals: "Vertrouwenssignalen",
  day_in_life: "Een dag uit het leven",
  team_culture: "Team & cultuur",
  tech_showcase: "Tech showcase",
  custom_html: "Custom HTML",
  video_embed: "Video",
  hidden_gem: "Hidden gem",
  recruitment_approach: "Recruitment aanpak",
};

export default function PageEditorPage() {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    loadPage();
  }, [pageId]);

  async function loadPage() {
    if (!pageId) return;

    const { data, error } = await supabase
      .from("landing_pages")
      .select("id, slug, page_title, meta_description, sections, theme, status")
      .eq("id", pageId)
      .single();

    if (error || !data) {
      navigate("/admin/paginas");
      return;
    }

    setPage(data as PageData);
    setLoading(false);
  }

  const handleSave = useCallback(async () => {
    if (!page) return;
    setSaving(true);

    const { error } = await supabase
      .from("landing_pages")
      .update({
        page_title: page.page_title,
        meta_description: page.meta_description,
        sections: page.sections,
        theme: page.theme,
        updated_at: new Date().toISOString(),
      })
      .eq("id", page.id);

    setSaving(false);

    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }, [page]);

  function updatePageField(field: keyof PageData, value: unknown) {
    setPage((prev) => prev ? { ...prev, [field]: value } : null);
  }

  function updateSection(sectionId: string, updates: Partial<EditableSection>) {
    if (!page) return;
    const newSections = page.sections.map((s) =>
      s.id === sectionId ? { ...s, ...updates } : s
    );
    updatePageField("sections", newSections);
  }

  function updateSectionData(sectionId: string, key: string, value: unknown) {
    if (!page) return;
    const newSections = page.sections.map((s) =>
      s.id === sectionId ? { ...s, data: { ...s.data, [key]: value } } : s
    );
    updatePageField("sections", newSections);
  }

  function moveSection(sectionId: string, direction: "up" | "down") {
    if (!page) return;
    const sorted = [...page.sections].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((s) => s.id === sectionId);
    if (idx < 0) return;

    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;

    const tempOrder = sorted[idx].order;
    sorted[idx] = { ...sorted[idx], order: sorted[swapIdx].order };
    sorted[swapIdx] = { ...sorted[swapIdx], order: tempOrder };

    updatePageField("sections", sorted);
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-64" />
        <div className="h-4 bg-gray-200 rounded w-96" />
        <div className="space-y-3 mt-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg border p-4">
              <div className="h-4 bg-gray-200 rounded w-48 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-32" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!page) return null;

  const sortedSections = [...page.sections].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate("/admin/paginas")}
            className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block"
          >
            &larr; Terug naar pagina's
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Pagina bewerken</h2>
          <p className="text-sm text-gray-500 mt-1">
            /v/{page.slug}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`/v/${page.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
          >
            Preview
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50"
          >
            {saving ? "Opslaan..." : saved ? "Opgeslagen!" : "Opslaan"}
          </button>
        </div>
      </div>

      {/* Meta fields */}
      <div className="bg-white rounded-lg border p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Pagina informatie</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Paginatitel</label>
          <input
            type="text"
            value={page.page_title}
            onChange={(e) => updatePageField("page_title", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meta beschrijving</label>
          <textarea
            value={page.meta_description}
            onChange={(e) => updatePageField("meta_description", e.target.value)}
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          />
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Secties</h3>
        <p className="text-sm text-gray-500">
          Klik op een sectie om de inhoud te bewerken. Gebruik de pijlen om secties te herordenen.
        </p>

        {sortedSections.map((section, idx) => (
          <div
            key={section.id}
            className={`bg-white rounded-lg border transition-all ${
              activeSection === section.id ? "border-blue-500 ring-1 ring-blue-500" : "border-gray-200"
            } ${!section.visible ? "opacity-50" : ""}`}
          >
            {/* Section header */}
            <div
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() =>
                setActiveSection(activeSection === section.id ? null : section.id)
              }
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-gray-400 w-6 text-center">
                  {idx + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {SECTION_LABELS[section.type] || section.type}
                  </p>
                  <p className="text-xs text-gray-500">{section.type}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Move buttons */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveSection(section.id, "up");
                  }}
                  disabled={idx === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  title="Omhoog"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveSection(section.id, "down");
                  }}
                  disabled={idx === sortedSections.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  title="Omlaag"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Visibility toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateSection(section.id, { visible: !section.visible });
                  }}
                  className={`p-1 rounded ${
                    section.visible ? "text-green-600" : "text-gray-400"
                  }`}
                  title={section.visible ? "Verbergen" : "Tonen"}
                >
                  {section.visible ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>

                {/* Expand indicator */}
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    activeSection === section.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Section editor (expanded) */}
            {activeSection === section.id && (
              <div className="border-t border-gray-200 p-4 space-y-3">
                <SectionDataEditor
                  section={section}
                  onUpdateData={(key, value) => updateSectionData(section.id, key, value)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionDataEditor({
  section,
  onUpdateData,
}: {
  section: EditableSection;
  onUpdateData: (key: string, value: unknown) => void;
}) {
  const data = section.data;

  // Render editable fields based on common patterns in section data
  const editableFields = Object.entries(data).filter(
    ([, value]) => typeof value === "string" || typeof value === "number"
  );

  const listFields = Object.entries(data).filter(
    ([, value]) => Array.isArray(value)
  );

  if (editableFields.length === 0 && listFields.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        Geen bewerkbare velden voor deze sectie.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {/* Text/number fields */}
      {editableFields.map(([key, value]) => (
        <div key={key}>
          <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">
            {formatFieldLabel(key)}
          </label>
          {typeof value === "string" && value.length > 80 ? (
            <textarea
              value={value as string}
              onChange={(e) => onUpdateData(key, e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
          ) : (
            <input
              type={typeof value === "number" ? "number" : "text"}
              value={value as string | number}
              onChange={(e) =>
                onUpdateData(
                  key,
                  typeof value === "number"
                    ? Number(e.target.value)
                    : e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          )}
        </div>
      ))}

      {/* Array fields */}
      {listFields.map(([key, value]) => (
        <div key={key}>
          <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">
            {formatFieldLabel(key)} ({(value as unknown[]).length} items)
          </label>
          <ArrayFieldEditor
            items={value as Record<string, unknown>[]}
            onChange={(items) => onUpdateData(key, items)}
          />
        </div>
      ))}
    </div>
  );
}

function ArrayFieldEditor({
  items,
  onChange,
}: {
  items: Record<string, unknown>[];
  onChange: (items: Record<string, unknown>[]) => void;
}) {
  if (items.length === 0) return null;

  // Get editable string fields from the first item
  const sampleItem = items[0];
  if (typeof sampleItem !== "object" || sampleItem === null) return null;

  const editableKeys = Object.keys(sampleItem).filter(
    (k) => typeof sampleItem[k] === "string"
  );

  if (editableKeys.length === 0) return null;

  function updateItem(index: number, key: string, value: string) {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    onChange(newItems);
  }

  return (
    <div className="space-y-2 ml-2 border-l-2 border-gray-100 pl-3">
      {items.map((item, idx) => (
        <div key={idx} className="space-y-1">
          {editableKeys.map((key) => (
            <input
              key={`${idx}-${key}`}
              type="text"
              value={(item[key] as string) || ""}
              onChange={(e) => updateItem(idx, key, e.target.value)}
              placeholder={formatFieldLabel(key)}
              className="w-full border border-gray-200 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          ))}
          {idx < items.length - 1 && <div className="border-b border-gray-100" />}
        </div>
      ))}
    </div>
  );
}

function formatFieldLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();
}
