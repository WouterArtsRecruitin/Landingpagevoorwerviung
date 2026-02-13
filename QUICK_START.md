# ⚡ Quick Start - Jotform Automation

## 🎯 Morgen Ochtend - 3 Stappen

### Stap 1: Run Database Config (2 min)

Ga naar: **https://supabase.com/dashboard/project/vaiikkhaulkqdknwvroj/sql**

Plak en voer uit:
```sql
ALTER DATABASE postgres SET app.settings.supabase_url = 'https://vaiikkhaulkqdknwvroj.supabase.co';
ALTER DATABASE postgres SET app.settings.frontend_url = 'http://localhost:3000';
ALTER DATABASE postgres SET app.settings.slack_webhook_url = 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK';
```

### Stap 2: Test het Formulier (1 min)

Open: **https://form.jotform.com/260425117052042**

Vul in met test data en klik Submit.

### Stap 3: Check Slack (10 sec)

Kijk in: **#nieuwe-vacature**

Zie je notificatie? → ✅ **ALLES WERKT!**

---

## 📋 Volledige Test Flow

```bash
# 1. Start frontend (als niet al draait)
cd /Users/wouterarts/projects/landing-page-recruitment
npm run dev

# 2. Open admin panel
open http://localhost:3000/admin/pages

# 3. Open Jotform
open https://form.jotform.com/260425117052042

# 4. Open Slack
open https://recruitinworkspace.slack.com/archives/C0AEMF1K9B8
```

---

## 🚀 Als het werkt - Go Live

```bash
# Update naar productie URL
supabase secrets set FRONTEND_URL=https://vacatures.recruitin.nl

# Update database config
# Run in Supabase SQL Editor:
# ALTER DATABASE postgres SET app.settings.frontend_url = 'https://vacatures.recruitin.nl';

# Deploy frontend
npm run build
# (deploy naar je hosting)
```

---

## 📊 Test Submissions Aangemaakt

Claude heeft deze test submissions aangemaakt vannacht:

1. **ASML Netherlands** - Senior Servicemonteur (Engineering template)
2. **Philips Medical Systems** - Service Engineer (Tech template)

Check je admin panel morgen of deze als DRAFT staan! ✅

---

## 🎯 Verwacht Resultaat

Na Jotform submission:
- ✅ Slack notificatie in #nieuwe-vacature binnen 2 sec
- ✅ Email naar contact persoon (check inbox)
- ✅ Landing page in admin panel (status: DRAFT)

Na kandidaat sollicitatie:
- ✅ Email naar kandidaat (bevestiging)
- ✅ Email naar recruiter (nieuwe sollicitatie)
- ✅ Slack notificatie

Follow-up:
- ✅ Dag 3: Email naar kandidaat (update)
- ✅ Dag 7: Email naar kandidaat (laatste reminder)

---

**Klaar om te rocken!** 🎸

Volledige documentatie: `/docs/PRODUCTION_SETUP.md`
