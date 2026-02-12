# 🚀 Auto-Generate Engineering Template in Lovable

## Method: Lovable Build with URL API

Klik op deze link om automatisch het Engineering template te genereren:

**👉 [KLIK HIER OM ENGINEERING TEMPLATE TE MAKEN](https://lovable.dev/?autosubmit=true#prompt=Create%20a%20professional%20recruitment%20landing%20page%20for%20engineering%20positions%20with%20React%20TypeScript%20Vite%20Supabase%20integration%20React%20Router%20Tailwind%20CSS%20and%20Lucide%20React%20icons.%20Setup%20routes%20in%20App.tsx%20homepage%20at%20root%20dynamic%20landing%20page%20at%20/v/:slug%20that%20fetches%20from%20Supabase%20and%20404%20page.%20Create%20Supabase%20client%20in%20src/lib/supabase.ts%20using%20environment%20variables.%20Database%20schema%20reads%20from%20landing_pages%20table%20with%20fields%20slug%20status%20page_title%20company_name%20company_website%20location%20job_type%20salary_min%20salary_max%20hero_headline%20hero_subheadline%20job_description%20responsibilities%20array%20requirements%20array%20benefits%20array%20contact%20person%20details%20and%20calendly_url.%20Applications%20saved%20to%20applications%20table.%20Design%20theme%20Engineering%20Blue%20with%20primary%20color%203B82F6%20secondary%201E40AF%20accent%2060A5FA%20and%20gradients%20from%20blue-50%20to%20indigo-100.%20Page%20structure%20includes%20Hero%20section%20with%20gradient%20background%20badge%20large%20headline%20meta%20info%20pills%20two%20CTA%20buttons%20and%20visual%20card.%20Job%20description%20section%20with%20readable%20text.%20Responsibilities%20section%20with%202-column%20grid%20white%20cards%20and%20CheckCircle2%20icons.%20Requirements%20section%20with%20gray%20cards%20and%20Star%20icons.%20Benefits%20section%20with%20blue%20gradient%20background%20white%20text%203-column%20grid.%20Application%20form%20with%20name%20email%20phone%20LinkedIn%20and%20motivation%20fields%20that%20saves%20to%20Supabase%20with%20success%20state.%20Contact%20section%20with%20dark%20background%20and%20email%20phone%20buttons.%20Footer%20with%20copyright.%20Include%20loading%20state%20with%20spinner%20404%20state%20for%20invalid%20slugs%20rounded%20corners%20hover%20effects%20smooth%20animations%20and%20responsive%20mobile-first%20design%20using%20lucide-react%20icons%20Building2%20MapPin%20Clock%20Euro%20CheckCircle2%20Star%20ArrowRight%20Mail%20Phone%20Calendar%20Sparkles%20Target%20and%20Award)**

---

## Of via Terminal:

Als je Lovable API access hebt, run deze command:

```bash
# Option 1: Open URL in browser
open "https://lovable.dev/?autosubmit=true#prompt=CREATE_ENGINEERING_TEMPLATE"

# Option 2: Via curl (als je API key hebt)
curl -X POST https://api.lovable.dev/v1/projects \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Engineering Landing Pages",
    "prompt": "Create recruitment landing page template...",
    "auto_build": true
  }'
```

---

## Of Handmatig via Lovable Chat:

1. Ga naar https://lovable.dev
2. Start nieuw project
3. Plak deze prompt in de chat:

```
Create a professional recruitment landing page for engineering positions.

TECH STACK:
- React + TypeScript + Vite
- Supabase for database
- React Router (routes: /, /v/:slug, /*)
- Tailwind CSS
- Lucide React icons

SUPABASE SETUP:
Table: landing_pages (slug, status, page_title, company_name, location, job_type, salary_min/max, hero_headline, hero_subheadline, job_description, responsibilities[], requirements[], benefits[], contact_person_name/email/phone, calendly_url)
Table: applications (page_id, applicant_name/email/phone, linkedin_url, motivation)

DESIGN: Engineering Blue Theme
- Primary: #3B82F6, Secondary: #1E40AF, Accent: #60A5FA
- Gradients: from-blue-50 to-indigo-100

PAGE SECTIONS:
1. Hero: gradient bg, badge, large headline, meta pills (company/location/salary), 2 CTAs (apply + calendly)
2. Job Description: clean readable text
3. Responsibilities: 2-col grid, white cards, CheckCircle2 icons, hover effects
4. Requirements: 2-col grid, gray cards, Star icons
5. Benefits: blue gradient bg, white text, 3-col grid
6. Application Form: name, email, phone, linkedin, motivation → save to Supabase, show success state
7. Contact: dark bg, email/phone buttons
8. Footer: copyright

FEATURES:
- Loading state with spinner
- 404 for invalid/unpublished slugs
- Responsive mobile-first
- Smooth animations (300ms)
- Form validation
- Auto-scroll to success message after submit

Generate complete working project!
```

---

## Wat gebeurt er?

1. Lovable AI genereert automatisch:
   - Complete file structure
   - All components
   - Routing setup
   - Supabase integration
   - Styling

2. Jij hoeft alleen:
   - Supabase credentials toe te voegen (Settings → Integrations)
   - Te testen met `/v/asml-mechanical-engineer-1`
   - Te deployen!

---

**Klaar in ~5 minuten!** 🚀
