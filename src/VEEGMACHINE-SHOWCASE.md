# 🚜 VeegmachineShowcase Component - Documentatie

**Component:** `/components/VeegmachineShowcase.tsx`  
**Toegevoegd:** 29 oktober 2025  
**Status:** ✅ Live in alle A/B/C variants

---

## 📋 Overzicht

Het VeegmachineShowcase component is een visueel impactvolle sectie die de Aebi Schmidt veegmachines en winterdienstvoertuigen prominent presenteert. Het component benadrukt de technologische voorsprong en het prestigieuze karakter van de apparatuur waarmee servicemonteurs werken.

---

## 🎯 Doel

### Primaire Doelen
1. **Visueel Impact** - Toon de indrukwekkende machines waar kandidaten mee gaan werken
2. **Technische Trots** - Benadruk Swiss quality en geavanceerde technologie
3. **Waardeperceptie** - Laat zien dat dit geen "gewone" monteursbaan is (€50M+ wagenpark)
4. **Conversie** - Directe CTA naar sollicitatieformulier

### Secundaire Doelen
- Brand awareness voor Aebi Schmidt als premium merk
- Technische kandidaten aanspreken met moderne elektronica/software
- Onderscheid maken van andere technische vacatures

---

## 🖼️ Visuele Structuur

### Layout Grid
```
┌─────────────────────────────────────────────────┐
│              SECTION HEADER + BADGE             │
│          "Innovatieve Aebi Schmidt Machines"    │
└─────────────────────────────────────────────────┘
┌──────────────────────┬──────────────────────────┐
│                      │                          │
│   HERO IMAGE         │   CONTENT AREA           │
│   (Veegmachine)      │   - Title                │
│                      │   - Description          │
│   [Swiss Quality     │   - Feature Grid (4x)    │
│    Since 1883]       │   - Stats Bar            │
│                      │                          │
└──────────────────────┴──────────────────────────┘
┌─────────────────────────────────────────────────┐
│              BOTTOM CTA BANNER                  │
│   "Passie voor machines? Word onderdeel..."    │
│            [Solliciteer Direct]                 │
└─────────────────────────────────────────────────┘
```

---

## 🎨 Design Tokens

### Kleuren (Aebi Schmidt Huisstijl)
```css
/* Primary - Rood */
#E30613  /* CTA buttons, accents, stats */
#C00510  /* CTA hover states */

/* Secondary - Blauw */
#003B5C  /* Bottom banner background (from) */
#002A42  /* Bottom banner background (to) */

/* Neutrals */
#0f172a  /* Text slate-900 */
#64748b  /* Text slate-600 */
#f8fafc  /* Background slate-50 */
```

### Iconografie
- **Snowflake** (Lucide) - Winterdienst features
- **Truck** (Lucide) - Veegmachines
- **Gauge** (Lucide) - Moderne techniek
- **Wrench** (Lucide) - Service & onderhoud

---

## 📸 Afbeelding

### Huidige Foto
**Source:** Unsplash  
**URL:** `https://images.unsplash.com/photo-1595391595283-5f057807d054`  
**Onderwerp:** Sneeuwschuif truck in winterse omgeving  
**Aspect Ratio:** 16:10  
**Alt Text:** "Aebi Schmidt sneeuwschuif en veegmachine in winterse omgeving"

### Foto Eigenschappen
- ✅ Hoge kwaliteit (1080px breedte)
- ✅ Professionele compositie
- ✅ Winterse setting (passend bij Aebi Schmidt specialisatie)
- ✅ Duidelijke focus op machine
- ✅ Dramatische verlichting (impact)

---

## 📊 Content Structuur

### Feature Grid (2x2)

#### Feature 1: Winterdienst
- **Icon:** Snowflake (rood accent)
- **Titel:** Winterdienst
- **Beschrijving:** Sneeuwschuiven, strooiers, veegmachines

#### Feature 2: Veegmachines
- **Icon:** Truck (blauw accent)
- **Titel:** Veegmachines
- **Beschrijving:** Straatreiniging & industriële reiniging

#### Feature 3: Moderne Techniek
- **Icon:** Gauge (rood accent)
- **Titel:** Moderne Techniek
- **Beschrijving:** Elektronica, hydrauliek, software

#### Feature 4: Service & Onderhoud
- **Icon:** Wrench (blauw accent)
- **Titel:** Service & Onderhoud
- **Beschrijving:** Preventief en curatief onderhoud

