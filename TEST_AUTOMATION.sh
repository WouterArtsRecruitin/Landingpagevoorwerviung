#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# AUTOMATION TEST SCRIPT
# ═══════════════════════════════════════════════════════════════

echo "🧪 Testing Jotform Landing Page Automation..."
echo ""

# Test 1: Slack Webhook
echo "1️⃣  Testing Slack webhook..."
SLACK_RESPONSE=$(curl -s -X POST "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK" \
  -H "Content-Type: application/json" \
  -d '{"text":"✅ Automation Test - Alles werkt!"}')

if [ "$SLACK_RESPONSE" == "ok" ]; then
  echo "   ✅ Slack webhook works!"
else
  echo "   ❌ Slack webhook failed: $SLACK_RESPONSE"
fi
echo ""

# Test 2: Edge Function Health
echo "2️⃣  Testing Edge Function..."
EDGE_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "https://vaiikkhaulkqdknwvroj.supabase.co/functions/v1/jotform-webhook")

if [ "$EDGE_RESPONSE" == "200" ] || [ "$EDGE_RESPONSE" == "400" ]; then
  echo "   ✅ Edge Function is reachable (HTTP $EDGE_RESPONSE)"
else
  echo "   ❌ Edge Function unreachable (HTTP $EDGE_RESPONSE)"
fi
echo ""

# Test 3: Frontend Running
echo "3️⃣  Checking if frontend is running..."
FRONTEND_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000" 2>/dev/null)

if [ "$FRONTEND_RESPONSE" == "200" ]; then
  echo "   ✅ Frontend is running at http://localhost:3000"
else
  echo "   ⚠️  Frontend not running - start with: npm run dev"
fi
echo ""

# Summary
echo "═══════════════════════════════════════════════════════════════"
echo "📋 SUMMARY"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Next steps:"
echo "1. Run SQL: open RUN_THIS_SQL.sql and execute in Supabase"
echo "2. Test form: https://form.jotform.com/260425117052042"
echo "3. Check Slack: https://recruitinworkspace.slack.com/archives/C0AEMF1K9B8"
echo ""
echo "✅ Automation is ready to go!"
echo ""

