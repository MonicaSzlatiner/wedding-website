import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase configuration");
  }
  return createClient(supabaseUrl, supabaseServiceKey);
}

/**
 * POST /api/rsvp/search
 *
 * Exact case-insensitive name lookup via the lookup_guest_by_name RPC.
 * Returns the guest record if found, or a 404 if not.
 * No partial matching, no LIKE, no browsing the guest list.
 */
export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();
    const trimmed = (name || "").trim();

    if (!trimmed) {
      return NextResponse.json(
        { error: "Please enter your name." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase.rpc("lookup_guest_by_name", {
      lookup_name: trimmed,
    });

    if (error) {
      console.error("Guest lookup error:", error);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "not_found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data[0]);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
