// filepath: /Users/tekminewe/Documents/Github/my-service/seed/data/advertiser-commission-row-status.types.ts
import {
  AdvertiserCommissionRowStatusEnum,
  LanguageEnum,
} from '@prisma/client';

export interface AdvertiserCommissionRowStatusMetadataData {
  languageId: LanguageEnum;
  name: string;
}

export interface AdvertiserCommissionRowStatusData {
  id: AdvertiserCommissionRowStatusEnum;
  description?: string;
  metadatas: AdvertiserCommissionRowStatusMetadataData[];
}
