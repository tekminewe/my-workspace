-- CreateEnum
CREATE TYPE "CarouselStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "Carousel" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "CarouselStatus" NOT NULL DEFAULT 'INACTIVE',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "cta" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Carousel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarouselMetadata" (
    "carouselId" TEXT NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,

    CONSTRAINT "CarouselMetadata_pkey" PRIMARY KEY ("carouselId","languageId")
);

-- AddForeignKey
ALTER TABLE "CarouselMetadata" ADD CONSTRAINT "CarouselMetadata_carouselId_fkey" FOREIGN KEY ("carouselId") REFERENCES "Carousel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
