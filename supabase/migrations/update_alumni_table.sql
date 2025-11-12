-- Update alumni_registrations table with new fields
-- This migration updates the competitive exam fields

-- Drop old columns
ALTER TABLE alumni_registrations 
DROP COLUMN IF EXISTS selected_jee,
DROP COLUMN IF EXISTS selected_neet;

-- Add new columns
ALTER TABLE alumni_registrations 
ADD COLUMN IF NOT EXISTS competitive_exam VARCHAR(20), -- "JEE ADVANCED" or "NEET"
ADD COLUMN IF NOT EXISTS bansal_study_year VARCHAR(10), -- "1981-82" format
ADD COLUMN IF NOT EXISTS selection_year VARCHAR(15); -- "1981" to "2025" or "unselected"

-- Update exam_rank constraint to allow up to 15000
ALTER TABLE alumni_registrations 
DROP CONSTRAINT IF EXISTS alumni_registrations_exam_rank_check;

ALTER TABLE alumni_registrations 
ADD CONSTRAINT alumni_registrations_exam_rank_check 
CHECK (exam_rank IS NULL OR (exam_rank >= 1 AND exam_rank <= 15000));

-- Add comments for documentation
COMMENT ON COLUMN alumni_registrations.competitive_exam IS 'Competitive exam type: JEE ADVANCED or NEET';
COMMENT ON COLUMN alumni_registrations.bansal_study_year IS 'Year studied at Bansal Classes in format: 1981-82, 1982-83, etc.';
COMMENT ON COLUMN alumni_registrations.selection_year IS 'Year of selection in exam: 1981-2025 or unselected';
COMMENT ON COLUMN alumni_registrations.exam_rank IS 'Rank in competitive exam: 1-15000 or NULL';
