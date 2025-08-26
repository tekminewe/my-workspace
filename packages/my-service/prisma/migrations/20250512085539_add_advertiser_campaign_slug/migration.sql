/*
  Warnings:

  - Added the required column `slug` to the `AdvertiserCampaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdvertiserCampaign" ADD COLUMN     "slug" TEXT NOT NULL;
