-- Align alumni_registrations table with simplified registration form
-- Run this script in Supabase SQL editor (or psql) once

-- Remove legacy professional-detail columns if they still exist
ALTER TABLE alumni_registrations
  DROP COLUMN IF EXISTS selected_jee,
  DROP COLUMN IF EXISTS selected_neet,
  DROP COLUMN IF EXISTS company_name,
  DROP COLUMN IF EXISTS currently_working,
  DROP COLUMN IF EXISTS position_role,
  DROP COLUMN IF EXISTS work_from_year,
  DROP COLUMN IF EXISTS work_to_year,
  DROP COLUMN IF EXISTS total_experience,
  DROP COLUMN IF EXISTS roles,
  DROP COLUMN IF EXISTS industries,
  DROP COLUMN IF EXISTS skills;

-- Ensure the latest columns are present
ALTER TABLE alumni_registrations
  ADD COLUMN IF NOT EXISTS competitive_exam VARCHAR(20),
  ADD COLUMN IF NOT EXISTS bansal_study_year VARCHAR(10),
  ADD COLUMN IF NOT EXISTS selection_year VARCHAR(15),
  ADD COLUMN IF NOT EXISTS linkedin_profile TEXT;

-- Keep the exam rank constraint aligned with 1-15000 range
ALTER TABLE alumni_registrations
  DROP CONSTRAINT IF EXISTS alumni_registrations_exam_rank_check;

ALTER TABLE alumni_registrations
  ADD CONSTRAINT alumni_registrations_exam_rank_check
  CHECK (exam_rank IS NULL OR (exam_rank BETWEEN 1 AND 15000));

-- Helpful metadata
COMMENT ON COLUMN alumni_registrations.linkedin_profile IS 'Alumnus LinkedIn profile URL';
COMMENT ON COLUMN alumni_registrations.competitive_exam IS 'Competitive exam type: JEE ADVANCED or NEET';
COMMENT ON COLUMN alumni_registrations.bansal_study_year IS 'Year studied at Bansal Classes in format 1981-82';
COMMENT ON COLUMN alumni_registrations.selection_year IS 'Year of selection (1981-2025) or unselected';
