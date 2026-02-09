# Lovable Prompt: Nieuwe Vacature Landingspagina

> Kopieer en pas aan met de gegevens van je opdrachtgever/vacature.

---

## Volledige vacature aanmaken

```
Maak een nieuwe vacature landingspagina config aan op basis van het bestaande framework.
Gebruik src/constants/demo-config.ts als template.

VACATURE GEGEVENS:
- Functietitel: [bijv. Elektromonteur]
- Bedrijf: [bijv. TechInstall B.V.]
- Locatie: [bijv. Regio Rotterdam]
- Salaris: [bijv. €3.200 - €3.800 bruto/maand]
- Dienstverband: [bijv. Fulltime, 38-40 uur]
- Sector: [bijv. Installatietechniek]

CONTACT RECRUITER:
- Naam: [bijv. Wouter Arts]
- Rol: [bijv. Senior Recruiter]
- Email: [bijv. wouter@bedrijf.nl]
- Telefoon: [bijv. 06-12345678]
- WhatsApp link: [bijv. https://wa.me/31612345678?text=Hoi]
- Calendly: [bijv. https://calendly.com/wouter/15min]

BEDRIJF INFO:
- Bedrijfsnaam: [bijv. TechInstall B.V.]
- Website: [bijv. https://techinstall.nl]
- Logo URL: [optioneel]
- Korte beschrijving: [2-3 zinnen over het bedrijf]

INSTRUCTIES:
1. Maak een nieuw bestand: src/constants/configs/[slug].ts
2. Exporteer als [SLUG]_CONFIG met type LandingPageConfig
3. Gebruik een uniek slug (bijv. "elektromonteur-rotterdam")
4. Pas ALLE secties aan naar deze specifieke vacature
5. Zorg dat de CTA teksten passen bij de functie
6. Gebruik "Ja, dit lijkt me wat!" of "Direct solliciteren" als primaire CTA
7. Voeg minimaal 3 testimonials toe (mag fictief zijn als template)
8. Pas de FAQ vragen aan naar de specifieke functie
9. Stel de urgencyBadge in (bijv. "Nog 3 plekken beschikbaar")

THEME KLEUREN (optioneel, anders gebruik standaard blauw):
- Primary: [hex kleur van opdrachtgever]
- Secondary: [hex kleur]
```

## Snelle vacature (minimale input)

```
Maak snel een nieuwe vacature landingspagina aan.

Gebruik src/constants/demo-config.ts als basis en pas aan:
- Functie: [functietitel]
- Bedrijf: [bedrijfsnaam]
- Locatie: [regio/stad]
- Salaris: [range]
- Contact: [naam recruiter] / [telefoon] / [email]

Bewaar als src/constants/configs/[slug].ts
Voeg een route toe in src/App.tsx voor /v/[slug]

Houd alle secties maar pas de teksten aan naar deze vacature.
Genereer realistische maar fictieve testimonials en FAQ's.
```

## Route toevoegen voor nieuwe vacature

```
Voeg een nieuwe route toe voor de vacature landingspagina:

1. Importeer de config uit src/constants/configs/[slug].ts
2. Voeg in src/App.tsx een route toe: /v/[slug]
3. De LandingPageLoader moet eerst proberen uit Supabase te laden (op slug)
4. Als Supabase niet beschikbaar is, gebruik de lokale config als fallback
```
