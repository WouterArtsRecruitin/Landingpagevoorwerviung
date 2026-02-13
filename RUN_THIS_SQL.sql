-- ═══════════════════════════════════════════════════════════════
-- DATABASE CONFIG - RUN DIT IN SUPABASE SQL EDITOR
-- ═══════════════════════════════════════════════════════════════
-- 
-- Ga naar: https://supabase.com/dashboard/project/vaiikkhaulkqdknwvroj/sql
-- Plak onderstaande SQL en klik "Run"
--
-- ═══════════════════════════════════════════════════════════════

-- Configure database settings voor automation triggers
ALTER DATABASE postgres SET app.settings.supabase_url = 'https://vaiikkhaulkqdknwvroj.supabase.co';
ALTER DATABASE postgres SET app.settings.frontend_url = 'http://localhost:3000';
ALTER DATABASE postgres SET app.settings.slack_webhook_url = 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK';

-- ═══════════════════════════════════════════════════════════════
-- KLAAR! Check of het werkt:
-- ═══════════════════════════════════════════════════════════════
-- 
-- 1. Test Jotform: https://form.jotform.com/260425117052042
-- 2. Check Slack: https://recruitinworkspace.slack.com/archives/C0AEMF1K9B8
-- 3. Check Admin: http://localhost:3000/admin/pages
--
-- Als je Slack notificatie ziet → ALLES WERKT! ✅
--
-- ═══════════════════════════════════════════════════════════════
