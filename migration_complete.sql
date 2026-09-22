ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS name_fr text;

ALTER TABLE public.products ADD COLUMN IF NOT EXISTS name_fr text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS description_fr text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS quantity text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS display_order int DEFAULT 0;

ALTER TABLE public.offers ADD COLUMN IF NOT EXISTS title_fr text;
ALTER TABLE public.offers ADD COLUMN IF NOT EXISTS description_fr text;

