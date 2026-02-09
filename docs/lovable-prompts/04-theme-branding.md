# Lovable Prompt: Theme & Branding Aanpassen

> Prompts voor huisstijl en visuele aanpassingen per opdrachtgever.

---

## Huisstijl opdrachtgever toepassen

```
Pas de theme/branding aan voor opdrachtgever [BEDRIJFSNAAM]:

KLEUREN:
- Primary (CTA knoppen, accenten): [hex bijv. #E63946]
- Secondary (dark backgrounds): [hex bijv. #1D3557]
- Accent (lichte achtergronden): [hex bijv. #F1FAEE]
- Muted (subtiele achtergronden): [hex bijv. #A8DADC]

FONTS (optioneel):
- Heading: [bijv. "Poppins", sans-serif]
- Body: [bijv. "Open Sans", sans-serif]

LOGO:
- URL: [logo url]
- Alt tekst: [bedrijfsnaam]

OVERIG:
- Border radius: [bijv. 0.5rem voor hoekiger, 1rem voor ronder]

Pas dit aan in de theme config van de landingspagina.
Het ThemeProvider systeem (src/providers/ThemeProvider.tsx) converteert
hex kleuren automatisch naar HSL CSS variabelen via hexToHsl().

Voeg de font imports toe aan index.html als het geen standaard Inter font is.
```

## CRO-geoptimaliseerde kleuren

```
Pas de kleuren aan voor maximale conversie:

ACHTERGROND: Gebruik research-based kleurpsychologie:
- Blauw (#2563EB) = vertrouwen, betrouwbaarheid (standaard)
- Groen (#16A34A) = groei, gezondheid (zorg/duurzaamheid)
- Donkerblauw (#1E40AF) = professionaliteit (finance/tech)

CTA KNOPPEN: Contrastkleur die opvalt tegen de primary:
- Oranje (#EA580C) bij blauw → hoog contrast, urgentie
- Rood (#DC2626) bij donkere achtergrond → actie, energie
- Groen (#16A34A) bij neutraal → positief, bevestigend

TIPS VOOR CONVERSIE:
- CTA knop moet minimaal 3x op de pagina voorkomen
- Gebruik "Ja, dit lijkt me wat!" i.p.v. "Solliciteer nu" (+significant meer clicks)
- WhatsApp knop altijd groen (#25D366) houden (herkenbaar)
- Trust signals op donkere achtergrond voor contrast
```

## Donker thema voor tech vacatures

```
Maak een donker thema variant voor tech/IT vacatures:

KLEUREN:
- Background: #0F172A (dark slate)
- Foreground: #F8FAFC (bijna wit)
- Primary: #3B82F6 (helder blauw)
- Secondary: #1E293B (donker grijs)
- Muted: #1E293B
- MutedForeground: #94A3B8

Dit past goed bij tech, IT, developer en engineering vacatures.
Het geeft een moderne, professionele uitstraling.

Pas de theme.colors aan in de config.
Let op: controleer of alle teksten leesbaar blijven op donkere achtergrond.
De hero sectie, trust signals en salary breakdown zien er anders uit op dark mode.
```

## Custom CSS toevoegen

```
Voeg custom CSS toe voor deze specifieke landingspagina.

De config ondersteunt een customCss veld (string).
Dit wordt in de <head> geïnjecteerd via de ThemeProvider.

Gebruik dit voor:
- Specifieke font overrides
- Animatie aanpassingen
- Print stylesheet
- Merk-specifieke stijlen die niet via theme config kunnen

Voorbeeld:
customCss: `
  .hero-section { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
  @media print { .sticky-header, .floating-apply { display: none; } }
`
```
