-- ═══════════════════════════════════════════════════════════════
-- FIX: Database Config - Alternatieve Aanpak
-- ═══════════════════════════════════════════════════════════════
--
-- De ALTER DATABASE commando's vereisen superuser rechten.
-- We gebruiken nu een settings TABLE in plaats daarvan.
--
-- ═══════════════════════════════════════════════════════════════

-- 1. Create settings table
CREATE TABLE IF NOT EXISTS public.automation_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Insert configuration values
INSERT INTO public.automation_settings (key, value, description)
VALUES
  ('supabase_url', 'https://vaiikkhaulkqdknwvroj.supabase.co', 'Supabase project URL'),
  ('frontend_url', 'http://localhost:3000', 'Frontend application URL'),
  ('slack_webhook_url', 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK', 'Slack webhook for notifications')
ON CONFLICT (key) DO UPDATE
  SET value = EXCLUDED.value,
      updated_at = NOW();

-- 3. Create helper function to get settings
CREATE OR REPLACE FUNCTION get_automation_setting(setting_key TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN (SELECT value FROM public.automation_settings WHERE key = setting_key);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Grant permissions
GRANT SELECT ON public.automation_settings TO authenticated, anon, service_role;
GRANT EXECUTE ON FUNCTION get_automation_setting(TEXT) TO authenticated, anon, service_role;

-- 5. Enable RLS
ALTER TABLE public.automation_settings ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policy (read-only for all)
CREATE POLICY "Settings are viewable by everyone" ON public.automation_settings
  FOR SELECT USING (true);

-- ═══════════════════════════════════════════════════════════════
-- DONE! Settings zijn nu opgeslagen in een table.
-- ═══════════════════════════════════════════════════════════════
--
-- Test met:
-- SELECT get_automation_setting('slack_webhook_url');
--
-- ═══════════════════════════════════════════════════════════════
