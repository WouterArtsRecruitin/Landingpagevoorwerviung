# Aebi Schmidt Huisstijl - Brand Guidelines

## 🎨 Kleurenpalet

### Primary Colors (Gebaseerd op https://www.aebi-schmidt.com/nl-nl/)

```css
/* Aebi Schmidt Rood - Primary Brand Color */
--aebi-red: #E30613;
--aebi-red-dark: #C00510;
--aebi-red-light: #FF0D1B;

/* Aebi Schmidt Blauw - Corporate Blue */
--aebi-blue: #003B5C;
--aebi-blue-dark: #002940;
--aebi-blue-light: #004D77;

/* Aebi Schmidt Oranje - Accent Color */
--aebi-orange: #F47920;
--aebi-orange-dark: #E06810;
--aebi-orange-light: #FF8C3A;
```

### Neutral Colors

```css
/* Grays - Slate palette voor professionele look */
--slate-50: #f8fafc;
--slate-100: #f1f5f9;
--slate-200: #e2e8f0;
--slate-300: #cbd5e1;
--slate-400: #94a3b8;
--slate-500: #64748b;
--slate-600: #475569;
--slate-700: #334155;
--slate-800: #1e293b;
--slate-900: #0f172a;
```

---

## 🖌️ Typografie

### Font Family
```css
/* System fonts voor optimale performance */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Font Weights
```css
--font-weight-normal: 400;
--font-weight-medium: 600; /* Slightly bolder voor corporate feel */
```

### Font Sizes
```css
--font-size: 16px; /* Base */
```

---

## 🎯 Color Usage Guidelines

### CTA Buttons

**Primary CTA:**
```tsx
className="bg-red-600 hover:bg-red-700 text-white"
```
- Gebruik voor: Direct Solliciteren, Main Actions
- Voorbeelden: "Solliciteer Nu", "Direct Aanmelden"

**Secondary CTA:**
```tsx
className="bg-green-600 hover:bg-green-700 text-white"
```
- Gebruik voor: WhatsApp Contact, Alternative Actions
- Voorbeelden: "WhatsApp Monique", "Direct Contact"

**Tertiary CTA:**
```tsx
className="border-2 border-slate-900 hover:bg-slate-900 hover:text-white"
```
- Gebruik voor: Informational Actions
- Voorbeelden: "Meer Info", "Lees Verder"

### Backgrounds

**Hero Backgrounds:**
```tsx
// Variant A: Dark with overlay
className="bg-slate-900"

// Variant B: Red gradient (Career focus)
className="bg-gradient-to-br from-red-600 via-red-500 to-red-700"

// Variant C: White (Clean/Professional)
className="bg-white"
```

**Content Sections:**
```tsx
// Light sections
className="bg-white"
className="bg-slate-50"

// Dark sections (alternating)
className="bg-slate-900"
className="bg-slate-800"
```

### Accents & Highlights

**Text Highlights:**
```tsx
// Important keywords, numbers, USPs
className="text-red-600"

// Secondary highlights
className="text-slate-900"
```

**Borders:**
```tsx
// Primary accent borders
className="border-red-600"

// Subtle borders
className="border-slate-200"
className="border-slate-300"
```

**Icons:**
```tsx
// Primary icons (CTA related)
className="text-red-600"

// Secondary icons
className="text-slate-600"
```

---

## 📐 Design Principles

### 1. Corporate & Professional
- Gebruik strakke lijnen en duidelijke hiërarchie
- Border radius: `0.5rem` (iets scherper dan standaard)
- Ruime witruimte voor leesbaarheid

### 2. Swiss Engineering Aesthetic
- Precisie en vakmanschap centraal
- Strakke layouts, geen chaos
- Duidelijke call-to-actions

### 3. Technical & Modern
- Donkere achtergronden voor tech-feel
- Contrast voor leesbaarheid
- Moderne gradients (subtiel)

### 4. Trust & Reliability
- Consistente kleuren
- Clear information hierarchy
- Trustworthy testimonials

---

## 🎨 Component Examples

### Trust Badges
```tsx
<Star className="w-4 h-4 fill-red-600 text-red-600" />
<Award className="w-4 h-4 text-red-600" />
```

### Urgency Indicators
```tsx
<div className="bg-red-600/20 border border-red-600/40">
  <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></div>
  <span className="text-red-100">🔥 Slechts 2 plekken beschikbaar</span>
