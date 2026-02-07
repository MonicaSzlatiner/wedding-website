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

// Load environment variables from .env.local
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "../.env.local") });

// Supabase credentials - prefer service role key for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ncuffceyfgjccejxjvwa.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseKey) {
  console.error("❌ No Supabase key found. Please set SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn("⚠️  Using anon key - updates to existing guests may fail due to RLS");
  console.warn("   Add SUPABASE_SERVICE_ROLE_KEY to .env.local for full admin access\n");
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface GuestRow {
  code: string;
  name: string;
  plus_one_allowed: boolean;
  email: string | null;
  group_side: "Bride" | "Groom" | null;
}

// Generate a random 6-character code
function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Avoid confusing chars like 0/O, 1/I
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function parseCSV(csvContent: string): GuestRow[] {
  const lines = csvContent.trim().split("\n");
  const guests: GuestRow[] = [];
  const usedCodes = new Set<string>();

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Handle CSV parsing (basic - assumes no commas in values)
    const parts = line.split(",");
    
    if (parts.length >= 3) {
      let code = parts[0].trim();
      const name = parts[1].trim();
      const plusOne = parts[2].trim().toUpperCase() === "TRUE";
      const email = parts[3]?.trim() || null;
      const group = parts[4]?.trim() as "Bride" | "Groom" | null;

      // Skip if no name
      if (!name) continue;

      // Generate code if missing
      if (!code) {
        do {
          code = generateCode();
        } while (usedCodes.has(code));
        console.log(`📝 Generated code ${code} for ${name}`);
      }
      usedCodes.add(code);

      guests.push({
        code,
        name,
        plus_one_allowed: plusOne,
        email,
        group_side: group || null,
      });
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
