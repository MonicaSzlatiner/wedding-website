/**
 * Guest Code Generator Script
 * 
 * Generates unique 6-character codes for wedding guests and outputs JSON.
 * 
 * Usage:
 *   npx ts-node scripts/generateGuests.ts
 *   npx ts-node scripts/generateGuests.ts --write  # Also writes to src/data/guests.json
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface GuestInput {
  name: string;
  plusOne: boolean;
}

interface GuestOutput {
  name: string;
  plusOne: boolean;
}

interface GuestsMap {
  [code: string]: GuestOutput;
}

// Characters to use for codes (avoiding ambiguous: O, 0, I, 1, L)
const ALLOWED_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const CODE_LENGTH = 6;

/**
 * Generate a random code from allowed characters
 */
function generateCode(): string {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * ALLOWED_CHARS.length);
    code += ALLOWED_CHARS[randomIndex];
  }
  return code;
}

/**
 * Generate a unique code that doesn't exist in the set
 */
function generateUniqueCode(existingCodes: Set<string>): string {
  let code: string;
  let attempts = 0;
  const maxAttempts = 1000;

  do {
    code = generateCode();
    attempts++;
    if (attempts > maxAttempts) {
      throw new Error("Could not generate unique code after 1000 attempts");
    }
  } while (existingCodes.has(code));

  return code;
}

/**
 * Main function to generate guest codes
 */
function generateGuests(guests: GuestInput[]): GuestsMap {
  const existingCodes = new Set<string>();
  const result: GuestsMap = {};

  for (const guest of guests) {
    const code = generateUniqueCode(existingCodes);
    existingCodes.add(code);
    result[code] = {
      name: guest.name,
      plusOne: guest.plusOne,
    };
  }

  return result;
}

// ============================================
// GUEST LIST - Edit this array with your guests
// ============================================
const guestList: GuestInput[] = [
  { name: "Gladys Barahona Cortez", plusOne: false },
  { name: "Luis Miguel Barahona",plusOne: true },
  { name: "Cesar Llontop", plusOne: true },
  { name: "Tineke & Adri Geleedst", plusOne: false },
  { name: "Eline Geleedst", plusOne: false },
  { name: "Chaima Geleedst", plusOne: false },
  { name: "Noura Geleedst", plusOne: false },
  { name: "Sarah Geleedst", plusOne: false },
  { name: "Laureen Simone", plusOne: true },
  { name: "Corianne Rice", plusOne: true },
  { name: "Rosa Nowosielski", plusOne: true },
  { name: "Gwendal Jouannic", plusOne: true },
  { name: "Thomas Dubois", plusOne: true },
  { name: "Joffrey Leveugle", plusOne: true },
  { name: "Thomas Parle", plusOne: true },
  { name: "Marion Haberkorn", plusOne: false },
  { name: "Eddie Lee", plusOne: false },
  { name: "Radu Dragota", plusOne: true },
  { name: "Kris Stouten", plusOne: true },
  { name: "Matthew Samson", plusOne: true },
  { name: "Adnan Kujundzic", plusOne: true },
  { name: "Rob Kamphuis", plusOne: true },
  { name: "Humphrey Fredrikz", plusOne: true },

];

// ============================================
// Script execution
// ============================================
const shouldWrite = process.argv.includes("--write");
const outputPath = path.join(__dirname, "../src/data/guests.json");

console.log("🎊 Wedding Guest Code Generator\n");
console.log(`Generating codes for ${guestList.length} guests...\n`);

const guestsMap = generateGuests(guestList);

// Pretty print the JSON
const jsonOutput = JSON.stringify(guestsMap, null, 2);
console.log("Generated guest codes:\n");
console.log(jsonOutput);

// Print individual codes for easy reference
console.log("\n📋 Guest codes:\n");
for (const [code, guest] of Object.entries(guestsMap)) {
  console.log(`  ${code} → ${guest.name}${guest.plusOne ? " (+1)" : ""}`);
}

// Optionally write to file
if (shouldWrite) {
  fs.writeFileSync(outputPath, jsonOutput + "\n", "utf-8");
  console.log(`\n✅ Written to ${outputPath}`);
} else {
  console.log("\n💡 Tip: Run with --write flag to save to src/data/guests.json");
}
