import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { generateLandingPageClientSide } from "@/lib/generate-landing-page";
import type { IntakeFormData } from "@/types/admin";
import {
  STEPS, EMPTY_FORM,
  getMissingRequired, getMissingRecommended, getValidationErrors,
} from "./intake-constants";
import {
  StepBedrijf, StepVacature, StepDetails, StepContact, StepReview,
} from "@/components/admin/intake-steps";

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

  const missingRequired = getMissingRequired(form);
  const missingRecommended = getMissingRecommended(form);
  const validationErrors = getValidationErrors(form);
  const canSubmit = missingRequired.length === 0 && validationErrors.length === 0;

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);

    try {
      // Probeer eerst de edge function
      const { data, error: fnError } = await supabase.functions.invoke(
        "generate-landing-page",
        { body: { ...form, created_by: form.contact_email } }
      );

      if (!fnError && data?.success) {
        setResult({ slug: data.slug, url: data.url });
        return;
      }

      // Edge function mislukt → client-side fallback
      console.warn("Edge function mislukt, gebruik client-side fallback:", fnError?.message || data?.error);
      const fallbackResult = await generateLandingPageClientSide(form);

      if (fallbackResult.success) {
        setResult({ slug: fallbackResult.slug, url: fallbackResult.url });
      } else {
        setError(fallbackResult.error);
      }
    } catch {
      // Netwerk/connectie fout → probeer client-side fallback
      console.warn("Edge function niet bereikbaar, gebruik client-side fallback");
      try {
        const fallbackResult = await generateLandingPageClientSide(form);
        if (fallbackResult.success) {
          setResult({ slug: fallbackResult.slug, url: fallbackResult.url });
        } else {
          setError(fallbackResult.error);
        }
      } catch {
        setError("Kan geen verbinding maken met de server");
      }
    } finally {
      setSubmitting(false);
    }
  }

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

      {/* Sticky submit button - alleen op stap 5 */}
      {step === 5 && canSubmit && (
        <div className="sticky top-0 z-50 bg-white border-b shadow-md py-4 mb-6 -mx-6 px-6">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {submitting ? "⏳ Bezig met genereren..." : "✨ Genereer landingspagina"}
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {step === 1 && <StepBedrijf form={form} updateField={updateField} />}
      {step === 2 && <StepVacature form={form} updateField={updateField} />}
      {step === 3 && <StepDetails form={form} updateField={updateField} />}
      {step === 4 && <StepContact form={form} updateField={updateField} />}
      {step === 5 && (
        <StepReview
          form={form}
          setStep={setStep}
          canSubmit={canSubmit}
          validationErrors={validationErrors}
          missingRequired={missingRequired}
          missingRecommended={missingRecommended}
        />
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
