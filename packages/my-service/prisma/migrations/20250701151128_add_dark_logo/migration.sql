-- AlterTable
ALTER TABLE "SiteMetadata" ADD COLUMN     "darkLogoId" TEXT;

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "siteId" TEXT NOT NULL,
    "googleAnalyticsId" TEXT,
    "googleTagManagerId" TEXT,
    "facebookPixelId" TEXT,
    "defaultMetaTitle" TEXT,
    "defaultMetaDescription" TEXT,
    "sitemapUrl" TEXT,
    "robotsTxt" TEXT,
    "facebookUrl" TEXT,
    "twitterUrl" TEXT,
    "instagramUrl" TEXT,
    "linkedinUrl" TEXT,
    "contactEmail" TEXT,
    "supportEmail" TEXT,
    "phoneNumber" TEXT,
    "address" TEXT,
    "maintenanceMode" BOOLEAN NOT NULL DEFAULT false,
    "allowUserRegistration" BOOLEAN NOT NULL DEFAULT true,
    "enableComments" BOOLEAN NOT NULL DEFAULT true,
    "enableNewsletter" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SiteSettings_siteId_key" ON "SiteSettings"("siteId");

-- AddForeignKey
ALTER TABLE "SiteMetadata" ADD CONSTRAINT "SiteMetadata_darkLogoId_fkey" FOREIGN KEY ("darkLogoId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteSettings" ADD CONSTRAINT "SiteSettings_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
