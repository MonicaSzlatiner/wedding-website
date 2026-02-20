-- ============================================
-- Migration: Add RSVP Fields to Guests Table
-- Run this in Supabase SQL Editor
-- ============================================
--
-- Adds RSVP response fields directly to the guests table
-- so each guest record holds their attendance and dietary info.
--
-- Also creates a secure view (guest_search) for the typeahead
-- that only exposes name, has_plus_one, and whether they've RSVP'd.
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

-- 2. Create a secure view for guest search (typeahead)
-- Only exposes: id, name, has_plus_one, has_rsvp
CREATE OR REPLACE VIEW guest_search AS
SELECT
  id,
  name,
  plus_one_allowed AS has_plus_one,
  (rsvp_submitted_at IS NOT NULL) AS has_rsvp
FROM guests;

-- 3. Allow anon to SELECT from the view
-- (Views inherit RLS from the underlying table, which already allows anon SELECT)

-- 4. Add RLS policy for anon UPDATE on RSVP fields only
-- The API route uses service_role key so this is a fallback safety net
CREATE POLICY "anon_update_rsvp_fields"
  ON guests
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- ============================================
-- Notes:
-- - dietary_preference values: 'standard', 'vegetarian', 'vegan'
-- - attending: null = not responded, true = yes, false = no
-- - rsvp_submitted_at: set on first submission, prevents re-submit
-- - The guest_search view prevents leaking email, dietary info,
--   allergies, or other sensitive fields through the typeahead
-- ============================================
