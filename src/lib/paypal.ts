/**
 * PayPal webhook verification and payment event parsing.
 */

const PAYPAL_API_BASE =
  process.env.PAYPAL_API_BASE ||
  (process.env.PAYPAL_MODE === "sandbox"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com");

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("Missing PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET");
  }

  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.token;
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );
  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    throw new Error(`PayPal OAuth failed: ${res.status}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return data.access_token;
}

export async function verifyPayPalWebhook(
  headers: Headers,
  body: unknown
): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) {
    console.warn("PAYPAL_WEBHOOK_ID not set — skipping signature verification");
    return true;
  }

  const authAlgo = headers.get("paypal-auth-algo");
  const certUrl = headers.get("paypal-cert-url");
  const transmissionId = headers.get("paypal-transmission-id");
  const transmissionSig = headers.get("paypal-transmission-sig");
  const transmissionTime = headers.get("paypal-transmission-time");

  if (
    !authAlgo ||
    !certUrl ||
    !transmissionId ||
    !transmissionSig ||
    !transmissionTime
  ) {
    return false;
  }

  const token = await getAccessToken();
  const res = await fetch(
    `${PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_algo: authAlgo,
        cert_url: certUrl,
        transmission_id: transmissionId,
        transmission_sig: transmissionSig,
        transmission_time: transmissionTime,
        webhook_id: webhookId,
        webhook_event: body,
      }),
    }
  );

  if (!res.ok) {
    console.error("PayPal verify-webhook-signature failed:", res.status);
    return false;
  }

  const result = (await res.json()) as { verification_status: string };
  return result.verification_status === "SUCCESS";
}

export interface ParsedPayPalPayment {
  transactionId: string;
  amountCents: number;
  currency: string;
  payerName: string | null;
  payerEmail: string | null;
  note: string | null;
}

function parseAmount(value: unknown, currency = "EUR"): { cents: number; currency: string } | null {
  if (value == null) return null;
  if (typeof value === "object" && value !== null && "value" in value) {
    const v = parseFloat(String((value as { value: string }).value));
    const c =
      "currency_code" in value
        ? String((value as { currency_code: string }).currency_code)
        : currency;
    if (Number.isNaN(v)) return null;
    return { cents: Math.round(v * 100), currency: c };
  }
  const n = parseFloat(String(value));
  if (Number.isNaN(n)) return null;
  return { cents: Math.round(n * 100), currency };
}

/**
 * Extract payment details from various PayPal webhook resource shapes.
 */
export function parsePayPalPaymentEvent(
  eventType: string,
  resource: Record<string, unknown>
): ParsedPayPalPayment | null {
  let transactionId: string | null = null;
  let amount: { cents: number; currency: string } | null = null;
  let payerName: string | null = null;
  let payerEmail: string | null = null;
  let note: string | null = null;

  if (eventType === "CHECKOUT.ORDER.COMPLETED") {
    transactionId = String(resource.id ?? "");
    const pu = resource.purchase_units as
      | Array<{
          amount?: { value: string; currency_code: string };
          payments?: { captures?: Array<{ id: string; amount?: { value: string; currency_code: string } }> };
          custom_id?: string;
        }>
      | undefined;
    const unit = pu?.[0];
    const capture = unit?.payments?.captures?.[0];
    if (capture?.id) transactionId = capture.id;
    amount =
      parseAmount(capture?.amount) ?? parseAmount(unit?.amount) ?? null;
    note = unit?.custom_id ? String(unit.custom_id) : null;
    const payer = resource.payer as
      | { name?: { given_name?: string; surname?: string }; email_address?: string }
      | undefined;
    if (payer?.name) {
      payerName = [payer.name.given_name, payer.name.surname]
        .filter(Boolean)
        .join(" ")
        .trim() || null;
    }
    payerEmail = payer?.email_address ?? null;
  } else if (
    eventType === "PAYMENT.CAPTURE.COMPLETED" ||
    eventType === "PAYMENT.SALE.COMPLETED"
  ) {
    transactionId = String(resource.id ?? "");
    amount = parseAmount(resource.amount);
    note = resource.custom_id ? String(resource.custom_id) : null;
    const supplementary = resource.supplementary_data as
      | { related_ids?: { order_id?: string } }
      | undefined;
    if (!note && supplementary?.related_ids?.order_id) {
      note = supplementary.related_ids.order_id;
    }
  } else if (eventType === "PAYMENTS.PAYMENT.CREATED") {
    transactionId = String(resource.id ?? "");
    const transactions = resource.transactions as
      | Array<{
          id?: string;
          amount?: { total?: string; currency?: string };
          note?: string;
        }>
      | undefined;
    const txn = transactions?.[0];
    if (txn?.id) transactionId = txn.id;
    if (txn?.amount?.total) {
      amount = parseAmount(
        { value: txn.amount.total, currency_code: txn.amount.currency ?? "EUR" }
      );
    }
    note = txn?.note ? String(txn.note) : null;
    const payer = resource.payer as
      | {
          payer_info?: {
            first_name?: string;
            last_name?: string;
            email?: string;
          };
        }
      | undefined;
    const info = payer?.payer_info;
    if (info) {
      payerName = [info.first_name, info.last_name].filter(Boolean).join(" ").trim() || null;
      payerEmail = info.email ?? null;
    }
  } else {
    return null;
  }

  if (!transactionId || !amount || amount.cents <= 0) {
    return null;
  }

  return {
    transactionId,
    amountCents: amount.cents,
    currency: amount.currency,
    payerName,
    payerEmail,
    note,
  };
}

export function isPaymentCompletedEvent(eventType: string): boolean {
  return (
    eventType === "PAYMENT.CAPTURE.COMPLETED" ||
    eventType === "PAYMENT.SALE.COMPLETED" ||
    eventType === "PAYMENTS.PAYMENT.CREATED" ||
    eventType === "CHECKOUT.ORDER.COMPLETED"
  );
}

/** Skip webhook events that are not finalized payments. */
export function isResourcePaymentComplete(
  eventType: string,
  resource: Record<string, unknown>
): boolean {
  if (eventType === "CHECKOUT.ORDER.COMPLETED") {
    const status = String(resource.status ?? "").toUpperCase();
    return status === "COMPLETED" || status === "";
  }
  if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
    const status = String(resource.status ?? "").toUpperCase();
    return status === "COMPLETED" || status === "";
  }
  if (eventType === "PAYMENTS.PAYMENT.CREATED") {
    const state = String(resource.state ?? "").toLowerCase();
    return state === "completed" || state === "approved";
  }
  if (eventType === "PAYMENT.SALE.COMPLETED") {
    const state = String(resource.state ?? "").toLowerCase();
    return state === "completed" || state === "";
  }
  return true;
}
