-- ═══════════════════════════════════════════════════════════════
-- UPDATE: Triggers om table-based settings te gebruiken
-- ═══════════════════════════════════════════════════════════════
--
-- Deze update past de trigger functions aan om settings te lezen
-- uit de automation_settings table i.p.v. current_setting()
--
-- ═══════════════════════════════════════════════════════════════

-- Update handle_new_application trigger function
CREATE OR REPLACE FUNCTION handle_new_application()
RETURNS trigger AS $$
DECLARE
  page_data RECORD;
  email_response TEXT;
  v_supabase_url TEXT;
  v_frontend_url TEXT;
  v_slack_webhook TEXT;
BEGIN
  -- Get settings from table
  v_supabase_url := get_automation_setting('supabase_url');
  v_frontend_url := get_automation_setting('frontend_url');
  v_slack_webhook := get_automation_setting('slack_webhook_url');

  -- Get landing page data for this application
  SELECT * INTO page_data
  FROM landing_pages
  WHERE id = NEW.page_id;

  -- Send confirmation email to candidate
  PERFORM extensions.http((
    'POST',
    v_supabase_url || '/functions/v1/send-email',
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

  -- Send notification email to recruiter
  PERFORM extensions.http((
    'POST',
    v_supabase_url || '/functions/v1/send-email',
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
    v_slack_webhook,
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

-- Update send_followup_emails function
CREATE OR REPLACE FUNCTION send_followup_emails()
RETURNS void AS $$
DECLARE
  app_record RECORD;
  page_data RECORD;
  days_since_application INTEGER;
  v_supabase_url TEXT;
  v_frontend_url TEXT;
BEGIN
  -- Get settings from table
  v_supabase_url := get_automation_setting('supabase_url');
  v_frontend_url := get_automation_setting('frontend_url');

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
          v_supabase_url || '/functions/v1/send-email',
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
          v_supabase_url || '/functions/v1/send-email',
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

        -- Mark as sent
        INSERT INTO followup_emails (application_id, email_type)
        VALUES (app_record.id, 'day7');
      END IF;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ═══════════════════════════════════════════════════════════════
-- DONE! Triggers gebruiken nu table-based settings.
-- ═══════════════════════════════════════════════════════════════
--
-- Test met:
-- SELECT send_followup_emails(); -- Should work zonder errors
--
-- ═══════════════════════════════════════════════════════════════
