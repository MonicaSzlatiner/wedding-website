import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: (url: RequestInfo | URL, options?: RequestInit) =>
      fetch(url, { ...options, cache: 'no-store' }),
  },
});

// ============================================
// Database Types
// ============================================

export interface Guest {
  id: string;
  code: string;
  name: string;
  email: string | null;
  plus_one_allowed: boolean;
  group_side: "Bride" | "Groom";
  created_at: string;
  // Address collection fields (added for formal invitation mailing)
  invitation_name: string | null;
  country: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  region: string | null;
  postal_code: string | null;
  address_freeform: string | null;
  address_formatted: string | null;
  address_updated_at: string | null;
}

export interface SaveTheDateView {
  id: string;
  guest_id: string;
  viewed_at: string;
}

export interface RSVP {
  id: string;
  guest_id: string;
  attending: boolean;
  plus_one_name: string | null;
  plus_one_attending: boolean | null;
  dietary_choice: string | null;
  plus_one_dietary_choice: string | null;
  special_considerations: string | null;
  submitted_at: string;
  updated_at: string;
}

// ============================================
// Helper Functions
// ============================================

/**
 * Look up a guest by their unique code (Save the Date).
 * Uses lookup_guest_by_code RPC — no direct table read for anon callers.
 */
export async function getGuestByCode(code: string): Promise<Guest | null> {
  const normalized = code.toUpperCase().trim();
  if (!normalized) return null;

  const { data, error } = await supabase.rpc("lookup_guest_by_code", {
    lookup_code: normalized,
  });

  if (error || !data?.length) {
    return null;
  }

  const row = data[0] as {
    id: string;
    name: string;
    plus_one_allowed: boolean;
  };

  return {
    id: row.id,
    code: normalized,
    name: row.name,
    email: null,
    plus_one_allowed: row.plus_one_allowed,
    group_side: "Bride",
    created_at: "",
    invitation_name: null,
    country: null,
    address_line1: null,
    address_line2: null,
    city: null,
    region: null,
    postal_code: null,
    address_freeform: null,
    address_formatted: null,
    address_updated_at: null,
  };
}

/**
 * Record that a guest viewed their Save the Date
 */
export async function recordSaveTheDateView(guestId: string): Promise<boolean> {
  const { error } = await supabase
    .from("save_the_date_views")
    .insert({ guest_id: guestId });

  return !error;
}

/**
 * Get existing RSVP for a guest
 */
export async function getRSVPByGuestId(guestId: string): Promise<RSVP | null> {
  const { data, error } = await supabase
    .from("rsvps")
    .select("*")
    .eq("guest_id", guestId)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

/**
 * Submit or update an RSVP
 */
export async function submitRSVP(
  guestId: string,
  rsvpData: {
    attending: boolean;
    plus_one_name?: string | null;
    plus_one_attending?: boolean | null;
    dietary_choice?: string | null;
    plus_one_dietary_choice?: string | null;
    special_considerations?: string | null;
  }
): Promise<{ success: boolean; error?: string }> {
  // Check if RSVP already exists
  const existingRSVP = await getRSVPByGuestId(guestId);

  if (existingRSVP) {
    // Update existing RSVP
    const { error } = await supabase
      .from("rsvps")
      .update({
        ...rsvpData,
        updated_at: new Date().toISOString(),
      })
      .eq("guest_id", guestId);

    if (error) {
      return { success: false, error: error.message };
    }
  } else {
    // Insert new RSVP
    const { error } = await supabase.from("rsvps").insert({
      guest_id: guestId,
      ...rsvpData,
    });

    if (error) {
      return { success: false, error: error.message };
    }
  }

  return { success: true };
}
