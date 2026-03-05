-- Site settings key-value table for admin Settings page.
-- Run this in Supabase SQL Editor if you use dashboard, or via supabase db push.

create table if not exists public.site_settings (
  key text primary key,
  value text default ''
);

comment on table public.site_settings is 'Key-value store for site name, social links, notification email, etc.';

-- Optional: enable RLS and allow read for anon (public site) and full access for authenticated admin
alter table public.site_settings enable row level security;

create policy "Allow read for anon"
  on public.site_settings for select
  to anon
  using (true);

create policy "Allow all for authenticated"
  on public.site_settings for all
  to authenticated
  using (true);
