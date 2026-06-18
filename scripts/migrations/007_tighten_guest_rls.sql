-- ============================================
-- Migration: Tighten guest table RLS
-- Run in Supabase SQL Editor
-- ============================================

DROP POLICY IF EXISTS "Allow public read of guests" ON guests;
DROP POLICY IF EXISTS "Allow public insert of guests" ON guests;
DROP POLICY IF EXISTS "Allow public update of guests" ON guests;
DROP POLICY IF EXISTS "anon_select_guests" ON guests;
DROP POLICY IF EXISTS "anon_update_rsvp_fields" ON guests;

DROP POLICY IF EXISTS "Allow public insert of rsvps" ON rsvps;
DROP POLICY IF EXISTS "Allow public update of rsvps" ON rsvps;
DROP POLICY IF EXISTS "Allow public read of rsvps" ON rsvps;
DROP POLICY IF EXISTS "anon_select_rsvps" ON rsvps;
DROP POLICY IF EXISTS "anon_insert_rsvps" ON rsvps;
DROP POLICY IF EXISTS "anon_update_rsvps" ON rsvps;

CREATE OR REPLACE FUNCTION lookup_guest_by_code(lookup_code TEXT)
RETURNS TABLE (
  id UUID,
  name TEXT,
  plus_one_allowed BOOLEAN
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    g.id,
    g.name,
    g.plus_one_allowed
  FROM guests g
  WHERE UPPER(TRIM(g.code)) = UPPER(TRIM(lookup_code))
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION lookup_guest_by_code(TEXT) TO anon;

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
SET search_path = public
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

GRANT EXECUTE ON FUNCTION lookup_guest_by_name(TEXT) TO anon;

DROP POLICY IF EXISTS "Allow public insert of views" ON save_the_date_views;
DROP POLICY IF EXISTS "Allow public read of views" ON save_the_date_views;
DROP POLICY IF EXISTS "anon_insert_std_views" ON save_the_date_views;

CREATE POLICY "anon_insert_std_views"
  ON save_the_date_views
  FOR INSERT
  TO anon
  WITH CHECK (true);

REVOKE ALL ON TABLE guests FROM anon;
REVOKE ALL ON TABLE rsvps FROM anon;
REVOKE ALL ON TABLE save_the_date_views FROM anon;
GRANT INSERT ON TABLE save_the_date_views TO anon;