</div>
```

### Stats Cards
```tsx
<div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700">
  <div className="text-red-600 text-lg">€3.200 - €3.800</div>
  <div className="text-slate-300 text-xs">per maand + 8% vakantiegeld</div>
</div>
```

### Employee Quotes (Social Proof)
```tsx
<div className="bg-slate-800/30 border-l-4 border-red-600 rounded-r-lg p-4">
  <p className="text-slate-200 italic mb-2">
    "Van DAF dealer naar Aebi Schmidt - beste carrièrestap ever."
  </p>
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full border-2 border-red-600 bg-slate-700 flex items-center justify-center text-red-600">
      HD
    </div>
    <div>
      <div className="text-sm text-white">Hans de Vries</div>
      <div className="text-xs text-slate-400">Senior Servicemonteur</div>
    </div>
  </div>
</div>
```

---

## 🚫 Don'ts

### Avoid These Color Combinations:
- ❌ Orange as primary CTA (replaced with Red)
- ❌ Blue text on dark backgrounds (low contrast)
- ❌ Multiple bright colors in same section (overwhelming)
- ❌ Neon/overly saturated colors (unprofessional)

### Avoid These Design Patterns:
- ❌ Over-rounded corners (keep it professional)
- ❌ Comic Sans or playful fonts
- ❌ Cluttered layouts
- ❌ Inconsistent spacing

---

## ✅ Brand Checklist

Before deploying any new component, verify:

- [ ] Primary CTA uses `bg-red-600`
- [ ] Text highlights use `text-red-600` or `text-slate-900`
- [ ] Star ratings use `fill-red-600 text-red-600`
- [ ] Borders use `border-red-600` or `border-slate-200`
- [ ] Background gradients use red variants (not orange)
- [ ] Font weight is 600 for headings/buttons
- [ ] Spacing is consistent and clean
- [ ] Trust signals are prominently placed
- [ ] CTA buttons have clear hover states

---

## 📱 Responsive Design

### Mobile First Approach
- Start with mobile layout
- Progressive enhancement for larger screens
- Touch-friendly CTA buttons (min 44px height)

### Breakpoints
```css
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

---

## 🔄 Implementation Status

### ✅ Volledig Geïmplementeerd (Aebi Schmidt Red #E30613 & Blue #003B5C)

**Hero Variants:**
- [x] `/components/Hero.tsx` - Variant A (Technical focus)
- [x] `/components/variants/HeroB.tsx` - Variant B (Career focus)
- [x] `/components/variants/HeroC.tsx` - Variant C (Salary focus)

**Core Components:**
- [x] `/components/FinalCTA.tsx`
- [x] `/components/FAQ.tsx`
- [x] `/components/TrustSignals.tsx`
- [x] `/components/SalaryBreakdown.tsx`
- [x] `/components/DayInLife.tsx`
- [x] `/components/WhyJoinUs.tsx`
- [x] `/components/FloatingApplyButton.tsx`
- [x] `/components/TechShowcase.tsx`
- [x] `/components/HiddenGem.tsx`
- [x] `/components/TechnicalTraining.tsx`
- [x] `/components/ApplicationForm.tsx`
- [x] `/components/VeegmachineShowcase.tsx` - Veegmachine & winterdienst showcase 🆕
- [x] `/components/WorkGallery.tsx` - Foto galerij werkzaamheden
- [x] `/components/sections/TeamCulture.tsx` - Team & cultuur sectie

**Variant Components:**
- [x] `/components/variants/QuickFacts.tsx`
- [x] `/components/variants/JobDetailsB.tsx`
- [x] `/components/variants/JobDetailsC.tsx`
- [x] `/components/variants/BenefitsB.tsx`
- [x] `/components/variants/BenefitsC.tsx`
- [x] `/components/variants/TestimonialsC.tsx`
- [x] `/components/variants/ApplicationCTAB.tsx`
- [x] `/components/variants/ApplicationCTAC.tsx`

**Design System:**
- [x] `/styles/globals.css` - Color tokens en typography

---

## 📖 References

- **Official Website:** https://www.aebi-schmidt.com/nl-nl/
- **Design System:** Tailwind CSS + shadcn/ui
- **Color Tool:** https://tailwindcss.com/docs/customizing-colors

---

**Last Updated:** 29 oktober 2025  
**Version:** 2.0 (Aebi Schmidt Huisstijl)  
**Maintained by:** Recruitment Marketing Team
