-- Prevent duplicate PayPal gift rows when webhook retries
CREATE UNIQUE INDEX IF NOT EXISTS idx_honeymoon_contributions_paypal_id
  ON honeymoon_contributions (paypal_order_id)
  WHERE paypal_order_id IS NOT NULL;
