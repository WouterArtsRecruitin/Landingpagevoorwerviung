import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Card } from "./ui/card";
import { ArrowRight, Upload, CheckCircle, Loader2 } from "lucide-react";
import { trackFormSubmission } from "./Analytics";

interface ApplicationFormProps {
  variant?: "A" | "B" | "C";
}

export function ApplicationForm({ variant = "A" }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    naam: "",
    email: "",
    telefoon: "",
    woonplaats: "",
    motivatie: "",
    cv: null as File | null,
    privacy: false,
    nieuwsbrief: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Netlify Forms submission
    const form = e.currentTarget;
    const formDataToSend = new FormData(form);
    
    // Add variant to form data for tracking
    formDataToSend.append("variant", variant);
    formDataToSend.append("timestamp", new Date().toISOString());

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formDataToSend as any).toString(),
      });

      // Track successful submission
      trackFormSubmission(variant);

      setIsSuccess(true);
      setIsSubmitting(false);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          naam: "",
          email: "",
          telefoon: "",
          woonplaats: "",
          motivatie: "",
          cv: null,
          privacy: false,
          nieuwsbrief: false,
        });
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Er ging iets mis. Probeer het opnieuw of neem contact op via WhatsApp.");
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="p-8 text-center bg-green-50 border-green-200">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl mb-2 text-green-900">Sollicitatie ontvangen!</h3>
        <p className="text-green-700 mb-4">
          Bedankt voor je interesse. Monique neemt binnen 2 werkdagen contact met je op.
        </p>
        <p className="text-sm text-green-600">
          Check je inbox (en spam) voor een bevestigingsmail.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 lg:p-8">
      <div className="mb-6">
        <h3 className="text-2xl mb-2">Direct Solliciteren</h3>
        <p className="text-slate-600">
          Vul onderstaand formulier in en we nemen binnen 2 werkdagen contact met je op.
        </p>
      </div>

      <form 
        onSubmit={handleSubmit}
        name="servicemonteur-application"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        encType="multipart/form-data"
      >
        {/* Netlify Forms - Hidden fields */}
        <input type="hidden" name="form-name" value="servicemonteur-application" />
        <input type="hidden" name="variant" value={variant} />
        <p className="hidden">
          <label>
            Don't fill this out if you're human: <input name="bot-field" />
          </label>
        </p>

        <div className="space-y-5">
          {/* Naam */}
          <div>
            <Label htmlFor="naam">
              Volledige naam <span className="text-red-500">*</span>
            </Label>
            <Input
              id="naam"
              name="naam"
              type="text"
              required
              placeholder="Jan de Vries"
              value={formData.naam}
              onChange={(e) => setFormData({ ...formData, naam: e.target.value })}
              className="mt-1"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">
              E-mailadres <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="jan@voorbeeld.nl"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1"
            />
          </div>

          {/* Telefoon */}
          <div>
            <Label htmlFor="telefoon">
              Telefoonnummer <span className="text-red-500">*</span>
            </Label>
            <Input
              id="telefoon"
              name="telefoon"
              type="tel"
              required
              placeholder="06 12 34 56 78"
              value={formData.telefoon}
              onChange={(e) => setFormData({ ...formData, telefoon: e.target.value })}
              className="mt-1"
            />
          </div>

          {/* Woonplaats */}
          <div>
            <Label htmlFor="woonplaats">
              Woonplaats <span className="text-red-500">*</span>
            </Label>
            <Input
              id="woonplaats"
              name="woonplaats"
              type="text"
              required
              placeholder="Holten / Rijssen / Deventer"
              value={formData.woonplaats}
              onChange={(e) => setFormData({ ...formData, woonplaats: e.target.value })}
              className="mt-1"
            />
          </div>

          {/* Motivatie */}
          <div>
            <Label htmlFor="motivatie">
              Waarom wil je bij Aebi Schmidt werken?
            </Label>
            <Textarea
              id="motivatie"
              name="motivatie"
              rows={4}
              placeholder="Vertel ons in een paar zinnen waarom je interesse hebt in deze functie..."
              value={formData.motivatie}
              onChange={(e) => setFormData({ ...formData, motivatie: e.target.value })}
              className="mt-1"
            />
          </div>

          {/* CV Upload */}
          <div>
            <Label htmlFor="cv">
              CV uploaden (PDF, max 5MB)
            </Label>
            <div className="mt-1">
              <label
                htmlFor="cv"
                className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 rounded-lg p-6 hover:border-red-500 cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5 text-slate-400" />
                <span className="text-slate-600">
                  {formData.cv ? formData.cv.name : "Klik om bestand te kiezen"}
                </span>
              </label>
              <Input
                id="cv"
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  if (file && file.size > 5 * 1024 * 1024) {
                    alert("Bestand is te groot (max 5MB)");
                    return;
                  }
                  setFormData({ ...formData, cv: file });
                }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Je kunt ook later je CV insturen via email
            </p>
          </div>

          {/* Privacy checkbox */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="privacy"
              name="privacy"
              required
              checked={formData.privacy}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, privacy: checked as boolean })
              }
            />
            <Label htmlFor="privacy" className="text-sm leading-relaxed cursor-pointer">
              Ik ga akkoord met de{" "}
              <a href="/privacy" className="text-red-600 hover:underline">
                privacy policy
              </a>{" "}
              en geef toestemming voor het verwerken van mijn gegevens.{" "}
              <span className="text-red-500">*</span>
            </Label>
          </div>

          {/* Nieuwsbrief checkbox */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="nieuwsbrief"
              name="nieuwsbrief"
              checked={formData.nieuwsbrief}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, nieuwsbrief: checked as boolean })
              }
            />
            <Label htmlFor="nieuwsbrief" className="text-sm leading-relaxed cursor-pointer">
              Ik wil op de hoogte blijven van nieuwe vacatures bij Aebi Schmidt (optioneel)
            </Label>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-red-600 hover:bg-red-700 text-lg py-6"
            disabled={isSubmitting || !formData.privacy}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Versturen...
              </>
            ) : (
              <>
                Sollicitatie Versturen
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>

          <p className="text-xs text-slate-500 text-center">
            Of neem direct contact op via{" "}
            <a
              href="https://wa.me/31612345678?text=Hoi%20Monique,%20ik%20heb%20interesse%20in%20de%20Servicemonteur%20vacature!"
              className="text-green-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </form>
    </Card>
  );
}
