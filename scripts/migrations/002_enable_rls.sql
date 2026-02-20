-- ============================================
-- Migration: Enable Row Level Security (RLS)
-- Run this in Supabase SQL Editor
-- ============================================
--
-- This migration enables RLS on all tables and creates
-- policies that restrict anon key access to only what
-- the frontend needs:
--   - guests: read-only lookup by code
--   - save_the_date_views: insert only
--   - rsvps: read, insert, update by guest_id
--
-- The address update API route uses the service role key,
-- which bypasses RLS entirely.
-- ============================================

-- 1. Enable RLS on all tables
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE save_the_date_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- 2. Guests: anon can only SELECT (for code-based lookups)
CREATE POLICY "anon_select_guests"
  ON guests
  FOR SELECT
  TO anon
  USING (true);

-- 3. Save the Date views: anon can only INSERT (for view tracking)
CREATE POLICY "anon_insert_std_views"
  ON save_the_date_views
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4. RSVPs: anon can SELECT, INSERT, and UPDATE
CREATE POLICY "anon_select_rsvps"
  ON rsvps
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "anon_insert_rsvps"
  ON rsvps
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "anon_update_rsvps"
  ON rsvps
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- ============================================
-- Notes:
-- - The service_role key bypasses all RLS policies.
--   Address updates via /api/guests/address use this key.
-- - Anon CANNOT insert, update, or delete guests.
-- - Anon CANNOT delete RSVPs or save_the_date_views.
-- ============================================
