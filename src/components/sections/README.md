# 📂 Components / Sections

Deze directory bevat standalone sectiecomponenten die gebruikt kunnen worden in de verschillende paginavarianten (A/B/C).

## 📋 Beschikbare Sections

### TeamCulture.tsx
**Team & Cultuur Sectie** - Voor sociale bewijskracht en employer branding

**Features:**
- ✅ Video testimonial (embedded YouTube)
- ✅ 3 employee testimonials met quotes
- ✅ Team statistieken (4 metrics cards)
- ✅ Cultuur highlights (3 kernwaarden)
- ✅ Dubbele CTA (Solliciteren + WhatsApp)
- ✅ Volledig responsive design
- ✅ Aebi Schmidt huisstijl (Rood #E30613 + Blauw #003B5C)

**Gebruik:**
```tsx
import { TeamCulture } from "./components/sections/TeamCulture";

export default function PageVersion() {
  return (
    <>
      <Hero />
      <TeamCulture />
      <Benefits />
      <FinalCTA />
    </>
  );
}
```

**Customize testimonials:**
```tsx
const testimonials = [
  {
    name: "Naam",
    role: "Functie",
    tenure: "Dienstverband",
    background: "Ex-werkgever",
    quote: "Quote tekst...",
    highlights: ["Tag1", "Tag2", "Tag3"]
  }
];
```

**Customize stats:**
```tsx
const teamStats = [
  { 
    icon: Users, 
    number: "25", 
    label: "Team members", 
    sublabel: "Nederland" 
  }
];
```

---

## 🎨 Design Principles

Alle section componenten volgen:
1. **Aebi Schmidt Huisstijl** - Rood (#E30613) + Blauw (#003B5C)
2. **Mobile First** - Responsive vanaf 320px
3. **Performance** - Lazy loading voor images/videos
4. **Accessibility** - Semantic HTML + ARIA labels
5. **Conversie-geoptimaliseerd** - Dubbele CTA's op strategische plekken

---

## 🔄 Toekomstige Sections

Potentiële toevoegingen:
- [ ] `CareerPath.tsx` - Doorgroeimogelijkheden timeline
- [ ] `ToolsEquipment.tsx` - Showcase van gereedschap & apparatuur
- [ ] `TrainingProgram.tsx` - Opleidingsprogramma details
- [ ] `ComparisonTable.tsx` - Aebi Schmidt vs andere werkgevers
- [ ] `LocationMap.tsx` - Werkgebieden kaart + reisafstanden
- [ ] `SalaryCalculator.tsx` - Interactieve salaris calculator

---

## 📱 Import Structure

```
/components
  ├── /sections          # Standalone sections (deze directory)
  │   ├── TeamCulture.tsx
  │   └── README.md
  ├── /variants          # A/B/C test varianten
  │   ├── HeroB.tsx
  │   └── ...
  └── /versions          # Complete pagina versies
      ├── VersionA.tsx
      └── ...
```

**Best Practice:**
- Core sections → `/components/` (e.g. Hero, Benefits, FAQ)
- Reusable sections → `/components/sections/` (e.g. TeamCulture)
- A/B test variants → `/components/variants/` (e.g. HeroB, HeroC)
- Complete pages → `/components/versions/` (e.g. VersionA)

---

## 🚀 Adding New Sections

1. **Create component** in `/components/sections/`
2. **Follow naming convention**: PascalCase.tsx
3. **Use Aebi Schmidt colors**: #E30613 (red) + #003B5C (blue)
4. **Include CTA buttons** met tracking
5. **Make it responsive** (mobile-first)
6. **Update this README** met documentatie

**Template:**
```tsx
export function NewSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content */}
      </div>
    </section>
  );
}
```

---

**Last updated:** 29 oktober 2025
**Maintainer:** Aebi Schmidt Recruitment Team
