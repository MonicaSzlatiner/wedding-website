/**
 * Add a single guest to Supabase
 * 
 * Usage: npx tsx scripts/addGuest.ts
 */

import { createClient } from "@supabase/supabase-js";

// Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ncuffceyfgjccejxjvwa.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_1qHOeo8pTREBZPLkNLKUtw_Z8bF6M9I";

const supabase = createClient(supabaseUrl, supabaseKey);

// Guest to add
const newGuest = {
  code: "CARRIE",
  name: "Carrie Brown",
  plus_one_allowed: true,
  email: null,
  group_side: "Bride" as const,
};

async function addGuest() {
  console.log(`Adding guest: ${newGuest.name}...`);

  const { data, error } = await supabase.from("guests").insert(newGuest).select();

  if (error) {
    console.error(`Failed to add guest: ${error.message}`);
    process.exit(1);
  }

  console.log(`Successfully added: ${newGuest.name}`);
  console.log(`Code: ${newGuest.code}`);
  console.log(`Save the Date URL: https://laurensandmonica.com/save-the-date?code=${newGuest.code}`);
  console.log("\nDatabase record:", data);
}

addGuest().catch(console.error);
