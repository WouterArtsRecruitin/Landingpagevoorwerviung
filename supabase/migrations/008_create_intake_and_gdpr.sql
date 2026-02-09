-- ============================================================
-- Intake formulier submissions & GDPR data management
-- ============================================================

-- Intake submissions: ruwe formulierdata van medewerkers/klanten
-- die een nieuwe vacaturepagina willen aanmaken
CREATE TABLE IF NOT EXISTS intake_submissions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by        TEXT,  -- email of naam van de indiener

  -- Bedrijfsgegevens
  company_name      TEXT NOT NULL,
  company_website   TEXT,
  company_logo_url  TEXT,
  company_sector    TEXT,
  primary_color     TEXT,

  -- Vacature gegevens
  job_title         TEXT NOT NULL,
  job_location      TEXT NOT NULL,
  salary_min        INTEGER,
  salary_max        INTEGER,
  employment_type   TEXT DEFAULT 'fulltime'
                    CHECK (employment_type IN ('fulltime', 'parttime', 'flex', 'interim', 'stage')),
  job_description   TEXT,

  -- Details (opgeslagen als arrays)
  responsibilities  JSONB DEFAULT '[]',
  requirements_must JSONB DEFAULT '[]',
  requirements_nice JSONB DEFAULT '[]',
  benefits          JSONB DEFAULT '[]',

  -- Contact
  contact_name      TEXT NOT NULL,
  contact_role      TEXT,
  contact_email     TEXT NOT NULL,
  contact_phone     TEXT,
  contact_whatsapp  TEXT,

  -- Status
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  landing_page_id   UUID REFERENCES landing_pages(id),
  error_message     TEXT,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at      TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_intake_status ON intake_submissions(status);
CREATE INDEX IF NOT EXISTS idx_intake_created ON intake_submissions(created_at);

-- GDPR verzoeken: data export en verwijdering
CREATE TABLE IF NOT EXISTS gdpr_requests (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_type      TEXT NOT NULL
                    CHECK (request_type IN ('export', 'delete', 'rectify')),

  -- Wie heeft het verzoek ingediend
  requester_email   TEXT NOT NULL,
  requester_name    TEXT,

  -- Scope: welke data betreft het
  scope             TEXT NOT NULL DEFAULT 'candidate'
                    CHECK (scope IN ('candidate', 'all')),
  landing_page_id   UUID REFERENCES landing_pages(id),
  application_id    UUID REFERENCES applications(id),

  -- Status
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'in_progress', 'completed', 'rejected')),
  processed_by      TEXT,
  notes             TEXT,

  -- Resultaten
  export_file_url   TEXT,  -- voor export verzoeken
  data_deleted_at   TIMESTAMPTZ,  -- voor delete verzoeken

  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at      TIMESTAMPTZ,
  deadline_at       TIMESTAMPTZ  -- AVG: max 30 dagen
);

CREATE INDEX IF NOT EXISTS idx_gdpr_status ON gdpr_requests(status);
CREATE INDEX IF NOT EXISTS idx_gdpr_email ON gdpr_requests(requester_email);

-- Data retention policy marker op applications
ALTER TABLE applications ADD COLUMN IF NOT EXISTS retention_expires_at TIMESTAMPTZ;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS anonymized_at TIMESTAMPTZ;

-- RLS policies
ALTER TABLE intake_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gdpr_requests ENABLE ROW LEVEL SECURITY;

-- Service role heeft volledige toegang (Edge Functions)
CREATE POLICY "Service role full access intake" ON intake_submissions
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access gdpr" ON gdpr_requests
  FOR ALL USING (true) WITH CHECK (true);

-- Iedereen mag intake submissions aanmaken (publiek formulier)
CREATE POLICY "Public can submit intake" ON intake_submissions
  FOR INSERT WITH CHECK (true);

-- Admin RLS policies voor landing_pages (lezen van alle pagina's)
CREATE POLICY "Admin can read all pages" ON landing_pages
  FOR SELECT USING (true);

CREATE POLICY "Admin can update pages" ON landing_pages
  FOR UPDATE USING (true) WITH CHECK (true);

-- Admin kan alle applications lezen
CREATE POLICY "Admin can read applications" ON applications
  FOR SELECT USING (true);

CREATE POLICY "Admin can update applications" ON applications
  FOR UPDATE USING (true) WITH CHECK (true);
