-- Granulaire event log voor alle tracked interacties
CREATE TABLE IF NOT EXISTS analytics_events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id      UUID NOT NULL REFERENCES visitor_sessions(id) ON DELETE CASCADE,
  landing_page_id UUID NOT NULL REFERENCES landing_pages(id) ON DELETE CASCADE,
  variant_id      UUID REFERENCES ab_test_variants(id),

  event_name      TEXT NOT NULL,
  event_category  TEXT,
  event_data      JSONB DEFAULT '{}',

  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_events_session ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_lp ON analytics_events(landing_page_id);
CREATE INDEX IF NOT EXISTS idx_events_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_events_created ON analytics_events(created_at);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can log events" ON analytics_events
  FOR INSERT WITH CHECK (true);
