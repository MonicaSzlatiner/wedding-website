/**
 * Import guests from CSV to Supabase
 * 
 * Usage: npx tsx scripts/importGuests.ts
 */

import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ncuffceyfgjccejxjvwa.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_1qHOeo8pTREBZPLkNLKUtw_Z8bF6M9I";

const supabase = createClient(supabaseUrl, supabaseKey);

interface GuestRow {
  code: string;
  name: string;
  plus_one_allowed: boolean;
  email: string | null;
  group_side: "Bride" | "Groom";
}

function parseCSV(csvContent: string): GuestRow[] {
  const lines = csvContent.trim().split("\n");
  const guests: GuestRow[] = [];

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Handle CSV parsing (basic - assumes no commas in values)
    const parts = line.split(",");
    
    if (parts.length >= 5) {
      const code = parts[0].trim();
      const name = parts[1].trim();
      const plusOne = parts[2].trim().toUpperCase() === "TRUE";
      const email = parts[3].trim() || null;
      const group = parts[4].trim() as "Bride" | "Groom";

      if (code && name) {
        guests.push({
          code,
          name,
          plus_one_allowed: plusOne,
          email,
          group_side: group,
        });
      }
    }
  }

  return guests;
}

async function importGuests() {
  console.log("🚀 Starting guest import to Supabase...\n");

  // Read CSV file
  const csvPath = path.join(__dirname, "../guest-list.csv");
  
  if (!fs.existsSync(csvPath)) {
    console.error("❌ CSV file not found at:", csvPath);
    console.log("\nPlease copy your CSV file to: guest-list.csv in the project root");
    process.exit(1);
  }

  const csvContent = fs.readFileSync(csvPath, "utf-8");
  const guests = parseCSV(csvContent);

  console.log(`📋 Found ${guests.length} guests in CSV\n`);

  // Insert guests into Supabase
  let successCount = 0;
  let errorCount = 0;

  for (const guest of guests) {
    const { error } = await supabase.from("guests").upsert(
      {
        code: guest.code,
        name: guest.name,
        plus_one_allowed: guest.plus_one_allowed,
        email: guest.email,
        group_side: guest.group_side,
      },
      { onConflict: "code" }
    );

    if (error) {
      console.error(`❌ Failed to insert ${guest.name}: ${error.message}`);
      errorCount++;
    } else {
      console.log(`✅ Imported: ${guest.name} (${guest.code})`);
      successCount++;
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log(`✅ Successfully imported: ${successCount} guests`);
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount} guests`);
  }
  console.log("=".repeat(50));
}

importGuests().catch(console.error);
