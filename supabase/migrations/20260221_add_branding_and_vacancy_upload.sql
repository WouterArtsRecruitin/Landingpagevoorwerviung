-- Add branding fields and vacancy text upload support

-- Secondary brand color on intake_submissions
ALTER TABLE intake_submissions
ADD COLUMN IF NOT EXISTS secondary_color TEXT DEFAULT '#FFFFFF';

-- Vacancy text file URL (uploaded document)
ALTER TABLE intake_submissions
ADD COLUMN IF NOT EXISTS vacancy_text_url TEXT;

COMMENT ON COLUMN intake_submissions.secondary_color IS 'Secondary brand/huisstijl color';
COMMENT ON COLUMN intake_submissions.vacancy_text_url IS 'URL to uploaded vacancy text document (PDF/DOCX)';

-- Create storage bucket for brand assets (logos, vacancy texts)
INSERT INTO storage.buckets (id, name, public)
VALUES ('brand-assets', 'brand-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to brand assets
CREATE POLICY "Public read brand assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'brand-assets');

-- Allow authenticated and anon users to upload brand assets
CREATE POLICY "Anyone can upload brand assets" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'brand-assets');
