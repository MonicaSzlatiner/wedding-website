import { NextRequest, NextResponse } from "next/server";
import { sendAddressNotification } from "@/lib/email";

/**
 * Webhook endpoint for Supabase Database Webhook
 * 
 * Triggered when a guest's address is updated in the database.
 * Sends email notification to wedding@laurensandmonica.com and mszlatiner@gmail.com
 * 
 * Supabase sends webhook payload in this format:
 * {
 *   type: "UPDATE",
 *   table: "guests",
 *   record: { ... new row data ... },
 *   old_record: { ... old row data ... },
 *   schema: "public"
 * }
 */

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record: {
    id: string;
    name: string;
    invitation_name?: string;
    address_formatted?: string;
    country?: string;
    address_updated_at?: string;
    [key: string]: unknown;
  };
  old_record?: {
    address_updated_at?: string;
    [key: string]: unknown;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret for security
    const webhookSecret = request.headers.get("x-webhook-secret");
    if (webhookSecret !== process.env.WEBHOOK_SECRET) {
      console.error("Invalid webhook secret");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload: WebhookPayload = await request.json();

    // Only process UPDATE events on the guests table
    if (payload.type !== "UPDATE" || payload.table !== "guests") {
      return NextResponse.json({ 
        success: true, 
        message: "Ignored - not a guest update" 
      });
    }

    const { record, old_record } = payload;

    // Check if address was actually updated (address_updated_at changed)
    const addressWasUpdated = 
      record.address_updated_at && 
      record.address_updated_at !== old_record?.address_updated_at;

    if (!addressWasUpdated) {
      return NextResponse.json({ 
        success: true, 
        message: "Ignored - address not updated" 
      });
    }

    // Check if we have a formatted address to send
    if (!record.address_formatted) {
      return NextResponse.json({ 
        success: true, 
        message: "Ignored - no formatted address" 
      });
    }

    // Send email notification
    const result = await sendAddressNotification({
      guestName: record.name,
      invitationName: record.invitation_name,
      formattedAddress: record.address_formatted,
      country: record.country,
      updatedAt: record.address_updated_at || new Date().toISOString(),
    });

    if (!result.success) {
      console.error("Failed to send notification:", result.error);
      return NextResponse.json(
        { error: "Failed to send notification" },
        { status: 500 }
      );
    }

    console.log(`Address notification sent for guest: ${record.name}`);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Supabase may send a GET request to verify the endpoint exists
export async function GET() {
  return NextResponse.json({ 
    status: "ok", 
    message: "Address update webhook endpoint" 
  });
}
