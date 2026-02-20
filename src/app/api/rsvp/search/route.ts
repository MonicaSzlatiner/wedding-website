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
 * GET /api/rsvp/search?q=<name>
 *
 * Returns matching guests for the typeahead. Only exposes safe fields:
 * id, name, has_plus_one, has_rsvp. Never exposes email, dietary info,
 * allergies, or address data.
 */
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("guests")
      .select("id, name, plus_one_allowed, rsvp_submitted_at")
      .ilike("name", `%${q}%`)
      .order("name")
      .limit(8);

    if (error) {
      console.error("Guest search error:", error);
      return NextResponse.json(
        { error: "Search failed" },
        { status: 500 }
      );
    }

    const results = (data || []).map((guest) => ({
      id: guest.id,
      name: guest.name,
      has_plus_one: guest.plus_one_allowed,
      has_rsvp: guest.rsvp_submitted_at !== null,
    }));

    return NextResponse.json(results);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
