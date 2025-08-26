-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "FormColumnType" AS ENUM ('LongText', 'Datetime', 'Dropdown', 'SingleChoice');

-- CreateEnum
CREATE TYPE "FormApprovalStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- CreateEnum
CREATE TYPE "FORM_SUBMISSION_ACTION_ENUM" AS ENUM ('Approval');

-- CreateEnum
CREATE TYPE "AffiliateProviderEnum" AS ENUM ('InvolveAsia');

-- CreateEnum
CREATE TYPE "AdvertiserCommissionStatusEnum" AS ENUM ('Inactive', 'Active');

-- CreateEnum
CREATE TYPE "AdvertiserStatusEnum" AS ENUM ('Inactive', 'Active');

-- CreateEnum
CREATE TYPE "AffiliateProviderStatusEnum" AS ENUM ('Inactive', 'Active');

-- CreateEnum
CREATE TYPE "CompanyAdvertiserStatusEnum" AS ENUM ('Inactive', 'Active');

-- CreateEnum
CREATE TYPE "AdvertiserCommissionTypeEnum" AS ENUM ('Percentage', 'Fixed');

-- CreateEnum
CREATE TYPE "AdvertiserCommissionShareTypeEnum" AS ENUM ('Percentage', 'Fixed');

-- CreateEnum
CREATE TYPE "AdvertiserCampaignStatusEnum" AS ENUM ('Inactive', 'Active');

-- CreateEnum
CREATE TYPE "AdvertiserCategoryEnum" AS ENUM ('DigitalServices', 'Electronics', 'Fashion', 'Finance', 'Food_Grocery', 'Health_Beauty', 'Home_Living', 'Marketplace', 'Others', 'Travel');

-- CreateEnum
CREATE TYPE "UserCashbackStatusEnum" AS ENUM ('Pending', 'Approved', 'Rejected');

-- CreateEnum
CREATE TYPE "LanguageEnum" AS ENUM ('en-MY', 'en-US', 'en-GB', 'zh-CN');

-- CreateEnum
CREATE TYPE "CurrencyEnum" AS ENUM ('MYR', 'SGD', 'USD');

-- CreateEnum
CREATE TYPE "UserWalletStatusEnum" AS ENUM ('Active', 'Frozen', 'Inactive');

-- CreateEnum
CREATE TYPE "UserWalletTransactionTypeEnum" AS ENUM ('AffiliateCashback', 'Withdrawal');

-- CreateEnum
CREATE TYPE "UserWalletTransactionStatusEnum" AS ENUM ('Pending', 'Completed', 'Failed', 'Canceled');

-- CreateEnum
CREATE TYPE "UserWithdrawalStatusEnum" AS ENUM ('Pending', 'Completed', 'Rejected', 'Canceled');

-- CreateEnum
CREATE TYPE "UserDepositStatusEnum" AS ENUM ('Pending', 'Completed', 'Rejected', 'Canceled');

-- CreateEnum
CREATE TYPE "PaymentChannelTypeEnum" AS ENUM ('BankTransfer');

-- CreateEnum
CREATE TYPE "PaymentDirectionEnum" AS ENUM ('Deposit', 'Withdrawal', 'Both');

-- CreateEnum
CREATE TYPE "PaymentChannelStatusEnum" AS ENUM ('Active', 'Inactive');

-- CreateEnum
CREATE TYPE "PaymentChannelFeeTypeEnum" AS ENUM ('Percentage', 'Fixed');

-- CreateEnum
CREATE TYPE "UserPaymentMethodStatusEnum" AS ENUM ('Active', 'Inactive');

