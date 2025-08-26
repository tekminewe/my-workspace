import {
  AdvertiserCategoryEnum,
  AdvertiserCommissionShareTypeEnum,
  AdvertiserCommissionStatusEnum,
  AdvertiserCommissionTypeEnum,
  AdvertiserStatusEnum,
  AffiliateProviderEnum,
  LanguageEnum,
} from '@prisma/client';

export interface AdvertiserData {
  id: string;
  slug: string;
  statusId: AdvertiserStatusEnum;
  logo?: {
    id: string;
    filePath: string;
    mimeType: string;
  };
  categories?: AdvertiserCategoryEnum[];
  providerReferences?: {
    providerId: AffiliateProviderEnum;
    providerReferenceId: string;
  }[];
  metadatas?: {
    languageId: LanguageEnum;
    name: string;
    description: string;
  }[];
  commissions?: {
    id: string;
    providerReferenceId: string;
    providerId: AffiliateProviderEnum;
    commissionShareTypeId: AdvertiserCommissionShareTypeEnum;
    commissionShare: number;
    dayToPayout: number;
    dayToValidate: number;
    url: string;
    statusId?: AdvertiserCommissionStatusEnum;
    commissionRows?: {
      id: string;
      name: string;
      typeId: AdvertiserCommissionTypeEnum;
      commission: number;
      metadatas?: {
        languageId: LanguageEnum;
        name: string;
      }[];
    }[];
  }[];
  popularity?: number;
  notes?: string;
}
