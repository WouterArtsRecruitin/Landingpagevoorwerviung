import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { EMPLOYMENT_TYPES, SECTORS } from "@/types/admin";
import type { IntakeFormData } from "@/types/admin";

const STEPS = [
  { id: 1, label: "Bedrijf" },
  { id: 2, label: "Vacature" },
  { id: 3, label: "Details" },
  { id: 4, label: "Contact" },
  { id: 5, label: "Controleer" },
] as const;

/** Verplichte velden (need-to-have) */
const REQUIRED_FIELDS: Array<{
  key: keyof IntakeFormData;
  label: string;
  hint: string;
  step: number;
}> = [
  { key: "company_name", label: "Bedrijfsnaam", hint: "De officiële naam van het bedrijf", step: 1 },
  { key: "job_title", label: "Functietitel", hint: "Bijv. 'Servicemonteur', 'Accountmanager'", step: 2 },
  { key: "job_location", label: "Locatie", hint: "Bijv. 'Amsterdam', 'Regio Midden-Nederland'", step: 2 },
  { key: "contact_name", label: "Contactpersoon naam", hint: "Naam van de recruiter", step: 4 },
  { key: "contact_email", label: "Contactpersoon e-mail", hint: "E-mailadres voor kandidaatcontact", step: 4 },
];

/** Aanbevolen velden (nice-to-have) */
const RECOMMENDED_FIELDS: Array<{
  key: keyof IntakeFormData;
  label: string;
  hint: string;
  step: number;
  isArray?: boolean;
}> = [
  { key: "company_website", label: "Bedrijfswebsite", hint: "Voor branding & privacy policy link", step: 1 },
  { key: "company_sector", label: "Branche", hint: "Helpt bij het genereren van relevante content", step: 1 },
  { key: "salary_min", label: "Salaris minimum", hint: "Salaris transparantie verhoogt conversie met 44%", step: 2 },
  { key: "salary_max", label: "Salaris maximum", hint: "Geeft kandidaten duidelijkheid", step: 2 },
  { key: "job_description", label: "Functiebeschrijving", hint: "2-3 zinnen over de functie", step: 2 },
  { key: "responsibilities", label: "Verantwoordelijkheden", hint: "Wat gaat de kandidaat doen?", step: 3, isArray: true },
  { key: "requirements_must", label: "Eisen (must-have)", hint: "Minimale vereisten voor de functie", step: 3, isArray: true },
  { key: "benefits", label: "Arbeidsvoorwaarden", hint: "Wat bied je aan? (salaris, auto, opleiding etc.)", step: 3, isArray: true },
  { key: "contact_phone", label: "Telefoonnummer", hint: "Voor direct contact met kandidaten", step: 4 },
];

const EMPTY_FORM: IntakeFormData = {
  company_name: "",
  company_website: "",
  company_logo_url: "",
  company_sector: "",
  primary_color: "#003DA5",
  job_title: "",
  job_location: "",
  salary_min: null,
  salary_max: null,
  employment_type: "fulltime",
  job_description: "",
  responsibilities: [],
  requirements_must: [],
  requirements_nice: [],
  benefits: [],
  contact_name: "",
  contact_role: "",
  contact_email: "",
  contact_phone: "",
  contact_whatsapp: "",
  created_by: "",
};

