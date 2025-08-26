import {
  AdvertiserCampaignStatusEnum,
  AdvertiserCategoryEnum,
  AdvertiserCommissionShareTypeEnum,
  AdvertiserCommissionStatusEnum,
  AdvertiserCommissionTypeEnum,
  AdvertiserStatusEnum,
  AffiliateProviderStatusEnum,
  CompanyAdvertiserStatusEnum,
  CurrencyEnum,
  LanguageEnum,
  PaymentChannelFeeTypeEnum,
  PaymentChannelStatusEnum,
  PaymentChannelTypeEnum,
  PaymentDirectionEnum,
  PermissionEnum,
  PostStatusEnum,
  PostTypeEnum,
  PrismaClient,
  UserCashbackStatusEnum,
  UserDepositStatusEnum,
  UserPaymentMethodStatusEnum,
  UserWalletStatusEnum,
  UserWalletTransactionStatusEnum,
  UserWalletTransactionTypeEnum,
  UserWithdrawalStatusEnum,
} from '@prisma/client';
import { seedAdvertiser } from './data/advertiser';
import { seedLanguage } from './data/language';
import { seedAdvertiserCommissionRowStatus } from './data/advertiser-commission-row-status';
const prisma = new PrismaClient();

async function seedCurrencies() {
  await prisma.currency.upsert({
    where: {
      id: CurrencyEnum.MYR,
    },
    create: {
      id: CurrencyEnum.MYR,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Malaysian Ringgit',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Malaysian Ringgit',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '马币',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedAffiliateProvider() {
  await prisma.affiliateProvider.upsert({
    where: {
      id: 'InvolveAsia',
    },
    create: {
      id: 'InvolveAsia',
      name: 'InvolveAsia',
      statusId: AffiliateProviderStatusEnum.Active,
    },
    update: {},
  });
}

async function seedPaymentChannelTypes() {
  await prisma.paymentChannelType.upsert({
    where: {
      id: PaymentChannelTypeEnum.BankTransfer,
    },
    create: {
      id: PaymentChannelTypeEnum.BankTransfer,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Bank Transfer',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Bank Transfer',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '银行转账',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedAdvertiserCommissionShareTypes() {
  await prisma.advertiserCommissionShareType.upsert({
    where: {
      id: AdvertiserCommissionShareTypeEnum.Fixed,
    },
    create: {
      id: AdvertiserCommissionShareTypeEnum.Fixed,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Fixed',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Fixed',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '固定',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.advertiserCommissionShareType.upsert({
    where: {
      id: AdvertiserCommissionShareTypeEnum.Percentage,
    },
    create: {
      id: AdvertiserCommissionShareTypeEnum.Percentage,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Percentage',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Percentage',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '比例',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedPaymentChannelStatuses() {
  await prisma.paymentChannelStatus.upsert({
    where: {
      id: PaymentChannelStatusEnum.Active,
    },
    create: {
      id: PaymentChannelStatusEnum.Active,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Active',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Active',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已启用',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.paymentChannelStatus.upsert({
    where: {
      id: PaymentChannelStatusEnum.Inactive,
    },
    create: {
      id: PaymentChannelStatusEnum.Inactive,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Inactive',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Inactive',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已停用',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedUserPaymentMethodStatuses() {
  await prisma.userPaymentMethodStatus.upsert({
    where: {
      id: UserPaymentMethodStatusEnum.Active,
    },
    create: {
      id: UserPaymentMethodStatusEnum.Active,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Active',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Active',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已启用',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.userPaymentMethodStatus.upsert({
    where: {
      id: UserPaymentMethodStatusEnum.Inactive,
    },
    create: {
      id: UserPaymentMethodStatusEnum.Inactive,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Inactive',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Inactive',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已停用',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedUserWalletStatuses() {
  await prisma.userWalletStatus.upsert({
    where: {
      id: UserWalletStatusEnum.Active,
    },
    create: {
      id: UserWalletStatusEnum.Active,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Active',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Active',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已启用',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.userWalletStatus.upsert({
    where: {
      id: UserWalletStatusEnum.Inactive,
    },
    create: {
      id: UserWalletStatusEnum.Inactive,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Inactive',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Inactive',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已停用',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.userWalletStatus.upsert({
    where: {
      id: UserWalletStatusEnum.Frozen,
    },
    create: {
      id: UserWalletStatusEnum.Frozen,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Frozen',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Frozen',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已冻结',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedAdvertiserStatuses() {
  await prisma.advertiserStatus.upsert({
    where: {
      id: AdvertiserStatusEnum.Active,
    },
    create: {
      id: AdvertiserStatusEnum.Active,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Active',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Active',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已启用',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.advertiserStatus.upsert({
    where: {
      id: AdvertiserStatusEnum.Inactive,
    },
    create: {
      id: AdvertiserStatusEnum.Inactive,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Inactive',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Inactive',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已停用',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedAdvertiserCommissionStatuses() {
  await prisma.advertiserCommissionStatus.upsert({
    where: {
      id: AdvertiserCommissionStatusEnum.Active,
    },
    create: {
      id: AdvertiserCommissionStatusEnum.Active,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Active',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Active',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已启用',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.advertiserCommissionStatus.upsert({
    where: {
      id: AdvertiserCommissionStatusEnum.Inactive,
    },
    create: {
      id: AdvertiserCommissionStatusEnum.Inactive,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Inactive',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Inactive',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已停用',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedAffiliateProviderStatuses() {
  await prisma.affiliateProviderStatus.upsert({
    where: {
      id: AffiliateProviderStatusEnum.Active,
    },
    create: {
      id: AffiliateProviderStatusEnum.Active,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Active',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Active',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已启用',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.affiliateProviderStatus.upsert({
    where: {
      id: AffiliateProviderStatusEnum.Inactive,
    },
    create: {
      id: AffiliateProviderStatusEnum.Inactive,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Inactive',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Inactive',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已停用',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedAdvertiserCampaignStatuses() {
  await prisma.advertiserCampaignStatus.upsert({
    where: {
      id: AdvertiserCampaignStatusEnum.Active,
    },
    create: {
      id: AdvertiserCampaignStatusEnum.Active,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Active',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Active',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已启用',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.advertiserCampaignStatus.upsert({
    where: {
      id: AdvertiserCampaignStatusEnum.Inactive,
    },
    create: {
      id: AdvertiserCampaignStatusEnum.Inactive,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Inactive',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Inactive',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已停用',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedCompanyAdvertiserStatuses() {
  await prisma.companyAdvertiserStatus.upsert({
    where: {
      id: CompanyAdvertiserStatusEnum.Active,
    },
    create: {
      id: CompanyAdvertiserStatusEnum.Active,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Active',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Active',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已启用',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.companyAdvertiserStatus.upsert({
    where: {
      id: CompanyAdvertiserStatusEnum.Inactive,
    },
    create: {
      id: CompanyAdvertiserStatusEnum.Inactive,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Inactive',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Inactive',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已停用',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedUserCashbackStatuses() {
  await prisma.userCashbackStatus.upsert({
    where: {
      id: UserCashbackStatusEnum.Pending,
    },
    create: {
      id: UserCashbackStatusEnum.Pending,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Pending',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Pending',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '核实中',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.userCashbackStatus.upsert({
    where: {
      id: UserCashbackStatusEnum.Approved,
    },
    create: {
      id: UserCashbackStatusEnum.Approved,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Approved',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Approved',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已核准',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.userCashbackStatus.upsert({
    where: {
      id: UserCashbackStatusEnum.Rejected,
    },
    create: {
      id: UserCashbackStatusEnum.Rejected,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Rejected',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Rejected',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已拒绝',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedAdvertiserCategories() {
  await prisma.advertiserCategory.upsert({
    where: {
      id: AdvertiserCategoryEnum.DigitalServices,
    },
    create: {
      id: AdvertiserCategoryEnum.DigitalServices,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Digital Services',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Digital Services',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '数码服务',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.advertiserCategory.upsert({
    where: {
      id: AdvertiserCategoryEnum.Electronics,
    },
    create: {
      id: AdvertiserCategoryEnum.Electronics,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Electronics',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Electronics',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '电子产品',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.advertiserCategory.upsert({
    where: {
      id: AdvertiserCategoryEnum.Fashion,
    },
    create: {
      id: AdvertiserCategoryEnum.Fashion,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Fashion',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Fashion',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '时尚',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.advertiserCategory.upsert({
    where: {
      id: AdvertiserCategoryEnum.Finance,
    },
    create: {
      id: AdvertiserCategoryEnum.Finance,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Finance',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Finance',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '金融',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.advertiserCategory.upsert({
    where: {
      id: AdvertiserCategoryEnum.Food_Grocery,
    },
    create: {
      id: AdvertiserCategoryEnum.Food_Grocery,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Food & Grocery',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Food & Grocery',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '餐饮与日用品',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.advertiserCategory.upsert({
    where: {
      id: AdvertiserCategoryEnum.Health_Beauty,
    },
    create: {
      id: AdvertiserCategoryEnum.Health_Beauty,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Health & Beauty',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Health & Beauty',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '保健与美容',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.advertiserCategory.upsert({
    where: {
      id: AdvertiserCategoryEnum.Home_Living,
    },
    create: {
      id: AdvertiserCategoryEnum.Home_Living,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Home & Garden',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Home & Garden',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '家居和花园',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.advertiserCategory.upsert({
    where: {
      id: AdvertiserCategoryEnum.Marketplace,
    },
    create: {
      id: AdvertiserCategoryEnum.Marketplace,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Marketplace',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Marketplace',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '购物平台',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.advertiserCategory.upsert({
    where: {
      id: AdvertiserCategoryEnum.Others,
    },
    create: {
      id: AdvertiserCategoryEnum.Others,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Others',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Others',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '其他',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.advertiserCategory.upsert({
    where: {
      id: AdvertiserCategoryEnum.Travel,
    },
    create: {
      id: AdvertiserCategoryEnum.Travel,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Travel & Vacations',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Travel & Vacations',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '旅游与度假',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedPaymentChannelFeeTypes() {
  await prisma.paymentChannelFeeType.upsert({
    where: {
      id: PaymentChannelFeeTypeEnum.Fixed,
    },
    create: {
      id: PaymentChannelFeeTypeEnum.Fixed,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Fixed',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Fixed',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '固定',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.paymentChannelFeeType.upsert({
    where: {
      id: PaymentChannelFeeTypeEnum.Percentage,
    },
    create: {
      id: PaymentChannelFeeTypeEnum.Percentage,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Percentage',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Percentage',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '比例',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedUserWalletTransactionTypes() {
  await prisma.userWalletTransactionType.upsert({
    where: {
      id: UserWalletTransactionTypeEnum.AffiliateCashback,
    },
    create: {
      id: UserWalletTransactionTypeEnum.AffiliateCashback,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Cashback',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Cashback',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '返现',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.userWalletTransactionType.upsert({
    where: {
      id: UserWalletTransactionTypeEnum.Withdrawal,
    },
    create: {
      id: UserWalletTransactionTypeEnum.Withdrawal,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Withdrawal',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Withdrawal',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '取款',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.userWalletTransactionType.upsert({
    where: {
      id: UserWalletTransactionTypeEnum.FirstCashbackBonus,
    },
    create: {
      id: UserWalletTransactionTypeEnum.FirstCashbackBonus,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'First Cashback Bonus',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'First Cashback Bonus',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '首次返现奖励',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedAdvertiserCommissionTypes() {
  await prisma.advertiserCommissionType.upsert({
    where: {
      id: AdvertiserCommissionTypeEnum.Fixed,
    },
    create: {
      id: AdvertiserCommissionTypeEnum.Fixed,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Fixed',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Fixed',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '固定',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.advertiserCommissionType.upsert({
    where: {
      id: AdvertiserCommissionTypeEnum.Percentage,
    },
    create: {
      id: AdvertiserCommissionTypeEnum.Percentage,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Percentage',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Percentage',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '比例',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedUserWalletTransactionStatuses() {
  await prisma.userWalletTransactionStatus.upsert({
    where: {
      id: UserWalletTransactionStatusEnum.Pending,
    },
    create: {
      id: UserWalletTransactionStatusEnum.Pending,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Pending',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Pending',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '核实中',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.userWalletTransactionStatus.upsert({
    where: {
      id: UserWalletTransactionStatusEnum.Completed,
    },
    create: {
      id: UserWalletTransactionStatusEnum.Completed,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Completed',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Completed',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '成功',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.userWalletTransactionStatus.upsert({
    where: {
      id: UserWalletTransactionStatusEnum.Failed,
    },
    create: {
      id: UserWalletTransactionStatusEnum.Failed,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Failed',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Failed',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '失败',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.userWalletTransactionStatus.upsert({
    where: {
      id: UserWalletTransactionStatusEnum.Canceled,
    },
    create: {
      id: UserWalletTransactionStatusEnum.Canceled,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Canceled',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Canceled',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已取消',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedUserDepositStatuses() {
  await prisma.userDepositStatus.upsert({
    where: {
      id: UserDepositStatusEnum.Pending,
    },
    create: {
      id: UserDepositStatusEnum.Pending,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Pending',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Pending',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '核实中',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.userDepositStatus.upsert({
    where: {
      id: UserDepositStatusEnum.Completed,
    },
    create: {
      id: UserDepositStatusEnum.Completed,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Completed',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Completed',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '成功',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.userDepositStatus.upsert({
    where: {
      id: UserDepositStatusEnum.Rejected,
    },
    create: {
      id: UserDepositStatusEnum.Rejected,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Rejected',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Rejected',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已拒绝',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.userDepositStatus.upsert({
    where: {
      id: UserDepositStatusEnum.Canceled,
    },
    create: {
      id: UserDepositStatusEnum.Canceled,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Canceled',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Canceled',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已取消',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedUserWithdrawalStatuses() {
  await prisma.userWithdrawalStatus.upsert({
    where: {
      id: UserWithdrawalStatusEnum.Pending,
    },
    create: {
      id: UserWithdrawalStatusEnum.Pending,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Pending',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Pending',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '核实中',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.userWithdrawalStatus.upsert({
    where: {
      id: UserWithdrawalStatusEnum.Completed,
    },
    create: {
      id: UserWithdrawalStatusEnum.Completed,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Completed',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Completed',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '成功',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.userWithdrawalStatus.upsert({
    where: {
      id: UserWithdrawalStatusEnum.Rejected,
    },
    create: {
      id: UserWithdrawalStatusEnum.Rejected,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Rejected',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Rejected',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已拒绝',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.userWithdrawalStatus.upsert({
    where: {
      id: UserWithdrawalStatusEnum.Canceled,
    },
    create: {
      id: UserWithdrawalStatusEnum.Canceled,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Canceled',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Canceled',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已取消',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedPaymentDirections() {
  await prisma.paymentDirection.upsert({
    where: {
      id: PaymentDirectionEnum.Deposit,
    },
    create: {
      id: PaymentDirectionEnum.Deposit,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Deposit',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Deposit',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '存款',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.paymentDirection.upsert({
    where: {
      id: PaymentDirectionEnum.Withdrawal,
    },
    create: {
      id: PaymentDirectionEnum.Withdrawal,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Withdrawal',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Deposit',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '取款',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.paymentDirection.upsert({
    where: {
      id: PaymentDirectionEnum.Both,
    },
    create: {
      id: PaymentDirectionEnum.Both,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Deposit & Withdrawal',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Deposit',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '存款与取款',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedRoles() {
  await prisma.permission.upsert({
    where: {
      name: PermissionEnum.AdminPanel,
    },
    create: {
      name: PermissionEnum.AdminPanel,
    },
    update: {},
  });
  await prisma.permission.upsert({
    where: {
      name: PermissionEnum.ViewRole,
    },
    create: {
      name: PermissionEnum.ViewRole,
    },
    update: {},
  });
  await prisma.permission.upsert({
    where: {
      name: PermissionEnum.ManageRole,
    },
    create: {
      name: PermissionEnum.ManageRole,
    },
    update: {},
  });
  await prisma.permission.upsert({
    where: {
      name: PermissionEnum.ViewPermission,
    },
    create: {
      name: PermissionEnum.ViewPermission,
    },
    update: {},
  });
  await prisma.permission.upsert({
    where: {
      name: PermissionEnum.ManagePermission,
    },
    create: {
      name: PermissionEnum.ManagePermission,
    },
    update: {},
  });
  await prisma.permission.upsert({
    where: {
      name: PermissionEnum.ViewCarousel,
    },
    create: {
      name: PermissionEnum.ViewCarousel,
    },
    update: {},
  });
  await prisma.permission.upsert({
    where: {
      name: PermissionEnum.ManageCarousel,
    },
    create: {
      name: PermissionEnum.ManageCarousel,
    },
    update: {},
  });
  await prisma.permission.upsert({
    where: {
      name: PermissionEnum.ViewAdvertiser,
    },
    create: {
      name: PermissionEnum.ViewAdvertiser,
    },
    update: {},
  });
  await prisma.permission.upsert({
    where: {
      name: PermissionEnum.ManageAdvertiser,
    },
    create: {
      name: PermissionEnum.ManageAdvertiser,
    },
    update: {},
  });
  await prisma.permission.upsert({
    where: {
      name: PermissionEnum.ViewPost,
    },
    create: {
      name: PermissionEnum.ViewPost,
    },
    update: {},
  });
  await prisma.permission.upsert({
    where: {
      name: PermissionEnum.ManagePost,
    },
    create: {
      name: PermissionEnum.ManagePost,
    },
    update: {},
  });
  await prisma.permission.upsert({
    where: {
      name: PermissionEnum.ManageSite,
    },
    create: {
      name: PermissionEnum.ManageSite,
    },
    update: {},
  });
  await prisma.permission.upsert({
    where: {
      name: PermissionEnum.ViewSite,
    },
    create: {
      name: PermissionEnum.ViewSite,
    },
    update: {},
  });
  await prisma.permission.upsert({
    where: {
      name: PermissionEnum.ViewBonuses,
    },
    create: {
      name: PermissionEnum.ViewBonuses,
    },
    update: {},
  });
  await prisma.permission.upsert({
    where: {
      name: PermissionEnum.ManageBonuses,
    },
    create: {
      name: PermissionEnum.ManageBonuses,
    },
    update: {},
  });
  await prisma.role.upsert({
    where: {
      name: 'Owner',
    },
    create: {
      name: 'Owner',
      permissions: {
        connect: [
          {
            name: PermissionEnum.AdminPanel,
          },
          {
            name: PermissionEnum.ViewRole,
          },
          {
            name: PermissionEnum.ManageRole,
          },
          {
            name: PermissionEnum.ViewPermission,
          },
          {
            name: PermissionEnum.ManagePermission,
          },
          {
            name: PermissionEnum.ViewCarousel,
          },
          {
            name: PermissionEnum.ManageCarousel,
          },
          {
            name: PermissionEnum.ViewAdvertiser,
          },
          {
            name: PermissionEnum.ManageAdvertiser,
          },
          {
            name: PermissionEnum.ViewPost,
          },
          {
            name: PermissionEnum.ManagePost,
          },
          {
            name: PermissionEnum.ViewBonuses,
          },
          {
            name: PermissionEnum.ManageBonuses,
          },
        ],
      },
    },
    update: {
      permissions: {
        connect: [
          {
            name: PermissionEnum.AdminPanel,
          },
          {
            name: PermissionEnum.ViewRole,
          },
          {
            name: PermissionEnum.ManageRole,
          },
          {
            name: PermissionEnum.ViewPermission,
          },
          {
            name: PermissionEnum.ManagePermission,
          },
          {
            name: PermissionEnum.ViewCarousel,
          },
          {
            name: PermissionEnum.ManageCarousel,
          },
          {
            name: PermissionEnum.ViewAdvertiser,
          },
          {
            name: PermissionEnum.ManageAdvertiser,
          },
          {
            name: PermissionEnum.ViewPost,
          },
          {
            name: PermissionEnum.ManagePost,
          },
          {
            name: PermissionEnum.ViewSite,
          },
          {
            name: PermissionEnum.ManageSite,
          },
          {
            name: PermissionEnum.ViewBonuses,
          },
          {
            name: PermissionEnum.ManageBonuses,
          },
        ],
      },
    },
  });
  await prisma.role.upsert({
    where: {
      name: 'Admin',
    },
    create: {
      name: 'Admin',
      permissions: {
        connect: [
          {
            name: PermissionEnum.AdminPanel,
          },
          {
            name: PermissionEnum.ViewRole,
          },
          {
            name: PermissionEnum.ManageRole,
          },
          {
            name: PermissionEnum.ViewPermission,
          },
          {
            name: PermissionEnum.ManagePermission,
          },
          {
            name: PermissionEnum.ViewCarousel,
          },
          {
            name: PermissionEnum.ManageCarousel,
          },
          {
            name: PermissionEnum.ViewAdvertiser,
          },
          {
            name: PermissionEnum.ManageAdvertiser,
          },
          {
            name: PermissionEnum.ViewPost,
          },
          {
            name: PermissionEnum.ManagePost,
          },
          {
            name: PermissionEnum.ViewBonuses,
          },
          {
            name: PermissionEnum.ManageBonuses,
          },
        ],
      },
    },
    update: {
      permissions: {
        connect: [
          {
            name: PermissionEnum.AdminPanel,
          },
          {
            name: PermissionEnum.ViewRole,
          },
          {
            name: PermissionEnum.ManageRole,
          },
          {
            name: PermissionEnum.ViewPermission,
          },
          {
            name: PermissionEnum.ManagePermission,
          },
          {
            name: PermissionEnum.ViewCarousel,
          },
          {
            name: PermissionEnum.ManageCarousel,
          },
          {
            name: PermissionEnum.ViewAdvertiser,
          },
          {
            name: PermissionEnum.ManageAdvertiser,
          },
          {
            name: PermissionEnum.ViewPost,
          },
          {
            name: PermissionEnum.ManagePost,
          },
          {
            name: PermissionEnum.ViewBonuses,
          },
          {
            name: PermissionEnum.ManageBonuses,
          },
        ],
      },
    },
  });
  await prisma.role.upsert({
    where: {
      name: 'User',
    },
    create: {
      name: 'User',
    },
    update: {},
  });
}

async function seedPostTypes() {
  await prisma.postType.upsert({
    where: {
      id: PostTypeEnum.Blog,
    },
    create: {
      id: PostTypeEnum.Blog,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Blog',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Blog',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '博客',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.postType.upsert({
    where: {
      id: PostTypeEnum.Page,
    },
    create: {
      id: PostTypeEnum.Page,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Page',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Page',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '页面',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedPostStatuses() {
  await prisma.postStatus.upsert({
    where: {
      id: PostStatusEnum.Draft,
    },
    create: {
      id: PostStatusEnum.Draft,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Draft',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Draft',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '草稿',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });

  await prisma.postStatus.upsert({
    where: {
      id: PostStatusEnum.Published,
    },
    create: {
      id: PostStatusEnum.Published,
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Published',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Published',
              languageId: LanguageEnum.EN_US,
            },
            {
              name: '已发布',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function main() {
  await seedCurrencies();
  await seedAffiliateProviderStatuses();
  await seedAdvertiserCommissionShareTypes();
  await seedAdvertiserStatuses();
  await seedAdvertiserCommissionStatuses();
  await seedAdvertiserCommissionTypes();
  await seedAdvertiserCommissionRowStatus(prisma);
  await seedAdvertiserCategories();
  await seedAdvertiserCampaignStatuses();
  await seedCompanyAdvertiserStatuses();
  await seedUserCashbackStatuses();
  await seedAffiliateProvider();

  await seedPaymentDirections();
  await seedPaymentChannelTypes();
  await seedPaymentChannelStatuses();
  await seedPaymentChannelFeeTypes();
  await seedUserPaymentMethodStatuses();
  await seedUserWalletStatuses();
  await seedUserWalletTransactionTypes();
  await seedUserWalletTransactionStatuses();
  await seedUserWithdrawalStatuses();
  await seedUserDepositStatuses();

  await seedRoles();
  await seedPostTypes();
  await seedPostStatuses();
  await seedAdvertiser(prisma);
  await seedLanguage(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
