# Lovable Prompt: Project Importeren

> Kopieer onderstaande prompt naar Lovable (Chat/Plan mode) om het framework te importeren.

---

## Stap 1: GitHub Import

```
Importeer mijn GitHub repository: WouterArtsRecruitin/Landingpagevoorwerviung

Dit is een modulair framework voor recruitment vacature landingspagina's.
Stack: Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui + Supabase.

Het project is config-driven: elke vacature = 1 JSON config object.
De demo config staat in src/constants/demo-config.ts.

Na import: draai 'npm install' en start de dev server met 'npm run dev'.
De demo pagina laadt automatisch op de root route (/).
```

## Stap 2: Supabase Koppelen

```
Koppel dit project aan Supabase:

1. Maak een nieuw Supabase project aan (of gebruik bestaand project)
2. Kopieer de URL en anon key naar .env:
   - VITE_SUPABASE_URL=https://[project-ref].supabase.co
   - VITE_SUPABASE_ANON_KEY=[anon-key]
3. Voer de migraties uit in volgorde (supabase/migrations/):
   - 001_create_organizations.sql
   - 002_create_landing_pages.sql
   - 003_create_ab_test_variants.sql
   - 004_create_applications.sql
   - 005_create_visitor_sessions.sql
   - 006_create_analytics_events.sql
   - 007_create_ats_sync_log.sql
4. Deploy de Edge Functions:
   - supabase/functions/submit-application
   - supabase/functions/track-event

Het project valt automatisch terug op de demo config als Supabase niet bereikbaar is.
```

## Stap 3: Verificatie

```
Controleer of het project correct draait:

1. De homepage toont een Servicemonteur demo vacature landingspagina
2. Er zijn 13 secties zichtbaar (hero, trust signals, job details, benefits, etc.)
3. De sticky header verschijnt na 300px scrollen
4. De floating apply button verschijnt na 600px scrollen (mobile)
5. Het sollicitatieformulier heeft dynamische velden uit de config
6. Cookie consent banner verschijnt onderaan

Als dit allemaal werkt, is het framework klaar voor gebruik.
```
