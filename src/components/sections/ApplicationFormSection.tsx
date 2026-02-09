import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, MessageCircle, Calendar, CheckCircle2, Upload, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useConfig } from "@/providers/ConfigProvider";
import { useTracking } from "@/providers/TrackingProvider";
import { supabase } from "@/lib/supabase";
import { SECTION_IDS } from "@/constants";
import type { ApplicationFormSectionData } from "@/types/section-data";

interface Props {
  data: ApplicationFormSectionData;
  sectionId: string;
  className?: string;
}

export default function ApplicationFormSection({ data, sectionId, className }: Props) {
  const config = useConfig();
  const { trackFormSubmit, trackEvent, sessionId, utmParams } = useTracking();
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Bouw dynamisch Zod schema op basis van formFields config
  const schemaFields: Record<string, z.ZodTypeAny> = {};
  for (const field of config.formFields) {
    if (field.type === "checkbox") {
      schemaFields[field.name] = field.required
        ? z.literal(true, { errorMap: () => ({ message: "Vereist" }) })
        : z.boolean().optional();
    } else if (field.type === "email") {
      schemaFields[field.name] = field.required
        ? z.string().email("Ongeldig e-mailadres").min(1, "Vereist")
        : z.string().email("Ongeldig e-mailadres").optional().or(z.literal(""));
    } else if (field.type === "file") {
      schemaFields[field.name] = z.any().optional();
    } else {
      schemaFields[field.name] = field.required
        ? z.string().min(1, "Vereist")
        : z.string().optional();
    }
  }
  const formSchema = z.object(schemaFields);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: config.formFields.reduce<Record<string, unknown>>((acc, field) => {
      acc[field.name] = field.type === "checkbox" ? false : "";
      return acc;
    }, {}),
  });

  async function onSubmit(values: Record<string, unknown>) {
    setUploading(true);

    try {
      // Upload CV als er een file veld is
      let cvStoragePath: string | null = null;
      const fileField = config.formFields.find((f) => f.type === "file");
      if (fileField && values[fileField.name]) {
        const file = (values[fileField.name] as FileList)[0];
        if (file) {
          const path = `${config.id}/${Date.now()}-${file.name}`;
          const { error } = await supabase.storage
            .from("cv-uploads")
            .upload(path, file);
          if (!error) cvStoragePath = path;
        }
      }

      // Submit naar Supabase
      const { error } = await supabase.from("applications").insert({
        landing_page_id: config.id,
        session_id: sessionId,
        full_name: values.full_name || "",
        email: values.email || "",
        phone: values.phone || null,
        city: values.city || null,
        motivation: values.motivation || null,
        cv_storage_path: cvStoragePath,
        extra_fields: values,
        privacy_consent: values.privacy === true,
        newsletter_consent: values.newsletter === true,
        utm_source: utmParams.source,
        utm_medium: utmParams.medium,
        utm_campaign: utmParams.campaign,
        utm_term: utmParams.term,
        utm_content: utmParams.content,
        referrer: document.referrer || null,
        landing_url: window.location.href,
        device_type: window.innerWidth < 768 ? "mobile" : "desktop",
      });

      if (!error) {
        trackFormSubmit();
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Form submission error:", err);
      trackEvent("form_error", { error: "submission_failed" });
    } finally {
      setUploading(false);
    }
  }

  if (submitted) {
    return (
      <section id={SECTION_IDS.APPLICATION_FORM} className={cn("py-16 lg:py-24", className)}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {config.formSuccessMessage}
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section id={SECTION_IDS.APPLICATION_FORM} className={cn("py-16 lg:py-24 bg-muted/30", className)}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {data.heading}
          </h2>
          {data.subheading && (
            <p className="text-lg text-muted-foreground">{data.subheading}</p>
          )}
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {config.formFields.map((field) => {
                if (field.type === "checkbox") {
                  const hasError = !!form.formState.errors[field.name];
                  const isPrivacy = field.name === "privacy" || field.label.toLowerCase().includes("privacy");
                  return (
                    <div key={field.name}>
                      <div className={cn(
                        "flex items-start gap-3 p-3 rounded-lg border",
                        hasError ? "border-red-300 bg-red-50" : "border-transparent"
                      )}>
                        <input
                          type="checkbox"
                          id={field.name}
                          className="mt-1 h-4 w-4 rounded border-gray-300 accent-primary"
                          {...form.register(field.name)}
                        />
                        <div>
                          <Label htmlFor={field.name} className="text-sm text-muted-foreground font-normal cursor-pointer">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </Label>
                          {isPrivacy && config.cookieConsent.privacyPolicyUrl && config.cookieConsent.privacyPolicyUrl !== "#" && (
                            <a
                              href={config.cookieConsent.privacyPolicyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-xs text-primary hover:underline mt-1"
                            >
                              Lees de privacyverklaring
                            </a>
                          )}
                        </div>
                      </div>
                      {hasError && (
                        <p className="text-sm text-red-500 mt-1 ml-3">
                          {isPrivacy
                            ? "Je moet akkoord gaan met de privacyverklaring om te solliciteren"
                            : "Dit veld is verplicht"}
                        </p>
                      )}
                    </div>
                  );
                }

                if (field.type === "textarea") {
                  return (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={field.name}>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </Label>
                      <Textarea
                        id={field.name}
                        placeholder={field.placeholder}
                        {...form.register(field.name)}
                      />
                      {form.formState.errors[field.name] && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors[field.name]?.message as string}
                        </p>
                      )}
                    </div>
                  );
                }

                if (field.type === "file") {
                  return (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={field.name}>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </Label>
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor={field.name}
                          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md border bg-background text-sm hover:bg-muted transition-colors"
                        >
                          <Upload className="h-4 w-4" />
                          Bestand kiezen
                        </Label>
                        <Input
                          id={field.name}
                          type="file"
                          accept={field.acceptedFileTypes?.join(",") || ".pdf,.doc,.docx"}
                          className="hidden"
                          {...form.register(field.name)}
                        />
                      </div>
                      {field.helpText && (
                        <p className="text-xs text-muted-foreground">{field.helpText}</p>
                      )}
                    </div>
                  );
                }

                if (field.type === "select" && field.options) {
                  return (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={field.name}>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </Label>
                      <select
                        id={field.name}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        {...form.register(field.name)}
                      >
                        <option value="">Selecteer...</option>
                        {field.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  );
                }

                return (
                  <div key={field.name} className="space-y-2">
                    <Label htmlFor={field.name}>
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      id={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      {...form.register(field.name)}
                    />
                    {form.formState.errors[field.name] && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors[field.name]?.message as string}
                      </p>
                    )}
                  </div>
                );
              })}

              {/* Privacy waarschuwing als niet aangevinkt */}
              {config.formFields.some((f) => f.name === "privacy" && f.required) &&
                !form.watch("privacy") && (
                <p className="text-xs text-amber-600 bg-amber-50 rounded-lg p-3 text-center">
                  Vink de privacyverklaring aan om je sollicitatie te versturen
                </p>
              )}

              <Button type="submit" size="xl" className="w-full" disabled={uploading}>
                {uploading ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : (
                  <Send className="h-5 w-5 mr-2" />
                )}
                {uploading ? "Bezig met versturen..." : "Sollicitatie Versturen"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Alternatieve contact opties */}
        {(data.showWhatsAppAlternative || data.showCalendlyAlternative) && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">Of neem direct contact op:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {data.showWhatsAppAlternative && config.contact.whatsappUrl && (
                <Button
                  variant="whatsapp"
                  size="sm"
                  onClick={() => {
                    trackEvent("whatsapp_click", { section: sectionId });
                    window.open(config.contact.whatsappUrl!, "_blank");
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  WhatsApp
                </Button>
              )}
              {data.showCalendlyAlternative && config.contact.calendlyUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    trackEvent("calendly_click", { section: sectionId });
                    window.open(config.contact.calendlyUrl!, "_blank");
                  }}
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Plan een gesprek
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
