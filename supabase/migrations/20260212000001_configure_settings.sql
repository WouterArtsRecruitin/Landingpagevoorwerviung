-- Configure database settings for automation
ALTER DATABASE postgres SET app.settings.supabase_url = 'https://vaiikkhaulkqdknwvroj.supabase.co';
ALTER DATABASE postgres SET app.settings.frontend_url = 'http://localhost:3000';
ALTER DATABASE postgres SET app.settings.slack_webhook_url = 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK';
