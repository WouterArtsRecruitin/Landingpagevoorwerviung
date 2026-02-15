-- DEBUG CHECK: Verifieer demo pages status

-- 1. Check organizations
SELECT id, name, slug
FROM organizations
WHERE slug = 'demo-company';

-- 2. Check landing pages
SELECT
  id,
  slug,
  status,
  organization_id,
  page_title,
  created_at,
  published_at
FROM landing_pages
WHERE slug LIKE '%techvision%'
   OR slug LIKE '%greenbuild%'
   OR slug LIKE '%fintech%'
ORDER BY created_at DESC;

-- 3. Check RLS policies
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'landing_pages';
