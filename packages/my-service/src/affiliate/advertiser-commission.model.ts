import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  AdvertiserCommissionTypeEnum,
  AdvertiserCommissionRowStatusEnum,
  AdvertiserCommissionStatusEnum,
  LanguageEnum,
  AffiliateProviderEnum,
} from '@prisma/client';

registerEnumType(AdvertiserCommissionTypeEnum, {
  name: 'AdvertiserCommissionTypeEnum',
});

registerEnumType(AdvertiserCommissionRowStatusEnum, {
  name: 'AdvertiserCommissionRowStatusEnum',
});

registerEnumType(LanguageEnum, {
  name: 'LanguageEnum',
});

registerEnumType(AffiliateProviderEnum, {
  name: 'AffiliateProviderEnum',
});

registerEnumType(AdvertiserCommissionStatusEnum, {
  name: 'AdvertiserCommissionStatusEnum',
});

@ObjectType({
  description:
    'Metadata for an advertiser commission row in different languages',
})
export class AdvertiserCommissionRowMetadata {
  @Field({
    description: 'ID of the commission row this metadata belongs to',
  })
  commissionRowId: string;

  @Field(() => LanguageEnum, {
    description: 'Language of this metadata',
  })
  languageId: LanguageEnum;

  @Field({
    description: 'Name of the commission row in the specified language',
  })
  name: string;
}

@ObjectType({
  description: 'A commission row for an advertiser commission',
})
export class AdvertiserCommissionRow {
  @Field({
    description: 'Unique identifier for the commission row',
  })
  id: string;

  @Field({
    description: 'Name of the commission row',
  })
  name: string;

  @Field({
    description: 'Commission value',
  })
  commission: number;

  @Field({
    description: 'Calculated commission value after applying share',
  })
  calculatedCommission: number;

  @Field(() => AdvertiserCommissionTypeEnum, {
    description: 'Type of the commission (Percentage or Fixed)',
  })
  typeId: AdvertiserCommissionTypeEnum;

  @Field(() => AdvertiserCommissionRowStatusEnum, {
    description: 'Status of the commission row (Active or Inactive)',
  })
  statusId: AdvertiserCommissionRowStatusEnum;

  @Field({
    description: 'ID of the advertiser commission this row belongs to',
  })
  advertiserCommissionId: string;

  @Field({
    description: 'Provider reference ID for this commission row',
  })
  providerReferenceId: string;

  @Field(() => [AdvertiserCommissionRowMetadata], {
    description: 'Localized metadata for this commission row',
    nullable: true,
  })
  metadatas?: AdvertiserCommissionRowMetadata[];
}

@ObjectType({
  description: 'Commission information for an advertiser',
})
export class AdvertiserCommission {
  @Field({
    description: 'Unique identifier for the commission',
  })
  id: string;

  @Field({
    description: 'Commission value (maximum from commission rows)',
  })
  commission: number;

  @Field({
    description:
      'Calculated commission value (maximum from calculated commission of rows)',
  })
  calculatedCommission: number;

  @Field(() => [AdvertiserCommissionRow], {
    description: 'Rows of commission details',
  })
  commissionRows: AdvertiserCommissionRow[];

  @Field({
    description: 'Number of days until the commission is validated',
  })
  dayToValidate: number;

  @Field({
    description: 'Number of days until the commission is paid out',
  })
  dayToPayout: number;

  @Field({
    description: 'URL for the commission',
  })
  url: string;

  @Field(() => AffiliateProviderEnum, {
    description: 'ID of the affiliate provider for this commission',
  })
  providerId: AffiliateProviderEnum;

  @Field(() => AdvertiserCommissionStatusEnum, {
    description: 'Status of the commission (Active or Inactive)',
  })
  statusId: AdvertiserCommissionStatusEnum;
}
