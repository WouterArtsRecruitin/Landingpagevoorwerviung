import type { IntakeFormData } from "@/types/admin";
import { EMPLOYMENT_TYPES, SECTORS } from "@/types/admin";
import {
  Field, NumberField, SelectField, TextAreaField, ListField, ReviewSection,
} from "@/components/admin/intake-form-fields";

interface StepProps {
  form: IntakeFormData;
  updateField: <K extends keyof IntakeFormData>(key: K, value: IntakeFormData[K]) => void;
}

export function StepBedrijf({ form, updateField }: StepProps) {
  return (
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

      {/* Template Selection */}
      <SelectField
        label="Template Stijl"
        value={form.template_style || "auto"}
        onChange={(v) => updateField("template_style", v)}
        options={[
          { value: "auto", label: "🎨 Automatisch (op basis van functie)" },
          { value: "engineering", label: "🔵 Engineering - Professional blauw" },
          { value: "tech", label: "🟣 Tech/Software - Modern purple" },
          { value: "industrial", label: "⚙️ Industrie - Stoer grijs/oranje" },
          { value: "service", label: "🔧 Service & Montage - Actie rood" },
          { value: "logistics", label: "🚚 Logistiek - Helder groen" },
          { value: "premium", label: "⭐ Premium - Luxe goud/zwart" },
        ]}
        helpText="Voor tech & industrie recruitment"
      />

      {/* Image Style */}
      <SelectField
        label="Afbeeldingen Stijl"
        value={form.image_style || "photos"}
        onChange={(v) => updateField("image_style", v)}
        options={[
          { value: "photos", label: "📸 Foto's (realistisch)" },
          { value: "illustrations", label: "🎨 Illustraties (modern)" },
          { value: "3d", label: "🎮 3D renders (futuristisch)" },
          { value: "minimal", label: "⚪ Minimaal (alleen iconen)" },
        ]}
        helpText="Welke visuele stijl past bij je merk?"
      />

      {/* Calendly Integration */}
      <Field
        label="Calendly Link (optioneel)"
        value={form.calendly_url}
        onChange={(v) => updateField("calendly_url", v)}
        placeholder="https://calendly.com/jouw-username/30min"
        helpText="Voor directe afspraak scheduling op de pagina"
      />
    </div>
  );
}

export function StepVacature({ form, updateField }: StepProps) {
  return (
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
  );
}

export function StepDetails({ form, updateField }: StepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Details</h3>
      <ListField label="Verantwoordelijkheden" items={form.responsibilities} onChange={(v) => updateField("responsibilities", v)} placeholder="Bijv. Onderhoud aan machines" helpText="Wat gaat de kandidaat doen?" recommended />
      <ListField label="Eisen (must-have)" items={form.requirements_must} onChange={(v) => updateField("requirements_must", v)} placeholder="Bijv. MBO niveau 3/4 techniek" helpText="Wat is echt nodig?" recommended />
      <ListField label="Pre's (nice-to-have)" items={form.requirements_nice} onChange={(v) => updateField("requirements_nice", v)} placeholder="Bijv. Rijbewijs C" helpText="Pluspunt maar niet vereist" />
      <ListField label="Arbeidsvoorwaarden" items={form.benefits} onChange={(v) => updateField("benefits", v)} placeholder="Bijv. Bedrijfsauto met gereedschap" helpText="Wat bied je de kandidaat?" recommended />
    </div>
  );
}

export function StepContact({ form, updateField }: StepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Contactpersoon</h3>
      <Field label="Naam" value={form.contact_name} onChange={(v) => updateField("contact_name", v)} placeholder="Jan de Vries" required />
      <Field label="Functie" value={form.contact_role} onChange={(v) => updateField("contact_role", v)} placeholder="Recruiter" />
      <Field label="E-mail" value={form.contact_email} onChange={(v) => updateField("contact_email", v)} placeholder="jan@bedrijf.nl" type="email" required />
      <Field label="Telefoon" value={form.contact_phone} onChange={(v) => updateField("contact_phone", v)} placeholder="06 12 34 56 78" type="tel" recommended="Voor direct contact met kandidaten" />
      <Field label="WhatsApp nummer" value={form.contact_whatsapp} onChange={(v) => updateField("contact_whatsapp", v)} placeholder="31612345678" helpText="Internationaal formaat zonder + teken" />

      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-semibold">Tracking & Retargeting</h3>
        <p className="text-xs text-gray-500 mb-3">
          Voor analytics en retargeting van bezoekers. Je kunt 1 GA4 property gebruiken voor alle pagina's.
        </p>
      </div>
      <Field label="GA4 Measurement ID" value={form.ga4_measurement_id} onChange={(v) => updateField("ga4_measurement_id", v)} placeholder="G-XXXXXXXXXX" helpText="Te vinden in GA4 > Beheer > Datastreams > Measurement ID" />
    </div>
  );
}