-- CreateEnum
CREATE TYPE "PageStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "featuredImageId" TEXT,
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "editorVersion" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImageId" TEXT,
    "companyId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostVersion" (
    "id" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "slug" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "featuredImageId" TEXT,
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "editorVersion" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "PostVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "caption" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "id" TEXT NOT NULL,
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "photoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "expiry" TIMESTAMP(3),
    "companyId" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormAction" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "actionType" "FORM_SUBMISSION_ACTION_ENUM" NOT NULL,
    "nextActionId" TEXT,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormColumn" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "type" "FormColumnType" NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormColumn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormColumnOption" (
    "id" TEXT NOT NULL,
    "columnId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormColumnOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormColumnOptionData" (
    "id" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormColumnOptionData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormColumnOptionDataValue" (
    "id" TEXT NOT NULL,
    "dataId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormColumnOptionDataValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormSubmission" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormSubmissionValue" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "columnId" TEXT NOT NULL,
    "columnOptionId" TEXT,
    "value" TEXT,

    CONSTRAINT "FormSubmissionValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormSubmissionApproval" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "approverId" TEXT,
    "guestApproverName" TEXT,
    "guestApproverEmail" TEXT,
    "guestToken" TEXT,
    "status" "FormApprovalStatus" NOT NULL DEFAULT 'Pending',
    "approvedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormSubmissionApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AffiliateProviderStatus" (
    "id" "AffiliateProviderStatusEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "AffiliateProviderStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AffiliateProviderStatusMetadata" (
    "statusId" "AffiliateProviderStatusEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AffiliateProviderStatusMetadata_pkey" PRIMARY KEY ("statusId","languageId")
);

-- CreateTable
CREATE TABLE "AffiliateProvider" (
    "id" "AffiliateProviderEnum" NOT NULL,
    "name" TEXT NOT NULL,
    "statusId" "AffiliateProviderStatusEnum" NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AffiliateProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvertiserStatus" (
    "id" "AdvertiserStatusEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "AdvertiserStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvertiserStatusMetadata" (
    "statusId" "AdvertiserStatusEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AdvertiserStatusMetadata_pkey" PRIMARY KEY ("statusId","languageId")
);

-- CreateTable
CREATE TABLE "Advertiser" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "logoId" TEXT,
    "statusId" "AdvertiserStatusEnum" NOT NULL DEFAULT 'Inactive',
    "popularity" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "Advertiser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvertiserMetadata" (
    "advertiserId" TEXT NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AdvertiserMetadata_pkey" PRIMARY KEY ("advertiserId","languageId")
);

-- CreateTable
CREATE TABLE "AdvertiserCommissionShareType" (
    "id" "AdvertiserCommissionShareTypeEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "AdvertiserCommissionShareType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvertiserCommissionShareTypeMetadata" (
    "typeId" "AdvertiserCommissionShareTypeEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AdvertiserCommissionShareTypeMetadata_pkey" PRIMARY KEY ("typeId","languageId")
);

-- CreateTable
CREATE TABLE "AdvertiserCommissionStatus" (
    "id" "AdvertiserCommissionStatusEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "AdvertiserCommissionStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvertiserCommissionStatusMetadata" (
    "statusId" "AdvertiserCommissionStatusEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AdvertiserCommissionStatusMetadata_pkey" PRIMARY KEY ("statusId","languageId")
);

-- CreateTable
CREATE TABLE "AdvertiserCommission" (
    "id" TEXT NOT NULL,
    "advertiserId" TEXT NOT NULL,
    "providerReferenceId" TEXT NOT NULL,
    "providerId" "AffiliateProviderEnum" NOT NULL,
    "commissionShare" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "commissionShareTypeId" "AdvertiserCommissionShareTypeEnum" NOT NULL,
    "dayToValidate" INTEGER NOT NULL,
    "dayToPayout" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "statusId" "AdvertiserCommissionStatusEnum" NOT NULL DEFAULT 'Inactive',

    CONSTRAINT "AdvertiserCommission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvertiserCommissionType" (
    "id" "AdvertiserCommissionTypeEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "AdvertiserCommissionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvertiserCommissionTypeMetadata" (
    "typeId" "AdvertiserCommissionTypeEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AdvertiserCommissionTypeMetadata_pkey" PRIMARY KEY ("typeId","languageId")
);

-- CreateTable
CREATE TABLE "AdvertiserCommissionRow" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "advertiserCommissionId" TEXT NOT NULL,
    "commission" DOUBLE PRECISION NOT NULL,
    "typeId" "AdvertiserCommissionTypeEnum" NOT NULL,

    CONSTRAINT "AdvertiserCommissionRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvertiserCategory" (
    "id" "AdvertiserCategoryEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "AdvertiserCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvertiserCategoryMetadata" (
    "categoryId" "AdvertiserCategoryEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AdvertiserCategoryMetadata_pkey" PRIMARY KEY ("categoryId","languageId")
);

-- CreateTable
CREATE TABLE "AdvertiserCampaignStatus" (
    "id" "AdvertiserCampaignStatusEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "AdvertiserCampaignStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvertiserCampaignStatusMetadata" (
    "statusId" "AdvertiserCampaignStatusEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AdvertiserCampaignStatusMetadata_pkey" PRIMARY KEY ("statusId","languageId")
);

-- CreateTable
CREATE TABLE "AdvertiserCampaign" (
    "id" TEXT NOT NULL,
    "advertiserId" TEXT NOT NULL,
    "providerReferenceId" TEXT NOT NULL,
    "providerId" "AffiliateProviderEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "voucherCode" TEXT[],
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "categoryId" "AdvertiserCategoryEnum" NOT NULL,
    "statusId" "AdvertiserCampaignStatusEnum" NOT NULL DEFAULT 'Inactive',
    "url" TEXT NOT NULL,

    CONSTRAINT "AdvertiserCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvertiserCampaignMetadata" (
    "advertiserCampaignId" TEXT NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bannerId" TEXT,

    CONSTRAINT "AdvertiserCampaignMetadata_pkey" PRIMARY KEY ("advertiserCampaignId","languageId")
);

-- CreateTable
CREATE TABLE "CompanyAdvertiserStatus" (
    "id" "CompanyAdvertiserStatusEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "CompanyAdvertiserStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyAdvertiserStatusMetadata" (
    "statusId" "CompanyAdvertiserStatusEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CompanyAdvertiserStatusMetadata_pkey" PRIMARY KEY ("statusId","languageId")
);

-- CreateTable
CREATE TABLE "CompanyAdvertiser" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "advertiserId" TEXT NOT NULL,
    "statusId" "CompanyAdvertiserStatusEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyAdvertiser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyAdvertiserCommission" (
    "id" TEXT NOT NULL,
    "companyAdvertiserId" TEXT NOT NULL,
    "advertiserCommissionId" TEXT NOT NULL,
    "commission" DOUBLE PRECISION NOT NULL,
    "typeId" "AdvertiserCommissionTypeEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyAdvertiserCommission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyAdvertiserCommissionRow" (
    "id" TEXT NOT NULL,
    "companyAdvertiserId" TEXT NOT NULL,
    "advertiserCommissionRowId" TEXT NOT NULL,
    "commission" DOUBLE PRECISION NOT NULL,
    "typeId" "AdvertiserCommissionTypeEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyAdvertiserCommissionRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAdvertiserClick" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "advertiserId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "referrer" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAdvertiserClick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCashbackStatus" (
    "id" "UserCashbackStatusEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "UserCashbackStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCashbackStatusMetadata" (
    "statusId" "UserCashbackStatusEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserCashbackStatusMetadata_pkey" PRIMARY KEY ("statusId","languageId")
);

-- CreateTable
CREATE TABLE "UserCashback" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "advertiserId" TEXT NOT NULL,
    "providerReferenceId" TEXT NOT NULL,
    "advertiserOrderId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "netAmount" DOUBLE PRECISION NOT NULL,
    "share" DOUBLE PRECISION NOT NULL,
    "currencyId" "CurrencyEnum" NOT NULL,
    "statusId" "UserCashbackStatusEnum" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCashback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" "CurrencyEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrencyMetadata" (
    "currencyId" "CurrencyEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserWalletStatus" (
    "id" "UserWalletStatusEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "UserWalletStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWalletStatusMetadata" (
    "statusId" "UserWalletStatusEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserWalletStatusMetadata_pkey" PRIMARY KEY ("statusId","languageId")
);

-- CreateTable
CREATE TABLE "UserWallet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currencyId" "CurrencyEnum" NOT NULL,
    "statusId" "UserWalletStatusEnum" NOT NULL DEFAULT 'Active',
    "balance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWalletTransactionType" (
    "id" "UserWalletTransactionTypeEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "UserWalletTransactionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWalletTransactionTypeMetadata" (
    "typeId" "UserWalletTransactionTypeEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserWalletTransactionTypeMetadata_pkey" PRIMARY KEY ("typeId","languageId")
);

-- CreateTable
CREATE TABLE "UserWalletTransactionStatus" (
    "id" "UserWalletTransactionStatusEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "UserWalletTransactionStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWalletTransactionStatusMetadata" (
    "statusId" "UserWalletTransactionStatusEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserWalletTransactionStatusMetadata_pkey" PRIMARY KEY ("statusId","languageId")
);

-- CreateTable
CREATE TABLE "UserWalletTransactionLog" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "currencyId" "CurrencyEnum" NOT NULL,
    "balanceBefore" DOUBLE PRECISION NOT NULL,
    "balanceAfter" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "typeId" "UserWalletTransactionTypeEnum" NOT NULL,
    "statusId" "UserWalletTransactionStatusEnum" NOT NULL DEFAULT 'Pending',
    "reference" TEXT,
    "extra" JSONB,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserWalletTransactionLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDepositStatus" (
    "id" "UserDepositStatusEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "UserDepositStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDepositStatusMetadata" (
    "statusId" "UserDepositStatusEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserDeposit" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "currencyId" "CurrencyEnum" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentMethodId" TEXT,
    "statusId" "UserDepositStatusEnum" NOT NULL DEFAULT 'Pending',
    "processedAt" TIMESTAMP(3),
    "processedById" TEXT,
    "notes" TEXT,
    "reference" TEXT,
    "processingFee" DOUBLE PRECISION NOT NULL,
    "netAmount" DOUBLE PRECISION NOT NULL,
    "extra" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserDeposit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWithdrawalStatus" (
    "id" "UserWithdrawalStatusEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "UserWithdrawalStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWithdrawalStatusMetadata" (
    "statusId" "UserWithdrawalStatusEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserWithdrawalStatusMetadata_pkey" PRIMARY KEY ("statusId","languageId")
);

-- CreateTable
CREATE TABLE "UserWithdrawal" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "currencyId" "CurrencyEnum" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "statusId" "UserWithdrawalStatusEnum" NOT NULL DEFAULT 'Pending',
    "processedAt" TIMESTAMP(3),
    "processedById" TEXT,
    "notes" TEXT,
    "reference" TEXT,
    "processingFee" DOUBLE PRECISION NOT NULL,
    "netAmount" DOUBLE PRECISION NOT NULL,
    "extra" JSONB,
    "paymentMethodId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserWithdrawal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentChannelType" (
    "id" "PaymentChannelTypeEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "PaymentChannelType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentChannelTypeMetadata" (
    "typeId" "PaymentChannelTypeEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PaymentChannelTypeMetadata_pkey" PRIMARY KEY ("typeId","languageId")
);

-- CreateTable
CREATE TABLE "PaymentChannelStatus" (
    "id" "PaymentChannelStatusEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "PaymentChannelStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentChannelStatusMetadata" (
    "statusId" "PaymentChannelStatusEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PaymentChannelStatusMetadata_pkey" PRIMARY KEY ("statusId","languageId")
);

-- CreateTable
CREATE TABLE "PaymentDirection" (
    "id" "PaymentDirectionEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "PaymentDirection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentDirectionMetadata" (
    "directionId" "PaymentDirectionEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PaymentDirectionMetadata_pkey" PRIMARY KEY ("directionId","languageId")
);

-- CreateTable
CREATE TABLE "PaymentChannelFeeType" (
    "id" "PaymentChannelFeeTypeEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "PaymentChannelFeeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentChannelFeeTypeMetadata" (
    "typeId" "PaymentChannelFeeTypeEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PaymentChannelFeeTypeMetadata_pkey" PRIMARY KEY ("typeId","languageId")
);

-- CreateTable
CREATE TABLE "PaymentChannel" (
    "id" TEXT NOT NULL,
    "typeId" "PaymentChannelTypeEnum" NOT NULL,
    "directionId" "PaymentDirectionEnum" NOT NULL,
    "statusId" "PaymentChannelStatusEnum" NOT NULL DEFAULT 'Active',
    "description" TEXT,
    "extra" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "minAmount" DOUBLE PRECISION NOT NULL,
    "maxAmount" DOUBLE PRECISION NOT NULL,
    "processingFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "feeTypeId" "PaymentChannelFeeTypeEnum" NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "logoId" TEXT,

    CONSTRAINT "PaymentChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentChannelMetadata" (
    "channelId" TEXT NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PaymentChannelMetadata_pkey" PRIMARY KEY ("channelId","languageId")
);

-- CreateTable
CREATE TABLE "UserPaymentMethodStatus" (
    "id" "UserPaymentMethodStatusEnum" NOT NULL,
    "description" TEXT,

    CONSTRAINT "UserPaymentMethodStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPaymentMethodStatusMetadata" (
    "statusId" "UserPaymentMethodStatusEnum" NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserPaymentMethodStatusMetadata_pkey" PRIMARY KEY ("statusId","languageId")
);

-- CreateTable
CREATE TABLE "UserPaymentMethod" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "paymentChannelId" TEXT NOT NULL,
    "directionId" "PaymentDirectionEnum" NOT NULL,
    "accountName" TEXT NOT NULL,
    "accountNumber" TEXT,
    "bankName" TEXT,
    "swiftCode" TEXT,
    "paypalEmail" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "extra" JSONB,
    "statusId" "UserPaymentMethodStatusEnum" NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "PageStatus" NOT NULL DEFAULT 'DRAFT',
    "description" TEXT,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageVersion" (
    "id" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "slug" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "PageStatus" NOT NULL DEFAULT 'DRAFT',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "PageVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "supportedLanguages" "LanguageEnum"[],

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteMetadata" (
    "name" TEXT NOT NULL,
    "logoId" TEXT,
    "description" TEXT,
    "siteId" TEXT NOT NULL,
    "languageId" "LanguageEnum" NOT NULL,

    CONSTRAINT "SiteMetadata_pkey" PRIMARY KEY ("siteId","languageId")
);

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PostVersionToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CompanyToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AdvertiserToAffiliateProvider" (
    "A" TEXT NOT NULL,
    "B" "AffiliateProviderEnum" NOT NULL
);

-- CreateTable
CREATE TABLE "_CurrencyToPaymentChannel" (
    "A" "CurrencyEnum" NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "PostVersion_postId_version_idx" ON "PostVersion"("postId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "Tag_companyId_name_idx" ON "Tag"("companyId", "name");

-- CreateIndex
CREATE INDEX "Tag_companyId_idx" ON "Tag"("companyId");

-- CreateIndex
CREATE INDEX "Media_companyId_idx" ON "Media"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FormAction_nextActionId_key" ON "FormAction"("nextActionId");

-- CreateIndex
CREATE INDEX "FormSubmissionApproval_id_guestToken_idx" ON "FormSubmissionApproval"("id", "guestToken");

-- CreateIndex
CREATE UNIQUE INDEX "FormSubmissionApproval_submissionId_approverId_guestApprove_key" ON "FormSubmissionApproval"("submissionId", "approverId", "guestApproverEmail", "guestApproverName");

-- CreateIndex
CREATE INDEX "AffiliateProvider_statusId_idx" ON "AffiliateProvider"("statusId");

-- CreateIndex
CREATE INDEX "Advertiser_slug_idx" ON "Advertiser"("slug");

-- CreateIndex
CREATE INDEX "Advertiser_statusId_idx" ON "Advertiser"("statusId");

-- CreateIndex
CREATE INDEX "AdvertiserCommission_statusId_idx" ON "AdvertiserCommission"("statusId");

-- CreateIndex
CREATE UNIQUE INDEX "AdvertiserCommission_advertiserId_providerId_providerRefere_key" ON "AdvertiserCommission"("advertiserId", "providerId", "providerReferenceId");

-- CreateIndex
CREATE INDEX "AdvertiserCommissionRow_advertiserCommissionId_idx" ON "AdvertiserCommissionRow"("advertiserCommissionId");

-- CreateIndex
CREATE UNIQUE INDEX "AdvertiserCampaign_advertiserId_providerId_providerReferenc_key" ON "AdvertiserCampaign"("advertiserId", "providerId", "providerReferenceId");

-- CreateIndex
CREATE INDEX "CompanyAdvertiser_statusId_idx" ON "CompanyAdvertiser"("statusId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyAdvertiser_companyId_advertiserId_key" ON "CompanyAdvertiser"("companyId", "advertiserId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyAdvertiserCommission_companyAdvertiserId_advertiserC_key" ON "CompanyAdvertiserCommission"("companyAdvertiserId", "advertiserCommissionId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyAdvertiserCommissionRow_companyAdvertiserId_advertis_key" ON "CompanyAdvertiserCommissionRow"("companyAdvertiserId", "advertiserCommissionRowId");

-- CreateIndex
CREATE INDEX "UserAdvertiserClick_userId_idx" ON "UserAdvertiserClick"("userId");

-- CreateIndex
CREATE INDEX "UserAdvertiserClick_advertiserId_idx" ON "UserAdvertiserClick"("advertiserId");

-- CreateIndex
CREATE INDEX "UserCashback_userId_idx" ON "UserCashback"("userId");

-- CreateIndex
CREATE INDEX "UserCashback_advertiserId_idx" ON "UserCashback"("advertiserId");

-- CreateIndex
CREATE INDEX "UserCashback_statusId_idx" ON "UserCashback"("statusId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCashback_advertiserOrderId_key" ON "UserCashback"("advertiserOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCashback_providerReferenceId_key" ON "UserCashback"("providerReferenceId");

-- CreateIndex
CREATE UNIQUE INDEX "CurrencyMetadata_currencyId_languageId_key" ON "CurrencyMetadata"("currencyId", "languageId");

-- CreateIndex
CREATE INDEX "UserWallet_statusId_idx" ON "UserWallet"("statusId");

-- CreateIndex
CREATE UNIQUE INDEX "UserWallet_userId_currencyId_key" ON "UserWallet"("userId", "currencyId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDepositStatusMetadata_statusId_languageId_key" ON "UserDepositStatusMetadata"("statusId", "languageId");

-- CreateIndex
CREATE INDEX "UserDeposit_statusId_idx" ON "UserDeposit"("statusId");

-- CreateIndex
CREATE INDEX "UserWithdrawal_statusId_idx" ON "UserWithdrawal"("statusId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPaymentMethod_userId_accountNumber_paymentChannelId_key" ON "UserPaymentMethod"("userId", "accountNumber", "paymentChannelId");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- CreateIndex
CREATE INDEX "PageVersion_pageId_version_idx" ON "PageVersion"("pageId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "SiteMetadata_languageId_key" ON "SiteMetadata"("languageId");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTag_AB_unique" ON "_PostToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PostVersionToTag_AB_unique" ON "_PostVersionToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostVersionToTag_B_index" ON "_PostVersionToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyToUser_AB_unique" ON "_CompanyToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyToUser_B_index" ON "_CompanyToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AdvertiserToAffiliateProvider_AB_unique" ON "_AdvertiserToAffiliateProvider"("A", "B");

-- CreateIndex
CREATE INDEX "_AdvertiserToAffiliateProvider_B_index" ON "_AdvertiserToAffiliateProvider"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CurrencyToPaymentChannel_AB_unique" ON "_CurrencyToPaymentChannel"("A", "B");

-- CreateIndex
CREATE INDEX "_CurrencyToPaymentChannel_B_index" ON "_CurrencyToPaymentChannel"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_featuredImageId_fkey" FOREIGN KEY ("featuredImageId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_ogImageId_fkey" FOREIGN KEY ("ogImageId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostVersion" ADD CONSTRAINT "PostVersion_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostVersion" ADD CONSTRAINT "PostVersion_featuredImageId_fkey" FOREIGN KEY ("featuredImageId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostVersion" ADD CONSTRAINT "PostVersion_ogImageId_fkey" FOREIGN KEY ("ogImageId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostVersion" ADD CONSTRAINT "PostVersion_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostVersion" ADD CONSTRAINT "PostVersion_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormAction" ADD CONSTRAINT "FormAction_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormAction" ADD CONSTRAINT "FormAction_nextActionId_fkey" FOREIGN KEY ("nextActionId") REFERENCES "FormAction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormColumn" ADD CONSTRAINT "FormColumn_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormColumnOption" ADD CONSTRAINT "FormColumnOption_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "FormColumn"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormColumnOptionData" ADD CONSTRAINT "FormColumnOptionData_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "FormColumnOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormColumnOptionDataValue" ADD CONSTRAINT "FormColumnOptionDataValue_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "FormColumnOptionData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSubmission" ADD CONSTRAINT "FormSubmission_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSubmission" ADD CONSTRAINT "FormSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSubmissionValue" ADD CONSTRAINT "FormSubmissionValue_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "FormSubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSubmissionValue" ADD CONSTRAINT "FormSubmissionValue_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "FormColumn"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSubmissionValue" ADD CONSTRAINT "FormSubmissionValue_columnOptionId_fkey" FOREIGN KEY ("columnOptionId") REFERENCES "FormColumnOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSubmissionApproval" ADD CONSTRAINT "FormSubmissionApproval_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "FormSubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSubmissionApproval" ADD CONSTRAINT "FormSubmissionApproval_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffiliateProviderStatusMetadata" ADD CONSTRAINT "AffiliateProviderStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "AffiliateProviderStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffiliateProvider" ADD CONSTRAINT "AffiliateProvider_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "AffiliateProviderStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserStatusMetadata" ADD CONSTRAINT "AdvertiserStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "AdvertiserStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertiser" ADD CONSTRAINT "Advertiser_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertiser" ADD CONSTRAINT "Advertiser_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "AdvertiserStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserMetadata" ADD CONSTRAINT "AdvertiserMetadata_advertiserId_fkey" FOREIGN KEY ("advertiserId") REFERENCES "Advertiser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCommissionShareTypeMetadata" ADD CONSTRAINT "AdvertiserCommissionShareTypeMetadata_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "AdvertiserCommissionShareType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCommissionStatusMetadata" ADD CONSTRAINT "AdvertiserCommissionStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "AdvertiserCommissionStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCommission" ADD CONSTRAINT "AdvertiserCommission_advertiserId_fkey" FOREIGN KEY ("advertiserId") REFERENCES "Advertiser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCommission" ADD CONSTRAINT "AdvertiserCommission_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "AffiliateProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCommission" ADD CONSTRAINT "AdvertiserCommission_commissionShareTypeId_fkey" FOREIGN KEY ("commissionShareTypeId") REFERENCES "AdvertiserCommissionShareType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCommission" ADD CONSTRAINT "AdvertiserCommission_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "AdvertiserCommissionStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCommissionTypeMetadata" ADD CONSTRAINT "AdvertiserCommissionTypeMetadata_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "AdvertiserCommissionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCommissionRow" ADD CONSTRAINT "AdvertiserCommissionRow_advertiserCommissionId_fkey" FOREIGN KEY ("advertiserCommissionId") REFERENCES "AdvertiserCommission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCommissionRow" ADD CONSTRAINT "AdvertiserCommissionRow_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "AdvertiserCommissionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCategoryMetadata" ADD CONSTRAINT "AdvertiserCategoryMetadata_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "AdvertiserCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCampaignStatusMetadata" ADD CONSTRAINT "AdvertiserCampaignStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "AdvertiserCampaignStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCampaign" ADD CONSTRAINT "AdvertiserCampaign_advertiserId_fkey" FOREIGN KEY ("advertiserId") REFERENCES "Advertiser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCampaign" ADD CONSTRAINT "AdvertiserCampaign_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "AffiliateProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCampaign" ADD CONSTRAINT "AdvertiserCampaign_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "AdvertiserCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCampaign" ADD CONSTRAINT "AdvertiserCampaign_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "AdvertiserCampaignStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCampaignMetadata" ADD CONSTRAINT "AdvertiserCampaignMetadata_advertiserCampaignId_fkey" FOREIGN KEY ("advertiserCampaignId") REFERENCES "AdvertiserCampaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvertiserCampaignMetadata" ADD CONSTRAINT "AdvertiserCampaignMetadata_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAdvertiserStatusMetadata" ADD CONSTRAINT "CompanyAdvertiserStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "CompanyAdvertiserStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAdvertiser" ADD CONSTRAINT "CompanyAdvertiser_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAdvertiser" ADD CONSTRAINT "CompanyAdvertiser_advertiserId_fkey" FOREIGN KEY ("advertiserId") REFERENCES "Advertiser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAdvertiser" ADD CONSTRAINT "CompanyAdvertiser_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "CompanyAdvertiserStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAdvertiserCommission" ADD CONSTRAINT "CompanyAdvertiserCommission_companyAdvertiserId_fkey" FOREIGN KEY ("companyAdvertiserId") REFERENCES "CompanyAdvertiser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAdvertiserCommission" ADD CONSTRAINT "CompanyAdvertiserCommission_advertiserCommissionId_fkey" FOREIGN KEY ("advertiserCommissionId") REFERENCES "AdvertiserCommission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAdvertiserCommission" ADD CONSTRAINT "CompanyAdvertiserCommission_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "AdvertiserCommissionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAdvertiserCommissionRow" ADD CONSTRAINT "CompanyAdvertiserCommissionRow_companyAdvertiserId_fkey" FOREIGN KEY ("companyAdvertiserId") REFERENCES "CompanyAdvertiser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAdvertiserCommissionRow" ADD CONSTRAINT "CompanyAdvertiserCommissionRow_advertiserCommissionRowId_fkey" FOREIGN KEY ("advertiserCommissionRowId") REFERENCES "AdvertiserCommissionRow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAdvertiserCommissionRow" ADD CONSTRAINT "CompanyAdvertiserCommissionRow_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "AdvertiserCommissionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAdvertiserClick" ADD CONSTRAINT "UserAdvertiserClick_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAdvertiserClick" ADD CONSTRAINT "UserAdvertiserClick_advertiserId_fkey" FOREIGN KEY ("advertiserId") REFERENCES "Advertiser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCashbackStatusMetadata" ADD CONSTRAINT "UserCashbackStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "UserCashbackStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCashback" ADD CONSTRAINT "UserCashback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCashback" ADD CONSTRAINT "UserCashback_advertiserId_fkey" FOREIGN KEY ("advertiserId") REFERENCES "Advertiser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCashback" ADD CONSTRAINT "UserCashback_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCashback" ADD CONSTRAINT "UserCashback_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "UserCashbackStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrencyMetadata" ADD CONSTRAINT "CurrencyMetadata_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWalletStatusMetadata" ADD CONSTRAINT "UserWalletStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "UserWalletStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWallet" ADD CONSTRAINT "UserWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWallet" ADD CONSTRAINT "UserWallet_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWallet" ADD CONSTRAINT "UserWallet_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "UserWalletStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWalletTransactionTypeMetadata" ADD CONSTRAINT "UserWalletTransactionTypeMetadata_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "UserWalletTransactionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWalletTransactionStatusMetadata" ADD CONSTRAINT "UserWalletTransactionStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "UserWalletTransactionStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWalletTransactionLog" ADD CONSTRAINT "UserWalletTransactionLog_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "UserWallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWalletTransactionLog" ADD CONSTRAINT "UserWalletTransactionLog_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWalletTransactionLog" ADD CONSTRAINT "UserWalletTransactionLog_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "UserWalletTransactionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWalletTransactionLog" ADD CONSTRAINT "UserWalletTransactionLog_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "UserWalletTransactionStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDepositStatusMetadata" ADD CONSTRAINT "UserDepositStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "UserDepositStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDeposit" ADD CONSTRAINT "UserDeposit_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "UserWallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDeposit" ADD CONSTRAINT "UserDeposit_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDeposit" ADD CONSTRAINT "UserDeposit_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "UserPaymentMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDeposit" ADD CONSTRAINT "UserDeposit_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "UserDepositStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDeposit" ADD CONSTRAINT "UserDeposit_processedById_fkey" FOREIGN KEY ("processedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWithdrawalStatusMetadata" ADD CONSTRAINT "UserWithdrawalStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "UserWithdrawalStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWithdrawal" ADD CONSTRAINT "UserWithdrawal_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "UserWallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWithdrawal" ADD CONSTRAINT "UserWithdrawal_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWithdrawal" ADD CONSTRAINT "UserWithdrawal_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "UserWithdrawalStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWithdrawal" ADD CONSTRAINT "UserWithdrawal_processedById_fkey" FOREIGN KEY ("processedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWithdrawal" ADD CONSTRAINT "UserWithdrawal_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "UserPaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentChannelTypeMetadata" ADD CONSTRAINT "PaymentChannelTypeMetadata_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "PaymentChannelType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentChannelStatusMetadata" ADD CONSTRAINT "PaymentChannelStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "PaymentChannelStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentDirectionMetadata" ADD CONSTRAINT "PaymentDirectionMetadata_directionId_fkey" FOREIGN KEY ("directionId") REFERENCES "PaymentDirection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentChannelFeeTypeMetadata" ADD CONSTRAINT "PaymentChannelFeeTypeMetadata_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "PaymentChannelFeeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentChannel" ADD CONSTRAINT "PaymentChannel_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "PaymentChannelType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentChannel" ADD CONSTRAINT "PaymentChannel_directionId_fkey" FOREIGN KEY ("directionId") REFERENCES "PaymentDirection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentChannel" ADD CONSTRAINT "PaymentChannel_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "PaymentChannelStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentChannel" ADD CONSTRAINT "PaymentChannel_feeTypeId_fkey" FOREIGN KEY ("feeTypeId") REFERENCES "PaymentChannelFeeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentChannel" ADD CONSTRAINT "PaymentChannel_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentChannelMetadata" ADD CONSTRAINT "PaymentChannelMetadata_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "PaymentChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPaymentMethodStatusMetadata" ADD CONSTRAINT "UserPaymentMethodStatusMetadata_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "UserPaymentMethodStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPaymentMethod" ADD CONSTRAINT "UserPaymentMethod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPaymentMethod" ADD CONSTRAINT "UserPaymentMethod_paymentChannelId_fkey" FOREIGN KEY ("paymentChannelId") REFERENCES "PaymentChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPaymentMethod" ADD CONSTRAINT "UserPaymentMethod_directionId_fkey" FOREIGN KEY ("directionId") REFERENCES "PaymentDirection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPaymentMethod" ADD CONSTRAINT "UserPaymentMethod_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "UserPaymentMethodStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageVersion" ADD CONSTRAINT "PageVersion_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageVersion" ADD CONSTRAINT "PageVersion_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteMetadata" ADD CONSTRAINT "SiteMetadata_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteMetadata" ADD CONSTRAINT "SiteMetadata_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostVersionToTag" ADD CONSTRAINT "_PostVersionToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "PostVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostVersionToTag" ADD CONSTRAINT "_PostVersionToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToUser" ADD CONSTRAINT "_CompanyToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToUser" ADD CONSTRAINT "_CompanyToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdvertiserToAffiliateProvider" ADD CONSTRAINT "_AdvertiserToAffiliateProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "Advertiser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdvertiserToAffiliateProvider" ADD CONSTRAINT "_AdvertiserToAffiliateProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "AffiliateProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurrencyToPaymentChannel" ADD CONSTRAINT "_CurrencyToPaymentChannel_A_fkey" FOREIGN KEY ("A") REFERENCES "Currency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurrencyToPaymentChannel" ADD CONSTRAINT "_CurrencyToPaymentChannel_B_fkey" FOREIGN KEY ("B") REFERENCES "PaymentChannel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
