#!/usr/bin/env node
/**
 * Apply honeymoon gift schema migrations (006 + 005).
 * Requires DATABASE_URL or SUPABASE_DB_URL in .env.local
 *
 * Get connection string: Supabase Dashboard → Project Settings → Database → URI
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env.local") });

const url = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
if (!url) {
  console.error(
    "Missing DATABASE_URL. Add it to .env.local from Supabase → Settings → Database → Connection string (URI)."
  );
  process.exit(1);
}

const migrations = [
  "../supabase/migrations/006_contribution_email_and_status.sql",
  "../supabase/migrations/005_honeymoon_paypal_dedupe.sql",
];

const client = new pg.Client({
  connectionString: url,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  for (const rel of migrations) {
    const sql = readFileSync(resolve(__dirname, rel), "utf8");
    console.log(`Applying ${rel}...`);
    await client.query(sql);
    console.log("  OK");
  }
  console.log("Honeymoon schema migrations applied.");
} catch (err) {
  console.error("Migration failed:", err.message);
  process.exit(1);
} finally {
  await client.end();
}
