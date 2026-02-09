// Helper functions for the generate-landing-page edge function

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

export { corsHeaders };

export function jsonResponse(status: number, data: Record<string, unknown>) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

export function generateSlug(company: string, jobTitle: string): string {
  const text = `${company}-${jobTitle}`;
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 60);
}

export async function ensureUniqueSlug(
  supabase: ReturnType<typeof createClient>,
  baseSlug: string
): Promise<string> {
  let slug = baseSlug;
  let suffix = 0;

  while (true) {
    const { data } = await supabase
      .from("landing_pages")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (!data) return slug;
    suffix++;
    slug = `${baseSlug}-${suffix}`;
  }
}

export async function findOrCreateOrganization(
  supabase: ReturnType<typeof createClient>,
  body: Record<string, unknown>
): Promise<string> {
  const companyName = body.company_name as string;
  const orgSlug = (companyName as string)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 40);

  const { data: existing } = await supabase
    .from("organizations")
    .select("id")
    .eq("slug", orgSlug)
    .maybeSingle();

  if (existing) return existing.id;

  const { data: newOrg, error } = await supabase
    .from("organizations")
    .insert({
      name: companyName,
      slug: orgSlug,
      logo_url: (body.company_logo_url as string) || "",
      website_url: (body.company_website as string) || "",
      contact_email: (body.contact_email as string) || "",
      contact_phone: (body.contact_phone as string) || "",
      brand_colors: {
        primary: (body.primary_color as string) || "#003DA5",
      },
    })
    .select("id")
    .single();

  if (error) throw error;
  return newOrg.id;
}
