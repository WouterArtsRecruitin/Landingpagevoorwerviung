# 📝 Jotform Automation Setup Guide

## Overzicht

Dit document legt uit hoe je Jotform koppelt aan de landing page automation, zodat medewerkers/klanten een simpel formulier kunnen invullen en er automatisch een vacaturepagina wordt gegenereerd.

---

## 🎯 Automation Flow

```
[Medewerker vult Jotform in]
          ↓
[Jotform Webhook fired]
          ↓
[Supabase Edge Function: jotform-webhook]
          ├─ Validatie ✅/❌
          ├─ Genereer landing page config
          ├─ Opslaan in database (DRAFT status)
          ├─ Slack notificatie
          └─ Email naar admin
          ↓
[Admin publiceert via dashboard]
          ↓
[Pagina live op /v/{slug}]
```

---

## 📋 Stap 1: Maak Jotform Formulier

### 1.1 Login in Jotform
Ga naar: https://eu.jotform.com/myaccount/

### 1.2 Create New Form
Klik op **"Create Form"** → **"Start from Scratch"**

### 1.3 Voeg Velden Toe

**REQUIRED FIELDS (verplicht):**

| Label | Fieldtype | Field Name | Voorbeeld |
|-------|-----------|------------|-----------|
| Bedrijfsnaam | Single Line Text | `bedrijfsnaam` | ASML |
| Functietitel | Single Line Text | `functietitel` | Servicemonteur |
| Locatie | Single Line Text | `locatie` | Holten, Overijssel |
| Contactpersoon Naam | Full Name | `contact_naam` | Jan de Vries |
| Contactpersoon Email | Email | `contact_email` | jan@bedrijf.nl |

**OPTIONAL FIELDS (aanbevolen):**

| Label | Fieldtype | Field Name | Voorbeeld |
|-------|-----------|------------|-----------|
| Website | Website | `website` | https://www.asml.nl |
| Branche | Dropdown | `branche` | Hightech, IT, Zorg, etc. |
| Salaris Min (€/mnd) | Number | `salaris_min` | 2800 |
| Salaris Max (€/mnd) | Number | `salaris_max` | 3800 |
| Werktype | Dropdown | `werktype` | Fulltime, Parttime, etc. |
| Vacature Beschrijving | Long Text | `beschrijving` | Als monteur bij... |
| Verantwoordelijkheden | Long Text | `verantwoordelijkheden` | Onderhoud, Storingen, etc. (comma-separated) |
| Eisen | Long Text | `eisen` | MBO niveau 3, Rijbewijs B, etc. (comma-separated) |
| Arbeidsvoorwaarden | Long Text | `arbeidsvoorwaarden` | Salaris CAO, Auto, Pensioen, etc. (comma-separated) |
| Contactpersoon Telefoon | Phone | `contact_telefoon` | +31612345678 |
| Template Style | Dropdown | `template_style` | engineering, sales, tech, corporate, creative, finance |
| Google Analytics ID | Single Line | `ga4_id` | G-XXXXXXXXXX |
| Facebook Pixel ID | Single Line | `fb_pixel_id` | 123456789 |
| LinkedIn Partner ID | Single Line | `linkedin_partner_id` | 1234567 |

### 1.4 Template Style Dropdown Options

Voeg deze opties toe aan het `template_style` dropdown veld:

- **engineering** - Blauw, tech-focused (machines, techniek)
- **sales** - Groen, conversion-focused (verkoop, commercieel)
- **tech** - Paars, modern (IT, software, developers)
- **corporate** - Navy, professioneel (finance, consultancy)
- **creative** - Oranje, playful (marketing, design, media)
- **finance** - Donkerblauw, trustworthy (banking, accounting)

---

## 🔗 Stap 2: Koppel Webhook

### 2.1 Open Form Settings
In Jotform → **Settings** → **Integrations**

### 2.2 Zoek naar "Webhooks"
Klik op **"Webhooks"** integratie

### 2.3 Voeg Webhook URL toe

**Webhook URL:**
```
https://[YOUR_SUPABASE_PROJECT].supabase.co/functions/v1/jotform-webhook
```

Vervang `[YOUR_SUPABASE_PROJECT]` met je Supabase project URL.

**Voorbeeld:**
```
https://abcdefghijk.supabase.co/functions/v1/jotform-webhook
```

### 2.4 Test de Webhook
1. Klik **"Add Webhook"**
2. Vul een test-formulier in
3. Check Slack voor notificatie
4. Check Supabase database voor nieuwe `landing_pages` record

---

## ⚙️ Stap 3: Deploy Edge Function

### 3.1 Login in Supabase CLI
```bash
supabase login
```

### 3.2 Link Project
```bash
supabase link --project-ref [YOUR_PROJECT_ID]
```

### 3.3 Deploy Functions
```bash
supabase functions deploy jotform-webhook
supabase functions deploy send-email
```

### 3.4 Set Environment Variables

In Supabase Dashboard → **Edge Functions** → **Environment Variables**:

