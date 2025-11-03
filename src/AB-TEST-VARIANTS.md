# A/B/C Test Varianten - Servicemonteur Landing Page

## 🎯 Hero Headlines - Test Varianten

### VERSIE A: Uitdaging Focus (Technical Appeal)
**Bestand:** `/components/Hero.tsx`
**Headline:**
```tsx
Van CAN-Bus tot Hydrauliek
High-Tech Servicemonteur bij Aebi Schmidt
```
**Doelgroep:** Ervaren monteurs die technische uitdaging zoeken
**USP:** Focus op technische complexiteit en high-tech aspect

---

### VERSIE B: Career Focus (Growth & Development)
**Bestand:** `/components/variants/HeroB.tsx`
**Headline:**
```tsx
Groei door naar Senior Monteur
in 18 maanden bij Aebi Schmidt
```
**Doelgroep:** Ambitieuze monteurs die willen doorgroeien
**USP:** Focus op snelle carrièregroei en ontwikkeling

---

### VERSIE C: Salary Focus (Direct Financial Benefit)
**Bestand:** `/components/variants/HeroC.tsx`
**Headline:**
```tsx
Verdien tot €3.800/maand
als High-Tech Servicemonteur
```
**Doelgroep:** Monteurs die nu ondergewaardeerd/onderbetaald zijn
**USP:** Direct financieel voordeel voorop

---

## 📊 Test Setup in App.tsx

Gebruik de volgende componenten voor elke variant:

```tsx
// VERSIE A - Technical Appeal
import { Hero } from "./components/Hero";

// VERSIE B - Career Growth
import { HeroB } from "./components/variants/HeroB";

// VERSIE C - Salary Focus
import { HeroC } from "./components/variants/HeroC";
```

---

## 🔍 Tracking Metrics

### Primary KPI's:
- **Conversie rate:** Aantal sollicitaties / Aantal bezoekers
- **Tijd op pagina:** Gemiddelde tijd besteed per variant
- **Scroll depth:** Hoever scrollen bezoekers door
- **CTA clicks:** Welke CTA button werkt het beste

### Secondary KPI's:
- **Bounce rate:** Welke headline houdt mensen vast
- **WhatsApp clicks:** Directe interesse meting
- **Download brochure:** (indien toegevoegd)
- **Video views:** (indien toegevoegd)

---

## 💡 Test Hypotheses

### Versie A (Technical)
**Hypothese:** Monteurs met tech-achtergrond converteren beter op technische specs
**Expected Winner:** Bij bezoekers met HBO+ werk- en denkniveau

### Versie B (Career)
**Hypothese:** Jonge/ambitieuze monteurs willen vooral doorgroeien
**Expected Winner:** Bij monteurs <35 jaar met 2-5 jaar ervaring

### Versie C (Salary)
**Hypothese:** Directe financiële prikkel werkt het beste voor carrière-switchers
**Expected Winner:** Bij monteurs die nu bij dealerbedrijven werken

---

## 🎨 Volledige Pagina Varianten

Voor complete A/B/C tests (niet alleen Hero):

```tsx
// VOLLEDIG VERSIE A
import VersionA from "./components/versions/VersionA";

// VOLLEDIG VERSIE B  
import VersionB from "./components/versions/VersionB";

// VOLLEDIG VERSIE C
import VersionC from "./components/versions/VersionC";
```

---

## 📱 URL Structuur voor Testing

- **Versie A:** `nieuwebaanalsservicemonteur.nl/` (default)
- **Versie B:** `nieuwebaanalsservicemonteur.nl/?variant=b`
- **Versie C:** `nieuwebaanalsservicemonteur.nl/?variant=c`

Of gebruik separate landing pages:
- **Versie A:** `tech.nieuwebaanalsservicemonteur.nl`
- **Versie B:** `carriere.nieuwebaanalsservicemonteur.nl`
- **Versie C:** `salaris.nieuwebaanalsservicemonteur.nl`

---

## 🚀 Aanbevolen Test Volgorde

1. **Week 1-2:** Test alleen Hero headlines (A vs B vs C)
   - 33% traffic naar elke variant
   - Minimaal 150 bezoekers per variant voor significantie

2. **Week 3-4:** Winner van Week 1-2 vs 2 nieuwe varianten
   - Itereer op winnende headline
   - Test verschillende CTA copy

3. **Week 5+:** Volledige pagina optimalisatie
   - Test sectie volgorde
   - Test testimonial plaatsing
   - Test form length

---

## 📝 Notities

- Zorg voor **minimaal 100 conversies** per variant voor statistische significantie
- Test niet meer dan **3 varianten tegelijk** (analysis paralysis)
- Run tests minimaal **2 weken** voor betrouwbare data
- Monitor **tijd van dag** en **dag van week** effecten
- Check **mobile vs desktop** performance per variant

---

**Laatst bijgewerkt:** 29 oktober 2025
**Contact:** Monique (recruitment lead)
