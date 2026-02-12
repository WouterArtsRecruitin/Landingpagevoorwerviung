# 🤖 Complete Automation Overview

## Wat is er gebouwd?

Een **volledig geautomatiseerd recruitment landing page systeem** met:
- ✅ Jotform → Landing Page automatisch
- ✅ Email flows voor kandidaten + recruiters
- ✅ Slack notificaties
- ✅ Follow-up sequences
- ✅ Admin dashboard voor beheer

**Geen handmatig werk meer** - alles is automated!

---

## 🔄 Automation Flows

### Flow 1: Jotform → Landing Page

```
┌─────────────────────────────────────────────────────────┐
│ Medewerker/Klant vult Jotform in                       │
│ (bedrijfsnaam, functie, locatie, etc.)                 │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ Jotform Webhook triggers                                │
│ POST → /functions/v1/jotform-webhook                   │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ Edge Function: Validatie Check                         │
│ • Bedrijfsnaam ingevuld? ✅                             │
│ • Functietitel ingevuld? ✅                             │
│ • Locatie ingevuld? ✅                                  │
│ • Contact email format correct? ✅                      │
│ • Salaris min < max? ✅                                 │
└────────────┬───────────────────────┬────────────────────┘
             │ VALID ✅              │ INVALID ❌
             ▼                       ▼
┌──────────────────────┐   ┌─────────────────────────────┐
│ Generate Config      │   │ ⚠️ Slack Notificatie:       │
│                      │   │ "Incomplete intake"         │
│ • Auto-slug          │   │                             │
│ • 6 template styles  │   │ Email naar medewerker:      │
│ • Hero content       │   │ "Deze velden ontbreken:"    │
│ • SEO metadata       │   │ • bedrijfsnaam              │
│ • Analytics IDs      │   │ • functietitel              │
│                      │   │                             │
│ Save to DB           │   │ ❌ Geen pagina gemaakt      │
│ Status: DRAFT        │   └─────────────────────────────┘
└──────────┬───────────┘
           │
           ├────────────────────────────────────────┐
           │                                        │
           ▼                                        ▼
┌──────────────────────────┐   ┌──────────────────────────┐
│ ✅ Slack Notificatie:    │   │ 📧 Email naar Admin:     │
│ "Nieuwe vacature klaar"  │   │ "Review en publiceer"    │
│                          │   │                          │
│ Link naar admin          │   │ [Bekijk in Dashboard →]  │
└──────────────────────────┘   └──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────┐
│ Admin Dashboard (/admin/pages)                         │
│ • Review draft                                          │
│ • Click "Publiceer"                                     │
│ • Status: DRAFT → PUBLISHED                             │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ 🎉 Pagina Live!                                         │
│ URL: https://vacatures.recruitin.nl/v/{slug}           │
│                                                         │
│ Email naar medewerker: "Je vacature is live!"          │
└─────────────────────────────────────────────────────────┘
```

**Tijd:** 5 minuten (Jotform invullen) → 2 minuten (admin review) = **7 minuten total**

---

### Flow 2: Kandidaat Solliciteert

```
┌─────────────────────────────────────────────────────────┐
│ Kandidaat op landing page                              │
│ Klikt "Solliciteer Direct"                             │
│ Scrollt naar formulier (#apply)                        │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ Vult formulier in:                                      │
│ • Naam, Email, Telefoon                                 │
│ • LinkedIn (optioneel)                                  │
│ • Motivatie                                             │
│ • ✅ Privacy checkbox (VERPLICHT)                       │
│ • Upload CV (optioneel)                                 │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ Submit → Save to Supabase                               │
│ Table: applications                                     │
│ Status: PENDING                                         │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼ (Database Trigger fires)
┌─────────────────────────────────────────────────────────┐
│ Trigger: on_new_application                            │
│ Automatically calls 3 services in parallel:            │
└──┬──────────────┬──────────────────┬────────────────────┘
   │              │                  │
   │              │                  │
   ▼              ▼                  ▼
┌──────────┐  ┌──────────┐    ┌──────────────────┐
│ Email 1  │  │ Email 2  │    │ Slack            │
│ Kandidaat│  │ Recruiter│    │ Notificatie      │
└──────────┘  └──────────┘    └──────────────────┘

```

