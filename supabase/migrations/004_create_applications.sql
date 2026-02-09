-- Sollicitaties / leads
CREATE TABLE IF NOT EXISTS applications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  landing_page_id UUID NOT NULL REFERENCES landing_pages(id) ON DELETE CASCADE,
  variant_id      UUID REFERENCES ab_test_variants(id),
  session_id      UUID,

  -- Sollicitant data
  full_name       TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT,
  city            TEXT,
  motivation      TEXT,
  cv_storage_path TEXT,

  -- Dynamische velden
  extra_fields    JSONB DEFAULT '{}',

  -- Consent
  privacy_consent    BOOLEAN NOT NULL DEFAULT false,
  newsletter_consent BOOLEAN NOT NULL DEFAULT false,

  -- UTM / Attribution
  utm_source      TEXT,
  utm_medium      TEXT,
  utm_campaign    TEXT,
  utm_term        TEXT,
  utm_content     TEXT,
  referrer        TEXT,
  landing_url     TEXT,

  -- Device context
  device_type     TEXT,
  browser         TEXT,

  -- ATS sync status
  ats_sync_status  TEXT DEFAULT 'pending'
                   CHECK (ats_sync_status IN ('pending', 'synced', 'failed', 'skipped')),
  ats_sync_at      TIMESTAMPTZ,
  ats_external_id  TEXT,
  ats_sync_error   TEXT,

  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_applications_lp ON applications(landing_page_id);
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_created ON applications(created_at);
CREATE INDEX IF NOT EXISTS idx_applications_ats ON applications(ats_sync_status);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit applications" ON applications
  FOR INSERT WITH CHECK (true);
