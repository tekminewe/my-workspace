-- DropForeignKey
ALTER TABLE "AdvertiserCampaign" DROP CONSTRAINT "AdvertiserCampaign_advertiserId_fkey";

-- DropForeignKey
ALTER TABLE "AdvertiserCommission" DROP CONSTRAINT "AdvertiserCommission_advertiserId_fkey";

-- DropForeignKey
ALTER TABLE "AdvertiserCommissionRowMetadata" DROP CONSTRAINT "AdvertiserCommissionRowMetadata_commissionRowId_fkey";

-- DropForeignKey
ALTER TABLE "AdvertiserMetadata" DROP CONSTRAINT "AdvertiserMetadata_advertiserId_fkey";

-- DropForeignKey
ALTER TABLE "AdvertiserProviderReference" DROP CONSTRAINT "AdvertiserProviderReference_advertiserId_fkey";

-- AddForeignKey
ALTER TABLE "AdvertiserMetadata" ADD CONSTRAINT "AdvertiserMetadata_advertiserId_fkey" FOREIGN KEY ("advertiserId") REFERENCES "Advertiser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserProviderReference" ADD CONSTRAINT "AdvertiserProviderReference_advertiserId_fkey" FOREIGN KEY ("advertiserId") REFERENCES "Advertiser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCommission" ADD CONSTRAINT "AdvertiserCommission_advertiserId_fkey" FOREIGN KEY ("advertiserId") REFERENCES "Advertiser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCommissionRowMetadata" ADD CONSTRAINT "AdvertiserCommissionRowMetadata_commissionRowId_fkey" FOREIGN KEY ("commissionRowId") REFERENCES "AdvertiserCommissionRow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCampaign" ADD CONSTRAINT "AdvertiserCampaign_advertiserId_fkey" FOREIGN KEY ("advertiserId") REFERENCES "Advertiser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
