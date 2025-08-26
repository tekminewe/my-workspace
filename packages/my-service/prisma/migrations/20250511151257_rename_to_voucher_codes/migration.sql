/*
  Warnings:

  - You are about to drop the column `voucherCode` on the `AdvertiserCampaign` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AdvertiserCampaign" DROP COLUMN "voucherCode",
ADD COLUMN     "voucherCodes" TEXT[];
