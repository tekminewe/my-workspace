/*
  Warnings:

  - A unique constraint covering the columns `[providerId,providerReferenceId]` on the table `AdvertiserCampaign` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "AdvertiserCampaign_providerId_providerReferenceId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "AdvertiserCampaign_providerId_providerReferenceId_key" ON "AdvertiserCampaign"("providerId", "providerReferenceId");
