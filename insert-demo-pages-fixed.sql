-- ============================================================
-- INSERT 3 NEW DEMO LANDING PAGES - STEP BY STEP
-- Run elke section apart in Supabase SQL Editor
-- ============================================================

-- STAP 1: Maak demo organization aan
INSERT INTO organizations (name, slug, logo_url, website_url)
VALUES (
  'Demo Company',
  'demo-company',
  'https://via.placeholder.com/200x60/3B82F6/FFFFFF?text=DEMO',
  'https://demo.kandidatentekort.nl'
)
ON CONFLICT (slug) DO NOTHING;

-- Verifieer organization:
SELECT id, name, slug FROM organizations WHERE slug = 'demo-company';

-- ============================================================
-- STAP 2: Template A - Modern Professional
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
  'Bouw de toekomst van AI-gedreven oplossingen.',
  jsonb_build_array(
    jsonb_build_object(
      'id', 'hero-1',
      'type', 'hero_modern',
      'order', 0,
      'visible', true,
      'data', jsonb_build_object(
        'companyName', 'TechVision AI',
        'companyTagline', 'Building the Future of AI',
        'headline', 'Senior AI Engineer',
        'subheadline', 'Bouw de toekomst van AI-gedreven oplossingen. Werk aan cutting-edge machine learning modellen.',
        'location', 'Amsterdam',
        'salary', '€6.000 - €8.500 p/m',
        'employmentType', 'Fulltime',
        'urgencyBadge', 'We zoeken versterking',
        'primaryCtaLabel', 'Solliciteer nu',
        'primaryCtaAction', 'scroll_to_form',
        'secondaryCtaLabel', 'Meer info'
      )
    ),
    jsonb_build_object(
      'id', 'requirements-1',
      'type', 'requirements',
      'order', 1,
      'visible', true,
      'data', jsonb_build_object(
        'heading', 'Wat we zoeken',
        'mustHave', jsonb_build_array(
          jsonb_build_object('text', 'MSc in Computer Science, AI of vergelijkbaar'),
          jsonb_build_object('text', 'Minimaal 5 jaar ervaring met Python'),
          jsonb_build_object('text', 'Expert kennis van TensorFlow/PyTorch'),
          jsonb_build_object('text', 'Ervaring met cloud platforms')
        )
      )
    ),
    jsonb_build_object(
      'id', 'benefits-1',
      'type', 'benefits',
      'order', 2,
      'visible', true,
      'data', jsonb_build_object(
        'heading', 'Wat we bieden',
        'benefits', jsonb_build_array(
          jsonb_build_object('icon', '💰', 'title', 'Salaris €6.000 - €8.500', 'description', 'Competitief salaris'),
          jsonb_build_object('icon', '🏠', 'title', 'Remote werken', 'description', '4 dagen per week thuis'),
          jsonb_build_object('icon', '📈', 'title', 'Aandelenopties', 'description', 'Deel in de groei'),
          jsonb_build_object('icon', '🎓', 'title', 'Opleidingsbudget €7.500', 'description', 'Jaarlijks budget'),
          jsonb_build_object('icon', '💻', 'title', 'MacBook Pro M3 Max', 'description', 'Top hardware')
        )
      )
    ),
    jsonb_build_object(
      'id', 'application-form-1',
      'type', 'application_form',
      'order', 3,
      'visible', true,
      'data', jsonb_build_object(
        'heading', 'Solliciteer nu',
        'subheading', 'Laat je gegevens achter'
      )
    )
  ),
  jsonb_build_object(
    'colors', jsonb_build_object(
      'primary', '#3B82F6',
      'secondary', '#1E3A8A',
      'accent', '#60A5FA',
      'background', '#FFFFFF',
      'foreground', '#1F2937',
      'muted', '#F3F4F6',
      'mutedForeground', '#6B7280'
    ),
    'fonts', jsonb_build_object(
      'heading', 'Inter',
      'body', 'Inter'
    ),
    'borderRadius', '0.5rem',
    'logoUrl', '',
    'logoAlt', 'TechVision AI'
  ),
  jsonb_build_array(
    jsonb_build_object('name', 'name', 'label', 'Naam', 'type', 'text', 'required', true),
    jsonb_build_object('name', 'email', 'label', 'E-mail', 'type', 'email', 'required', true),
    jsonb_build_object('name', 'phone', 'label', 'Telefoon', 'type', 'tel', 'required', true),
    jsonb_build_object('name', 'cv', 'label', 'CV', 'type', 'file', 'required', true)
  ),
  'Sarah Chen',
  'demo@kandidatentekort.nl',
  '+31 20 123 4567',
  now()
