-- ============================================================
-- INSERT 3 NEW DEMO LANDING PAGES (Templates A, B, C)
-- Run deze SQL in Supabase SQL Editor
-- ============================================================

-- STAP 1: Maak demo organization aan (of gebruik bestaande)
-- Pas de organization_slug aan als je een bestaande organization wilt gebruiken
INSERT INTO organizations (name, slug, logo_url, website_url)
VALUES (
  'Demo Company',
  'demo-company',
  'https://via.placeholder.com/200x60/3B82F6/FFFFFF?text=DEMO',
  'https://demo.kandidatentekort.nl'
)
ON CONFLICT (slug) DO NOTHING;

-- STAP 2: Get organization_id voor gebruik in landing pages
-- (vervang deze variable met de actual ID uit stap 1, of gebruik een bestaande org ID)
-- Bijvoorbeeld: SELECT id FROM organizations WHERE slug = 'demo-company';

-- ============================================================
-- TEMPLATE A - MODERN PROFESSIONAL (Dark Tech)
-- ============================================================
INSERT INTO landing_pages (
  organization_id,
  slug,
  status,
  page_title,
  meta_description,
  sections,
  theme,
  form_fields,
  contact_person_name,
  contact_person_email,
  contact_person_phone,
  published_at
)
SELECT
  org.id,
  'techvision-ai-senior-ai-engineer-1',
  'published',
  'Senior AI Engineer bij TechVision AI | Amsterdam',
  'Bouw de toekomst van AI-gedreven oplossingen. Werk aan cutting-edge machine learning modellen met impact voor duizenden gebruikers.',
  -- Sections JSONB
  '[
    {
      "id": "hero-1",
      "type": "hero_modern",
      "order": 0,
      "visible": true,
      "data": {
        "companyName": "TechVision AI",
        "companyTagline": "Building the Future of AI",
        "headline": "Senior AI Engineer",
        "subheadline": "Bouw de toekomst van AI-gedreven oplossingen. Werk aan cutting-edge machine learning modellen met impact voor duizenden gebruikers.",
        "location": "Amsterdam",
        "salary": "€6.000 - €8.500 p/m",
        "employmentType": "Fulltime",
        "urgencyBadge": "We zoeken versterking",
        "primaryCtaLabel": "Solliciteer nu",
        "primaryCtaAction": "scroll_to_form",
        "secondaryCtaLabel": "Meer info",
        "quickStats": [
          {"label": "Salaris", "value": "€6.000-€8.500"},
          {"label": "Locatie", "value": "Amsterdam"},
          {"label": "Remote", "value": "4 dagen/week"}
        ]
      }
    },
    {
      "id": "requirements-1",
      "type": "requirements",
      "order": 1,
      "visible": true,
      "data": {
        "heading": "Wat we zoeken",
        "mustHave": [
          {"text": "MSc in Computer Science, AI of vergelijkbaar"},
          {"text": "Minimaal 5 jaar ervaring met Python en ML frameworks"},
          {"text": "Expert kennis van TensorFlow/PyTorch"},
          {"text": "Ervaring met cloud platforms (AWS/GCP/Azure)"}
        ],
        "niceToHave": [
          {"text": "PhD in Machine Learning"},
          {"text": "Publicaties in AI conferences"},
          {"text": "Open source contributions"}
        ]
      }
    },
    {
      "id": "benefits-1",
      "type": "benefits",
      "order": 2,
      "visible": true,
      "data": {
        "heading": "Wat we bieden",
        "benefits": [
          {"icon": "💰", "title": "Salaris €6.000 - €8.500", "description": "Competitief salaris op basis van ervaring"},
          {"icon": "🏠", "title": "Remote werken", "description": "4 dagen per week thuiswerken mogelijk"},
          {"icon": "📈", "title": "Aandelenopties", "description": "Deel in de groei van het bedrijf"},
          {"icon": "🎓", "title": "Opleidingsbudget €7.500", "description": "Jaarlijks budget voor persoonlijke ontwikkeling"},
          {"icon": "💻", "title": "MacBook Pro M3 Max", "description": "Top hardware en accessories"}
        ]
      }
    },
    {
      "id": "application-form-1",
      "type": "application_form",
      "order": 3,
      "visible": true,
      "data": {
        "heading": "Solliciteer nu",
        "subheading": "Laat je gegevens achter en we nemen contact op"
      }
    }
  ]'::jsonb,
  -- Theme JSONB
  '{
    "colors": {
      "primary": "#3B82F6",
      "secondary": "#1E3A8A",
      "accent": "#60A5FA",
      "background": "#FFFFFF",
      "foreground": "#1F2937",
      "muted": "#F3F4F6",
      "mutedForeground": "#6B7280"
    },
    "fonts": {
      "heading": "Inter",
      "body": "Inter"
    },
    "borderRadius": "0.5rem",
    "logoUrl": "",
    "logoAlt": "TechVision AI"
  }'::jsonb,
  -- Form fields JSONB
  '[
    {"name": "name", "label": "Naam", "type": "text", "required": true, "placeholder": "Je volledige naam"},
    {"name": "email", "label": "E-mail", "type": "email", "required": true, "placeholder": "je@email.nl"},
    {"name": "phone", "label": "Telefoon", "type": "tel", "required": true, "placeholder": "06 12 34 56 78"},
    {"name": "cv", "label": "CV", "type": "file", "required": true, "maxFileSizeMB": 5, "acceptedFileTypes": [".pdf", ".doc", ".docx"]},
    {"name": "motivation", "label": "Motivatie", "type": "textarea", "required": false, "placeholder": "Waarom wil je bij ons werken?"}
  ]'::jsonb,
  'Sarah Chen',
  'demo@kandidatentekort.nl',
  '+31 20 123 4567',
  now()
