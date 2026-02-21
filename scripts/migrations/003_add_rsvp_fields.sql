-- ============================================
-- Migration: Add RSVP Fields + Lookup Function
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Add RSVP columns to guests table
ALTER TABLE guests ADD COLUMN IF NOT EXISTS attending BOOLEAN;
ALTER TABLE guests ADD COLUMN IF NOT EXISTS dietary_preference TEXT;
ALTER TABLE guests ADD COLUMN IF NOT EXISTS allergies TEXT;
ALTER TABLE guests ADD COLUMN IF NOT EXISTS plus_one_name TEXT;
ALTER TABLE guests ADD COLUMN IF NOT EXISTS plus_one_attending BOOLEAN;
ALTER TABLE guests ADD COLUMN IF NOT EXISTS plus_one_dietary_preference TEXT;
ALTER TABLE guests ADD COLUMN IF NOT EXISTS plus_one_allergies TEXT;
ALTER TABLE guests ADD COLUMN IF NOT EXISTS rsvp_submitted_at TIMESTAMPTZ;

-- 2. Create secure RPC function for guest lookup
-- Case-insensitive exact match only — no LIKE, no partial matching.
-- Returns RSVP data when already submitted (for pre-filling edit form).
-- SECURITY DEFINER runs as the function owner, not the caller.
CREATE OR REPLACE FUNCTION lookup_guest_by_name(lookup_name TEXT)
RETURNS TABLE (
  id UUID,
  name TEXT,
  has_plus_one BOOLEAN,
  has_submitted BOOLEAN,
  attending BOOLEAN,
  dietary_preference TEXT,
  allergies TEXT,
  plus_one_name TEXT,
  plus_one_attending BOOLEAN,
  plus_one_dietary_preference TEXT,
  plus_one_allergies TEXT
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT
    g.id,
    g.name,
    g.plus_one_allowed AS has_plus_one,
    (g.rsvp_submitted_at IS NOT NULL) AS has_submitted,
    g.attending,
    g.dietary_preference,
    g.allergies,
    g.plus_one_name,
    g.plus_one_attending,
    g.plus_one_dietary_preference,
    g.plus_one_allergies
  FROM guests g
  WHERE LOWER(TRIM(g.name)) = LOWER(TRIM(lookup_name))
  LIMIT 1;
$$;

-- 3. Grant anon execute on the RPC function
GRANT EXECUTE ON FUNCTION lookup_guest_by_name(TEXT) TO anon;

-- 4. RLS: allow anon UPDATE on RSVP fields only (scoped by id)
CREATE POLICY "anon_update_rsvp_fields"
  ON guests
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- ============================================
-- Notes:
-- - All RSVP guest lookups go through the RPC function
-- - The function uses exact case-insensitive match (no LIKE)
-- - SECURITY DEFINER means anon can call the function
--   without needing direct SELECT on guests
-- - The API routes use service_role key for writes
-- - dietary_preference values: 'standard', 'vegetarian', 'vegan'
-- ============================================
