-- Add email and phone_number columns to alumni_registrations

-- For backwards compatibility, keep columns nullable to avoid migration conflicts with existing rows.

ALTER TABLE alumni_registrations
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS phone_number text;

-- Add optional comments for documentation
COMMENT ON COLUMN alumni_registrations.email IS 'Email address of registrant';
COMMENT ON COLUMN alumni_registrations.phone_number IS 'Phone number of registrant';

-- Recommended: create an index for quick searching by email or phone (optional)
CREATE INDEX IF NOT EXISTS idx_alumni_email ON alumni_registrations(email);
CREATE INDEX IF NOT EXISTS idx_alumni_phone ON alumni_registrations(phone_number);