export default function IntakeFormPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<IntakeFormData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ slug: string; url: string } | null>(null);
  const navigate = useNavigate();

  function updateField<K extends keyof IntakeFormData>(key: K, value: IntakeFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // Validatie
  function getMissingRequired() {
    return REQUIRED_FIELDS.filter((f) => {
      const val = form[f.key];
      return !val || (typeof val === "string" && val.trim() === "");
    });
  }

  function getMissingRecommended() {
    return RECOMMENDED_FIELDS.filter((f) => {
      const val = form[f.key];
      if (f.isArray) return !val || (val as string[]).length === 0;
      return !val || (typeof val === "string" && val.trim() === "");
    });
  }

  function isEmailValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function getValidationErrors(): string[] {
    const errors: string[] = [];
    if (form.contact_email && !isEmailValid(form.contact_email)) {
      errors.push("E-mailadres contactpersoon is ongeldig");
    }
    if (form.salary_min && form.salary_max && form.salary_min > form.salary_max) {
      errors.push("Salaris minimum mag niet hoger zijn dan maximum");
    }
    if (form.company_website && !form.company_website.startsWith("http")) {
      errors.push("Website moet beginnen met http:// of https://");
    }
    return errors;
  }

  const missingRequired = getMissingRequired();
  const missingRecommended = getMissingRecommended();
  const validationErrors = getValidationErrors();
  const canSubmit = missingRequired.length === 0 && validationErrors.length === 0;

  async function handleSubmit() {
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "generate-landing-page",
        { body: { ...form, created_by: form.contact_email } }
      );

      if (fnError || !data?.success) {
        setError(fnError?.message || data?.error || "Er ging iets mis");
        return;
      }

      setResult({ slug: data.slug, url: data.url });
    } catch {
      setError("Kan geen verbinding maken met de server");
    } finally {
      setSubmitting(false);
    }
  }

  // Succes scherm
  if (result) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pagina aangemaakt!</h2>
        <p className="text-gray-600 mb-6">
          Je vacaturepagina is aangemaakt als concept. Bekijk de preview en publiceer wanneer je klaar bent.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-500 mb-1">URL</p>
          <p className="text-sm font-mono text-gray-900">{result.url}</p>
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href={result.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
            Bekijk preview
          </a>
          <button onClick={() => navigate("/admin/paginas")} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm">
            Naar pagina's
          </button>
          <button onClick={() => { setResult(null); setForm(EMPTY_FORM); setStep(1); }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm">
            Nog een aanmaken
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Nieuwe vacaturepagina</h2>
      <p className="text-gray-600 mb-8">
        Vul de gegevens in en we genereren automatisch een professionele landingspagina.
      </p>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {STEPS.map((s) => (
          <button
            key={s.id}
            onClick={() => setStep(s.id)}
            className={`flex-1 text-center py-2 rounded-lg text-xs sm:text-sm transition-colors ${
              step === s.id
                ? "bg-blue-600 text-white font-medium"
                : step > s.id
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-400"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Stap 1: Bedrijf */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Bedrijfsgegevens</h3>
          <Field label="Bedrijfsnaam" value={form.company_name} onChange={(v) => updateField("company_name", v)} placeholder="Bijv. Aebi Schmidt Nederland" required />
          <Field label="Website" value={form.company_website} onChange={(v) => updateField("company_website", v)} placeholder="https://www.bedrijf.nl" recommended="Wordt gebruikt voor branding & privacy policy" />
          <Field label="Logo URL" value={form.company_logo_url} onChange={(v) => updateField("company_logo_url", v)} placeholder="https://..." helpText="Link naar het bedrijfslogo (optioneel)" />
          <SelectField label="Branche" value={form.company_sector} onChange={(v) => updateField("company_sector", v)} options={SECTORS.map((s) => ({ value: s, label: s }))} recommended="Helpt bij content generatie" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primaire kleur</label>
            <div className="flex items-center gap-3">
              <input type="color" value={form.primary_color} onChange={(e) => updateField("primary_color", e.target.value)} className="w-10 h-10 rounded cursor-pointer border" />
              <input type="text" value={form.primary_color} onChange={(e) => updateField("primary_color", e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
        </div>
      )}

      {/* Stap 2: Vacature */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Vacature</h3>
          <Field label="Functietitel" value={form.job_title} onChange={(v) => updateField("job_title", v)} placeholder="Bijv. Servicemonteur" required />
          <Field label="Locatie" value={form.job_location} onChange={(v) => updateField("job_location", v)} placeholder="Bijv. Regio Midden-Nederland" required />
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Salaris minimum" value={form.salary_min} onChange={(v) => updateField("salary_min", v)} placeholder="2800" prefix="EUR" recommended />
            <NumberField label="Salaris maximum" value={form.salary_max} onChange={(v) => updateField("salary_max", v)} placeholder="3800" prefix="EUR" recommended />
          </div>
          <p className="text-xs text-blue-600 bg-blue-50 rounded p-2">
            Tip: Salaris transparantie verhoogt het aantal sollicitaties met 44%
          </p>
          <SelectField label="Dienstverband" value={form.employment_type} onChange={(v) => updateField("employment_type", v as IntakeFormData["employment_type"])} options={EMPLOYMENT_TYPES.map((e) => ({ value: e.value, label: e.label }))} />
          <TextAreaField label="Korte beschrijving" value={form.job_description} onChange={(v) => updateField("job_description", v)} placeholder="Wat houdt de functie in? 2-3 zinnen." rows={3} recommended="Wordt bovenaan de pagina getoond" />
        </div>
      )}

      {/* Stap 3: Details */}
      {step === 3 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Details</h3>
          <ListField label="Verantwoordelijkheden" items={form.responsibilities} onChange={(v) => updateField("responsibilities", v)} placeholder="Bijv. Onderhoud aan machines" helpText="Wat gaat de kandidaat doen?" recommended />
          <ListField label="Eisen (must-have)" items={form.requirements_must} onChange={(v) => updateField("requirements_must", v)} placeholder="Bijv. MBO niveau 3/4 techniek" helpText="Wat is echt nodig?" recommended />
          <ListField label="Pre's (nice-to-have)" items={form.requirements_nice} onChange={(v) => updateField("requirements_nice", v)} placeholder="Bijv. Rijbewijs C" helpText="Pluspunt maar niet vereist" />
          <ListField label="Arbeidsvoorwaarden" items={form.benefits} onChange={(v) => updateField("benefits", v)} placeholder="Bijv. Bedrijfsauto met gereedschap" helpText="Wat bied je de kandidaat?" recommended />
        </div>
      )}

      {/* Stap 4: Contact */}
      {step === 4 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contactpersoon</h3>
          <Field label="Naam" value={form.contact_name} onChange={(v) => updateField("contact_name", v)} placeholder="Jan de Vries" required />
          <Field label="Functie" value={form.contact_role} onChange={(v) => updateField("contact_role", v)} placeholder="Recruiter" />
          <Field label="E-mail" value={form.contact_email} onChange={(v) => updateField("contact_email", v)} placeholder="jan@bedrijf.nl" type="email" required />
          <Field label="Telefoon" value={form.contact_phone} onChange={(v) => updateField("contact_phone", v)} placeholder="06 12 34 56 78" type="tel" recommended="Voor direct contact met kandidaten" />
          <Field label="WhatsApp nummer" value={form.contact_whatsapp} onChange={(v) => updateField("contact_whatsapp", v)} placeholder="31612345678" helpText="Internationaal formaat zonder + teken" />
        </div>
      )}

      {/* Stap 5: Controle & Bevestiging */}
      {step === 5 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Controleer je gegevens</h3>
          <p className="text-sm text-gray-600">
            Bekijk hieronder alle ingevulde gegevens. Klik op "Aanpassen" om terug te gaan naar een stap.
          </p>

          {/* Validatie fouten */}
          {validationErrors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm font-medium text-red-800 mb-2">Fouten gevonden:</p>
              {validationErrors.map((err, i) => (
                <p key={i} className="text-sm text-red-700">- {err}</p>
              ))}
            </div>
          )}

          {/* Ontbrekende verplichte velden */}
          {missingRequired.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm font-medium text-red-800 mb-2">
                Verplichte velden ontbreken:
              </p>
              {missingRequired.map((f) => (
                <div key={f.key} className="flex items-center justify-between py-1">
                  <div>
                    <p className="text-sm text-red-700 font-medium">{f.label}</p>
                    <p className="text-xs text-red-600">{f.hint}</p>
                  </div>
                  <button
                    onClick={() => setStep(f.step)}
                    className="text-xs text-red-700 underline"
                  >
                    Invullen (stap {f.step})
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Ontbrekende aanbevolen velden */}
          {missingRecommended.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm font-medium text-amber-800 mb-2">
                Aanbevolen velden (niet verplicht, maar verhogen de kwaliteit):
              </p>
              {missingRecommended.map((f) => (
                <div key={f.key} className="flex items-center justify-between py-1">
                  <div>
                    <p className="text-sm text-amber-700">{f.label}</p>
                    <p className="text-xs text-amber-600">{f.hint}</p>
                  </div>
                  <button
                    onClick={() => setStep(f.step)}
                    className="text-xs text-amber-700 underline"
                  >
                    Toevoegen
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Overzicht ingevulde data */}
          <div className="space-y-4">
            <ReviewSection
              title="Bedrijf"
              stepNr={1}
              onEdit={() => setStep(1)}
              rows={[
                { label: "Bedrijfsnaam", value: form.company_name },
                { label: "Website", value: form.company_website },
                { label: "Branche", value: form.company_sector },
                { label: "Kleur", value: form.primary_color, isColor: true },
              ]}
            />
            <ReviewSection
              title="Vacature"
              stepNr={2}
              onEdit={() => setStep(2)}
              rows={[
                { label: "Functietitel", value: form.job_title },
                { label: "Locatie", value: form.job_location },
                { label: "Salaris", value: form.salary_min && form.salary_max ? `\u20AC${form.salary_min} - \u20AC${form.salary_max}` : form.salary_min ? `Vanaf \u20AC${form.salary_min}` : "Niet opgegeven" },
                { label: "Dienstverband", value: form.employment_type },
                { label: "Beschrijving", value: form.job_description || "Niet opgegeven" },
              ]}
            />
            <ReviewSection
              title="Details"
              stepNr={3}
              onEdit={() => setStep(3)}
              rows={[
                { label: "Verantwoordelijkheden", value: form.responsibilities.length > 0 ? form.responsibilities.join(", ") : "Niet opgegeven" },
                { label: "Eisen", value: form.requirements_must.length > 0 ? form.requirements_must.join(", ") : "Niet opgegeven" },
                { label: "Pre's", value: form.requirements_nice.length > 0 ? form.requirements_nice.join(", ") : "Niet opgegeven" },
                { label: "Arbeidsvoorwaarden", value: form.benefits.length > 0 ? form.benefits.join(", ") : "Niet opgegeven" },
              ]}
            />
            <ReviewSection
              title="Contact"
              stepNr={4}
              onEdit={() => setStep(4)}
              rows={[
                { label: "Naam", value: form.contact_name },
                { label: "E-mail", value: form.contact_email },
                { label: "Telefoon", value: form.contact_phone || "Niet opgegeven" },
                { label: "WhatsApp", value: form.contact_whatsapp || "Niet opgegeven" },
              ]}
            />
          </div>

          {/* Alles goed? */}
          {canSubmit && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 font-medium">
                Alles ziet er goed uit! Klik op "Genereer landingspagina" om door te gaan.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <button
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Vorige
        </button>

        {step < 5 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            {step === 4 ? "Controleren" : "Volgende"}
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting || !canSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Bezig met genereren..." : "Genereer landingspagina"}
          </button>
        )}
      </div>
    </div>
  );
}

// === Review component ===

function ReviewSection({ title, stepNr, onEdit, rows }: {
  title: string;
  stepNr: number;
  onEdit: () => void;
  rows: Array<{ label: string; value: string; isColor?: boolean }>;
}) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-900">
          Stap {stepNr}: {title}
        </h4>
        <button onClick={onEdit} className="text-xs text-blue-600 hover:underline">
          Aanpassen
        </button>
      </div>
      <div className="space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between text-sm">
            <span className="text-gray-500">{row.label}</span>
            {row.isColor ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: row.value }} />
                <span className="text-gray-900 font-mono text-xs">{row.value}</span>
              </div>
            ) : (
              <span className="text-gray-900 font-medium text-right max-w-[60%] truncate">
                {row.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// === Herbruikbare form components ===

function Field({ label, value, onChange, placeholder, type = "text", helpText, required, recommended }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; helpText?: string;
  required?: boolean; recommended?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        {recommended && <span className="text-amber-500 ml-1 text-xs">(aanbevolen)</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          required && !value ? "border-red-300" : "border-gray-300"
        }`}
      />
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
      {recommended && !helpText && <p className="text-xs text-amber-600 mt-1">{recommended}</p>}
    </div>
  );
}

function NumberField({ label, value, onChange, placeholder, prefix, recommended }: {
  label: string; value: number | null; onChange: (v: number | null) => void;
  placeholder?: string; prefix?: string; recommended?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {recommended && <span className="text-amber-500 ml-1 text-xs">(aanbevolen)</span>}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{prefix}</span>
        )}
        <input
          type="number"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
          placeholder={placeholder}
          className={`w-full border border-gray-300 rounded-lg py-2 text-sm focus:ring-2 focus:ring-blue-500 ${prefix ? "pl-12 pr-3" : "px-3"}`}
        />
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, options, recommended }: {
  label: string; value: string; onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>; recommended?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {recommended && <span className="text-amber-500 ml-1 text-xs">(aanbevolen)</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Selecteer --</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {recommended && <p className="text-xs text-amber-600 mt-1">{recommended}</p>}
    </div>
  );
}

function TextAreaField({ label, value, onChange, placeholder, rows = 3, recommended }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; rows?: number; recommended?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {recommended && <span className="text-amber-500 ml-1 text-xs">(aanbevolen)</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
      />
      {recommended && <p className="text-xs text-amber-600 mt-1">{recommended}</p>}
    </div>
  );
}

function ListField({ label, items, onChange, placeholder, helpText, recommended }: {
  label: string; items: string[]; onChange: (v: string[]) => void;
  placeholder?: string; helpText?: string; recommended?: boolean;
}) {
  const [inputValue, setInputValue] = useState("");

  function addItem() {
    const trimmed = inputValue.trim();
    if (trimmed && !items.includes(trimmed)) {
      onChange([...items, trimmed]);
      setInputValue("");
    }
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {recommended && <span className="text-amber-500 ml-1 text-xs">(aanbevolen)</span>}
      </label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addItem(); } }}
          placeholder={placeholder}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
        />
        <button type="button" onClick={addItem} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
          +
        </button>
      </div>
      {items.length > 0 && (
        <div className="space-y-1">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 rounded px-3 py-1.5">
              <span className="flex-1 text-sm text-gray-700">{item}</span>
              <button onClick={() => removeItem(i)} className="text-gray-400 hover:text-red-500 text-sm">x</button>
            </div>
          ))}
        </div>
      )}
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    </div>
  );
}
