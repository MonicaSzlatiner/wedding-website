import type { SupabaseClient } from "@supabase/supabase-js";
import { sendGiftThankYouToContributor } from "@/lib/email";

export interface ContributionRow {
  id: string;
  guest_name: string | null;
  guest_email: string | null;
  activity: string;
  amount_cents: number | null;
  payment_method: string | null;
  payment_status: string | null;
  paypal_order_id: string | null;
  thank_you_sent_at: string | null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidContributorEmail(email: string | null | undefined): boolean {
  if (!email?.trim()) return false;
  return EMAIL_RE.test(email.trim());
}

/**
 * Send contributor thank-you once per row; sets thank_you_sent_at on success.
 */
export async function sendContributorThankYouIfNeeded(
  supabase: SupabaseClient,
  row: Pick<ContributionRow, "id" | "guest_name" | "guest_email" | "thank_you_sent_at">
): Promise<void> {
  if (row.thank_you_sent_at) return;
  if (!isValidContributorEmail(row.guest_email)) return;

  const guestName = row.guest_name?.trim() || "friend";
  const result = await sendGiftThankYouToContributor({
    guestName,
    guestEmail: row.guest_email!.trim(),
  });

  if (!result.success) {
    console.error("[contributions] thank-you email failed:", result.error);
    return;
  }

  await supabase
    .from("honeymoon_contributions")
    .update({ thank_you_sent_at: new Date().toISOString() })
    .eq("id", row.id);
}

/**
 * Match a pending PayPal submission created when the guest clicked Pay on the site.
 */
export async function findPendingPayPalContribution(
  supabase: SupabaseClient,
  amountCents: number,
  payerEmail: string | null
): Promise<ContributionRow | null> {
  const since = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();

  const { data: rows } = await supabase
    .from("honeymoon_contributions")
    .select(
      "id, guest_name, guest_email, activity, amount_cents, payment_method, payment_status, paypal_order_id, thank_you_sent_at"
    )
    .eq("payment_status", "pending")
    .eq("payment_method", "paypal")
    .eq("amount_cents", amountCents)
    .is("paypal_order_id", null)
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(20);

  if (!rows?.length) return null;

  if (payerEmail) {
    const normalized = payerEmail.trim().toLowerCase();
    const byEmail = rows.find(
      (r) => r.guest_email?.trim().toLowerCase() === normalized
    );
    if (byEmail) return byEmail as ContributionRow;
  }

  return rows[0] as ContributionRow;
}
