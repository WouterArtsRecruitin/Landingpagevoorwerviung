# 🔵 Engineering Template - Complete Setup Guide

## 📋 Wat is dit?

Dit is een **complete, production-ready** Engineering recruitment landing page template voor Lovable.dev.

**Features:**
- ✨ Modern, tech-focused blue design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Connected met Supabase voor dynamic data
- 🎨 Smooth animations en transitions
- 📧 Working application form
- 🚀 Ready to deploy

---

## 🚀 Setup in Lovable (Stap voor Stap)

### Stap 1: Nieuw Lovable Project

1. Ga naar **https://lovable.dev**
2. Klik op **"New Project"**
3. **Project naam:** `Engineering Landing Pages`
4. **Beschrijving:** `Tech recruitment landing pages - Engineering style`
5. Klik **"Create Project"**

### Stap 2: Supabase Integratie

**In Lovable:**
1. Ga naar **Settings** (tandwiel icoon)
2. Klik op **"Integrations"** tab
3. Zoek **"Supabase"**
4. Klik **"Connect Supabase"**

**Vul in:**
```
Supabase URL: [JE_SUPABASE_URL_HIER]
Supabase Anon Key: [JE_SUPABASE_ANON_KEY_HIER]
```

**Waar vind ik deze?**
- Check je `.env` bestand in je huidige project
- OF ga naar Supabase Dashboard → Project Settings → API

### Stap 3: Files Toevoegen

**Maak de volgende files aan in Lovable:**

#### File 1: `src/pages/EngineeringLanding.tsx`
- Klik op **"+ New File"** in Lovable
- Plak de complete code uit `EngineeringLanding.tsx`
- Save

#### File 2: `src/App.tsx`
- Open bestaande `src/App.tsx`
- Vervang met code uit `App.tsx`
- Save

#### File 3: Check `src/lib/supabase.ts`
- Lovable heeft dit automatisch aangemaakt bij Supabase integratie
- Check of het er is
- Als niet: maak aan met:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Stap 4: Dependencies Checken

Lovable installeert meestal automatisch, maar check:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.x.x",
    "react-router-dom": "^6.x.x",
    "lucide-react": "^0.x.x"
  }
}
```

Als iets ontbreekt, typ in Lovable chat:
> "Install @supabase/supabase-js, react-router-dom, and lucide-react"

### Stap 5: Testen Lokaal

In Lovable preview:

1. Ga naar `/` → Zie homepage
2. Ga naar `/v/asml-mechanical-engineer-1` → Moet landing page laden
3. Check of data wordt geladen uit Supabase
4. Test application form
5. Test responsive (mobile view)

**Troubleshooting:**
- **Geen data?** → Check Supabase credentials
- **404 op /v/slug?** → Check App.tsx routing
- **Form werkt niet?** → Check Supabase RLS policies voor `applications` tabel

### Stap 6: Deploy

1. In Lovable, klik **"Deploy"** (rocket icoon)
2. Lovable bouwt en host automatisch
3. Je krijgt een URL: `https://jouw-project.lovable.app`
4. Test deployed versie!

---

## 🧪 Test Checklist

Test deze scenario's:

- [ ] Homepage (`/`) toont correct
- [ ] Landing page (`/v/asml-mechanical-engineer-1`) laadt
- [ ] Alle secties tonen: Hero, Job Description, Responsibilities, Requirements, Benefits, Form, Contact
- [ ] Data komt uit Supabase (check company name, salary, etc.)
- [ ] Form submission werkt (ga naar Supabase → `applications` tabel)
- [ ] Calendly button werkt (als URL is ingevuld)
- [ ] Contact email/phone klikbaar
- [ ] Responsive op mobile/tablet
- [ ] Smooth animations werken
- [ ] Loading state toont bij laden
- [ ] 404 page bij non-existent slug

---

## 🎨 Design Details

### Kleuren (Engineering Theme)
- **Primary Blue:** `#3B82F6` (rgb(59, 130, 246))
- **Dark Blue:** `#1E40AF` (rgb(30, 64, 175))
- **Light Blue:** `#60A5FA` (rgb(96, 165, 250))
- **Background:** Gradient `from-blue-50 to-indigo-100`

### Typography
- **Headings:** Bold, large sizes (4xl - 7xl)
- **Body:** Text-lg/xl, relaxed leading
- **Accent:** Uppercase tracking for labels

### Components
- **Cards:** Rounded-2xl met shadow-lg
- **Buttons:** Rounded-xl met hover scale
- **Inputs:** Rounded-xl met focus ring
- **Icons:** Lucide React (5-6 sizes)

---

## 📊 Database Requirements

Deze velden moeten in Supabase zitten (tabel: `landing_pages`):

**Required:**
- `slug` (TEXT, unique)
- `status` (TEXT, moet 'published' zijn)
- `page_title` (TEXT)
- `company_name` (TEXT)
- `location` (TEXT)
- `job_type` (TEXT)
- `salary_min` (INTEGER)
- `salary_max` (INTEGER)
- `job_description` (TEXT)

**Optional:**
- `hero_headline` (TEXT) - fallback naar page_title
- `hero_subheadline` (TEXT) - fallback naar job_description
- `responsibilities` (TEXT[])
- `requirements` (TEXT[])
- `benefits` (TEXT[])
- `contact_person_name` (TEXT)
- `contact_person_email` (TEXT)
- `contact_person_phone` (TEXT)
- `calendly_url` (TEXT)
- `company_website` (TEXT)

**Applications Table:**
- `page_id` (UUID, FK naar landing_pages)
- `applicant_name` (TEXT)
- `applicant_email` (TEXT)
- `applicant_phone` (TEXT)
- `linkedin_url` (TEXT)
- `motivation` (TEXT)
- `created_at` (TIMESTAMPTZ)

---

## 🔗 URL Mapping

**In je Admin Panel:**

Update de "Bekijk" links om te wijzen naar Lovable:

```typescript
const lovableUrl = 'https://jouw-project.lovable.app';
const viewUrl = `${lovableUrl}/v/${page.slug}`;
```

**Voorbeelden:**
- ASML Engineer → `https://jouw-project.lovable.app/v/asml-mechanical-engineer-1`
- Exact Developer → `https://jouw-project.lovable.app/v/exact-senior-developer-1`

---

## 🎯 Volgende Stappen

Na deze Engineering template werkt:

1. **Test grondig** met echte data
2. **Verzamel feedback** van team
3. **Itereer op design** indien nodig
4. **Kopieer naar andere templates:**
   - Sales (groen)
   - Tech Startup (paars)
   - Corporate (navy)
   - Creative (oranje)
   - Finance (donkerblauw)

Alleen kleuren/styling aanpassen, logica blijft zelfde!

---

## 💡 Tips

**Performance:**
- Lovable host automatisch met CDN
- Images worden geoptimaliseerd
- Code wordt geminified

**SEO:**
- Voeg `<title>` en `<meta>` tags toe in Lovable
- Open Graph voor social sharing
- Structured data voor Google Jobs

**Analytics:**
- Voeg Google Analytics toe via Lovable integrations
- Track form submissions
- A/B test verschillende CTA's

---

## 🆘 Hulp Nodig?

**Lovable Errors:**
- Check Lovable console (F12)
- Lovable logs tonen build errors

**Supabase Errors:**
- Check Row Level Security policies
- Verify credentials in env vars
- Test queries in Supabase SQL editor

**Deployment Issues:**
- Clear Lovable cache en rebuild
- Check domain/SSL settings
- Verify all env vars zijn set

---

**Succes met je Engineering template!** 🚀

Questions? Check Lovable docs: https://docs.lovable.dev
