-- Add French translation columns to support i18n
-- CATEGORIES
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS name_fr text;

-- PRODUCTS
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS name_fr text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS description_fr text;

-- OFFERS
ALTER TABLE public.offers ADD COLUMN IF NOT EXISTS title_fr text;
ALTER TABLE public.offers ADD COLUMN IF NOT EXISTS description_fr text;

-- Comment: English columns (name, description, title) will serve as fallback or explicit EN content.
