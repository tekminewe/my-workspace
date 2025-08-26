-- DropForeignKey
ALTER TABLE "AdvertiserCampaignMetadata" DROP CONSTRAINT "AdvertiserCampaignMetadata_advertiserCampaignId_fkey";

-- DropForeignKey
ALTER TABLE "AdvertiserCampaignStatusMetadata" DROP CONSTRAINT "AdvertiserCampaignStatusMetadata_statusId_fkey";

-- DropForeignKey
ALTER TABLE "AdvertiserCategoryMetadata" DROP CONSTRAINT "AdvertiserCategoryMetadata_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "AdvertiserCommissionRow" DROP CONSTRAINT "AdvertiserCommissionRow_advertiserCommissionId_fkey";

-- DropForeignKey
ALTER TABLE "AdvertiserCommissionRowStatusMetadata" DROP CONSTRAINT "AdvertiserCommissionRowStatusMetadata_statusId_fkey";

-- DropForeignKey
ALTER TABLE "AdvertiserCommissionShareTypeMetadata" DROP CONSTRAINT "AdvertiserCommissionShareTypeMetadata_typeId_fkey";

-- DropForeignKey
ALTER TABLE "AdvertiserCommissionStatusMetadata" DROP CONSTRAINT "AdvertiserCommissionStatusMetadata_statusId_fkey";

-- DropForeignKey
ALTER TABLE "AdvertiserCommissionTypeMetadata" DROP CONSTRAINT "AdvertiserCommissionTypeMetadata_typeId_fkey";

-- DropForeignKey
ALTER TABLE "AdvertiserStatusMetadata" DROP CONSTRAINT "AdvertiserStatusMetadata_statusId_fkey";

-- DropForeignKey
ALTER TABLE "AffiliateProviderStatusMetadata" DROP CONSTRAINT "AffiliateProviderStatusMetadata_statusId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyAdvertiserStatusMetadata" DROP CONSTRAINT "CompanyAdvertiserStatusMetadata_statusId_fkey";

-- DropForeignKey
ALTER TABLE "UserCashbackStatusMetadata" DROP CONSTRAINT "UserCashbackStatusMetadata_statusId_fkey";

-- AddForeignKey
ALTER TABLE "AffiliateProviderStatusMetadata" ADD CONSTRAINT "AffiliateProviderStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "AffiliateProviderStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserStatusMetadata" ADD CONSTRAINT "AdvertiserStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "AdvertiserStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCommissionShareTypeMetadata" ADD CONSTRAINT "AdvertiserCommissionShareTypeMetadata_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "AdvertiserCommissionShareType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCommissionStatusMetadata" ADD CONSTRAINT "AdvertiserCommissionStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "AdvertiserCommissionStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCommissionTypeMetadata" ADD CONSTRAINT "AdvertiserCommissionTypeMetadata_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "AdvertiserCommissionType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCommissionRow" ADD CONSTRAINT "AdvertiserCommissionRow_advertiserCommissionId_fkey" FOREIGN KEY ("advertiserCommissionId") REFERENCES "AdvertiserCommission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCommissionRowStatusMetadata" ADD CONSTRAINT "AdvertiserCommissionRowStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "AdvertiserCommissionRowStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCategoryMetadata" ADD CONSTRAINT "AdvertiserCategoryMetadata_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "AdvertiserCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCampaignStatusMetadata" ADD CONSTRAINT "AdvertiserCampaignStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "AdvertiserCampaignStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCampaignMetadata" ADD CONSTRAINT "AdvertiserCampaignMetadata_advertiserCampaignId_fkey" FOREIGN KEY ("advertiserCampaignId") REFERENCES "AdvertiserCampaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAdvertiserStatusMetadata" ADD CONSTRAINT "CompanyAdvertiserStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "CompanyAdvertiserStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCashbackStatusMetadata" ADD CONSTRAINT "UserCashbackStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "UserCashbackStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
