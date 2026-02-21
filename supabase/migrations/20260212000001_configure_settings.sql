-- Configure database settings for automation
-- IMPORTANT: Update these with actual values before deploying to production
ALTER DATABASE postgres SET app.settings.supabase_url = 'https://vaiikkhaulkqdknwvroj.supabase.co';
ALTER DATABASE postgres SET app.settings.frontend_url = 'http://localhost:3000';
ALTER DATABASE postgres SET app.settings.slack_webhook_url = '';
-- Set this to your Supabase service role key for internal edge function calls
ALTER DATABASE postgres SET app.settings.service_role_key = '';
