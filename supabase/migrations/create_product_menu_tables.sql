-- Product mega menu tables (admin-manageable)
-- Creates:
-- - public.product_menu_categories
-- - public.product_menu_items

begin;

create extension if not exists "pgcrypto";

create table if not exists public.product_menu_categories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create index if not exists product_menu_categories_active_order_idx
  on public.product_menu_categories (is_active, display_order, created_at);

create table if not exists public.product_menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.product_menu_categories(id) on delete cascade,
  name text not null,
  slug text not null unique,
  short_description text,
  image_url text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create index if not exists product_menu_items_category_active_order_idx
  on public.product_menu_items (category_id, is_active, display_order, created_at);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_product_menu_categories_updated_at on public.product_menu_categories;
create trigger set_product_menu_categories_updated_at
before update on public.product_menu_categories
for each row execute function public.set_updated_at();

drop trigger if exists set_product_menu_items_updated_at on public.product_menu_items;
create trigger set_product_menu_items_updated_at
before update on public.product_menu_items
for each row execute function public.set_updated_at();

-- RLS: allow public read for active items
alter table public.product_menu_categories enable row level security;
alter table public.product_menu_items enable row level security;

drop policy if exists "Public read active categories" on public.product_menu_categories;
create policy "Public read active categories"
  on public.product_menu_categories
  for select
  using (is_active = true);

drop policy if exists "Public read active items" on public.product_menu_items;
create policy "Public read active items"
  on public.product_menu_items
  for select
  using (is_active = true);

-- TODO(admin): add insert/update/delete policies for admin role.
-- This project currently uses service-role on server routes for admin actions,
-- which bypasses RLS. If you want admin users to mutate directly with anon key,
-- add policies based on your auth model (e.g. JWT role claim, or a profiles table).

commit;

