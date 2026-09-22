ALTER TABLE public.products ADD COLUMN IF NOT EXISTS quantity text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS display_order int DEFAULT 0;