```
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
RESEND_API_KEY=re_YOUR_RESEND_API_KEY
FRONTEND_URL=https://vacatures.recruitin.nl (of http://localhost:3000 voor dev)
```

---

## 🔥 Stap 4: Run Database Migration

### 4.1 Apply Migration
```bash
supabase db push
```

Dit installeert:
- ✅ Trigger voor automatische emails bij nieuwe sollicitatie
- ✅ Follow-up email systeem (dag 3 en dag 7)
- ✅ Cron job (dagelijks 10:00)

### 4.2 Configure Database Settings

In Supabase SQL Editor, run:

```sql
ALTER DATABASE postgres SET app.settings.supabase_url = 'https://[YOUR_PROJECT].supabase.co';
ALTER DATABASE postgres SET app.settings.frontend_url = 'https://vacatures.recruitin.nl';
```

---

## ✅ Stap 5: Testen

### 5.1 Test Jotform Submission
1. Vul je Jotform in met **complete data** (alle required fields)
2. Verwacht resultaat:
   - ✅ Slack notificatie: "Nieuwe vacature klaar voor review"
   - ✅ Email naar contact_email: "Vacature klaar"
   - ✅ Database: nieuwe record in `landing_pages` (status: DRAFT)

### 5.2 Test Incomplete Submission
1. Vul Jotform in maar **laat velden leeg** (bijv. geen bedrijfsnaam)
2. Verwacht resultaat:
   - ⚠️ Slack notificatie: "Incomplete submission - Missing: bedrijfsnaam, functietitel"
   - ❌ Geen landing page aangemaakt

### 5.3 Test Kandidaat Sollicitatie
1. Ga naar de draft pagina: `/v/{slug}`
2. Vul sollicitatieformulier in
3. Verwacht resultaat:
   - ✅ Email naar kandidaat: "Bedankt voor je sollicitatie"
   - ✅ Email naar recruiter: "Nieuwe sollicitatie: {naam}"
   - ✅ Slack notificatie: "Nieuwe sollicitatie"

### 5.4 Test Follow-up Emails
Manueel triggeren (voor testen):

```sql
SELECT send_followup_emails();
```

Of wacht 3/7 dagen na sollicitatie - automatisch verstuurd om 10:00.

---

## 🎨 Stap 6: Customization (Optioneel)

### 6.1 Custom Email Templates
Edit email HTML in: `supabase/functions/send-email/index.ts`

Functies:
- `generateCandidateConfirmationEmail()` - Kandidaat bevestiging
- `generateRecruiterNotificationEmail()` - Recruiter notificatie
- `generateFollowupDay3Email()` - Follow-up dag 3
- `generateFollowupDay7Email()` - Follow-up dag 7

### 6.2 Custom Slack Messages
Edit Slack message formatting in: `supabase/functions/jotform-webhook/index.ts`

Functie: `sendSlackNotification()`

### 6.3 Custom Validation Rules
Edit validation logic in: `supabase/functions/jotform-webhook/index.ts`

Functie: `validateSubmission()`

---

## 📊 Monitoring

### View Recent Jotform Submissions
```sql
SELECT id, slug, company_name, page_title, status, created_at
FROM landing_pages
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

### View Follow-up Email History
```sql
SELECT f.*, a.applicant_name, a.applicant_email
FROM followup_emails f
JOIN applications a ON f.application_id = a.id
ORDER BY f.created_at DESC
LIMIT 20;
```

### View Scheduled Jobs
```sql
SELECT * FROM cron.job;
```

### Test Edge Function Logs
Supabase Dashboard → **Edge Functions** → **jotform-webhook** → **Logs**

---

## 🚨 Troubleshooting

### Webhook niet fired?
- Check Jotform webhook settings (moet POST zijn)
- Check Edge Function logs in Supabase
- Test webhook URL in browser: `GET https://[project].supabase.co/functions/v1/jotform-webhook` (moet 200 of error geven, niet 404)

### Emails niet verzonden?
- Check Resend dashboard: https://resend.com/emails
- Check Edge Function logs: `send-email`
- Verify `RESEND_API_KEY` env var is set

### Slack notificaties niet ontvangen?
- Test webhook URL in terminal:
  ```bash
  curl -X POST $SLACK_WEBHOOK_URL \
    -H "Content-Type: application/json" \
    -d '{"text":"Test from terminal"}'
  ```
- Check Edge Function logs

### Follow-up emails niet automatisch verstuurd?
- Check cron job status: `SELECT * FROM cron.job;`
- Manually trigger: `SELECT send_followup_emails();`
- Check `followup_emails` table for sent records

---

## 📝 Next Steps

Na setup:
1. ✅ Deel Jotform link met team/klanten
2. ✅ Monitor Slack voor nieuwe submissions
3. ✅ Review + publiceer drafts via `/admin/pages`
4. ✅ Track analytics via `/admin/analytics`

---

**Setup complete!** 🎉

Vragen? Check de Supabase Edge Function logs of Slack notificaties voor debugging.