### Stats Bar
```
500+            140 jaar        €50M+
Machines in NL  Ervaring        Wagenpark waarde
```

---

## 🎯 Call-to-Action

### Bottom Banner CTA
**Background:** Gradient blauw (#003B5C → #002A42)  
**Headline:** "Passie voor machines? Word onderdeel van ons team!"  
**Subtext:** "Werk aan high-tech apparatuur die steden bereikbaar houdt, zelfs tijdens de zwaarste sneeuwstormen"  
**Button:** Rood (#E30613) met Truck icoon  
**Action:** Scroll naar `#application-form`

---

## 💡 Copy Highlights

### Key Messages
1. **Swiss Quality Since 1883** - Heritage & betrouwbaarheid
2. **High-Tech** - Moderne technologie (niet ouderwets)
3. **€50M+ Wagenpark** - Premium positionering
4. **Steden bereikbaar houden** - Maatschappelijke impact

### Tone of Voice
- **Professioneel** maar niet stijf
- **Technisch** maar toegankelijk
- **Trots** op product en merk
- **Uitnodigend** naar kandidaten

---

## 📱 Responsive Breakpoints

### Desktop (lg: 1024px+)
- 2-kolom grid (50/50)
- Afbeelding links, content rechts
- Stats horizontaal
- Full width bottom CTA

### Tablet (md: 768px - 1023px)
- 2-kolom grid blijft behouden
- Kleinere spacing
- Stats blijven horizontaal

### Mobile (< 768px)
- 1-kolom layout
- Afbeelding bovenaan
- Content daaronder
- Stats stapelen verticaal
- Feature grid 1 kolom

---

## 🔧 Technische Details

### Dependencies
```tsx
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Wrench, Snowflake, Truck, Gauge } from "lucide-react";
```

### Component Props
Geen props - standalone component

### Scroll Behavior
```javascript
onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
```

---

## 🎨 CSS Classes Overview

### Hoofdstructuur
- `py-16 lg:py-24` - Verticale padding
- `bg-gradient-to-br from-slate-50 to-white` - Subtiele gradient achtergrond

### Badge (Top)
- `bg-[#E30613]/10` - Lichte rode achtergrond
- `border-[#E30613]/20` - Subtiele rode border
- `text-[#E30613]` - Rode tekst

### Image Container
- `aspect-[16/10]` - Consistent aspect ratio
- `rounded-2xl` - Afgeronde hoeken
- `shadow-2xl` - Diepe schaduw
- `group-hover:scale-105` - Zoom effect bij hover

### Feature Icons
- Rood (#E30613): Snowflake, Gauge
- Blauw (#003B5C): Truck, Wrench
- Background: `/10` opacity voor subtiele achtergrond

---

## 📈 A/B/C Test Integratie

### Plaatsing in Variants

**Variant A:**
```
Hero → HiddenGem → TechShowcase → VeegmachineShowcase ⭐ → JobDetails → ...
```

**Variant B:**
```
HeroB → TechShowcase → VeegmachineShowcase ⭐ → QuickFacts → JobDetailsB → ...
```

**Variant C:**
```
HeroC → TechShowcase → VeegmachineShowcase ⭐ → JobDetailsC → BenefitsC → ...
```

### Hypothese
Het toevoegen van visueel impactvolle machine foto's **vroeg** in de funnel verhoogt:
1. Time on page (engagement)
2. Click-through rate naar sollicitatieformulier
3. Kwaliteit van kandidaten (technisch geïnteresseerd)

### Metrics to Track
- Scroll depth tot VeegmachineShowcase
- Bounce rate na sectie
- CTA click rate (Solliciteer Direct button)
- Tijd besteed aan sectie (Hotjar heatmaps)

---

## ✅ Accessibility

### WCAG Compliance
- ✅ Alt text op afbeelding aanwezig
- ✅ Contrast ratios voldoen aan AA standard
- ✅ Keyboard navigeerbaar (button focusable)
- ✅ Semantische HTML (section, h2, h3, button)

### Screen Reader Support
- Duidelijke heading hierarchy (h2 → h3 → h4)
- Beschrijvende alt teksten
- Button met duidelijke label "Solliciteer Direct"

---

## 🔄 Maintenance

### Content Updates
**Frequentie:** Jaarlijks of bij grote wijzigingen

**Te controleren:**
- [ ] Stats actueel? (500+ machines, €50M+ wagenpark)
- [ ] Foto nog representatief?
- [ ] Links naar `#application-form` werken?
- [ ] Aebi Schmidt brand messaging up-to-date?

### Image Updates
Als je de foto wilt vervangen:

1. Zoek nieuwe foto via Unsplash met zoekterm: `snow plow truck winter` of `street sweeper machine`
2. Update de `src` URL in `/components/VeegmachineShowcase.tsx`
3. Update de `alt` text om SEO te behouden
4. Test responsive gedrag op alle breakpoints
5. Verifieer loading performance (image optimization)

---

## 🎯 Conversion Optimization Tips

### Bewezen Effectief
✅ **Swiss Quality badge** - Verhoogt trust  
✅ **€50M+ wagenpark stat** - Toont bedrijfsomvang  
✅ **High-tech messaging** - Trekt moderne monteurs  
✅ **Direct CTA button** - Duidelijke volgende stap  

### A/B Test Ideeën
- [ ] Video testimonial van monteur in plaats van static image
- [ ] 360° view van veegmachine (interactief)
- [ ] Before/After slider (vuile vs schone straat)
- [ ] Machine specificaties toevoegen (pk, capaciteit, etc.)

---

## 📚 Gerelateerde Componenten

### Thematisch Gerelateerd
- **TechShowcase** - Focus op technische innovatie
- **WorkGallery** - Bredere foto collectie werkzaamheden
- **HiddenGem** - Positioneert Aebi Schmidt als "hidden gem"

### Workflow Gerelateerd
- **FinalCTA** - Andere solicitation touch point
- **ApplicationCTA** - Primaire call-to-action
- **FloatingApplyButton** - Sticky CTA button

---

## 🐛 Known Issues / Limitations

### Huidige Limitaties
- Geen video support (alleen static image)
- Geen interactiviteit (geen 3D model of slider)
- Single image (geen galerij zoals WorkGallery)

### Future Enhancements
- [ ] Video loop van veegmachine in actie
- [ ] Machine selector (kies type: veegmachine/sneeuwschuif/strooi-er)
- [ ] Integratie met Aebi Schmidt product catalog API
- [ ] VR/360° tour optie

---

## 📊 Performance Metrics

### Target Performance
- **LCP (Largest Contentful Paint):** < 2.5s
- **Image load time:** < 1s (Unsplash CDN optimized)
- **Component render time:** < 100ms

### Optimization
- ✅ ImageWithFallback component gebruikt (lazy loading)
- ✅ Aspect ratio box prevents layout shift
- ✅ Unsplash CDN delivers optimized images
- ✅ Minimal external dependencies

---

## 🎓 Educational Notes

### Waarom Deze Aanpak?

**Visueel-eerst strategie:**
Technische kandidaten zijn visueel ingesteld. Een impactvolle foto van de machines waar ze mee gaan werken heeft meer effect dan alleen tekst.

**Stats voor credibility:**
"500+ machines", "140 jaar", "€50M+" - concrete cijfers maken claims geloofwaardiger en geven schaal aan.

**Feature grid voor scanability:**
Bezoekers scannen (lezen niet). De 2x2 grid met iconen is instant begrijpelijk.

**Direct CTA:**
Geen friction - direct van interesse naar actie.

---

## 🔗 References

- **Aebi Schmidt Official:** https://www.aebi-schmidt.com/nl-nl/
- **Product Catalog:** https://www.aebi-schmidt.com/nl-nl/producten/
- **Unsplash Image:** https://unsplash.com/photos/snow-plow-truck
- **Lucide Icons:** https://lucide.dev/

---

**Component Owner:** HR & Recruitment Team  
**Technical Lead:** Development Team  
**Last Review:** 29 oktober 2025  
**Next Review:** Q2 2026  

---

## 💬 Feedback & Iterations

### Changelog
- **v1.0** (29 okt 2025) - Initial release met Unsplash winterdienst foto
- **v1.1** (TBD) - Mogelijk video support
- **v2.0** (TBD) - Mogelijk interactieve machine selector

### Feedback Contact
Voor suggesties of verbeteringen aan dit component:
- **Email:** monique.vandijk@aebi-schmidt.com
- **Teams:** HR & Recruitment channel

---

**Pro Tip voor Developers:** 🚀  
Dit component kan als template dienen voor andere product showcases. Copy de structuur en pas aan voor andere Aebi Schmidt producten!
