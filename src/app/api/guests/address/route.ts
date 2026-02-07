import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * API Route: Update Guest Address
 * 
 * This endpoint handles address collection for formal wedding invitations.
 * It uses the Supabase service role key for secure server-side updates.
 * 
 * POST /api/guests/address
 * Body: { code, invitation_name, country, address_line1, address_line2, city, region, postal_code, address_freeform }
 */

// Create Supabase client with service role key for secure operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase configuration");
  }
  return createClient(supabaseUrl, supabaseServiceKey);
}

// Address field types
interface AddressPayload {
  code: string;
  invitation_name?: string;
  country?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  region?: string;
  postal_code?: string;
  address_freeform?: string;
}

// Country-specific required fields
const REQUIRED_FIELDS_BY_COUNTRY: Record<string, string[]> = {
  "United States": ["address_line1", "city", "region", "postal_code"],
  "Netherlands": ["address_line1", "postal_code", "city"],
  "France": ["address_line1", "postal_code", "city"],
  "Other": ["address_freeform"],
};

/**
 * Build formatted address string based on country rules
 */
function buildFormattedAddress(
  country: string,
  fields: {
    address_line1?: string;
    address_line2?: string;
    city?: string;
    region?: string;
    postal_code?: string;
    address_freeform?: string;
  }
): string {
  const lines: string[] = [];

  switch (country) {
    case "United States":
      if (fields.address_line1) lines.push(fields.address_line1);
      if (fields.address_line2) lines.push(fields.address_line2);
      if (fields.city || fields.region || fields.postal_code) {
        const cityLine = [
          fields.city,
          fields.region ? `${fields.region} ${fields.postal_code || ""}`.trim() : fields.postal_code,
        ]
          .filter(Boolean)
          .join(", ");
        if (cityLine) lines.push(cityLine);
      }
      lines.push("United States");
      break;

    case "Netherlands":
      if (fields.address_line1) lines.push(fields.address_line1);
      if (fields.postal_code || fields.city) {
        lines.push([fields.postal_code, fields.city].filter(Boolean).join(" "));
      }
      lines.push("Netherlands");
      break;

    case "France":
      if (fields.address_line1) lines.push(fields.address_line1);
      if (fields.address_line2) lines.push(fields.address_line2);
      if (fields.postal_code || fields.city) {
        lines.push([fields.postal_code, fields.city].filter(Boolean).join(" "));
      }
      lines.push("France");
      break;

    case "Other":
    default:
      if (fields.address_freeform) lines.push(fields.address_freeform);
      if (country && country !== "Other") lines.push(country);
      break;
  }

  return lines.filter(Boolean).join("\n");
}

/**
 * Validate required fields based on country
 * Returns an error message if validation fails, or null if valid
 */
function validateAddressFields(
  country: string | undefined,
  fields: AddressPayload
): string | null {
  if (!country) {
    return null; // No country selected, no validation needed
  }

  const requiredFields = REQUIRED_FIELDS_BY_COUNTRY[country];
  if (!requiredFields) {
    return null;
  }

  // Check if user has started entering address details
  const hasAnyAddressField =
    fields.address_line1?.trim() ||
    fields.address_line2?.trim() ||
    fields.city?.trim() ||
    fields.region?.trim() ||
    fields.postal_code?.trim() ||
    fields.address_freeform?.trim();

  if (!hasAnyAddressField) {
    return null; // No address fields entered, allow save without validation
  }

  // Validate required fields for the selected country
  const missingFields: string[] = [];
  for (const field of requiredFields) {
    const value = fields[field as keyof AddressPayload];
    if (!value || (typeof value === "string" && !value.trim())) {
      // Format field name for display
      const displayName = field
        .replace("address_", "")
        .replace("_", " ")
        .replace("line1", "street address")
        .replace("freeform", "address");
      missingFields.push(displayName);
    }
  }

  if (missingFields.length > 0) {
    return `Please fill in: ${missingFields.join(", ")}`;
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body: AddressPayload = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Guest code is required" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Look up guest by code
    const { data: guest, error: lookupError } = await supabase
      .from("guests")
      .select("id, name, invitation_name, country, address_line1, address_line2, city, region, postal_code, address_freeform")
      .eq("code", code.toUpperCase())
      .single();

    if (lookupError || !guest) {
      return NextResponse.json(
        { error: "Guest not found" },
        { status: 404 }
      );
    }

    // Validate address fields if country is selected
    const validationError = validateAddressFields(body.country, body);
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    // Build update object - only include non-empty values
    const updateData: Record<string, string | null> = {};

    const fieldsToUpdate = [
      "invitation_name",
      "country",
      "address_line1",
      "address_line2",
      "city",
      "region",
      "postal_code",
      "address_freeform",
    ];

    let hasAddressUpdate = false;

    for (const field of fieldsToUpdate) {
      const value = body[field as keyof AddressPayload];
      if (value !== undefined) {
        const trimmedValue = typeof value === "string" ? value.trim() : value;
        // Only update if the new value is non-empty
        if (trimmedValue) {
          updateData[field] = trimmedValue;
          if (field !== "invitation_name") {
            hasAddressUpdate = true;
          }
        }
      }
    }

    // Build formatted address if we have address data
    const country = body.country || guest.country;
    if (country && hasAddressUpdate) {
      // Merge existing data with new data for formatting
      const mergedFields = {
        address_line1: (updateData.address_line1 as string) || guest.address_line1,
        address_line2: (updateData.address_line2 as string) || guest.address_line2,
        city: (updateData.city as string) || guest.city,
        region: (updateData.region as string) || guest.region,
        postal_code: (updateData.postal_code as string) || guest.postal_code,
        address_freeform: (updateData.address_freeform as string) || guest.address_freeform,
      };

      updateData.address_formatted = buildFormattedAddress(country, mergedFields);
      updateData.address_updated_at = new Date().toISOString();
    }

    // Only perform update if there's something to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ success: true, message: "No changes to save" });
    }

    // Update the guest record
    const { error: updateError } = await supabase
      .from("guests")
      .update(updateData)
      .eq("id", guest.id);

    if (updateError) {
      return NextResponse.json(
        { error: "Failed to save address" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch existing address data for a guest
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Guest code is required" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data: guest, error } = await supabase
      .from("guests")
      .select("id, name, invitation_name, country, address_line1, address_line2, city, region, postal_code, address_freeform")
      .eq("code", code.toUpperCase())
      .single();

    if (error || !guest) {
      return NextResponse.json(
        { error: "Guest not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      guest: {
        name: guest.name,
        invitation_name: guest.invitation_name,
        country: guest.country,
        address_line1: guest.address_line1,
        address_line2: guest.address_line2,
        city: guest.city,
        region: guest.region,
        postal_code: guest.postal_code,
        address_freeform: guest.address_freeform,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
