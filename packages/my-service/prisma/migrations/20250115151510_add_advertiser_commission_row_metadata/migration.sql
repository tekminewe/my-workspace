-- CreateTable
CREATE TABLE "AdvertiserCommissionRowMetadata" (
    "commissionRowId" TEXT NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AdvertiserCommissionRowMetadata_pkey" PRIMARY KEY ("commissionRowId","languageId")
);

-- AddForeignKey
ALTER TABLE "AdvertiserCommissionRowMetadata" ADD CONSTRAINT "AdvertiserCommissionRowMetadata_commissionRowId_fkey" FOREIGN KEY ("commissionRowId") REFERENCES "AdvertiserCommissionRow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
