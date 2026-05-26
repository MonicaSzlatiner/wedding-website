-- Guest email, payment tracking, and thank-you deduplication
ALTER TABLE honeymoon_contributions ADD COLUMN IF NOT EXISTS guest_email text;
ALTER TABLE honeymoon_contributions ADD COLUMN IF NOT EXISTS payment_method text;
ALTER TABLE honeymoon_contributions ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'completed';
ALTER TABLE honeymoon_contributions ADD COLUMN IF NOT EXISTS thank_you_sent_at timestamptz;

UPDATE honeymoon_contributions
SET payment_status = 'completed'
WHERE payment_status IS NULL;

-- Allow null amount for in-progress submissions
ALTER TABLE honeymoon_contributions ALTER COLUMN amount_cents DROP NOT NULL;