export function StepReview({ form, setStep, canSubmit, validationErrors, missingRequired, missingRecommended }: {
  form: IntakeFormData;
  setStep: (s: number) => void;
  canSubmit: boolean;
  validationErrors: string[];
  missingRequired: Array<{ key: string; label: string; hint: string; step: number }>;
  missingRecommended: Array<{ key: string; label: string; hint: string; step: number }>;
}) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Controleer je gegevens</h3>
      <p className="text-sm text-gray-600">
        Bekijk hieronder alle ingevulde gegevens. Klik op "Aanpassen" om terug te gaan naar een stap.
      </p>

      {validationErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm font-medium text-red-800 mb-2">Fouten gevonden:</p>
          {validationErrors.map((err, i) => (
            <p key={i} className="text-sm text-red-700">- {err}</p>
          ))}
        </div>
      )}

      {missingRequired.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm font-medium text-red-800 mb-2">Verplichte velden ontbreken:</p>
          {missingRequired.map((f) => (
            <div key={f.key} className="flex items-center justify-between py-1">
              <div>
                <p className="text-sm text-red-700 font-medium">{f.label}</p>
                <p className="text-xs text-red-600">{f.hint}</p>
              </div>
              <button onClick={() => setStep(f.step)} className="text-xs text-red-700 underline">
                Invullen (stap {f.step})
              </button>
            </div>
          ))}
        </div>
      )}

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
              <button onClick={() => setStep(f.step)} className="text-xs text-amber-700 underline">
                Toevoegen
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4">
        <ReviewSection title="Bedrijf" stepNr={1} onEdit={() => setStep(1)} rows={[
          { label: "Bedrijfsnaam", value: form.company_name },
          { label: "Website", value: form.company_website },
          { label: "Branche", value: form.company_sector },
          { label: "Kleur", value: form.primary_color, isColor: true },
        ]} />
        <ReviewSection title="Vacature" stepNr={2} onEdit={() => setStep(2)} rows={[
          { label: "Functietitel", value: form.job_title },
          { label: "Locatie", value: form.job_location },
          { label: "Salaris", value: form.salary_min && form.salary_max ? `\u20AC${form.salary_min} - \u20AC${form.salary_max}` : form.salary_min ? `Vanaf \u20AC${form.salary_min}` : "Niet opgegeven" },
          { label: "Dienstverband", value: form.employment_type },
          { label: "Beschrijving", value: form.job_description || "Niet opgegeven" },
        ]} />
        <ReviewSection title="Details" stepNr={3} onEdit={() => setStep(3)} rows={[
          { label: "Verantwoordelijkheden", value: form.responsibilities.length > 0 ? form.responsibilities.join(", ") : "Niet opgegeven" },
          { label: "Eisen", value: form.requirements_must.length > 0 ? form.requirements_must.join(", ") : "Niet opgegeven" },
          { label: "Pre's", value: form.requirements_nice.length > 0 ? form.requirements_nice.join(", ") : "Niet opgegeven" },
          { label: "Arbeidsvoorwaarden", value: form.benefits.length > 0 ? form.benefits.join(", ") : "Niet opgegeven" },
        ]} />
        <ReviewSection title="Contact & Tracking" stepNr={4} onEdit={() => setStep(4)} rows={[
          { label: "Naam", value: form.contact_name },
          { label: "E-mail", value: form.contact_email },
          { label: "Telefoon", value: form.contact_phone || "Niet opgegeven" },
          { label: "WhatsApp", value: form.contact_whatsapp || "Niet opgegeven" },
          { label: "GA4 ID", value: form.ga4_measurement_id || "Niet ingesteld" },
        ]} />
      </div>

      {canSubmit && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800 font-medium">
            Alles ziet er goed uit! Klik op "Genereer landingspagina" om door te gaan.
          </p>
        </div>
      )}
    </div>
  );
}
