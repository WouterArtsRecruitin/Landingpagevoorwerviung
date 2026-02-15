-- ============================================================
-- FIX RLS POLICY FOR LANDING PAGES
-- Zorg dat published pages publiek toegankelijk zijn
-- ============================================================

-- Drop bestaande policies om opnieuw te beginnen
DROP POLICY IF EXISTS "Published pages are public" ON landing_pages;
DROP POLICY IF EXISTS "Anyone can read published pages" ON landing_pages;

-- Enable RLS (als het nog niet enabled is)
ALTER TABLE landing_pages ENABLE ROW LEVEL SECURITY;

-- Nieuwe policy: IEDEREEN (anon + authenticated) kan published pages lezen
CREATE POLICY "Anyone can read published pages"
ON landing_pages
FOR SELECT
TO public
USING (status = 'published');

-- Verify: Check alle actieve policies
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'landing_pages';
