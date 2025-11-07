/*
  # Create Alumni Registrations Table

  ## Summary
  This migration creates a comprehensive alumni registration system for an IIT-JEE and NEET coaching institute.

  ## New Tables
  1. `alumni_registrations`
     - Personal & Academic Details:
       - `id` (uuid, primary key) - Unique identifier
       - `full_name` (text) - Alumni's full name
       - `father_name` (text) - Father's name
       - `course_program` (text) - Course/Program pursued
       - `selected_jee` (boolean) - Selected in JEE exam
       - `selected_neet` (boolean) - Selected in NEET exam
       - `exam_rank` (integer) - Rank achieved (1-100)
       - `college_joined` (text) - College name
       - `stream_taken` (text) - Stream/specialization
     
     - Post-Graduation Details:
       - `pg_completed` (boolean) - PG completion status
       - `pg_stream` (text) - PG stream name
       - `pg_completion_year` (integer) - Year of PG completion
       - `other_exams` (text) - Other competitive exams
     
     - Permanent Address:
       - `address` (text) - Full address
     
     - Professional Details:
       - `company_name` (text) - Current/previous company
       - `currently_working` (boolean) - Currently working status
       - `position_role` (text) - Job position/role
       - `work_from_year` (integer) - Work start year
       - `work_to_year` (integer) - Work end year (null if current)
       - `total_experience` (numeric) - Years of experience
       - `roles` (jsonb) - Array of roles held
       - `industries` (jsonb) - Array of industries worked in
       - `skills` (jsonb) - Array of professional skills
     
     - Metadata:
       - `created_at` (timestamptz) - Registration timestamp
       - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable Row Level Security (RLS) on `alumni_registrations` table
  - Add policy allowing anyone to insert registrations (public form)
  - Add policy for authenticated users to view all registrations (admin access)
  
  ## Notes
  - JSONB fields are used for flexible array storage of roles, industries, and skills
  - Numeric type for experience allows decimal values (e.g., 2.5 years)
  - Timestamps automatically track creation and updates
*/

CREATE TABLE IF NOT EXISTS alumni_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  father_name text NOT NULL,
  course_program text NOT NULL,
  selected_jee boolean DEFAULT false,
  selected_neet boolean DEFAULT false,
  exam_rank integer,
  college_joined text NOT NULL,
  stream_taken text NOT NULL,
  pg_completed boolean DEFAULT false,
  pg_stream text,
  pg_completion_year integer,
  other_exams text,
  address text NOT NULL,
  company_name text NOT NULL,
  currently_working boolean DEFAULT false,
  position_role text NOT NULL,
  work_from_year integer NOT NULL,
  work_to_year integer,
  total_experience numeric NOT NULL,
  roles jsonb DEFAULT '[]'::jsonb,
  industries jsonb DEFAULT '[]'::jsonb,
  skills jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE alumni_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit alumni registration"
  ON alumni_registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all registrations"
  ON alumni_registrations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_alumni_created_at ON alumni_registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_alumni_college ON alumni_registrations(college_joined);
CREATE INDEX IF NOT EXISTS idx_alumni_exam_selection ON alumni_registrations(selected_jee, selected_neet);