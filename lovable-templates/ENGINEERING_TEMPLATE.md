# Engineering Template - Complete Setup Guide

## 📋 Overzicht

Deze Engineering template is:
- 🔵 **Blauw** design (tech-focused, professional)
- 🎨 Modern en clean
- 📱 Fully responsive
- ⚡ Connected met Supabase
- 🔄 Dynamic content based on slug

## 🚀 Lovable Setup

### Stap 1: Nieuw Lovable Project

1. Ga naar https://lovable.dev
2. Klik "New Project"
3. Naam: **"Engineering Landing Pages"**
4. Beschrijving: "Tech recruitment landing pages - Engineering style"

### Stap 2: Supabase Configuratie

**In Lovable → Settings → Integrations → Supabase**

Voeg je credentials toe:
```
Supabase URL: [JE_SUPABASE_URL]
Supabase Anon Key: [JE_SUPABASE_ANON_KEY]
```

Deze vind je in je `.env` bestand of Supabase dashboard.

### Stap 3: Dependencies

Lovable installeert automatisch, maar check of deze er zijn:
- `@supabase/supabase-js`
- `react-router-dom`
- `lucide-react`

### Stap 4: Files Aanmaken

Ik maak nu alle benodigde files voor je:

1. **`src/pages/EngineeringLanding.tsx`** - Main landing page component
2. **`src/App.tsx`** - Router configuration
3. **`src/lib/supabase.ts`** - Supabase client
4. **`tailwind.config.js`** - Styling configuration

---

## 📁 File 1: Supabase Client

Maak: `src/lib/supabase.ts`

## 📁 File 2: Main Landing Page

Maak: `src/pages/EngineeringLanding.tsx`

## 📁 File 3: Router

Update: `src/App.tsx`

---

## 🎨 Design Features

### Kleuren Scheme (Engineering)
- Primary: `#3B82F6` (Blue 500)
- Secondary: `#1E40AF` (Blue 800)
- Accent: `#60A5FA` (Blue 400)
- Background: Gradient van `#EFF6FF` naar `#DBEAFE`

### Secties
1. ✨ Hero met gradient background
2. 📝 Job description
3. ✅ Responsibilities (met checkmarks)
4. ⭐ Requirements (met stars)
5. 🎁 Benefits (grid layout)
6. 📧 Application form (modern, clean)
7. 📞 Contact section
8. 🦶 Footer

### Animations
- Hover effects op buttons (scale + shadow)
- Smooth scroll
- Form validation feedback
- Loading states

---

## 🧪 Testen

**Test URL Format:**
```
https://jouw-project.lovable.app/v/asml-mechanical-engineer-1
```

**Check:**
- ✅ Data wordt geladen uit Supabase
- ✅ Alle secties tonen correct
- ✅ Form werkt en slaat op
- ✅ Contact info wordt getoond
- ✅ Responsive op mobile

---

## 📊 Database Query

De template haalt deze data op:
```sql
SELECT * FROM landing_pages
WHERE slug = 'asml-mechanical-engineer-1'
AND status = 'published'
```

**Vereiste velden:**
- `page_title`, `company_name`, `location`, `job_type`
- `salary_min`, `salary_max`, `primary_color`
- `hero_headline`, `hero_subheadline`, `job_description`
- `responsibilities[]`, `requirements[]`, `benefits[]`
- `contact_person_name`, `contact_person_email`, `contact_person_phone`
- `calendly_url` (optional)

---

## 🔄 Data Flow

```
User vult intake form in
    ↓
Data → Supabase (template_style = 'engineering')
    ↓
Krijgt slug: "bedrijf-functie-1"
    ↓
Landing page URL: lovable.app/v/bedrijf-functie-1
    ↓
Lovable template haalt data op
    ↓
Rendert met Engineering design
```

---

## 🎯 Volgende Stappen

Na deze Engineering template:
1. Test volledig met echte data
2. Itereer op design als nodig
3. Dan kopiëren naar andere 5 templates
4. Alleen kleuren/styling aanpassen per template

---

Ready voor de code files! 🚀
