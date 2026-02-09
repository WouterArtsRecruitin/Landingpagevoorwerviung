# Lovable Prompt: Opdrachtgever Onboarding

> Complete prompt voor het opzetten van een landingspagina voor een nieuwe opdrachtgever.
> Dit is de "one-shot" prompt die je in Lovable plakt als een opdrachtgever akkoord gaat.

---

## Volledige onboarding prompt

```
Maak een complete vacature landingspagina aan voor een nieuwe opdrachtgever.

OPDRACHTGEVER: [Bedrijfsnaam]
VACATURE: [Functietitel]
LOCATIE: [Stad/Regio]
SALARIS: [Range bijv. €3.000 - €3.500]

Dit project gebruikt een config-driven framework.
De architectuur staat in src/constants/demo-config.ts als referentie.

MAAK DE VOLGENDE BESTANDEN:

1. src/constants/configs/[slug].ts
   - Exporteer [NAAM]_CONFIG: LandingPageConfig
   - Vul ALLE secties in met relevante content voor deze vacature
   - Gebruik de opdrachtgever kleuren als theme
   - Configureer het contactformulier met: naam, email, telefoon, motivatie, cv, privacy

2. Voeg een route toe in src/App.tsx:
   - Path: /v/[slug]
   - Laadt de juiste config (Supabase first, lokale fallback)

3. Voeg de config toe aan Supabase (als verbonden):
   - INSERT in landing_pages tabel
   - Status: "published"

CONTENT RICHTLIJNEN:
- Hero: urgentie badge, salaris prominent, "Direct solliciteren" CTA
- Trust signals: bedrijfscijfers (medewerkers, jaren ervaring, score)
- Job details: 4-6 verantwoordelijkheden met korte beschrijving
- Benefits: 6 voordelen met iconen (salaris, auto, opleiding, vakantie, pensioen, bonus)
- Salary breakdown: transparant totaalpakket (verhoogt conversie 44%)
- Day in life: 5-7 tijdslots met iconen
- Requirements: must have / nice to have / NIET nodig (verlaagt drempel)
- Testimonials: 3 fictieve maar realistische quotes van "medewerkers"
- Why join us: 6 redenen met iconen
- About company: korte beschrijving + 4 stats
- FAQ: 5 relevante vragen over sollicitatieproces, functie, bedrijf
- Application form: kort formulier (max 6 velden excl. privacy checkbox)
- Final CTA: 3 opties (formulier, WhatsApp, gesprek plannen)

TOON: Persoonlijk, enthousiast maar professioneel.
TAAL: Nederlands.
CTA TEKST: "Ja, dit lijkt me wat!" of "Direct solliciteren"
```

## Opdrachtgever zonder website (extra visueel)

```
Deze opdrachtgever heeft geen eigen website, dus de landingspagina is het
eerste contactpunt voor kandidaten. Maak het extra visueel en professioneel:

EXTRA AANDACHTSPUNTEN:
1. Voeg de work_gallery sectie toe met 4-6 placeholder afbeeldingen
   (werkplek, team, kantoor, tools)
2. Voeg een video_embed sectie toe (YouTube placeholder)
3. Maak de about_company sectie uitgebreider met highlights
4. Voeg een team_culture sectie toe
5. Zorg dat het logo prominent in de sticky header staat
6. Voeg een favicon toe (bedrijfslogo of standaard)

Dit moet eruitzien als een professionele bedrijfspagina,
niet als een standaard vacaturetekst.
```

## Bulk: meerdere vacatures voor dezelfde opdrachtgever

```
Maak [AANTAL] vacature landingspagina's aan voor [BEDRIJFSNAAM].

VACATURES:
1. [Functie 1] - [Locatie] - [Salaris]
2. [Functie 2] - [Locatie] - [Salaris]
3. [Functie 3] - [Locatie] - [Salaris]

GEDEELD TUSSEN ALLE PAGINA'S:
- Zelfde theme/kleuren (huisstijl opdrachtgever)
- Zelfde contact gegevens
- Zelfde about_company sectie
- Zelfde trust_signals

UNIEK PER PAGINA:
- Hero (functietitel, salaris, locatie)
- Job details (verantwoordelijkheden)
- Requirements (eisen)
- Benefits (functie-specifiek)
- Salary breakdown
- FAQ

Maak voor elke vacature een apart config bestand:
- src/constants/configs/[bedrijf]-[functie-slug].ts
En voeg routes toe in App.tsx.
```
