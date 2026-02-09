import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import type { LandingPageConfig } from "@/types/landing-page";
import { LOCAL_CONFIGS } from "@/constants/configs";

// Fallback: demo config voor theme defaults
import { DEMO_CONFIG } from "@/constants/demo-config";

interface LandingPageLoaderProps {
  slug: string;
  children: (config: LandingPageConfig) => React.ReactNode;
}

export function LandingPageLoader({ slug, children }: LandingPageLoaderProps) {
  const [config, setConfig] = useState<LandingPageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadConfig() {
      try {
        // Probeer eerst van Supabase te laden
        const { data, error: dbError } = await supabase
          .from("landing_pages")
          .select("*")
          .eq("slug", slug)
          .eq("status", "published")
          .single();

        if (data && !dbError) {
          // Transform DB row naar LandingPageConfig
          setConfig(transformDbRow(data));
        } else {
          // Fallback naar lokale config registry
          const localConfig = LOCAL_CONFIGS[slug];
          if (localConfig) {
            setConfig(localConfig);
          } else {
            setError("Vacaturepagina niet gevonden");
          }
        }
      } catch {
        // Als Supabase niet geconfigureerd is, gebruik lokale config
        const localConfig = LOCAL_CONFIGS[slug];
        if (localConfig) {
          setConfig(localConfig);
        } else {
          setError("Er ging iets mis bij het laden");
        }
      } finally {
        setLoading(false);
      }
    }

    loadConfig();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="h-screen flex items-center justify-center">
          <div className="space-y-4 w-full max-w-md px-4">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-4 w-64 mx-auto" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-lg text-gray-600 mb-6">{error || "Pagina niet gevonden"}</p>
          <a href="/v/demo" className="text-blue-600 underline">
            Bekijk de demo pagina
          </a>
        </div>
      </div>
    );
  }

  return <>{children(config)}</>;
}

/**
 * Transform een database rij naar het LandingPageConfig type
 */
function transformDbRow(row: Record<string, any>): LandingPageConfig {
  return {
    id: row.id,
    organizationId: row.organization_id,
    slug: row.slug,
    status: row.status,
    pageTitle: row.page_title,
    metaDescription: row.meta_description || "",
    ogImageUrl: row.og_image_url,
    canonicalUrl: row.canonical_url,
    faviconUrl: row.favicon_url,
    jobPostingSchema: row.job_posting_schema,
    sections: row.sections || [],
    theme: row.theme || DEMO_CONFIG.theme,
    customCss: row.custom_css,
    analytics: {
      ga4MeasurementId: row.ga4_measurement_id,
      gtmContainerId: row.gtm_container_id,
      fbPixelId: row.fb_pixel_id,
      linkedinPartnerId: row.linkedin_partner_id,
      hotjarSiteId: row.hotjar_site_id,
    },
    cookieConsent: row.cookie_consent || { enabled: true, privacyPolicyUrl: "#", categories: { necessary: true, analytics: true, marketing: true } },
    chatbot: row.chatbot,
    ats: row.ats_config ? {
      provider: row.ats_provider,
      webhookUrl: row.ats_webhook_url,
      fieldMappings: row.ats_config.field_mappings || {},
    } : undefined,
    formFields: row.form_fields || [],
    formSuccessMessage: row.form_success_message || "Bedankt! We nemen snel contact op.",
    formRedirectUrl: row.form_redirect_url,
    contact: {
      personName: row.contact_person_name || "",
      personRole: row.contact_person_role || "",
      personEmail: row.contact_person_email || "",
      personPhone: row.contact_person_phone || "",
      whatsappUrl: row.contact_whatsapp_url,
      calendlyUrl: row.contact_calendly_url,
      avatarUrl: row.contact_avatar_url,
    },
    organization: {
      name: row.organization_name || "",
      slug: row.organization_slug || "",
      logoUrl: row.organization_logo_url || "",
      websiteUrl: row.organization_website_url || "",
    },
  };
}
