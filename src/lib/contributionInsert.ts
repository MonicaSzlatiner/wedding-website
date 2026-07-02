import type { SupabaseClient } from "@supabase/supabase-js";

export interface ContributionInsertInput {
  guest_name: string;
  guest_email: string;
  activity: string;
  amount_cents: number | null;
  payment_method: "bank" | "paypal";
  payment_status: "pending" | "completed";
}

export interface ContributionInsertResult {
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

function isMissingColumnError(error: { code?: string; message?: string } | null) {
  if (!error) return false;
  return (
    error.code === "PGRST204" ||
    error.message?.includes("guest_email") === true ||
    error.message?.includes("payment_status") === true ||
    error.message?.includes("payment_method") === true
  );
}

/**
 * Insert a honeymoon contribution. Falls back to the legacy schema if
 * migration 006 has not been applied yet.
 */
export async function insertContribution(
  supabase: SupabaseClient,
  input: ContributionInsertInput
): Promise<{ data: ContributionInsertResult | null; error: Error | null }> {
  const fullPayload = {
    guest_name: input.guest_name,
    guest_email: input.guest_email,
    activity: input.activity,
    amount_cents: input.amount_cents,
    payment_method: input.payment_method,
    payment_status: input.payment_status,
  };

  const { data, error } = await supabase
    .from("honeymoon_contributions")
    .insert(fullPayload)
    .select(
      "id, guest_name, guest_email, activity, amount_cents, payment_method, payment_status, paypal_order_id, thank_you_sent_at"
    )
    .single();

  if (!error && data) {
    return { data: data as ContributionInsertResult, error: null };
  }

  if (!isMissingColumnError(error)) {
    return {
      data: null,
      error: new Error(error?.message ?? "Insert failed"),
    };
  }

  const legacyAmount = input.amount_cents;
  if (legacyAmount == null || legacyAmount <= 0) {
    return {
      data: null,
      error: new Error(
        "Database schema is outdated — run migration 006 in Supabase SQL Editor"
      ),
    };
  }

  const { data: legacyData, error: legacyError } = await supabase
    .from("honeymoon_contributions")
    .insert({
      guest_name: input.guest_name,
      activity: input.activity,
      amount_cents: legacyAmount,
    })
    .select("id, guest_name, activity, amount_cents, paypal_order_id, created_at")
    .single();

  if (legacyError || !legacyData) {
    return {
      data: null,
      error: new Error(legacyError?.message ?? "Legacy insert failed"),
    };
  }

  return {
    data: {
      id: legacyData.id,
      guest_name: legacyData.guest_name,
      guest_email: input.guest_email,
      activity: legacyData.activity,
      amount_cents: legacyData.amount_cents,
      payment_method: input.payment_method,
      payment_status: input.payment_status,
      paypal_order_id: legacyData.paypal_order_id ?? null,
      thank_you_sent_at: null,
    },
    error: null,
  };
}

/**
 * Fetch contribution rows for activity counts, with legacy schema fallback.
 */
export async function fetchContributionsForCounts(
  supabase: SupabaseClient
): Promise<
  Array<{
    activity: string;
    payment_status: string | null;
    paypal_order_id: string | null;
  }>
> {
  const { data, error } = await supabase
    .from("honeymoon_contributions")
    .select("activity, payment_status, paypal_order_id");

  if (!error && data) {
    return data;
  }

  if (!isMissingColumnError(error)) {
    throw error ?? new Error("Failed to fetch contributions");
  }

  const { data: legacyData, error: legacyError } = await supabase
    .from("honeymoon_contributions")
    .select("activity, paypal_order_id");

  if (legacyError) throw legacyError;

  return (legacyData ?? []).map((row) => ({
    activity: row.activity,
    payment_status: "completed",
    paypal_order_id: row.paypal_order_id ?? null,
  }));
}
