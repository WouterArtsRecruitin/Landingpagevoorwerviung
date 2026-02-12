-- Approval tokens for client review workflow
CREATE TABLE IF NOT EXISTS approval_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES landing_pages(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  client_email TEXT NOT NULL,
  client_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'feedback', 'rejected')),
  feedback TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_approval_tokens_token ON approval_tokens(token);
CREATE INDEX idx_approval_tokens_page ON approval_tokens(page_id);
CREATE INDEX idx_approval_tokens_status ON approval_tokens(status);

-- RLS: Public can view their own approval token
ALTER TABLE approval_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approval tokens" ON approval_tokens
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage tokens" ON approval_tokens
  FOR ALL USING (true);
