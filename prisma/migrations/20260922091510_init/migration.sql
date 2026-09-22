-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "name_fr" TEXT,
    "slug" TEXT NOT NULL,
    "image_url" TEXT,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name_fr" TEXT,
    "description" TEXT,
    "description_fr" TEXT,
    "ingredients" TEXT[],
    "category_id" UUID,
    "price_solo" DECIMAL,
    "price_menu" DECIMAL,
    "quantity" TEXT,
    "display_order" INTEGER DEFAULT 0,
    "image_url" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "title_fr" TEXT,
    "description" TEXT,
    "description_fr" TEXT,
    "image_url" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "redirect_url" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "phone" TEXT,
    "hours" TEXT,
    "address" TEXT,
    "uber_eats_url" TEXT,
    "deliveroo_url" TEXT,
    "social_facebook" TEXT,
    "social_instagram" TEXT,
    "menu_pdf_url" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "products_number_key" ON "products"("number");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
