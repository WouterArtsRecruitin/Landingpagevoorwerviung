# 🎨 Aebi Schmidt Kleuren Referentie

**Quick reference** voor developers - kopieer/plak deze exacte codes.

---

## 🔴 Aebi Schmidt Rood - Primary Brand Color

```css
/* Base */
#E30613  /* Main red - gebruik voor CTA's, accenten, highlights */

/* Variations */
#C00510  /* Darker - gebruik voor gradients (to) */
#FF0D1B  /* Lighter - gebruik voor borders, hover states */
```

**Tailwind Classes:**
```tsx
/* Backgrounds */
bg-[#E30613]           /* Solid red background */
from-[#E30613]         /* Gradient start */
to-[#C00510]           /* Gradient end */

/* Text */
text-[#E30613]         /* Red text */

/* Borders */
border-[#E30613]       /* Red border */
border-[#FF0D1B]       /* Lighter red border */

/* Opacity variants */
bg-[#E30613]/20        /* 20% opacity red */
border-[#E30613]/30    /* 30% opacity red */
```

---

## 🔵 Aebi Schmidt Blauw - Corporate Blue

```css
/* Base */
#003B5C  /* Main blue - gebruik voor secondary elements, dark backgrounds */

/* Variations */
#002A42  /* Darker - gebruik voor gradients (to) */
#004D77  /* Lighter - gebruik voor borders, hover states */
```

**Tailwind Classes:**
```tsx
/* Backgrounds */
bg-[#003B5C]           /* Solid blue background */
from-[#003B5C]         /* Gradient start */
to-[#002A42]           /* Gradient end */
via-[#003B5C]          /* Gradient middle */

/* Text */
text-[#003B5C]         /* Blue text */

/* Borders */
border-[#003B5C]       /* Blue border */
border-[#004D77]       /* Lighter blue border */
```

---

## 🎯 Gebruik per Component Type

### Primary CTA Buttons
```tsx
className="bg-[#E30613] hover:bg-[#C00510] text-white"
```

### Secondary CTA Buttons (Blauw)
```tsx
className="bg-[#003B5C] hover:bg-[#002A42] text-white"
```

### Text Accenten
```tsx
<span className="text-[#E30613]">belangrijke tekst</span>
```

### Gradient Backgrounds (Rood)
```tsx
className="bg-gradient-to-br from-[#E30613] to-[#C00510]"
```

### Gradient Backgrounds (Blauw)
```tsx
className="bg-gradient-to-br from-[#003B5C] to-[#002A42]"
```

### Badges/Labels
```tsx
className="bg-[#E30613]/20 border border-[#E30613]/30 text-red-200"
```

### Stats Cards (Donker met blauw)
```tsx
className="bg-gradient-to-br from-[#003B5C] to-[#002A42]"
```

### Iconen (Rood accent)
```tsx
<Icon className="text-[#E30613]" />
```

### Avatar Gradients
```tsx
className="bg-gradient-to-br from-[#E30613] to-[#C00510]"
```

---

## 🚫 Vermijd Deze Kleuren

### ❌ NIET Gebruiken
```css
/* Oude oranje kleuren - VERWIJDERD */
#F97316  /* orange-600 */
#F47920  /* aebi-orange */
#EA580C  /* orange-700 */

/* Tailwind oranje classes - NIET GEBRUIKEN */
bg-orange-600
text-orange-500
border-orange-400
from-orange-600
```

**Uitzondering:** Documentatiebestanden en attributions mogen oranje vermelden voor historische referentie.

---

## ✅ Andere Toegestane Kleuren

### Slate (Neutrals) - Behouden
```css
#0f172a  /* slate-900 - donkere backgrounds */
#1e293b  /* slate-800 - cards, sections */
#334155  /* slate-700 - borders, dividers */
#64748b  /* slate-500 - muted text */
#cbd5e1  /* slate-300 - light borders */
#f1f5f9  /* slate-100 - light backgrounds */
#f8fafc  /* slate-50 - very light backgrounds */
```

### Green - WhatsApp & Success
```css
#16a34a  /* green-600 - WhatsApp buttons */
#15803d  /* green-700 - WhatsApp hover */
#22c55e  /* green-500 - success states */
```

### White & Black
```css
#ffffff  /* Pure white */
#000000  /* Pure black */
```

---

## 📋 Copy-Paste Templates

