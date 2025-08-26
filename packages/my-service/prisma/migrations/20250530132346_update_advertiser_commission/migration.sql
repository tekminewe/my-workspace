/*
  Warnings:

  - You are about to drop the column `name` on the `AdvertiserCommissionRow` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[advertiserCommissionId,providerReferenceId]` on the table `AdvertiserCommissionRow` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `providerReferenceId` to the `AdvertiserCommissionRow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `AdvertiserCommissionRow` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AdvertiserCommissionRowStatusEnum" AS ENUM ('Inactive', 'Active');

-- AlterTable
ALTER TABLE "AdvertiserCommissionRow" DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "providerReferenceId" TEXT NOT NULL,
ADD COLUMN     "statusId" "AdvertiserCommissionRowStatusEnum" NOT NULL DEFAULT 'Inactive',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "AdvertiserCommissionRowStatus" (
    "id" "AdvertiserCommissionRowStatusEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "AdvertiserCommissionRowStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvertiserCommissionRowStatusMetadata" (
    "statusId" "AdvertiserCommissionRowStatusEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AdvertiserCommissionRowStatusMetadata_pkey" PRIMARY KEY ("statusId","languageId")
);

-- CreateIndex
CREATE INDEX "AdvertiserCommissionRow_providerReferenceId_idx" ON "AdvertiserCommissionRow"("providerReferenceId");

-- CreateIndex
CREATE UNIQUE INDEX "AdvertiserCommissionRow_advertiserCommissionId_providerRefe_key" ON "AdvertiserCommissionRow"("advertiserCommissionId", "providerReferenceId");

-- AddForeignKey
ALTER TABLE "AdvertiserCommissionRow" ADD CONSTRAINT "AdvertiserCommissionRow_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "AdvertiserCommissionRowStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCommissionRowStatusMetadata" ADD CONSTRAINT "AdvertiserCommissionRowStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "AdvertiserCommissionRowStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
