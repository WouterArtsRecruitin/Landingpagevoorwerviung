-- ATS synchronisatie audit trail
CREATE TABLE IF NOT EXISTS ats_sync_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id  UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,

  provider        TEXT NOT NULL,
  request_url     TEXT,
  request_body    JSONB,
  response_status INTEGER,
  response_body   JSONB,

  status          TEXT NOT NULL
                  CHECK (status IN ('success', 'error', 'timeout', 'retry')),
  error_message   TEXT,
  retry_count     INTEGER DEFAULT 0,

  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ats_log_app ON ats_sync_log(application_id);