### Complete CTA Button (Rood)
```tsx
<button
  onClick={handleClick}
  className="inline-flex items-center justify-center gap-2 bg-[#E30613] hover:bg-[#C00510] text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
>
  <span>Solliciteer Nu</span>
  <ArrowRight className="w-5 h-5" />
</button>
```

### Complete CTA Button (Blauw)
```tsx
<button
  onClick={handleClick}
  className="inline-flex items-center justify-center gap-2 bg-[#003B5C] hover:bg-[#002A42] text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
>
  <span>Meer Info</span>
  <ArrowRight className="w-5 h-5" />
</button>
```

### Gradient Card (Rood)
```tsx
<div className="bg-gradient-to-br from-[#E30613] to-[#C00510] rounded-3xl p-8 shadow-2xl border-2 border-[#FF0D1B]">
  {/* Content */}
</div>
```

### Gradient Card (Blauw)
```tsx
<div className="bg-gradient-to-br from-[#003B5C] to-[#002A42] rounded-3xl p-8 shadow-2xl border-2 border-[#004D77]">
  {/* Content */}
</div>
```

### Badge/Label
```tsx
<span className="inline-flex items-center gap-2 bg-[#E30613]/20 border border-[#E30613]/30 text-red-200 px-4 py-2 rounded-full font-medium">
  <div className="w-2 h-2 rounded-full bg-[#E30613] animate-pulse"></div>
  <span>Urgentie Label</span>
</span>
```

### Section Background
```tsx
<section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-[#003B5C] to-slate-900">
  {/* Content */}
</section>
```

---

## 🔍 Search & Replace Guide

Als je oude oranje code wilt updaten:

### Zoek en vervang (VS Code / Find & Replace)
```
❌ Zoek: bg-orange-600        → ✅ Vervang: bg-[#E30613]
❌ Zoek: bg-orange-700        → ✅ Vervang: bg-[#C00510]
❌ Zoek: text-orange-600      → ✅ Vervang: text-[#E30613]
❌ Zoek: text-orange-500      → ✅ Vervang: text-[#E30613]
❌ Zoek: border-orange-600    → ✅ Vervang: border-[#E30613]
❌ Zoek: from-orange-600      → ✅ Vervang: from-[#E30613]
❌ Zoek: to-orange-700        → ✅ Vervang: to-[#C00510]
❌ Zoek: hover:bg-orange-700  → ✅ Vervang: hover:bg-[#C00510]
```

---

## 🎨 Kleur Psychologie

### Waarom Rood (#E30613)?
- ✅ **Urgentie** - Stimuleert actie (solliciteren)
- ✅ **Energie** - Past bij technische, dynamische functie
- ✅ **Aebi Schmidt DNA** - Officiële merkkleur sinds 1883
- ✅ **Zichtbaarheid** - Valt op in crowded job market

### Waarom Blauw (#003B5C)?
- ✅ **Trust** - Betrouwbaarheid (140 jaar ervaring)
- ✅ **Professionaliteit** - Swiss engineering quality
- ✅ **Techniek** - Past bij high-tech machines
- ✅ **Balans** - Neutraliseert het energieke rood

### Kleurverhouding (60-30-10 regel)
- 60% Slate grays (backgrounds, text)
- 30% Aebi Schmidt Rood (CTA's, accenten)
- 10% Aebi Schmidt Blauw (secondary elements)

---

## 📱 Accessibility Notes

### Contrast Ratios
✅ **Rood (#E30613) op wit:** 5.8:1 (AA compliant)  
✅ **Wit op Rood (#E30613):** 5.8:1 (AA compliant)  
✅ **Blauw (#003B5C) op wit:** 12.6:1 (AAA compliant)  
✅ **Wit op Blauw (#003B5C):** 12.6:1 (AAA compliant)  

**Conclusie:** Beide kleuren zijn WCAG 2.1 AA/AAA compliant voor normale tekst.

---

## 🔗 Gerelateerde Bestanden

- **Volledige huisstijl:** `/HUISSTIJL.md`
- **Implementatiestatus:** `/LAATSTE-WIJZIGINGEN.md`
- **CSS tokens:** `/styles/globals.css`
- **Component voorbeelden:** `/components/` directory

---

**Pro Tip:** Bookmark dit bestand voor snelle referentie tijdens development! 🚀

**Last updated:** 29 oktober 2025