FROM organizations org
WHERE org.slug = 'demo-company'
ON CONFLICT (slug) DO UPDATE SET
  page_title = EXCLUDED.page_title,
  sections = EXCLUDED.sections,
  theme = EXCLUDED.theme,
  updated_at = now();

-- ============================================================
-- TEMPLATE B - BOLD & DYNAMIC (Green Energetic)
-- ============================================================
INSERT INTO landing_pages (
  organization_id,
  slug,
  status,
  page_title,
  meta_description,
  sections,
  theme,
  form_fields,
  contact_person_name,
  contact_person_email,
  contact_person_phone,
  published_at
)
SELECT
  org.id,
  'greenbuild-solutions-projectleider-duurzame-bouw-1',
  'published',
  'Projectleider Duurzame Bouw bij GreenBuild Solutions | Utrecht',
  'Leid innovatieve duurzame bouwprojecten van concept tot oplevering. Drijvende kracht achter circulaire en energieneutrale gebouwen.',
  -- Sections JSONB
  '[
    {
      "id": "hero-1",
      "type": "hero_dynamic",
      "order": 0,
      "visible": true,
      "data": {
        "companyName": "GreenBuild Solutions",
        "companyTagline": "Building a Sustainable Future",
        "headline": "Projectleider Duurzame Bouw",
        "subheadline": "Leid innovatieve duurzame bouwprojecten van concept tot oplevering. Ben de drijvende kracht achter circulaire en energieneutrale gebouwen.",
        "location": "Utrecht",
        "salary": "€4.500 - €6.000 p/m",
        "employmentType": "Fulltime",
        "primaryCtaLabel": "Direct solliciteren",
        "primaryCtaAction": "scroll_to_form",
        "secondaryCtaLabel": "Over ons"
      }
    },
    {
      "id": "requirements-1",
      "type": "requirements",
      "order": 1,
      "visible": true,
      "data": {
        "heading": "Jouw profiel",
        "mustHave": [
          {"text": "HBO/WO Bouwkunde of Civiele Techniek"},
          {"text": "Minimaal 3 jaar ervaring als projectleider"},
          {"text": "Kennis van duurzaam bouwen en circulaire economie"},
          {"text": "Leiderschaps- en communicatievaardigheden"}
        ],
        "niceToHave": [
          {"text": "BREEAM assessor certificering"},
          {"text": "Ervaring met houtbouw"},
          {"text": "Netwerk in de duurzame bouwsector"}
        ]
      }
    },
    {
      "id": "benefits-1",
      "type": "benefits",
      "order": 2,
      "visible": true,
      "data": {
        "heading": "Wat we bieden",
        "benefits": [
          {"icon": "💰", "title": "Salaris €4.500 - €6.000", "description": "Marktconform salaris plus bonusregeling"},
          {"icon": "🏢", "title": "Hybride werken", "description": "3 dagen kantoor, 2 dagen thuis"},
          {"icon": "🚗", "title": "Lease elektrische auto", "description": "Inclusief laadpas"},
          {"icon": "🌴", "title": "30 vakantiedagen", "description": "Ruim boven CAO"},
          {"icon": "💪", "title": "Projectbonus", "description": "Bonus op basis van resultaten"}
        ]
      }
    },
    {
      "id": "application-form-1",
      "type": "application_form",
      "order": 3,
      "visible": true,
      "data": {
        "heading": "Word onderdeel van ons team",
        "subheading": "Vul het formulier in en start je carrière in duurzame bouw"
      }
    }
  ]'::jsonb,
  -- Theme JSONB
  '{
    "colors": {
      "primary": "#10B981",
      "secondary": "#059669",
      "accent": "#34D399",
      "background": "#FFFFFF",
      "foreground": "#1F2937",
      "muted": "#F3F4F6",
      "mutedForeground": "#6B7280"
    },
    "fonts": {
      "heading": "Inter",
      "body": "Inter"
    },
    "borderRadius": "0.5rem",
    "logoUrl": "",
    "logoAlt": "GreenBuild Solutions"
  }'::jsonb,
  -- Form fields JSONB
  '[
    {"name": "name", "label": "Naam", "type": "text", "required": true, "placeholder": "Je volledige naam"},
    {"name": "email", "label": "E-mail", "type": "email", "required": true, "placeholder": "je@email.nl"},
    {"name": "phone", "label": "Telefoon", "type": "tel", "required": true, "placeholder": "06 12 34 56 78"},
    {"name": "cv", "label": "CV", "type": "file", "required": true, "maxFileSizeMB": 5, "acceptedFileTypes": [".pdf", ".doc", ".docx"]},
    {"name": "motivation", "label": "Motivatie", "type": "textarea", "required": false, "placeholder": "Waarom wil je bij ons werken?"}
  ]'::jsonb,
  'Mark van der Berg',
  'demo@kandidatentekort.nl',
  '+31 30 789 0123',
  now()
