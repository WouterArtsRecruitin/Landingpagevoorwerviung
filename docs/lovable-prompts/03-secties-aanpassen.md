# Lovable Prompt: Secties Toevoegen & Aanpassen

> Prompts voor het aanpassen van individuele secties.

---

## Nieuwe sectie toevoegen

```
Voeg een nieuwe sectie toe aan het framework.

SECTIE TYPE: [bijv. "company_video" of "team_photos"]

INSTRUCTIES:
1. Voeg het type toe aan SectionType in src/types/landing-page.ts
2. Maak een data interface in src/types/section-data.ts
3. Exporteer de interface via src/types/index.ts
4. Maak het component in src/components/sections/[NaamSection].tsx
   - Importeer types uit @/types/section-data
   - Props: { data: [Naam]SectionData; sectionId: string; className?: string }
   - Gebruik cn() voor className merging
   - Gebruik Tailwind CSS + shadcn/ui componenten
   - Max 300 regels
5. Registreer in SECTION_REGISTRY in src/components/SectionRenderer.tsx
6. Voeg demo data toe aan de demo config secties

Stijl: consistent met bestaande secties (py-16 lg:py-24 padding,
max-w-5xl container, text-foreground/muted-foreground kleuren).
```

## Hero sectie aanpassen

```
Pas de hero sectie aan (src/components/sections/HeroSection.tsx):

WIJZIGINGEN:
- [bijv. Voeg een achtergrondvideo toe i.p.v. afbeelding]
- [bijv. Maak de quick stats klikbaar]
- [bijv. Voeg een countdown timer toe voor urgentie]

De hero data interface staat in src/types/section-data.ts (HeroSectionData).
Voeg nieuwe velden toe als optioneel (?) zodat bestaande configs niet breken.
Scroll naar formulier via scrollToApplicationForm() uit @/lib/scroll.
```

## Sollicitatieformulier aanpassen

```
Pas het sollicitatieformulier aan (src/components/sections/ApplicationFormSection.tsx):

Het formulier is dynamisch: velden komen uit config.formFields (FormFieldConfig[]).
Ondersteunde types: text, email, tel, textarea, file, checkbox, select, url.

WIJZIGING:
- [bijv. Voeg een stappen-formulier toe (multi-step) i.p.v. alles op 1 pagina]
- [bijv. Voeg LinkedIn profiel import knop toe]
- [bijv. Toon een voortgangsbalk bovenaan]

CV upload gaat via Supabase Storage.
Na submit wordt trackFormSubmit() aangeroepen voor analytics.
Gebruik SECTION_IDS.APPLICATION_FORM uit @/constants voor het section id.
```

## Testimonials met video

```
Voeg video testimonials toe aan de TestimonialsSection:

1. Breid TestimonialsSectionData uit in src/types/section-data.ts:
   - Voeg videoUrl?: string toe aan het testimonial object
2. In de component: als videoUrl aanwezig is, toon een video thumbnail
   met play button. Bij klik: open een modal/lightbox met de video.
3. Ondersteun YouTube en Vimeo URLs
4. Voeg een voorbeeld toe aan de demo config

Video testimonials verhogen conversie met 50-70%, dus maak ze prominent.
```

## FAQ sectie uitbreiden

```
Voeg een zoekfunctie toe aan de FAQ sectie:

1. Voeg een zoekbalk toe bovenaan de FAQ
2. Filter vragen in real-time op basis van input
3. Highlight de zoekterm in de resultaten
4. Als geen resultaten: toon "Geen resultaten gevonden. Neem contact op met [recruiter naam]"
5. Track zoekacties via trackEvent("faq_search", { query })

De FAQ gebruikt shadcn/ui Accordion component.
```

## Beschikbare sectie types

```
Het framework ondersteunt deze sectie types:

hero, job_details, benefits, salary_breakdown, tech_showcase,
day_in_life, testimonials, why_join_us, requirements, team_culture,
work_gallery, trust_signals, faq, application_form, final_cta,
about_company, hidden_gem, recruitment_approach, custom_html, video_embed

Elke sectie heeft:
- id: unieke string
- type: een van bovenstaande
- order: nummer (volgorde op pagina)
- visible: boolean
- data: sectie-specifiek object (zie src/types/section-data.ts)
- className: optionele extra Tailwind classes
```
