-- ═══════════════════════════════════════════════════════════════
-- FIXED DATABASE CONFIG - Run dit in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════
--
-- Ga naar: https://supabase.com/dashboard/project/vaiikkhaulkqdknwvroj/sql
-- Plak HELE bestand en klik "Run"
--
-- Dit maakt een settings table aan (geen superuser rechten nodig!)
--
-- ═══════════════════════════════════════════════════════════════

-- STAP 1: Create settings table
CREATE TABLE IF NOT EXISTS public.automation_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- STAP 2: Insert configuration values
INSERT INTO public.automation_settings (key, value, description)
VALUES
  ('supabase_url', 'https://vaiikkhaulkqdknwvroj.supabase.co', 'Supabase project URL'),
  ('frontend_url', 'http://localhost:3000', 'Frontend application URL'),
  ('slack_webhook_url', 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK', 'Slack webhook for notifications')
ON CONFLICT (key) DO UPDATE
  SET value = EXCLUDED.value,
      updated_at = NOW();

-- STAP 3: Create helper function
CREATE OR REPLACE FUNCTION get_automation_setting(setting_key TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN (SELECT value FROM public.automation_settings WHERE key = setting_key);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- STAP 4: Update trigger voor nieuwe sollicitaties
CREATE OR REPLACE FUNCTION handle_new_application()
RETURNS trigger AS $$
DECLARE
  page_data RECORD;
  v_supabase_url TEXT;
  v_frontend_url TEXT;
  v_slack_webhook TEXT;
BEGIN
  v_supabase_url := get_automation_setting('supabase_url');
  v_frontend_url := get_automation_setting('frontend_url');
  v_slack_webhook := get_automation_setting('slack_webhook_url');

  SELECT * INTO page_data FROM landing_pages WHERE id = NEW.page_id;

  -- Email naar kandidaat
  PERFORM extensions.http((
    'POST', v_supabase_url || '/functions/v1/send-email',
    ARRAY[extensions.http_header('Content-Type', 'application/json')],
    'application/json',
    json_build_object(
      'type', 'candidate_confirmation',
      'to', NEW.applicant_email,
      'candidate_name', NEW.applicant_name,
      'job_title', page_data.page_title,
      'job_url', v_frontend_url || '/v/' || page_data.slug
    )::text
  )::extensions.http_request);

  -- Email naar recruiter
  PERFORM extensions.http((
    'POST', v_supabase_url || '/functions/v1/send-email',
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

  -- Slack notificatie
  PERFORM extensions.http((
    'POST', v_slack_webhook,
    ARRAY[extensions.http_header('Content-Type', 'application/json')],
    'application/json',
    json_build_object(
      'text', '🎯 *Nieuwe Sollicitatie!*' || E'\n\n' ||
              '*Kandidaat:* ' || NEW.applicant_name || E'\n' ||
              '*Vacature:* ' || page_data.page_title || ' bij ' || page_data.company_name || E'\n' ||
              '*Email:* ' || NEW.applicant_email || E'\n' ||
              '<' || v_frontend_url || '/admin/candidates|Bekijk in Admin →>'
    )::text
  )::extensions.http_request);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- STAP 5: Update follow-up emails functie
CREATE OR REPLACE FUNCTION send_followup_emails()
RETURNS void AS $$
DECLARE
  app_record RECORD;
  page_data RECORD;
  days_since_application INTEGER;
  v_supabase_url TEXT;
  v_frontend_url TEXT;
BEGIN
  v_supabase_url := get_automation_setting('supabase_url');
  v_frontend_url := get_automation_setting('frontend_url');

  FOR app_record IN
    SELECT a.* FROM applications a
    WHERE a.status IN ('pending', 'new')
    AND a.created_at < NOW() - INTERVAL '3 days'
  LOOP
    days_since_application := EXTRACT(DAY FROM NOW() - app_record.created_at);
    SELECT * INTO page_data FROM landing_pages WHERE id = app_record.page_id;

    -- Day 3 email
    IF days_since_application >= 3 AND days_since_application < 7 THEN
      IF NOT EXISTS (SELECT 1 FROM followup_emails WHERE application_id = app_record.id AND email_type = 'day3') THEN
        PERFORM extensions.http((
          'POST', v_supabase_url || '/functions/v1/send-email',
          ARRAY[extensions.http_header('Content-Type', 'application/json')],
          'application/json',
          json_build_object(
            'type', 'candidate_followup_day3',
            'to', app_record.applicant_email,
            'candidate_name', app_record.applicant_name,
            'job_title', page_data.page_title,
            'job_url', v_frontend_url || '/v/' || page_data.slug
          )::text
        )::extensions.http_request);
        INSERT INTO followup_emails (application_id, email_type) VALUES (app_record.id, 'day3');
      END IF;
    END IF;

    -- Day 7 email
    IF days_since_application >= 7 THEN
      IF NOT EXISTS (SELECT 1 FROM followup_emails WHERE application_id = app_record.id AND email_type = 'day7') THEN
        PERFORM extensions.http((
          'POST', v_supabase_url || '/functions/v1/send-email',
          ARRAY[extensions.http_header('Content-Type', 'application/json')],
          'application/json',
          json_build_object(
            'type', 'candidate_followup_day7',
            'to', app_record.applicant_email,
            'candidate_name', app_record.applicant_name,
            'job_title', page_data.page_title,
            'job_url', v_frontend_url || '/v/' || page_data.slug
          )::text
        )::extensions.http_request);
        INSERT INTO followup_emails (application_id, email_type) VALUES (app_record.id, 'day7');
      END IF;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- STAP 6: Permissions
GRANT SELECT ON public.automation_settings TO authenticated, anon, service_role;
GRANT EXECUTE ON FUNCTION get_automation_setting(TEXT) TO authenticated, anon, service_role;

-- STAP 7: RLS
ALTER TABLE public.automation_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Settings are viewable by everyone" ON public.automation_settings;
CREATE POLICY "Settings are viewable by everyone" ON public.automation_settings
  FOR SELECT USING (true);

-- ═══════════════════════════════════════════════════════════════
-- ✅ KLAAR! Test met:
-- ═══════════════════════════════════════════════════════════════
-- SELECT get_automation_setting('slack_webhook_url');
-- (Moet de webhook URL returnen)
--
-- Nu test je de automation:
-- 1. Vul Jotform in: https://form.jotform.com/260425117052042
-- 2. Check Slack binnen 2 seconden
-- 3. Check admin panel voor draft
--
-- ✅ Als je Slack notificatie ziet → ALLES WERKT!
-- ═══════════════════════════════════════════════════════════════
