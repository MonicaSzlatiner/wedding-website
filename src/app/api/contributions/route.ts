import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { sendGiftNotification } from "@/lib/email";
import { isValidContributorEmail } from "@/lib/contributions";

const PAYMENT_LABELS: Record<string, "PayPal" | "Bank transfer"> = {
  paypal: "PayPal",
  bank: "Bank transfer",
};

/**
 * POST /api/contributions
 *
 * Records a gift submission (name + email from the form) and notifies hosts.
 * Contributor thank-you is sent only for confirmed PayPal payments (webhook).
 * Bank transfers are thanked manually by the hosts.
 */
export async function POST(req: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await req.json();
    const {
      guest_name,
      guest_email,
      activity,
      amount_cents,
      payment_method = "bank",
    } = body as {
      guest_name?: string | null;
      guest_email?: string | null;
      activity?: string;
      amount_cents?: number | null;
      payment_method?: "bank" | "paypal";
    };

    if (!activity?.trim()) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!guest_name?.trim()) {
      return NextResponse.json(
        { error: "Please enter your name" },
        { status: 400 }
      );
    }

    if (!isValidContributorEmail(guest_email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const paymentLabel =
      PAYMENT_LABELS[payment_method] ?? PAYMENT_LABELS.bank;
    const paymentStatus =
      payment_method === "paypal" ? "pending" : "completed";

    const { data: row, error: insertError } = await supabase
      .from("honeymoon_contributions")
      .insert({
        guest_name: guest_name.trim(),
        guest_email: guest_email!.trim(),
        activity: activity.trim(),
        amount_cents: amount_cents ?? null,
        payment_method,
        payment_status: paymentStatus,
      })
      .select(
        "id, guest_name, guest_email, activity, amount_cents, payment_method, payment_status, paypal_order_id, thank_you_sent_at"
      )
      .single();

    if (insertError || !row) {
      console.error("[contributions] insert error:", insertError);
      throw insertError ?? new Error("Insert failed");
    }

    try {
      await sendGiftNotification({
        guestName: row.guest_name,
        activity: row.activity,
        amountCents: row.amount_cents,
        paymentMethod: paymentLabel,
        isConfirmedPayment: paymentStatus === "completed",
      });
    } catch (emailErr) {
      console.error("[contributions] host notification failed:", emailErr);
    }

    return NextResponse.json({ ok: true, id: row.id });
  } catch (err) {
    console.error("[contributions] error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
