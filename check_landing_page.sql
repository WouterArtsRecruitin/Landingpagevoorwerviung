SELECT 
  id,
  slug,
  company_name,
  page_title,
  status,
  template_style,
  created_at
FROM landing_pages
ORDER BY created_at DESC
LIMIT 1;
