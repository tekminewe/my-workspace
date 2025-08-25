import {
  AdvertiserCommissionRowStatusEnum,
  LanguageEnum,
} from '@prisma/client';
import { AdvertiserCommissionRowStatusData } from '../advertiser-commission-row-status.types';

const inactive: AdvertiserCommissionRowStatusData = {
  id: AdvertiserCommissionRowStatusEnum.Inactive,
  description: 'Inactive advertiser commission row status',
  metadatas: [
    {
      name: 'Inactive',
      languageId: LanguageEnum.EN_MY,
    },
    {
      name: 'Inactive',
      languageId: LanguageEnum.EN_US,
    },
    {
      name: '不活跃',
      languageId: LanguageEnum.ZH_MY,
    },
  ],
};

export default inactive;
