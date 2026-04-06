/**
 * One-off: remap honeymoon_contributions.activity from old tile titles to new copy.
 * Run from repo root: node scripts/migrate-honeymoon-activities.mjs
 * Requires .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "..", ".env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key);

/** Must match src/components/HoneymoonFund.tsx ACTIVITIES[].name */
const CANONICAL_ACTIVITIES = [
  "A few really good dinners",
  "Something on the water",
  "A terrible little rental car",
  "A hike Monica didn\u2019t agree to",
  "Morning coffee with a view",
  "Just make it wonderful",
];

/** Old label -> new label (include unicode apostrophe variants for adventure) */
const MAPPINGS = [
  ["A really good dinner", "A few really good dinners"],
  ["A night somewhere beautiful", "Something on the water"],
  ["A spa day for both of us", "A terrible little rental car"],
  ["An adventure we haven't planned yet", "A hike Monica didn\u2019t agree to"],
  ["An adventure we haven\u2019t planned yet", "A hike Monica didn\u2019t agree to"],
];

async function main() {
  for (const [from, to] of MAPPINGS) {
    const { data, error } = await supabase
      .from("honeymoon_contributions")
      .update({ activity: to })
      .eq("activity", from)
      .select("id");

    if (error) {
      console.error(`Update failed (${from} -> ${to}):`, error.message);
      process.exit(1);
    }
    console.log(`Updated ${data?.length ?? 0} row(s): "${from}" -> "${to}"`);
  }

  const { data: rows, error: selErr } = await supabase
    .from("honeymoon_contributions")
    .select("id, activity");

  if (selErr) {
    console.error("Select failed:", selErr.message);
    process.exit(1);
  }

  const allowed = new Set(CANONICAL_ACTIVITIES);
  const orphans = (rows ?? []).filter((r) => !allowed.has(r.activity));

  for (const row of orphans) {
    const { error: delErr } = await supabase
      .from("honeymoon_contributions")
      .delete()
      .eq("id", row.id);
    if (delErr) {
      console.error(`Delete failed for id ${row.id}:`, delErr.message);
      process.exit(1);
    }
    console.log(`Removed non-canonical row: activity="${row.activity}" id=${row.id}`);
  }

  if (orphans.length === 0) {
    console.log("No orphan rows (all activities already canonical).");
  }

  const { data: finalRows } = await supabase
    .from("honeymoon_contributions")
    .select("activity, amount_cents");
  console.log("Remaining rows:", finalRows?.length ?? 0);
  if (finalRows?.length) {
    const byAct = {};
    for (const r of finalRows) {
      byAct[r.activity] = (byAct[r.activity] ?? 0) + 1;
    }
    console.log("By activity:", JSON.stringify(byAct, null, 2));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