**Email 1: Naar Kandidaat** (< 1 minuut)

```
Van: noreply@recruitin.nl
Aan: kandidaat@email.com
Onderwerp: ✅ Sollicitatie Ontvangen!

Bedankt voor je sollicitatie!
We nemen binnen 2 werkdagen contact op.

[Bekijk Vacature →]
```

**Email 2: Naar Recruiter** (direct)

```
Van: noreply@recruitin.nl
Aan: recruiter@bedrijf.nl
Onderwerp: 🔔 Nieuwe Sollicitatie: Jan Jansen

Nieuwe sollicitatie ontvangen:

Kandidaat: Jan Jansen
Email: jan@email.com
Telefoon: 0612345678
LinkedIn: linkedin.com/in/janjansen

Motivatie:
"Ik ben zeer geïnteresseerd..."

[Bekijk in Admin →] [Download CV]
```

**Slack Notificatie** (#recruitment channel)

```
🎯 Nieuwe Sollicitatie!

Kandidaat: Jan Jansen
Vacature: ASML Servicemonteur
Email: jan@email.com

[Bekijk in Admin →]
```

---

### Flow 3: Follow-up Sequence

```
Dag 0: Kandidaat solliciteert
  ↓
  ✅ Email 1: "Bedankt!" (direct)
  ↓
Dag 3: Recruiter nog niet gereageerd?
  ↓
  📧 Email 2: "We zijn je CV aan het beoordelen"
  ↓
Dag 7: Recruiter nog niet gereageerd?
  ↓
  💬 Email 3: "Ben je nog geïnteresseerd?"
         + CTA: "Plan een gesprek"
```

**Automatisch verstuurd om 10:00** elke dag via Cron Job.

**Email 2 (Dag 3):**
```
Onderwerp: Update over je sollicitatie

We wilden je even laten weten dat we je sollicitatie
zorgvuldig aan het beoordelen zijn.

We laten je snel weten wat de vervolgstappen zijn.
```

**Email 3 (Dag 7):**
```
Onderwerp: Ben je nog geïnteresseerd?

Een weekje geleden solliciteerde je bij ons.
Ben je nog steeds geïnteresseerd?

[📅 Plan een Gesprek →]

💡 Tip: De meeste vacatures worden snel ingevuld!
```

---

## 🛠️ Technische Architectuur

### Components

```
Frontend (React + Vite)
  ├─ Landing Pages (/v/{slug})
  ├─ Admin Dashboard (/admin)
  └─ Sollicitatie Formulier

Backend (Supabase)
  ├─ PostgreSQL Database
  │   ├─ landing_pages (vacatures)
  │   ├─ applications (sollicitaties)
  │   └─ followup_emails (tracking)
  │
  ├─ Edge Functions (Deno/TypeScript)
  │   ├─ jotform-webhook (intake processing)
  │   └─ send-email (email sender)
  │
  ├─ Database Triggers
  │   └─ on_new_application (auto emails)
  │
  └─ Cron Jobs
      └─ send_followup_emails (daily 10:00)

Integrations
  ├─ Jotform (intake formulier)
  ├─ Resend (email verzending)
  ├─ Slack (notificaties)
  ├─ GA4 (analytics)
  ├─ Facebook Pixel (retargeting)
  └─ LinkedIn Pixel (retargeting)
```

---

## 📊 What Gets Tracked

### Per Landing Page
- ✅ Pageviews (GA4)
- ✅ Scroll depth (25%, 50%, 75%, 100%)
- ✅ Time on page (30s, 60s, 120s, 5min)
- ✅ CTA clicks
- ✅ Form opens
- ✅ Sollicitaties (conversions)
- ✅ WhatsApp clicks
- ✅ Calendly clicks

### Per Kandidaat
- ✅ Sollicitatie datum
- ✅ Follow-up emails verzonden (dag 3, dag 7)
- ✅ Email opens (via Resend)
- ✅ Link clicks

### Per Recruiter
- ✅ Aantal vacatures aangemaakt
- ✅ Aantal sollicitaties ontvangen
- ✅ Response tijd (gemiddeld)

---

## 💰 Kosten

| Service | Plan | Kosten/maand | Usage |
|---------|------|--------------|-------|
| **Lovable** | Free/Pro | €0-20 | Hosting frontend |
| **Supabase** | Free | €0-25 | Database + Edge Functions |
| **Resend** | Free | €0-20 | Tot 3.000 emails/maand |
| **Jotform** | Bronze | €0-34 | Tot 1.000 submissions/maand |
| **Slack** | Free | €0 | Unlimited messages |
| **GA4** | Free | €0 | Unlimited tracking |
| **Totaal** | | **€0-99/mo** | Break-even bij 1-2 klanten |

---

## ⚙️ Environment Variables

**Required voor Edge Functions:**

```env
# Supabase
SUPABASE_URL=https://[project].supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (voor server-side)

# Frontend
FRONTEND_URL=https://vacatures.recruitin.nl (of localhost:3000)

# Email (Resend)
RESEND_API_KEY=re_VFP9be65_JW7HUJDZV9Vzz4oSwpKANNaW

# Slack
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T0992NFJ2NN/...

# Analytics (per landing page in database)
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
FB_PIXEL_ID=123456789
LINKEDIN_PARTNER_ID=1234567
```

---

## 📈 Success Metrics

**Week 1:**
- ✅ 5-10 draft pagina's aangemaakt via Jotform
- ✅ 3-5 gepubliceerd
- ✅ 10-20 sollicitaties ontvangen
- ✅ 100% email delivery rate
- ✅ 0 missed Slack notificaties

**Maand 1:**
- ✅ 30-50 landing pages live
- ✅ 100-200 sollicitaties
- ✅ 5-10% conversie rate (bezoekers → sollicitaties)
- ✅ < 2 dagen response tijd recruiter

---

## 🚀 Next Steps

### Short-term (Week 1)
1. ✅ Deploy Edge Functions naar Supabase
2. ✅ Run database migration (triggers + cron)
3. ✅ Create Jotform intake formulier
4. ✅ Test complete flow (Jotform → Email → Slack)
5. ✅ Share Jotform link met team

### Medium-term (Maand 1)
1. Monitor analytics per pagina
2. A/B test templates (conversie rates)
3. Optimize email open rates
4. Add chatbot widget (Tidio/Intercom)
5. Build recruiter dashboard (response times)

### Long-term (Kwartaal 1)
1. ATS integratie (kandidaten auto-sync)
2. Multi-tenant (aparte omgevingen per klant)
3. API voor externe systemen
4. White-label branding
5. Bulk operations (50+ vacatures tegelijk)

---

## 📚 Documentation

- **Setup Guide:** [`JOTFORM_SETUP.md`](./JOTFORM_SETUP.md)
- **Email Templates:** `supabase/functions/send-email/index.ts`
- **Webhook Logic:** `supabase/functions/jotform-webhook/index.ts`
- **Database Schema:** `supabase/migrations/`
- **Admin Dashboard:** `/admin/*`

---

## 🎯 Summary

**Automation Complete! 🎉**

Van Jotform submission tot gepubliceerde vacaturepagina in **7 minuten**.

Van sollicitatie tot bevestiging email in **< 1 minuut**.

Follow-up emails **automatisch** na 3 en 7 dagen.

**100% geautomatiseerd. 0% handmatig werk.**

---

**Klaar om te lanceren!** 🚀

Vragen? Check de setup docs of Supabase logs voor debugging.
