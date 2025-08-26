// filepath: /Users/tekminewe/Documents/Github/my-service/seed/data/advertiser-commission-row-statuses/active.ts
import {
  AdvertiserCommissionRowStatusEnum,
  LanguageEnum,
} from '@prisma/client';
import { AdvertiserCommissionRowStatusData } from '../advertiser-commission-row-status.types';

const active: AdvertiserCommissionRowStatusData = {
  id: AdvertiserCommissionRowStatusEnum.Active,
  description: 'Active advertiser commission row status',
  metadatas: [
    {
      name: 'Active',
      languageId: LanguageEnum.EN_MY,
    },
    {
      name: 'Active',
      languageId: LanguageEnum.EN_US,
    },
    {
      name: '活跃',
      languageId: LanguageEnum.ZH_MY,
    },
  ],
};

export default active;
