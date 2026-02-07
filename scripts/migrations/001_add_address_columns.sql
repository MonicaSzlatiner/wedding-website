-- ============================================
-- Migration: Add Address Collection Columns
-- Run this in Supabase SQL Editor
-- ============================================
-- 
-- This migration adds columns for collecting mailing addresses
-- for formal wedding invitations. Supports multiple address formats:
-- - US: street, city, state, ZIP
-- - Netherlands: street + house number, postal code, city
-- - France: address lines, postal code, city
-- - Other: freeform text
--
-- The address_formatted column stores a pre-computed display string
-- suitable for printing and exports.
-- ============================================

-- Add invitation_name column (name as it should appear on invitation)
ALTER TABLE guests ADD COLUMN IF NOT EXISTS invitation_name TEXT;

-- Add country column
ALTER TABLE guests ADD COLUMN IF NOT EXISTS country TEXT;

-- Add address fields (normalized structure)
ALTER TABLE guests ADD COLUMN IF NOT EXISTS address_line1 TEXT;
ALTER TABLE guests ADD COLUMN IF NOT EXISTS address_line2 TEXT;
ALTER TABLE guests ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE guests ADD COLUMN IF NOT EXISTS region TEXT;  -- US state, or empty for NL/FR
ALTER TABLE guests ADD COLUMN IF NOT EXISTS postal_code TEXT;

-- Add freeform address for "Other" countries
ALTER TABLE guests ADD COLUMN IF NOT EXISTS address_freeform TEXT;

-- Add pre-formatted address for printing/exports
ALTER TABLE guests ADD COLUMN IF NOT EXISTS address_formatted TEXT;

-- Add timestamp for tracking when address was last updated
ALTER TABLE guests ADD COLUMN IF NOT EXISTS address_updated_at TIMESTAMPTZ;

-- Ensure index exists on code column (for fast lookups)
-- This is idempotent - will not error if index already exists
CREATE INDEX IF NOT EXISTS idx_guests_code ON guests(code);

-- ============================================
-- Address Format Rules (for reference):
-- ============================================
-- 
-- US:
--   {address_line1}
--   {address_line2}  (if present)
--   {city}, {region} {postal_code}
--   United States
--
-- Netherlands:
--   {address_line1}  (street + house number)
--   {postal_code} {city}
--   Netherlands
--
-- France:
--   {address_line1}
--   {address_line2}  (if present)
--   {postal_code} {city}
--   France
--
-- Other:
--   {address_freeform}
--   {country}  (if provided and not empty)
-- ============================================