FROM organizations org
WHERE org.slug = 'demo-company'
ON CONFLICT (slug) DO UPDATE SET
  page_title = EXCLUDED.page_title,
  sections = EXCLUDED.sections,
  theme = EXCLUDED.theme,
  updated_at = now();

-- ============================================================
-- TEMPLATE C - CLASSIC CORPORATE (Clean White)
-- ============================================================
INSERT INTO landing_pages (
  organization_id,
  slug,
  status,
  page_title,
  meta_description,
  sections,
  theme,
  form_fields,
  contact_person_name,
  contact_person_email,
  contact_person_phone,
  published_at
)
SELECT
  org.id,
  'fintech-partners-senior-financial-analyst-1',
  'published',
  'Senior Financial Analyst bij Fintech Partners | Rotterdam',
  'Analyseer financiële data en adviseer over strategische investeringen. Trusted advisor voor onze investment teams.',
  -- Sections JSONB
  '[
    {
      "id": "hero-1",
      "type": "hero_corporate",
      "order": 0,
      "visible": true,
      "data": {
        "companyName": "Fintech Partners",
        "companyTagline": "Investment Excellence",
        "headline": "Senior Financial Analyst",
        "subheadline": "Analyseer financiële data en adviseer over strategische investeringen. Word een trusted advisor voor onze investment teams.",
        "location": "Rotterdam",
        "salary": "€5.500 - €7.500 p/m",
        "employmentType": "Fulltime",
        "primaryCtaLabel": "Solliciteer direct",
        "primaryCtaAction": "scroll_to_form",
        "secondaryCtaLabel": "Meer over de functie"
      }
    },
    {
      "id": "requirements-1",
      "type": "requirements",
      "order": 1,
      "visible": true,
      "data": {
        "heading": "Wat je meebrengt",
        "mustHave": [
          {"text": "MSc in Finance, Economics of Accountancy"},
          {"text": "Minimaal 4 jaar ervaring in financial analysis"},
          {"text": "Uitstekende kennis van Excel en financiële modellen"},
          {"text": "CFA Level 2 of hoger (of in opleiding)"}
        ],
        "niceToHave": [
          {"text": "Ervaring in private equity of VC"},
          {"text": "Kennis van fintech sector"},
          {"text": "Bloomberg certificatie"}
        ]
      }
    },
    {
      "id": "benefits-1",
      "type": "benefits",
      "order": 2,
      "visible": true,
      "data": {
        "heading": "Wat je krijgt",
        "benefits": [
          {"icon": "💰", "title": "Salaris €5.500 - €7.500", "description": "Plus bonus tot 20% van jaarsalaris"},
          {"icon": "📊", "title": "Jaarlijkse bonus", "description": "Performance-based tot 20%"},
          {"icon": "🏦", "title": "Pensioenregeling", "description": "8% employer contribution"},
          {"icon": "🎓", "title": "CFA/FRM support", "description": "Volledige ondersteuning voor certificeringen"},
          {"icon": "🏙️", "title": "Kantoor met uitzicht", "description": "Centraal gelegen aan de Maas"}
        ]
      }
    },
    {
      "id": "application-form-1",
      "type": "application_form",
      "order": 3,
      "visible": true,
      "data": {
        "heading": "Start je carrière bij Fintech Partners",
        "subheading": "Vul onderstaand formulier in"
      }
    }
  ]'::jsonb,
  -- Theme JSONB
  '{
    "colors": {
      "primary": "#6366F1",
      "secondary": "#4F46E5",
      "accent": "#818CF8",
      "background": "#FFFFFF",
      "foreground": "#1F2937",
      "muted": "#F3F4F6",
      "mutedForeground": "#6B7280"
    },
    "fonts": {
      "heading": "Inter",
      "body": "Inter"
    },
    "borderRadius": "0.5rem",
    "logoUrl": "",
    "logoAlt": "Fintech Partners"
  }'::jsonb,
  -- Form fields JSONB
  '[
    {"name": "name", "label": "Naam", "type": "text", "required": true, "placeholder": "Je volledige naam"},
    {"name": "email", "label": "E-mail", "type": "email", "required": true, "placeholder": "je@email.nl"},
    {"name": "phone", "label": "Telefoon", "type": "tel", "required": true, "placeholder": "06 12 34 56 78"},
    {"name": "cv", "label": "CV", "type": "file", "required": true, "maxFileSizeMB": 5, "acceptedFileTypes": [".pdf", ".doc", ".docx"]},
    {"name": "linkedin", "label": "LinkedIn URL", "type": "url", "required": false, "placeholder": "https://linkedin.com/in/..."},
    {"name": "motivation", "label": "Motivatie", "type": "textarea", "required": false, "placeholder": "Waarom past deze functie bij jou?"}
  ]'::jsonb,
  'Lisa de Jong',
  'demo@kandidatentekort.nl',
  '+31 10 456 7890',
  now()
FROM organizations org
WHERE org.slug = 'demo-company'
ON CONFLICT (slug) DO UPDATE SET
  page_title = EXCLUDED.page_title,
  sections = EXCLUDED.sections,
  theme = EXCLUDED.theme,
  updated_at = now();

-- ============================================================
-- VERIFICATION
-- Controleer of de demo pagina's zijn aangemaakt
-- ============================================================
SELECT slug, page_title, status, created_at
FROM landing_pages
WHERE slug IN (
  'techvision-ai-senior-ai-engineer-1',
  'greenbuild-solutions-projectleider-duurzame-bouw-1',
  'fintech-partners-senior-financial-analyst-1'
)
ORDER BY slug;