FROM organizations org
WHERE org.slug = 'demo-company'
ON CONFLICT (slug) DO UPDATE SET
  sections = EXCLUDED.sections,
  theme = EXCLUDED.theme,
  updated_at = now();

-- ============================================================
-- STAP 3: Template B - Bold & Dynamic
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
  'Leid innovatieve duurzame bouwprojecten.',
  jsonb_build_array(
    jsonb_build_object(
      'id', 'hero-1',
      'type', 'hero_dynamic',
      'order', 0,
      'visible', true,
      'data', jsonb_build_object(
        'companyName', 'GreenBuild Solutions',
        'companyTagline', 'Building a Sustainable Future',
        'headline', 'Projectleider Duurzame Bouw',
        'subheadline', 'Leid innovatieve duurzame bouwprojecten van concept tot oplevering.',
        'location', 'Utrecht',
        'salary', '€4.500 - €6.000 p/m',
        'employmentType', 'Fulltime',
        'primaryCtaLabel', 'Direct solliciteren',
        'primaryCtaAction', 'scroll_to_form',
        'secondaryCtaLabel', 'Over ons'
      )
    ),
    jsonb_build_object(
      'id', 'requirements-1',
      'type', 'requirements',
      'order', 1,
      'visible', true,
      'data', jsonb_build_object(
        'heading', 'Jouw profiel',
        'mustHave', jsonb_build_array(
          jsonb_build_object('text', 'HBO/WO Bouwkunde of Civiele Techniek'),
          jsonb_build_object('text', 'Minimaal 3 jaar ervaring als projectleider'),
          jsonb_build_object('text', 'Kennis van duurzaam bouwen'),
          jsonb_build_object('text', 'Leiderschapsvaardigheden')
        )
      )
    ),
    jsonb_build_object(
      'id', 'benefits-1',
      'type', 'benefits',
      'order', 2,
      'visible', true,
      'data', jsonb_build_object(
        'heading', 'Wat we bieden',
        'benefits', jsonb_build_array(
          jsonb_build_object('icon', '💰', 'title', 'Salaris €4.500 - €6.000', 'description', 'Marktconform salaris'),
          jsonb_build_object('icon', '🏢', 'title', 'Hybride werken', 'description', '3 dagen kantoor'),
          jsonb_build_object('icon', '🚗', 'title', 'Lease elektrische auto', 'description', 'Inclusief laadpas'),
          jsonb_build_object('icon', '🌴', 'title', '30 vakantiedagen', 'description', 'Ruim boven CAO')
        )
      )
    ),
    jsonb_build_object(
      'id', 'application-form-1',
      'type', 'application_form',
      'order', 3,
      'visible', true,
      'data', jsonb_build_object(
        'heading', 'Word onderdeel van ons team',
        'subheading', 'Vul het formulier in'
      )
    )
  ),
  jsonb_build_object(
    'colors', jsonb_build_object(
      'primary', '#10B981',
      'secondary', '#059669',
      'accent', '#34D399',
      'background', '#FFFFFF',
      'foreground', '#1F2937',
      'muted', '#F3F4F6',
      'mutedForeground', '#6B7280'
    ),
    'fonts', jsonb_build_object(
      'heading', 'Inter',
      'body', 'Inter'
    ),
    'borderRadius', '0.5rem',
    'logoUrl', '',
    'logoAlt', 'GreenBuild Solutions'
  ),
  jsonb_build_array(
    jsonb_build_object('name', 'name', 'label', 'Naam', 'type', 'text', 'required', true),
    jsonb_build_object('name', 'email', 'label', 'E-mail', 'type', 'email', 'required', true),
    jsonb_build_object('name', 'phone', 'label', 'Telefoon', 'type', 'tel', 'required', true),
    jsonb_build_object('name', 'cv', 'label', 'CV', 'type', 'file', 'required', true)
  ),
  'Mark van der Berg',
  'demo@kandidatentekort.nl',
  '+31 30 789 0123',
  now()
FROM organizations org
WHERE org.slug = 'demo-company'
ON CONFLICT (slug) DO UPDATE SET
  sections = EXCLUDED.sections,
  theme = EXCLUDED.theme,
  updated_at = now();

