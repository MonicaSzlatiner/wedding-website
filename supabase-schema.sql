-- ============================================
-- Wedding Website Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- GUESTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  plus_one_allowed BOOLEAN DEFAULT FALSE,
  group_side TEXT CHECK (group_side IN ('Bride', 'Groom')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast code lookups
CREATE INDEX IF NOT EXISTS idx_guests_code ON guests(code);

-- ============================================
-- SAVE THE DATE VIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS save_the_date_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guest_id UUID NOT NULL REFERENCES guests(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for guest lookups
CREATE INDEX IF NOT EXISTS idx_std_views_guest ON save_the_date_views(guest_id);

-- ============================================
-- RSVPS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS rsvps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guest_id UUID UNIQUE NOT NULL REFERENCES guests(id) ON DELETE CASCADE,
  attending BOOLEAN NOT NULL,
  plus_one_name TEXT,
  plus_one_attending BOOLEAN,
  dietary_choice TEXT,
  plus_one_dietary_choice TEXT,
  special_considerations TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for guest lookups
CREATE INDEX IF NOT EXISTS idx_rsvps_guest ON rsvps(guest_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE save_the_date_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running)
DROP POLICY IF EXISTS "Allow public read of guests" ON guests;
DROP POLICY IF EXISTS "Allow public insert of guests" ON guests;
DROP POLICY IF EXISTS "Allow public insert of views" ON save_the_date_views;
DROP POLICY IF EXISTS "Allow public read of views" ON save_the_date_views;
DROP POLICY IF EXISTS "Allow public insert of rsvps" ON rsvps;
DROP POLICY IF EXISTS "Allow public update of rsvps" ON rsvps;
DROP POLICY IF EXISTS "Allow public read of rsvps" ON rsvps;

-- Guests: Allow public read (for code lookup), insert, and update (for import)
CREATE POLICY "Allow public read of guests" ON guests
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert of guests" ON guests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update of guests" ON guests
  FOR UPDATE USING (true);

-- Save the Date Views: Allow public insert (for tracking views)
CREATE POLICY "Allow public insert of views" ON save_the_date_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read of views" ON save_the_date_views
  FOR SELECT USING (true);

-- RSVPs: Allow public insert and update (guests submit their own)
CREATE POLICY "Allow public insert of rsvps" ON rsvps
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update of rsvps" ON rsvps
  FOR UPDATE USING (true);

CREATE POLICY "Allow public read of rsvps" ON rsvps
  FOR SELECT USING (true);

-- ============================================
-- HELPFUL VIEWS
-- ============================================

-- View to see all RSVPs with guest info
CREATE OR REPLACE VIEW rsvp_summary AS
SELECT 
  g.name,
  g.group_side,
  g.plus_one_allowed,
  r.attending,
  r.plus_one_name,
  r.plus_one_attending,
  r.dietary_choice,
  r.plus_one_dietary_choice,
  r.special_considerations,
  r.submitted_at,
  r.updated_at
FROM guests g
LEFT JOIN rsvps r ON g.id = r.guest_id
ORDER BY g.group_side, g.name;
