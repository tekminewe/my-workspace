/*
  Warnings:

  - A unique constraint covering the columns `[filePath,companyId]` on the table `Media` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "AdvertiserProviderReference" (
    "advertiserId" TEXT NOT NULL,
    "providerId" "AffiliateProviderEnum" NOT NULL,
    "providerReferenceId" TEXT NOT NULL,

    CONSTRAINT "AdvertiserProviderReference_pkey" PRIMARY KEY ("advertiserId","providerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Media_filePath_companyId_key" ON "Media"("filePath", "companyId");

-- AddForeignKey
ALTER TABLE "AdvertiserProviderReference" ADD CONSTRAINT "AdvertiserProviderReference_advertiserId_fkey" FOREIGN KEY ("advertiserId") REFERENCES "Advertiser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserProviderReference" ADD CONSTRAINT "AdvertiserProviderReference_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "AffiliateProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
