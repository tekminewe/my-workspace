-- AlterEnum
ALTER TYPE "LanguageEnum" ADD VALUE 'zh-MY';

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "languageId" "LanguageEnum" NOT NULL DEFAULT 'en-MY';

-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "currencyId" "CurrencyEnum" NOT NULL DEFAULT 'MYR',
ADD COLUMN     "domain" TEXT NOT NULL DEFAULT 'example.com';
