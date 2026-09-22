-- Drop tables if they exist to start fresh
drop table if exists public.products cascade;
drop table if exists public.categories cascade;

-- Create Categories Table
create table public.categories (
  id uuid not null default gen_random_uuid(),
  name text not null,
  slug text not null,
  image_url text,
  display_order int default 0,
  created_at timestamp with time zone not null default now(),
  constraint categories_pkey primary key (id),
  constraint categories_slug_key unique (slug)
);

-- RLS for Categories
alter table public.categories enable row level security;
create policy "Public categories are viewable by everyone." on public.categories for select using (true);
create policy "Authenticated users can insert categories" on public.categories for insert to authenticated with check (true);
create policy "Authenticated users can update categories" on public.categories for update to authenticated using (true);
create policy "Authenticated users can delete categories" on public.categories for delete to authenticated using (true);

-- Drop old Products table and recreate with foreign key
drop table if exists public.products cascade;

create table public.products (
  id uuid not null default gen_random_uuid(),
  number text not null,
  name text not null,
  description text,
  ingredients text[],
  category_id uuid references public.categories(id),
  price_solo numeric,
  price_menu numeric,
  image_url text,
  created_at timestamp with time zone not null default now(),
  constraint products_pkey primary key (id),
  constraint products_number_key unique (number)
);

-- Re-apply Seeding RLS Bypass (Essential for the script to run)
create policy "Allow public insert products" on public.products for insert with check (true);
create policy "Allow public insert categories" on public.categories for insert with check (true);
