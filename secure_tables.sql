-- Secure Tables Migration
-- This script fixes the "UNRESTRICTED" status by enabling RLS and removing public write access.

-- 1. Ensure RLS is enabled on all tables
alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.offers enable row level security;
alter table public.settings enable row level security;

-- 2. Drop insecure "public insert" policies if they exist (from seeding)
drop policy if exists "Allow public insert products" on public.products;
drop policy if exists "Allow public insert categories" on public.categories;
-- Also drop generic public write policies if any were created loosely
drop policy if exists "Public products are insertable by everyone" on public.products;

-- 3. Re-define strict policies for PRODUCTS

-- Allow public read access (Menu needs this)
drop policy if exists "Public products are viewable by everyone" on public.products;
create policy "Public products are viewable by everyone" on public.products for select using (true);

-- Allow ONLY authenticated users (Admin) to Write
drop policy if exists "Authenticated users can insert products" on public.products;
create policy "Authenticated users can insert products" on public.products for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update products" on public.products;
create policy "Authenticated users can update products" on public.products for update to authenticated using (true);

drop policy if exists "Authenticated users can delete products" on public.products;
create policy "Authenticated users can delete products" on public.products for delete to authenticated using (true);


-- 4. Re-define strict policies for CATEGORIES

drop policy if exists "Public categories are viewable by everyone" on public.categories;
create policy "Public categories are viewable by everyone" on public.categories for select using (true);

drop policy if exists "Authenticated users can insert categories" on public.categories;
create policy "Authenticated users can insert categories" on public.categories for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update categories" on public.categories;
create policy "Authenticated users can update categories" on public.categories for update to authenticated using (true);

drop policy if exists "Authenticated users can delete categories" on public.categories;
create policy "Authenticated users can delete categories" on public.categories for delete to authenticated using (true);

-- 5. Re-define strict policies for OFFERS

drop policy if exists "Public offers are viewable by everyone" on public.offers;
create policy "Public offers are viewable by everyone" on public.offers for select using (true);

drop policy if exists "Authenticated users can insert offers" on public.offers;
create policy "Authenticated users can insert offers" on public.offers for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update offers" on public.offers;
create policy "Authenticated users can update offers" on public.offers for update to authenticated using (true);

drop policy if exists "Authenticated users can delete offers" on public.offers;
create policy "Authenticated users can delete offers" on public.offers for delete to authenticated using (true);

-- 6. Re-define strict policies for SETTINGS

drop policy if exists "Public settings are viewable by everyone" on public.settings;
create policy "Public settings are viewable by everyone" on public.settings for select using (true);

drop policy if exists "Authenticated users can insert settings" on public.settings;
create policy "Authenticated users can insert settings" on public.settings for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update settings" on public.settings;
create policy "Authenticated users can update settings" on public.settings for update to authenticated using (true);

drop policy if exists "Authenticated users can delete settings" on public.settings;
create policy "Authenticated users can delete settings" on public.settings for delete to authenticated using (true);
