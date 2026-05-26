import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendGiftNotification } from "@/lib/email";
import {
  findPendingPayPalContribution,
  sendContributorThankYouIfNeeded,
} from "@/lib/contributions";
import {
  isPaymentCompletedEvent,
  isResourcePaymentComplete,
  parsePayPalPaymentEvent,
  verifyPayPalWebhook,
} from "@/lib/paypal";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase configuration");
  return createClient(url, key);
}

interface PayPalWebhookEvent {
  id: string;
  event_type: string;
  resource: Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    let event: PayPalWebhookEvent;
    try {
      event = JSON.parse(rawBody) as PayPalWebhookEvent;
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const verified = await verifyPayPalWebhook(
      request.headers,
      JSON.parse(rawBody)
    );
    if (!verified) {
      console.error("PayPal webhook signature verification failed");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const eventType = event.event_type;
    if (!isPaymentCompletedEvent(eventType)) {
      return NextResponse.json({
        success: true,
        message: `Ignored event: ${eventType}`,
      });
    }

    if (!isResourcePaymentComplete(eventType, event.resource)) {
      return NextResponse.json({
        success: true,
        message: "Ignored — payment not completed",
      });
    }

    const payment = parsePayPalPaymentEvent(eventType, event.resource);
    if (!payment) {
      console.warn("Could not parse PayPal payment from event:", eventType);
      return NextResponse.json({
        success: true,
        message: "Ignored — no payment data",
      });
    }

    const supabase = getSupabaseAdmin();

    const { data: existing } = await supabase
      .from("honeymoon_contributions")
      .select("id")
      .eq("paypal_order_id", payment.transactionId)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ success: true, duplicate: true });
    }

    const pending = await findPendingPayPalContribution(
      supabase,
      payment.amountCents,
      payment.payerEmail
    );

    let row: {
      id: string;
      guest_name: string | null;
      guest_email: string | null;
      activity: string;
      amount_cents: number | null;
      thank_you_sent_at: string | null;
    };

    if (pending) {
      const activity = pending.activity;
      const { data: updated, error: updateError } = await supabase
        .from("honeymoon_contributions")
        .update({
          payment_status: "completed",
          paypal_order_id: payment.transactionId,
          guest_name: pending.guest_name ?? payment.payerName,
          amount_cents: payment.amountCents,
        })
        .eq("id", pending.id)
        .select(
          "id, guest_name, guest_email, activity, amount_cents, thank_you_sent_at"
        )
        .single();

      if (updateError || !updated) {
        console.error("PayPal webhook update error:", updateError);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
      }
      row = { ...updated, activity };
    } else {
      const activity = payment.note?.trim() || "Gift via PayPal";
      const { data: inserted, error: insertError } = await supabase
        .from("honeymoon_contributions")
        .insert({
          guest_name: payment.payerName,
          guest_email: payment.payerEmail,
          activity,
          amount_cents: payment.amountCents,
          paypal_order_id: payment.transactionId,
          payment_method: "paypal",
          payment_status: "completed",
        })
        .select(
          "id, guest_name, guest_email, activity, amount_cents, thank_you_sent_at"
        )
        .single();

      if (insertError || !inserted) {
        console.error("PayPal webhook insert error:", insertError);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
      }
      row = inserted;
    }

    const emailResult = await sendGiftNotification({
      guestName: row.guest_name,
      activity: row.activity,
      amountCents: row.amount_cents,
      currency: payment.currency,
      paymentMethod: "PayPal",
      transactionId: payment.transactionId,
      payerEmail: row.guest_email ?? payment.payerEmail,
      isConfirmedPayment: true,
    });

    if (!emailResult.success) {
      console.error("PayPal host notification failed:", emailResult.error);
    }

    await sendContributorThankYouIfNeeded(supabase, {
      id: row.id,
      guest_name: row.guest_name,
      guest_email: row.guest_email ?? payment.payerEmail,
      thank_you_sent_at: row.thank_you_sent_at,
    });

    console.log(
      `PayPal gift completed: ${row.guest_name ?? "unknown"} — ${payment.amountCents / 100} ${payment.currency}`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PayPal webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "PayPal webhook endpoint for honeymoon gifts",
  });
}
