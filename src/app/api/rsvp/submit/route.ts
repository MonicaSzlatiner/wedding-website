import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendRsvpNotification, sendRsvpConfirmationToGuest } from "@/lib/email";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase configuration");
  }
  return createClient(supabaseUrl, supabaseServiceKey);
}

const VALID_DIETARY = ["standard", "vegetarian", "allergies"] as const;

/** Map legacy / alternate stored values to current canonical slugs. */
function normalizeDietary(
  raw: string | null | undefined
): string | null {
  if (raw == null || raw === "") return null;
  const s = String(raw).toLowerCase().trim();
  if (s === "vegan") return "vegetarian";
  if ((VALID_DIETARY as readonly string[]).includes(s)) return s;
  return String(raw).trim();
}

interface SubmitBody {
  guest_id: string;
  attending: boolean;
  dietary_preference?: string | null;
  allergies?: string | null;
  plus_one_name?: string | null;
  plus_one_attending?: boolean | null;
  plus_one_dietary_preference?: string | null;
  plus_one_allergies?: string | null;
}

/**
 * POST /api/rsvp/submit
 *
 * Submits or updates an RSVP. Always overwrites the existing row —
 * guests can change their RSVP at any time.
 */
export async function POST(request: NextRequest) {
  try {
    const body: SubmitBody = await request.json();

    if (!body.guest_id || typeof body.attending !== "boolean") {
      return NextResponse.json(
        { error: "Missing required fields: guest_id, attending" },
        { status: 400 }
      );
    }

    const dietaryPref = normalizeDietary(body.dietary_preference ?? undefined);
    const plusOneDietaryPref = normalizeDietary(
      body.plus_one_dietary_preference ?? undefined
    );

    if (
      body.attending &&
      dietaryPref &&
      !(VALID_DIETARY as readonly string[]).includes(dietaryPref)
    ) {
      return NextResponse.json(
        { error: "Invalid dietary preference" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data: guest, error: lookupError } = await supabase
      .from("guests")
      .select("id, name, email, plus_one_allowed, rsvp_submitted_at")
      .eq("id", body.guest_id)
      .single();

    if (lookupError || !guest) {
      return NextResponse.json(
        { error: "Guest not found" },
        { status: 404 }
      );
    }

    if (
      guest.plus_one_allowed &&
      body.plus_one_attending &&
      plusOneDietaryPref &&
      !(VALID_DIETARY as readonly string[]).includes(plusOneDietaryPref)
    ) {
      return NextResponse.json(
        { error: "Invalid plus one dietary preference" },
        { status: 400 }
      );
    }

    const update: Record<string, unknown> = {
      attending: body.attending,
      rsvp_submitted_at: new Date().toISOString(),
    };

    if (body.attending) {
      update.dietary_preference = dietaryPref || null;
      update.allergies = body.allergies || null;

      if (guest.plus_one_allowed && body.plus_one_attending) {
        update.plus_one_attending = true;
        update.plus_one_name = body.plus_one_name || null;
        update.plus_one_dietary_preference = plusOneDietaryPref || null;
        update.plus_one_allergies = body.plus_one_allergies || null;
      } else {
        update.plus_one_attending = false;
        update.plus_one_name = null;
        update.plus_one_dietary_preference = null;
        update.plus_one_allergies = null;
      }
    } else {
      update.dietary_preference = null;
      update.allergies = null;
      update.plus_one_attending = null;
      update.plus_one_name = null;
      update.plus_one_dietary_preference = null;
      update.plus_one_allergies = null;
    }

    const { error: updateError } = await supabase
      .from("guests")
      .update(update)
      .eq("id", body.guest_id);

    if (updateError) {
      console.error("RSVP submit error:", updateError);
      return NextResponse.json(
        { error: "Failed to save your RSVP. Please try again." },
        { status: 500 }
      );
    }

    const isUpdate = guest.rsvp_submitted_at !== null;
    const effectivePlusOneAttending =
      body.attending &&
      guest.plus_one_allowed &&
      Boolean(body.plus_one_attending);

    const emailData = {
      guestName: guest.name,
      attending: body.attending,
      dietaryPreference: body.attending ? dietaryPref : null,
      allergies: body.attending ? body.allergies : null,
      plusOneName: effectivePlusOneAttending ? body.plus_one_name : null,
      plusOneAttending: !body.attending
        ? null
        : guest.plus_one_allowed
          ? Boolean(body.plus_one_attending)
          : false,
      plusOneDietaryPreference: effectivePlusOneAttending
        ? plusOneDietaryPref
        : null,
      plusOneAllergies: effectivePlusOneAttending
        ? body.plus_one_allergies
        : null,
      isUpdate,
    };

    try {
      await sendRsvpNotification(emailData);
    } catch (emailErr) {
      console.error("RSVP admin notification failed:", emailErr);
    }

    if (guest.email) {
      try {
        await sendRsvpConfirmationToGuest({
          ...emailData,
          guestEmail: guest.email,
        });
      } catch (emailErr) {
        console.error("RSVP guest confirmation failed:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      attending: body.attending,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
