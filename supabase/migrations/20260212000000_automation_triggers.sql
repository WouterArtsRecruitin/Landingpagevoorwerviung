-- =====================================================
-- AUTOMATION: Email Triggers & Follow-up System
-- =====================================================

-- Enable http extension for calling Edge Functions
CREATE EXTENSION IF NOT EXISTS http WITH SCHEMA extensions;

-- =====================================================
-- 1. TRIGGER: Send emails when new application arrives
-- =====================================================

CREATE OR REPLACE FUNCTION handle_new_application()
RETURNS trigger AS $$
DECLARE
  page_data RECORD;
  email_response TEXT;
BEGIN
  -- Get landing page data for this application
  SELECT * INTO page_data
  FROM landing_pages
  WHERE id = NEW.page_id;

  -- Send confirmation email to candidate
  PERFORM extensions.http((
    'POST',
    current_setting('app.settings.supabase_url') || '/functions/v1/send-email',
    ARRAY[extensions.http_header('Content-Type', 'application/json')],
    'application/json',
    json_build_object(
      'type', 'candidate_confirmation',
      'to', NEW.applicant_email,
      'candidate_name', NEW.applicant_name,
      'job_title', page_data.page_title,
      'job_url', current_setting('app.settings.frontend_url') || '/v/' || page_data.slug
    )::text
  )::extensions.http_request);

  -- Send notification email to recruiter
  PERFORM extensions.http((
    'POST',
    current_setting('app.settings.supabase_url') || '/functions/v1/send-email',
    ARRAY[extensions.http_header('Content-Type', 'application/json')],
    'application/json',
    json_build_object(
      'type', 'recruiter_notification',
      'to', page_data.contact_person_email,
      'applicant_name', NEW.applicant_name,
      'applicant_email', NEW.applicant_email,
      'applicant_phone', NEW.applicant_phone,
      'job_title', page_data.page_title,
      'linkedin_url', NEW.linkedin_url,
      'motivation', NEW.motivation,
      'cv_url', NEW.cv_url
    )::text
  )::extensions.http_request);

  -- Send Slack notification
  PERFORM extensions.http((
    'POST',
    current_setting('app.settings.slack_webhook_url'),
    ARRAY[extensions.http_header('Content-Type', 'application/json')],
    'application/json',
    json_build_object(
      'text', '🎯 *Nieuwe Sollicitatie!*' || E'\n\n' ||
              '*Kandidaat:* ' || NEW.applicant_name || E'\n' ||
              '*Vacature:* ' || page_data.page_title || ' bij ' || page_data.company_name || E'\n' ||
              '*Email:* ' || NEW.applicant_email || E'\n' ||
              '<' || current_setting('app.settings.frontend_url') || '/admin/candidates|Bekijk in Admin →>'
    )::text
  )::extensions.http_request);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS on_new_application ON applications;
CREATE TRIGGER on_new_application
  AFTER INSERT ON applications
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_application();

-- =====================================================
-- 2. FOLLOW-UP EMAIL SYSTEM
-- =====================================================

-- Table to track follow-up emails sent
CREATE TABLE IF NOT EXISTS followup_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  email_type TEXT NOT NULL CHECK (email_type IN ('day3', 'day7')),
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_followup_emails_application ON followup_emails(application_id);

-- Function to send follow-up emails
CREATE OR REPLACE FUNCTION send_followup_emails()
RETURNS void AS $$
DECLARE
  app_record RECORD;
  page_data RECORD;
  days_since_application INTEGER;
BEGIN
  -- Loop through all pending applications (not yet processed by recruiter)
  FOR app_record IN
    SELECT a.*
    FROM applications a
    WHERE a.status IN ('pending', 'new')
    AND a.created_at < NOW() - INTERVAL '3 days'
  LOOP
    -- Calculate days since application
    days_since_application := EXTRACT(DAY FROM NOW() - app_record.created_at);

    -- Get landing page data
    SELECT * INTO page_data
    FROM landing_pages
    WHERE id = app_record.page_id;

    -- Send Day 3 follow-up (if not sent yet)
    IF days_since_application >= 3 AND days_since_application < 7 THEN
      IF NOT EXISTS (
        SELECT 1 FROM followup_emails
        WHERE application_id = app_record.id AND email_type = 'day3'
      ) THEN
        -- Send Day 3 email
        PERFORM extensions.http((
          'POST',
          current_setting('app.settings.supabase_url') || '/functions/v1/send-email',
          ARRAY[extensions.http_header('Content-Type', 'application/json')],
          'application/json',
          json_build_object(
            'type', 'candidate_followup_day3',
            'to', app_record.applicant_email,
            'candidate_name', app_record.applicant_name,
            'job_title', page_data.page_title,
            'job_url', current_setting('app.settings.frontend_url') || '/v/' || page_data.slug
          )::text
        )::extensions.http_request);

        -- Mark as sent
        INSERT INTO followup_emails (application_id, email_type)
        VALUES (app_record.id, 'day3');
      END IF;
    END IF;

    -- Send Day 7 follow-up (if not sent yet)
    IF days_since_application >= 7 THEN
      IF NOT EXISTS (
        SELECT 1 FROM followup_emails
        WHERE application_id = app_record.id AND email_type = 'day7'
      ) THEN
        -- Send Day 7 email
        PERFORM extensions.http((
          'POST',
          current_setting('app.settings.supabase_url') || '/functions/v1/send-email',
          ARRAY[extensions.http_header('Content-Type', 'application/json')],
          'application/json',
          json_build_object(
            'type', 'candidate_followup_day7',
            'to', app_record.applicant_email,
            'candidate_name', app_record.applicant_name,
            'job_title', page_data.page_title,
            'job_url', current_setting('app.settings.frontend_url') || '/v/' || page_data.slug
          )::text
        )::extensions.http_request);

        -- Mark as sent
        INSERT INTO followup_emails (application_id, email_type)
        VALUES (app_record.id, 'day7');
      END IF;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 3. SCHEDULE FOLLOW-UP EMAILS (Daily at 10:00 AM)
-- =====================================================

-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;

-- Schedule daily follow-up email check (10:00 AM Amsterdam time)
SELECT cron.schedule(
  'send-daily-followup-emails',
  '0 10 * * *',
  $$SELECT send_followup_emails();$$
);

-- =====================================================
-- 4. CONFIGURATION SETTINGS
-- =====================================================

-- Store config settings (run these after migration with actual values)
-- ALTER DATABASE postgres SET app.settings.supabase_url = 'https://[YOUR_PROJECT].supabase.co';
-- ALTER DATABASE postgres SET app.settings.frontend_url = 'https://vacatures.recruitin.nl';
-- ALTER DATABASE postgres SET app.settings.slack_webhook_url = 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK';

-- =====================================================
-- 5. RLS POLICIES for followup_emails
-- =====================================================

ALTER TABLE followup_emails ENABLE ROW LEVEL SECURITY;

-- Admin can view all follow-up emails
CREATE POLICY "Admin can view all followup_emails" ON followup_emails
  FOR SELECT USING (true);

-- System can insert follow-up records
CREATE POLICY "System can insert followup_emails" ON followup_emails
  FOR INSERT WITH CHECK (true);

-- =====================================================
-- DONE! Automation is ready.
-- =====================================================

-- To manually trigger follow-ups (testing):
-- SELECT send_followup_emails();

-- To view scheduled jobs:
-- SELECT * FROM cron.job;

-- To view follow-up history:
-- SELECT f.*, a.applicant_name, a.applicant_email
-- FROM followup_emails f
-- JOIN applications a ON f.application_id = a.id
-- ORDER BY f.created_at DESC;
