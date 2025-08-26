import { registerEnumType } from '@nestjs/graphql';
import {
  BonusTypeCodeEnum,
  BonusTypeStatusEnum,
  BonusEligibilityStatusEnum,
  CurrencyEnum,
  LanguageEnum,
} from '@prisma/client';

registerEnumType(BonusTypeCodeEnum, {
  name: 'BonusTypeCodeEnum',
  description: 'Bonus type codes',
});

registerEnumType(BonusTypeStatusEnum, {
  name: 'BonusTypeStatusEnum',
  description: 'Bonus type status',
});

registerEnumType(BonusEligibilityStatusEnum, {
  name: 'BonusEligibilityStatusEnum',
  description: 'Bonus eligibility status',
});

registerEnumType(CurrencyEnum, {
  name: 'CurrencyEnum',
  description: 'Currency types',
});

registerEnumType(LanguageEnum, {
  name: 'LanguageEnum',
  description: 'Language types',
});
