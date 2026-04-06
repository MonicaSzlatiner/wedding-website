-- Remap honeymoon fund activity labels (one-time; mirrors scripts/migrate-honeymoon-activities.mjs)
-- Titles must match src/components/HoneymoonFund.tsx ACTIVITIES[].name (Unicode apostrophes as in app)

UPDATE honeymoon_contributions
SET activity = 'A few really good dinners'
WHERE activity = 'A really good dinner';

UPDATE honeymoon_contributions
SET activity = 'Something on the water'
WHERE activity = 'A night somewhere beautiful';

UPDATE honeymoon_contributions
SET activity = 'A terrible little rental car'
WHERE activity = 'A spa day for both of us';

-- Adventure: match both straight (') and curly (’ U+2019) apostrophe in "haven't"
UPDATE honeymoon_contributions
SET activity = 'A hike Monica didn’t agree to'
WHERE activity IN ('An adventure we haven''t planned yet', 'An adventure we haven’t planned yet');
