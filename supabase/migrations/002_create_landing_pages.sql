-- Landing pages - elke rij = 1 vacature landingspagina configuratie
CREATE TABLE IF NOT EXISTS landing_pages (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  slug              TEXT NOT NULL UNIQUE,
  status            TEXT NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft', 'published', 'paused', 'archived')),

  -- SEO & Meta
  page_title        TEXT NOT NULL,
  meta_description  TEXT,
  og_image_url      TEXT,
  canonical_url     TEXT,
  favicon_url       TEXT,
  job_posting_schema JSONB,

  -- Secties configuratie
  sections          JSONB NOT NULL DEFAULT '[]',

  -- Styling
  theme             JSONB NOT NULL DEFAULT '{}',
  custom_css        TEXT,

  -- Analytics IDs
  ga4_measurement_id  TEXT,
  gtm_container_id    TEXT,
  fb_pixel_id         TEXT,
  linkedin_partner_id TEXT,
  hotjar_site_id      TEXT,

  -- Cookie consent config
  cookie_consent    JSONB DEFAULT '{"enabled": true, "privacyPolicyUrl": "#", "categories": {"necessary": true, "analytics": true, "marketing": true}}',

  -- Chatbot config
  chatbot           JSONB,

  -- ATS integratie
  ats_webhook_url    TEXT,
  ats_provider       TEXT,
  ats_api_key        TEXT,
  ats_config         JSONB DEFAULT '{}',

  -- Formulier configuratie
  form_fields        JSONB NOT NULL DEFAULT '[]',
  form_success_message TEXT DEFAULT 'Bedankt! We nemen snel contact op.',
  form_redirect_url  TEXT,

  -- Contact gegevens
  contact_person_name  TEXT,
  contact_person_role  TEXT,
  contact_person_email TEXT,
  contact_person_phone TEXT,
  contact_whatsapp_url TEXT,
  contact_calendly_url TEXT,
  contact_avatar_url   TEXT,

  -- Domein
  custom_domain      TEXT,

  published_at       TIMESTAMPTZ,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_landing_pages_slug ON landing_pages(slug);
CREATE INDEX IF NOT EXISTS idx_landing_pages_org ON landing_pages(organization_id);
CREATE INDEX IF NOT EXISTS idx_landing_pages_status ON landing_pages(status);

-- RLS: Gepubliceerde pagina's zijn publiek leesbaar
ALTER TABLE landing_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published pages are public" ON landing_pages
  FOR SELECT USING (status = 'published');
