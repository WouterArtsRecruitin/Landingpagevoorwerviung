-- A/B test varianten per landing page
CREATE TABLE IF NOT EXISTS ab_test_variants (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  landing_page_id UUID NOT NULL REFERENCES landing_pages(id) ON DELETE CASCADE,
  variant_key     TEXT NOT NULL,
  name            TEXT NOT NULL,
  description     TEXT,
  section_overrides JSONB NOT NULL DEFAULT '[]',
  traffic_weight  INTEGER NOT NULL DEFAULT 33
                  CHECK (traffic_weight >= 0 AND traffic_weight <= 100),
  is_control      BOOLEAN NOT NULL DEFAULT false,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(landing_page_id, variant_key)
);

CREATE INDEX IF NOT EXISTS idx_ab_variants_lp ON ab_test_variants(landing_page_id);

ALTER TABLE ab_test_variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Variants are public read" ON ab_test_variants
  FOR SELECT USING (true);
