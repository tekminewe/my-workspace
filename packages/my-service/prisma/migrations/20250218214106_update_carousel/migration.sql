/*
  Warnings:

  - The `status` column on the `Carousel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `description` on the `CarouselMetadata` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `CarouselMetadata` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `CarouselMetadata` table. All the data in the column will be lost.
  - Added the required column `title` to the `Carousel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `CarouselMetadata` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CarouselStatusEnum" AS ENUM ('Active', 'Inactive');

-- AlterTable
ALTER TABLE "Carousel" ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "CarouselStatusEnum" NOT NULL DEFAULT 'Active';

-- AlterTable
ALTER TABLE "CarouselMetadata" DROP COLUMN "description",
DROP COLUMN "imageUrl",
DROP COLUMN "title",
ADD COLUMN     "imageId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "CarouselStatus";

-- CreateIndex
CREATE INDEX "Carousel_status_idx" ON "Carousel"("status");

-- AddForeignKey
ALTER TABLE "CarouselMetadata" ADD CONSTRAINT "CarouselMetadata_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
