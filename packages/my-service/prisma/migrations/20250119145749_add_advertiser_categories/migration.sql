-- AlterTable
ALTER TABLE "Advertiser" ADD COLUMN     "notes" TEXT;

-- CreateTable
CREATE TABLE "_AdvertiserToAdvertiserCategory" (
    "A" TEXT NOT NULL,
    "B" "AdvertiserCategoryEnum" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AdvertiserToAdvertiserCategory_AB_unique" ON "_AdvertiserToAdvertiserCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_AdvertiserToAdvertiserCategory_B_index" ON "_AdvertiserToAdvertiserCategory"("B");

-- AddForeignKey
ALTER TABLE "_AdvertiserToAdvertiserCategory" ADD CONSTRAINT "_AdvertiserToAdvertiserCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Advertiser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdvertiserToAdvertiserCategory" ADD CONSTRAINT "_AdvertiserToAdvertiserCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "AdvertiserCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
