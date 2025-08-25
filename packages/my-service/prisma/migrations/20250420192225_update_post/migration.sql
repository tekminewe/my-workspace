/*
  Warnings:

  - You are about to drop the column `status` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `PostVersion` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PostStatusEnum" AS ENUM ('Draft', 'Published');

-- CreateEnum
CREATE TYPE "PostTypeEnum" AS ENUM ('Page', 'Blog');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PermissionEnum" ADD VALUE 'ViewPost';
ALTER TYPE "PermissionEnum" ADD VALUE 'ManagePost';

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_companyId_fkey";

-- DropForeignKey
ALTER TABLE "PostVersion" DROP CONSTRAINT "PostVersion_companyId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "status",
ADD COLUMN     "postTypeId" "PostTypeEnum" NOT NULL DEFAULT 'Page',
ADD COLUMN     "statusId" "PostStatusEnum",
ALTER COLUMN "companyId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PostVersion" DROP COLUMN "status",
ADD COLUMN     "postTypeId" "PostTypeEnum" NOT NULL DEFAULT 'Page',
ADD COLUMN     "statusId" "PostStatusEnum",
ALTER COLUMN "companyId" DROP NOT NULL;

-- DropEnum
DROP TYPE "PostStatus";

-- CreateTable
CREATE TABLE "PostType" (
    "id" "PostTypeEnum" NOT NULL,

    CONSTRAINT "PostType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostTypeMetadata" (
    "postTypeId" "PostTypeEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PostTypeMetadata_pkey" PRIMARY KEY ("postTypeId","languageId")
);

-- CreateTable
CREATE TABLE "PostStatus" (
    "id" "PostStatusEnum" NOT NULL,

    CONSTRAINT "PostStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostStatusMetadata" (
    "postStatusId" "PostStatusEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PostStatusMetadata_pkey" PRIMARY KEY ("postStatusId","languageId")
);

-- AddForeignKey
ALTER TABLE "PostTypeMetadata" ADD CONSTRAINT "PostTypeMetadata_postTypeId_fkey" FOREIGN KEY ("postTypeId") REFERENCES "PostType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostStatusMetadata" ADD CONSTRAINT "PostStatusMetadata_postStatusId_fkey" FOREIGN KEY ("postStatusId") REFERENCES "PostStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "PostStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_postTypeId_fkey" FOREIGN KEY ("postTypeId") REFERENCES "PostType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostVersion" ADD CONSTRAINT "PostVersion_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "PostStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostVersion" ADD CONSTRAINT "PostVersion_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostVersion" ADD CONSTRAINT "PostVersion_postTypeId_fkey" FOREIGN KEY ("postTypeId") REFERENCES "PostType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
