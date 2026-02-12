-- Add new template customization fields to intake_submissions table

ALTER TABLE intake_submissions
ADD COLUMN IF NOT EXISTS template_style TEXT DEFAULT 'auto',
ADD COLUMN IF NOT EXISTS image_style TEXT DEFAULT 'photos',
ADD COLUMN IF NOT EXISTS calendly_url TEXT;

COMMENT ON COLUMN intake_submissions.template_style IS 'Template style choice: auto, engineering, tech, industrial, service, logistics, premium';
COMMENT ON COLUMN intake_submissions.image_style IS 'Image style preference: photos, illustrations, 3d, minimal';
COMMENT ON COLUMN intake_submissions.calendly_url IS 'Optional Calendly scheduling link';
