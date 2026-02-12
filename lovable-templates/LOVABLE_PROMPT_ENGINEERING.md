# Lovable Prompt: Engineering Landing Page Template

## 📋 Instructions

1. Ga naar https://lovable.dev
2. Start een nieuw project
3. **Copy-paste deze HELE prompt** in de chat
4. Lovable genereert automatisch het project!

---

## 🎯 PROMPT (Copy vanaf hier)

```
Create a professional recruitment landing page for engineering positions with the following specifications:

## PROJECT SETUP
- React + TypeScript + Vite
- Supabase integration for database
- React Router for routing
- Tailwind CSS for styling
- Lucide React for icons

## ROUTING
Create routes in App.tsx:
- `/` - Homepage with project info
- `/v/:slug` - Dynamic landing page (fetches from Supabase based on slug)
- `/*` - 404 page

## SUPABASE CONNECTION
File: `src/lib/supabase.ts`
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

I will provide Supabase credentials separately after project creation.

## DATABASE SCHEMA
The app reads from table `landing_pages` with these fields:
- slug (TEXT) - URL identifier
- status (TEXT) - must be 'published' to show
- page_title (TEXT)
- company_name (TEXT)
- company_website (TEXT)
- location (TEXT)
- job_type (TEXT)
- salary_min (NUMBER)
- salary_max (NUMBER)
- hero_headline (TEXT)
- hero_subheadline (TEXT)
- job_description (TEXT)
- responsibilities (TEXT[])
- requirements (TEXT[])
- benefits (TEXT[])
- contact_person_name (TEXT)
- contact_person_email (TEXT)
- contact_person_phone (TEXT)
- calendly_url (TEXT, optional)

Applications are saved to table `applications`:
- page_id (UUID)
- applicant_name (TEXT)
- applicant_email (TEXT)
- applicant_phone (TEXT)
- linkedin_url (TEXT)
- motivation (TEXT)
- created_at (TIMESTAMP)

## DESIGN THEME: ENGINEERING (BLUE)
Color scheme:
- Primary: #3B82F6 (Blue 600)
- Secondary: #1E40AF (Blue 800)
- Accent: #60A5FA (Blue 400)
- Background gradients: from-blue-50 to-indigo-100

## PAGE STRUCTURE (Component: EngineeringLanding.tsx)

### 1. HERO SECTION
- Full-width gradient background (blue theme with subtle dot pattern)
- Two-column layout (content left, visual right on desktop)
- Left side:
  - Badge: "We're Hiring Engineers!" with Sparkles icon
  - H1: hero_headline (large, bold, 5xl-7xl)
  - Subheadline: hero_subheadline (xl-2xl, gray)
  - Meta info pills showing: company_name, location, job_type, salary range (with icons)
  - Two CTA buttons:
    1. "Solliciteer Direct" (blue bg, scroll to #apply)
    2. "Plan Kennismaking" (white bg, opens calendly_url if exists)
- Right side (hidden on mobile):
  - Blue gradient card with tech icons (Target, Award, Building2)
  - "Verified Company" floating badge

### 2. JOB DESCRIPTION SECTION
- Max-width container (4xl)
- Section label: "De Rol"
- H2: "Over de functie"
- Display job_description in large, readable text

### 3. RESPONSIBILITIES SECTION
- Light blue gradient background
- Section label: "Verantwoordelijkheden"
- H2: "Wat ga je doen?"
- 2-column grid (1 on mobile)
- Each item: white card with CheckCircle2 icon, hover effects

### 4. REQUIREMENTS SECTION
- White background
- Section label: "Vereisten"
- H2: "Wat zoeken we?"
- 2-column grid
- Each item: gray card with Star icon, hover effects

### 5. BENEFITS SECTION
- Full-width blue gradient background (600 to 700)
- White text
- Section label + description
- H2: "Wat bieden wij?"
- 3-column grid (responsive)
- Each benefit: semi-transparent white card with CheckCircle2 icon

### 6. APPLICATION FORM SECTION (id="apply")
- Gradient background (gray-50 to white)
- Max-width 3xl
- Section label: "Solliciteer"
- H2: "Klaar voor de volgende stap?"
- Description text

FORM (if not submitted):
- White card with shadow
- Fields:
  1. Volledige naam (text, required)
  2. Email adres (email, required)
  3. Telefoonnummer (tel, required)
  4. LinkedIn profiel (url, optional)
  5. Motivatie (textarea, required, 5 rows)
- Submit button: full-width, blue, with arrow icon
- Loading state while submitting
- On submit: save to Supabase applications table

SUCCESS STATE (after submit):
- Green gradient card with CheckCircle2 icon
- H3: "Bedankt voor je sollicitatie!"
- Success message
- Auto-scroll to this message

### 7. CONTACT SECTION
- Dark background (gray-900)
- White text
- H2: "Vragen over deze vacature?"
- Show contact_person_name
- Two buttons (if data exists):
  1. Email button (with Mail icon)
  2. Phone button (with Phone icon)

### 8. FOOTER
- Very dark bg (gray-950)
- Copyright text with company_name
- Link to company_website

## LOADING STATE
- Show centered spinner with "Vacature laden..." text
- Blue gradient background

## ERROR STATE (404)
- If slug not found or status != 'published'
- Show "404 - Deze vacature bestaat niet"
- Display the attempted slug

## STYLING REQUIREMENTS
- All buttons: rounded-xl with hover scale effect
- All cards: rounded-2xl with shadows
- Form inputs: rounded-xl with focus ring (blue)
- Icons: lucide-react, size 5-6
- Responsive: mobile-first approach
- Animations: smooth transitions (300ms duration)
- Typography: bold headings, relaxed body text

## STATE MANAGEMENT
Use React hooks:
- useState for page data, form data, loading, submitted
- useEffect to load page on mount
- useParams to get slug from URL

## KEY FEATURES
1. Fully responsive design
2. Smooth animations and transitions
3. Form validation (required fields)
4. Supabase real-time data loading
5. Error handling (404, loading states)
6. Accessibility (semantic HTML, ARIA labels)
7. SEO-friendly structure

## ICONS TO USE (from lucide-react)
- Building2, MapPin, Clock, Euro (meta info)
- CheckCircle2 (responsibilities, benefits)
- Star (requirements)
- ArrowRight (CTA buttons)
- Mail, Phone (contact)
- Calendar (calendly button)
- Sparkles (badge)
- Target, Award (hero visual)

Generate the complete project with all components, routing, and Supabase integration ready to use!
```

---

## ✅ Na het genereren:

1. **Supabase Credentials toevoegen:**
   - Ga naar Settings → Integrations → Supabase
   - Vul in: URL en Anon Key

2. **Test met slug:** `/v/asml-mechanical-engineer-1`

3. **Deploy!**

---

**Copy de prompt hierboven en plak in Lovable!** 🚀
