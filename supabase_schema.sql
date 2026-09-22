-- Enable RLS on specific tables (users is managed by auth schema usually, skipping)


-- CATEGORIES TABLE
create table public.categories (
  id uuid not null default gen_random_uuid(),
  name text not null,
  name_fr text,
  slug text not null,
  image_url text,
  display_order int default 0,
  created_at timestamp with time zone not null default now(),
  constraint categories_pkey primary key (id),
  constraint categories_slug_key unique (slug)
);

-- PRODUCTS TABLE
create table public.products (
  id uuid not null default gen_random_uuid(),
  number text not null, -- e.g. "44"
  name text not null,
  name_fr text,
  description text,
  description_fr text,
  ingredients text[],
  category_id uuid references public.categories(id),
  price_solo numeric,
  price_menu numeric,
  quantity text,
  display_order int default 0,
  image_url text,
  created_at timestamp with time zone not null default now(),
  constraint products_pkey primary key (id),
  constraint products_number_key unique (number)
);

-- RLS for Categories
alter table public.categories enable row level security;
create policy "Public categories are viewable by everyone." on public.categories for select using (true);
create policy "Authenticated users can insert categories" on public.categories for insert to authenticated with check (true);
create policy "Authenticated users can update categories" on public.categories for update to authenticated using (true);
create policy "Authenticated users can delete categories" on public.categories for delete to authenticated using (true);


-- OFFERS TABLE
create table public.offers (
  id uuid not null default gen_random_uuid(),
  title text not null,
  title_fr text,
  description text,
  description_fr text,
  image_url text not null,
  price numeric not null,
  redirect_url text, -- optional external link
  created_at timestamp with time zone not null default now(),
  constraint offers_pkey primary key (id)
);

-- SETTINGS TABLE
create table public.settings (
  id uuid not null default gen_random_uuid(), -- likely only 1 row
  phone text,
  hours text,
  address text,
  uber_eats_url text,
  deliveroo_url text,
  social_facebook text,
  social_instagram text,
  menu_pdf_url text,
  created_at timestamp with time zone not null default now(),
  constraint settings_pkey primary key (id)
);

-- RLS POLICIES
alter table public.products enable row level security;
alter table public.offers enable row level security;
alter table public.settings enable row level security;

-- Public Read Access
create policy "Public products are viewable by everyone." on public.products for select using (true);
create policy "Public offers are viewable by everyone." on public.offers for select using (true);
create policy "Public settings are viewable by everyone." on public.settings for select using (true);

-- Admin Write Access (assuming admin uses Supabase Auth and is authenticated)
-- Ideally, you'd check a role, but for this simple single-admin app, we'll allow authenticated users to write (since only admin can log in via email/pass).
create policy "Authenticated users can insert products" on public.products for insert to authenticated with check (true);
create policy "Authenticated users can update products" on public.products for update to authenticated using (true);
create policy "Authenticated users can delete products" on public.products for delete to authenticated using (true);

create policy "Authenticated users can insert offers" on public.offers for insert to authenticated with check (true);
create policy "Authenticated users can update offers" on public.offers for update to authenticated using (true);
create policy "Authenticated users can delete offers" on public.offers for delete to authenticated using (true);

create policy "Authenticated users can insert settings" on public.settings for insert to authenticated with check (true);
create policy "Authenticated users can update settings" on public.settings for update to authenticated using (true);
create policy "Authenticated users can delete settings" on public.settings for delete to authenticated using (true);

-- STORAGE BUCKETS
-- You'll need to create buckets 'products', 'offers', 'qrcodes' in the dashboard manually or via API if possible.
-- Policies for storage:
-- Public can read
-- Authenticated can upload/delete
