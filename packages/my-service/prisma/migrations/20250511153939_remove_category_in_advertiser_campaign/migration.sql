/*
  Warnings:

  - You are about to drop the column `categoryId` on the `AdvertiserCampaign` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdvertiserCampaign" DROP CONSTRAINT "AdvertiserCampaign_categoryId_fkey";

-- AlterTable
ALTER TABLE "AdvertiserCampaign" DROP COLUMN "categoryId";
