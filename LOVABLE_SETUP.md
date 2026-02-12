# Lovable.dev Landing Page Setup

## Stap 1: Nieuw Lovable Project

1. Ga naar https://lovable.dev
2. Maak een nieuw project: "Recruitment Landing Pages"
3. Kies "Start from scratch" of "Blank React project"

## Stap 2: Supabase Connectie

In Lovable, voeg je Supabase credentials toe:

```typescript
// src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)
```

**Je credentials (uit je .env file):**
- SUPABASE_URL: Check je `.env` bestand
- SUPABASE_ANON_KEY: Check je `.env` bestand

## Stap 3: Installeer Dependencies

In Lovable terminal:
```bash
npm install @supabase/supabase-js react-router-dom lucide-react
```

## Stap 4: Code Files

Ik maak nu de volgende files voor je:
1. `src/pages/LandingPage.tsx` - Hoofdpagina component
2. `src/App.tsx` - Router setup
3. `src/components/` - Alle sectie components

## Stap 5: Deploy

1. In Lovable: klik "Deploy"
2. Lovable geeft je een URL: `https://jouw-project.lovable.app`
3. Test met: `https://jouw-project.lovable.app/v/asml-mechanical-engineer-1`

## Stap 6: Link Admin Panel

In je huidige admin panel (optioneel):
- Update "Bekijk" links om naar Lovable URL te wijzen
- Of: gebruik subdomain met reverse proxy

---

**Volgende stap:** Ik maak nu alle code files voor je! 🚀
