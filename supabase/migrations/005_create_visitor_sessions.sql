-- Bezoeker sessies voor eigen analytics
CREATE TABLE IF NOT EXISTS visitor_sessions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  landing_page_id UUID NOT NULL REFERENCES landing_pages(id) ON DELETE CASCADE,
  variant_id      UUID REFERENCES ab_test_variants(id),

  anonymous_id    TEXT NOT NULL,

  -- UTM
  utm_source      TEXT,
  utm_medium      TEXT,
  utm_campaign    TEXT,
  utm_term        TEXT,
  utm_content     TEXT,
  referrer        TEXT,
  landing_url     TEXT,

  -- Device
  device_type     TEXT,
  browser         TEXT,
  screen_width    INTEGER,
  user_agent      TEXT,

  -- Session metrics
  page_entered_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  page_exited_at    TIMESTAMPTZ,
  time_on_page_ms   INTEGER DEFAULT 0,
  max_scroll_depth  INTEGER DEFAULT 0,

  -- Conversie flags
  did_click_cta     BOOLEAN DEFAULT false,
  did_open_form     BOOLEAN DEFAULT false,
  did_submit_form   BOOLEAN DEFAULT false,
  did_click_whatsapp BOOLEAN DEFAULT false,
  did_click_phone   BOOLEAN DEFAULT false,

  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sessions_lp ON visitor_sessions(landing_page_id);
CREATE INDEX IF NOT EXISTS idx_sessions_variant ON visitor_sessions(variant_id);
CREATE INDEX IF NOT EXISTS idx_sessions_created ON visitor_sessions(created_at);

ALTER TABLE visitor_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create sessions" ON visitor_sessions
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update sessions" ON visitor_sessions
  FOR UPDATE USING (true);
