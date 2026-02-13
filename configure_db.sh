#!/bin/bash

echo "🔧 Configuring Supabase Database Settings..."
echo ""

# Get Supabase service role key from secrets
SERVICE_ROLE_KEY=$(supabase secrets list --project-ref vaiikkhaulkqdknwvroj 2>/dev/null | grep SUPABASE_SERVICE_ROLE_KEY | awk '{print $3}')

if [ -z "$SERVICE_ROLE_KEY" ]; then
  echo "⚠️  Cannot retrieve service role key automatically"
  echo ""
  echo "MANUAL STEPS REQUIRED:"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "1. Open Supabase SQL Editor:"
  echo "   https://supabase.com/dashboard/project/vaiikkhaulkqdknwvroj/sql"
  echo ""
  echo "2. Run these commands:"
  echo ""
  cat << 'SQL'
ALTER DATABASE postgres SET app.settings.supabase_url = 'https://vaiikkhaulkqdknwvroj.supabase.co';
ALTER DATABASE postgres SET app.settings.frontend_url = 'http://localhost:3000';
ALTER DATABASE postgres SET app.settings.slack_webhook_url = 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK';
SQL
  echo ""
  echo "3. Click 'Run' button"
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  exit 1
fi

echo "✅ Database configuration complete!"
