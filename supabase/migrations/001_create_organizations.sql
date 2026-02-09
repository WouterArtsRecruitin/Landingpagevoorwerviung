-- Organisaties / opdrachtgevers
CREATE TABLE IF NOT EXISTS organizations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  logo_url        TEXT,
  brand_colors    JSONB NOT NULL DEFAULT '{}',
  website_url     TEXT,
  contact_email   TEXT,
  contact_phone   TEXT,
  metadata        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_organizations_slug ON organizations(slug);
