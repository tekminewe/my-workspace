/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `AdvertiserCampaign` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AdvertiserCampaign_slug_key" ON "AdvertiserCampaign"("slug");
