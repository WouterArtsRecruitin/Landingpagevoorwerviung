import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SLACK_WEBHOOK = Deno.env.get('SLACK_WEBHOOK_URL') ?? '';

interface JotformSubmission {
  // Bedrijfsinfo
  bedrijfsnaam: string;
  website?: string;
  branche?: string;

  // Vacature
  functietitel: string;
  locatie: string;
  werktype: string; // Fulltime, Parttime, etc.
  salaris_min?: number;
  salaris_max?: number;

  // Content
  beschrijving?: string;
  verantwoordelijkheden?: string; // comma-separated
  eisen?: string; // comma-separated
  arbeidsvoorwaarden?: string; // comma-separated

  // Contact
  contact_naam: string;
  contact_email: string;
  contact_telefoon?: string;

  // Template
  template_style: string; // engineering, sales, tech, corporate, creative, finance

  // Analytics (optional)
  ga4_id?: string;
  fb_pixel_id?: string;
  linkedin_partner_id?: string;
}

serve(async (req) => {
  try {
    // Parse Jotform submission
    const formData = await req.formData();
    const submission: Partial<JotformSubmission> = {};

    // Map Jotform fields to our structure
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') {
        submission[key as keyof JotformSubmission] = value as any;
      }
    }

    console.log('Received Jotform submission:', submission);

    // Validate required fields
    const validation = validateSubmission(submission);

    if (!validation.isValid) {
      // Send Slack notification about missing fields
      await sendSlackNotification({
        type: 'incomplete_intake',
        missing_fields: validation.missingFields,
        submission
      });

      return new Response(
        JSON.stringify({
          error: 'Incomplete submission',
          missing: validation.missingFields
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate landing page config
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const slug = generateSlug(submission.bedrijfsnaam!, submission.functietitel!);

    const landingPageData = {
      slug,
      status: 'draft',
      template_style: submission.template_style || 'engineering',

      // Company
      company_name: submission.bedrijfsnaam,
      company_website: submission.website,
      company_sector: submission.branche,

      // Job
      page_title: submission.functietitel,
      location: submission.locatie,
      job_type: submission.werktype || 'Fulltime',
      salary_min: submission.salaris_min,
      salary_max: submission.salaris_max,

      // Content
      job_description: submission.beschrijving || `Als ${submission.functietitel} bij ${submission.bedrijfsnaam} werk je aan uitdagende projecten in een dynamische omgeving.`,
      responsibilities: submission.verantwoordelijkheden?.split(',').map(s => s.trim()).filter(Boolean) || [],
      requirements: submission.eisen?.split(',').map(s => s.trim()).filter(Boolean) || [],
      benefits: submission.arbeidsvoorwaarden?.split(',').map(s => s.trim()).filter(Boolean) || [],

      // Contact
      contact_person_name: submission.contact_naam,
      contact_person_email: submission.contact_email,
      contact_person_phone: submission.contact_telefoon,

      // Analytics
      ga4_measurement_id: submission.ga4_id,
      fb_pixel_id: submission.fb_pixel_id,
      linkedin_partner_id: submission.linkedin_partner_id,

      // Auto-generated
      hero_headline: `Word ${submission.functietitel} bij ${submission.bedrijfsnaam}`,
      hero_subheadline: submission.beschrijving?.substring(0, 150) || `Sluit je aan bij ons team in ${submission.locatie}`,

      created_at: new Date().toISOString(),
    };

    // Save to database
    const { data, error } = await supabase
      .from('landing_pages')
      .insert([landingPageData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Landing page created:', data);

    // Send success notification to Slack
    await sendSlackNotification({
      type: 'new_draft_page',
      page: data,
      url: `${Deno.env.get('FRONTEND_URL')}/admin/pages`
    });

    // Send email to admin (via send-email function)
    await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`
      },
      body: JSON.stringify({
        type: 'new_draft_page',
        to: submission.contact_email,
        page_title: submission.functietitel,
        company_name: submission.bedrijfsnaam,
        slug
      })
    });

    return new Response(
      JSON.stringify({
        success: true,
        page_id: data.id,
        slug,
        message: 'Landing page created as draft. Check admin panel to publish.'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});

function validateSubmission(submission: Partial<JotformSubmission>): {
  isValid: boolean;
  missingFields: string[];
} {
  const required = [
    'bedrijfsnaam',
    'functietitel',
    'locatie',
    'contact_naam',
    'contact_email'
  ];

  const missingFields = required.filter(field =>
    !submission[field as keyof JotformSubmission]
  );

  return {
    isValid: missingFields.length === 0,
    missingFields
  };
}

function generateSlug(companyName: string, jobTitle: string): string {
  const combined = `${companyName}-${jobTitle}`;
  return combined
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function sendSlackNotification(data: any) {
  try {
    let message = '';

    if (data.type === 'incomplete_intake') {
      message = `⚠️ *Incomplete Jotform Submission*\n\n` +
                `*Missing Fields:*\n${data.missing_fields.map((f: string) => `• ${f}`).join('\n')}\n\n` +
                `*Submitted by:* ${data.submission.contact_naam || 'Unknown'}\n` +
                `*Email:* ${data.submission.contact_email || 'Unknown'}`;
    } else if (data.type === 'new_draft_page') {
      message = `✅ *Nieuwe Vacature Klaar voor Review*\n\n` +
                `*Vacature:* ${data.page.page_title}\n` +
                `*Bedrijf:* ${data.page.company_name}\n` +
                `*Locatie:* ${data.page.location}\n` +
                `*Status:* DRAFT\n\n` +
                `<${data.url}|Bekijk in Admin Dashboard →>`;
    }

    await fetch(SLACK_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message })
    });
  } catch (error) {
    console.error('Slack notification failed:', error);
  }
}
