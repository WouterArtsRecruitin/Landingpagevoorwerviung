-- Publish all demo pages
UPDATE landing_pages
SET
  status = 'published',
  published_at = NOW()
WHERE slug LIKE '%techvision%'
   OR slug LIKE '%greencapital%'
   OR slug LIKE '%careplus%'
   OR slug LIKE '%precision%'
   OR slug LIKE '%supernova%'
RETURNING slug, page_title;
