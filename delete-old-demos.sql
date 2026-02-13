-- Delete old 6 template demos
-- Run this via Supabase SQL editor or psql

DELETE FROM landing_pages
WHERE slug IN (
  'asml-mechanical-engineer-1',
  'exact-senior-full-stack-developer-1',
  'vdl-groep-cnc-draaier-1',
  'mitsubishi-electric-servicemonteur-koeltechniek-1',
  'bolcom-warehouse-teamlead-1',
  'philips-engineering-manager-1'
)
RETURNING slug, page_title;

-- Cleanup any related data if needed
-- (Add additional cleanup queries if there are foreign key dependencies)
