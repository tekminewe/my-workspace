import {
  BonusTypeCodeEnum,
  BonusTypeStatusEnum,
  BonusEligibilityStatusEnum,
  LanguageEnum,
  PrismaClient,
} from '@prisma/client';
import { seedLanguage } from './data/language';

const prisma = new PrismaClient();

export async function seedBonusTypes() {
  console.log('Seeding bonus types...');

  // First, ensure languages exist
  console.log('Seeding languages...');
  await seedLanguage(prisma);

  // First, create the status enum records
  console.log('Creating status enums...');

  // BonusType statuses
  for (const status of Object.values(BonusTypeStatusEnum)) {
    await prisma.bonusTypeStatus.upsert({
      where: { id: status },
      update: {},
      create: {
        id: status,
        description: status,
      },
    });
  }

  // BonusEligibility statuses
  for (const status of Object.values(BonusEligibilityStatusEnum)) {
    await prisma.bonusEligibilityStatus.upsert({
      where: { id: status },
      update: {},
      create: {
        id: status,
        description: status,
      },
    });
  }

  console.log('Status enums created successfully!');

  // Create First Cashback Multiplier bonus type
  const firstCashbackBonus = await prisma.bonusType.upsert({
    where: {
      codeId_version: {
        codeId: BonusTypeCodeEnum.FirstCashbackMultiplier,
        version: 1,
      },
    },
    update: {},
    create: {
      codeId: BonusTypeCodeEnum.FirstCashbackMultiplier,
      version: 1,
      priority: 100,
      expiryDays: null, // No expiry date for this bonus
      maxUsagePerUser: 1,
      ruleConfig: {
        multiplier: 2,
        description: 'Double the cashback on your first purchase',
      },
      statusId: BonusTypeStatusEnum.Active,
      effectiveFrom: new Date(),
      effectiveTo: null, // No end date
      createdBy: 'system',
    },
  });

  console.log('Created bonus type:', firstCashbackBonus.id);

  // Create metadata for English
  await prisma.bonusTypeMetadata.upsert({
    where: {
      bonusTypeId_languageId: {
        bonusTypeId: firstCashbackBonus.id,
        languageId: LanguageEnum.EN_MY,
      },
    },
    update: {},
    create: {
      bonusTypeId: firstCashbackBonus.id,
      languageId: LanguageEnum.EN_MY,
      title: '2x First Cashback Bonus',
      description: '',
      termsAndConditions: '',
    },
  });

  console.log('Bonus types seeded successfully!');
}

// Run if called directly
if (require.main === module) {
  seedBonusTypes()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
