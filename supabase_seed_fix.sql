-- Allow anon to insert for seeding purposes (DISABLE AFTER SEEDING)
create policy "Allow public insert products" on public.products for insert with check (true);
create policy "Allow public insert offers" on public.offers for insert with check (true);
create policy "Allow public insert settings" on public.settings for insert with check (true);
create policy "Allow public update settings" on public.settings for update using (true);

-- Add unique constraint for upsert
alter table public.products add constraint products_number_key unique (number);
