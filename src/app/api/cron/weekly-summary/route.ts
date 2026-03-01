import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendWeeklySummary } from "@/lib/email";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase configuration");
  }
  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();

    const { data: guests, error } = await supabase
      .from("guests")
      .select("name, address_line1, plus_one_allowed, attending, rsvp_submitted_at")
      .order("name");

    if (error || !guests) {
      console.error("Weekly summary query error:", error);
      return NextResponse.json({ error: "Database query failed" }, { status: 500 });
    }

    const total = guests.length;
    const withAddress = guests.filter((g) => g.address_line1);
    const withoutAddress = guests.filter((g) => !g.address_line1);
    const withAddressPlusOne = withAddress.filter((g) => g.plus_one_allowed);

    const rsvpYes = guests.filter((g) => g.rsvp_submitted_at && g.attending === true);
    const rsvpNo = guests.filter((g) => g.rsvp_submitted_at && g.attending === false);
    const rsvpPending = guests.filter((g) => !g.rsvp_submitted_at);

    await sendWeeklySummary({
      total,
      withAddress: withAddress.length,
      withoutAddress: withoutAddress.length,
      withoutAddressNames: withoutAddress.map((g) => g.name),
      maxHeadcount: withAddress.length + withAddressPlusOne.length,
      rsvpYes: rsvpYes.length,
      rsvpNo: rsvpNo.length,
      rsvpPending: rsvpPending.length,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Weekly summary error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
