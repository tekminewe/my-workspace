-- CreateEnum
CREATE TYPE "BonusTypeCodeEnum" AS ENUM ('FirstCashbackMultiplier', 'SpendingThreshold', 'ReferralBonus', 'SeasonalBonus');

-- CreateEnum
CREATE TYPE "BonusTypeStatusEnum" AS ENUM ('Draft', 'Active', 'Archived');

-- CreateEnum
CREATE TYPE "BonusEligibilityStatusEnum" AS ENUM ('Available', 'Used', 'Expired', 'Ineligible');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PermissionEnum" ADD VALUE 'ViewBonuses';
ALTER TYPE "PermissionEnum" ADD VALUE 'ManageBonuses';

-- CreateTable
CREATE TABLE "BonusType" (
    "id" TEXT NOT NULL,
    "codeId" "BonusTypeCodeEnum" NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "priority" INTEGER NOT NULL DEFAULT 100,
    "expiryDays" INTEGER,
    "maxUsagePerUser" INTEGER NOT NULL DEFAULT 1,
    "ruleConfig" JSONB NOT NULL,
    "statusId" "BonusTypeStatusEnum" NOT NULL DEFAULT 'Draft',
    "effectiveFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effectiveTo" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "BonusType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BonusTypeStatus" (
    "id" "BonusTypeStatusEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "BonusTypeStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BonusTypeStatusMetadata" (
    "statusId" "BonusTypeStatusEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BonusTypeStatusMetadata_pkey" PRIMARY KEY ("statusId","languageId")
);

-- CreateTable
CREATE TABLE "BonusTypeMetadata" (
    "bonusTypeId" TEXT NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "termsAndConditions" TEXT NOT NULL,
    "featuredImageId" TEXT,
    "logoId" TEXT,

    CONSTRAINT "BonusTypeMetadata_pkey" PRIMARY KEY ("bonusTypeId","languageId")
);

-- CreateTable
CREATE TABLE "BonusEligibility" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bonusTypeId" TEXT NOT NULL,
    "bonusVersion" INTEGER NOT NULL,
    "statusId" "BonusEligibilityStatusEnum" NOT NULL DEFAULT 'Available',
    "availableAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "usedAt" TIMESTAMP(3),
    "eligibilityMetadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BonusEligibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BonusEligibilityStatus" (
    "id" "BonusEligibilityStatusEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "BonusEligibilityStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BonusEligibilityStatusMetadata" (
    "statusId" "BonusEligibilityStatusEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BonusEligibilityStatusMetadata_pkey" PRIMARY KEY ("statusId","languageId")
);

-- CreateTable
CREATE TABLE "BonusTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bonusEligibilityId" TEXT NOT NULL,
    "bonusTypeId" TEXT NOT NULL,
    "bonusVersion" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currencyId" "CurrencyEnum" NOT NULL,
    "sourceTransactionId" TEXT,
    "merchantCallbackId" TEXT,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "walletTransactionId" TEXT,
    "processingMetadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BonusTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BonusType_statusId_idx" ON "BonusType"("statusId");

-- CreateIndex
CREATE INDEX "BonusType_effectiveFrom_effectiveTo_idx" ON "BonusType"("effectiveFrom", "effectiveTo");

-- CreateIndex
CREATE INDEX "BonusType_codeId_idx" ON "BonusType"("codeId");

-- CreateIndex
CREATE UNIQUE INDEX "BonusType_codeId_version_key" ON "BonusType"("codeId", "version");

-- CreateIndex
CREATE INDEX "BonusTypeMetadata_bonusTypeId_idx" ON "BonusTypeMetadata"("bonusTypeId");

-- CreateIndex
CREATE INDEX "BonusTypeMetadata_languageId_idx" ON "BonusTypeMetadata"("languageId");

-- CreateIndex
CREATE INDEX "BonusEligibility_userId_idx" ON "BonusEligibility"("userId");

-- CreateIndex
CREATE INDEX "BonusEligibility_bonusTypeId_idx" ON "BonusEligibility"("bonusTypeId");

-- CreateIndex
CREATE INDEX "BonusEligibility_statusId_idx" ON "BonusEligibility"("statusId");

-- CreateIndex
CREATE INDEX "BonusEligibility_availableAt_idx" ON "BonusEligibility"("availableAt");

-- CreateIndex
CREATE INDEX "BonusEligibility_expiresAt_idx" ON "BonusEligibility"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "BonusEligibility_userId_bonusTypeId_bonusVersion_key" ON "BonusEligibility"("userId", "bonusTypeId", "bonusVersion");

-- CreateIndex
CREATE INDEX "BonusTransaction_userId_idx" ON "BonusTransaction"("userId");

-- CreateIndex
CREATE INDEX "BonusTransaction_bonusEligibilityId_idx" ON "BonusTransaction"("bonusEligibilityId");

-- CreateIndex
CREATE INDEX "BonusTransaction_sourceTransactionId_idx" ON "BonusTransaction"("sourceTransactionId");

-- CreateIndex
CREATE INDEX "BonusTransaction_processedAt_idx" ON "BonusTransaction"("processedAt");

-- CreateIndex
CREATE INDEX "BonusTransaction_userId_processedAt_idx" ON "BonusTransaction"("userId", "processedAt");

-- AddForeignKey
ALTER TABLE "BonusType" ADD CONSTRAINT "BonusType_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "BonusTypeStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonusTypeStatusMetadata" ADD CONSTRAINT "BonusTypeStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "BonusTypeStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonusTypeMetadata" ADD CONSTRAINT "BonusTypeMetadata_bonusTypeId_fkey" FOREIGN KEY ("bonusTypeId") REFERENCES "BonusType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonusTypeMetadata" ADD CONSTRAINT "BonusTypeMetadata_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonusTypeMetadata" ADD CONSTRAINT "BonusTypeMetadata_featuredImageId_fkey" FOREIGN KEY ("featuredImageId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonusTypeMetadata" ADD CONSTRAINT "BonusTypeMetadata_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonusEligibility" ADD CONSTRAINT "BonusEligibility_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonusEligibility" ADD CONSTRAINT "BonusEligibility_bonusTypeId_fkey" FOREIGN KEY ("bonusTypeId") REFERENCES "BonusType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonusEligibility" ADD CONSTRAINT "BonusEligibility_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "BonusEligibilityStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonusEligibilityStatusMetadata" ADD CONSTRAINT "BonusEligibilityStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "BonusEligibilityStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonusTransaction" ADD CONSTRAINT "BonusTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonusTransaction" ADD CONSTRAINT "BonusTransaction_bonusEligibilityId_fkey" FOREIGN KEY ("bonusEligibilityId") REFERENCES "BonusEligibility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonusTransaction" ADD CONSTRAINT "BonusTransaction_bonusTypeId_fkey" FOREIGN KEY ("bonusTypeId") REFERENCES "BonusType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonusTransaction" ADD CONSTRAINT "BonusTransaction_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonusTransaction" ADD CONSTRAINT "BonusTransaction_sourceTransactionId_fkey" FOREIGN KEY ("sourceTransactionId") REFERENCES "UserCashback"("id") ON DELETE SET NULL ON UPDATE CASCADE;