-- ============================================================
-- STAP 4: Template C - Classic Corporate
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
  'Analyseer financiële data en adviseer over strategische investeringen.',
  jsonb_build_array(
    jsonb_build_object(
      'id', 'hero-1',
      'type', 'hero_corporate',
      'order', 0,
      'visible', true,
      'data', jsonb_build_object(
        'companyName', 'Fintech Partners',
        'companyTagline', 'Investment Excellence',
        'headline', 'Senior Financial Analyst',
        'subheadline', 'Analyseer financiële data en adviseer over strategische investeringen.',
        'location', 'Rotterdam',
        'salary', '€5.500 - €7.500 p/m',
        'employmentType', 'Fulltime',
        'primaryCtaLabel', 'Solliciteer direct',
        'primaryCtaAction', 'scroll_to_form',
        'secondaryCtaLabel', 'Meer over de functie'
      )
    ),
    jsonb_build_object(
      'id', 'requirements-1',
      'type', 'requirements',
      'order', 1,
      'visible', true,
      'data', jsonb_build_object(
        'heading', 'Wat je meebrengt',
        'mustHave', jsonb_build_array(
          jsonb_build_object('text', 'MSc in Finance, Economics of Accountancy'),
          jsonb_build_object('text', 'Minimaal 4 jaar ervaring in financial analysis'),
          jsonb_build_object('text', 'Excel en financiële modellen'),
          jsonb_build_object('text', 'CFA Level 2 of hoger')
        )
      )
    ),
    jsonb_build_object(
      'id', 'benefits-1',
      'type', 'benefits',
      'order', 2,
      'visible', true,
      'data', jsonb_build_object(
        'heading', 'Wat je krijgt',
        'benefits', jsonb_build_array(
          jsonb_build_object('icon', '💰', 'title', 'Salaris €5.500 - €7.500', 'description', 'Plus 20% bonus'),
          jsonb_build_object('icon', '📊', 'title', 'Jaarlijkse bonus', 'description', 'Performance-based'),
          jsonb_build_object('icon', '🏦', 'title', 'Pensioenregeling', 'description', '8% employer'),
          jsonb_build_object('icon', '🎓', 'title', 'CFA/FRM support', 'description', 'Volledige ondersteuning')
        )
      )
    ),
    jsonb_build_object(
      'id', 'application-form-1',
      'type', 'application_form',
      'order', 3,
      'visible', true,
      'data', jsonb_build_object(
        'heading', 'Start je carrière bij Fintech Partners',
        'subheading', 'Vul onderstaand formulier in'
      )
    )
  ),
  jsonb_build_object(
    'colors', jsonb_build_object(
      'primary', '#6366F1',
      'secondary', '#4F46E5',
      'accent', '#818CF8',
      'background', '#FFFFFF',
      'foreground', '#1F2937',
      'muted', '#F3F4F6',
      'mutedForeground', '#6B7280'
    ),
    'fonts', jsonb_build_object(
      'heading', 'Inter',
      'body', 'Inter'
    ),
    'borderRadius', '0.5rem',
    'logoUrl', '',
    'logoAlt', 'Fintech Partners'
  ),
  jsonb_build_array(
    jsonb_build_object('name', 'name', 'label', 'Naam', 'type', 'text', 'required', true),
    jsonb_build_object('name', 'email', 'label', 'E-mail', 'type', 'email', 'required', true),
    jsonb_build_object('name', 'phone', 'label', 'Telefoon', 'type', 'tel', 'required', true),
    jsonb_build_object('name', 'cv', 'label', 'CV', 'type', 'file', 'required', true)
  ),
  'Lisa de Jong',
  'demo@kandidatentekort.nl',
  '+31 10 456 7890',
  now()
FROM organizations org
WHERE org.slug = 'demo-company'
ON CONFLICT (slug) DO UPDATE SET
  sections = EXCLUDED.sections,
  theme = EXCLUDED.theme,
  updated_at = now();

-- ============================================================
-- VERIFICATION
-- ============================================================
SELECT slug, page_title, status, created_at
FROM landing_pages
WHERE slug IN (
  'techvision-ai-senior-ai-engineer-1',
  'greenbuild-solutions-projectleider-duurzame-bouw-1',
  'fintech-partners-senior-financial-analyst-1'
)
ORDER BY slug;
