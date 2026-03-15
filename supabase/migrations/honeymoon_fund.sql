-- Honeymoon Fund: contribution tracking
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

create table if not exists honeymoon_contributions (
  id uuid primary key default gen_random_uuid(),
  guest_name text,
  activity text not null,
  amount_cents integer not null,
  paypal_order_id text,
  created_at timestamptz default now()
);

-- RLS: block all client-side access (API routes use service role key)
alter table honeymoon_contributions enable row level security;

create policy "No anonymous reads"
  on honeymoon_contributions for select
  using (false);

create policy "No anonymous inserts"
  on honeymoon_contributions for insert
  with check (false);

create policy "No anonymous updates"
  on honeymoon_contributions for update
  using (false);

create policy "No anonymous deletes"
  on honeymoon_contributions for delete
  using (false);
