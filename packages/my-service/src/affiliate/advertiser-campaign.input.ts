import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import {
  AdvertiserCampaignStatusEnum,
  LanguageEnum,
  AffiliateProviderEnum,
} from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

registerEnumType(AdvertiserCampaignStatusEnum, {
  name: 'AdvertiserCampaignStatusEnum',
});

registerEnumType(AffiliateProviderEnum, {
  name: 'AffiliateProviderEnum',
});

@InputType()
export class AdvertiserCampaignMetadataInput {
  @Field(() => LanguageEnum, {
    description: 'The language of the advertiser campaign metadata',
  })
  @IsEnum(LanguageEnum)
  languageId: LanguageEnum;

  @Field({ description: 'The name of the advertiser campaign' })
  @IsString()
  name: string;

  @Field({ description: 'The description of the advertiser campaign' })
  @IsString()
  description: string;

  @Field({
    nullable: true,
    description: 'The ID of the banner image for the advertiser campaign',
  })
  @IsString()
  @IsOptional()
  bannerId?: string;
}

@InputType()
export class CreateAdvertiserCampaignInput {
  @Field({ description: 'The ID of the advertiser for this campaign' })
  @IsString()
  advertiserId: string;

  @Field(() => AffiliateProviderEnum, {
    description: 'The ID of the affiliate provider',
  })
  @IsEnum(AffiliateProviderEnum)
  providerId: AffiliateProviderEnum;

  @Field({
    description: 'The reference ID of the campaign in the provider system',
  })
  @IsString()
  providerReferenceId: string;

  @Field(() => [String], { description: 'The voucher codes for the campaign' })
  @IsArray()
  @IsString({ each: true })
  voucherCodes: string[];

  @Field({ description: 'The start date of the campaign' })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @Field({ description: 'The end date of the campaign' })
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @Field(() => AdvertiserCampaignStatusEnum, {
    nullable: true,
    defaultValue: AdvertiserCampaignStatusEnum.Active,
    description: 'The status of the advertiser campaign',
  })
  @IsEnum(AdvertiserCampaignStatusEnum)
  @IsOptional()
  statusId?: AdvertiserCampaignStatusEnum;

  @Field({ description: 'The URL of the advertiser campaign' })
  @IsString()
  url: string;

  @Field({ description: 'URL-friendly identifier for the campaign' })
  @IsString()
  slug: string;

  @Field(() => [AdvertiserCampaignMetadataInput], {
    description: 'The advertiser campaign metadata in different languages',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AdvertiserCampaignMetadataInput)
  metadatas: AdvertiserCampaignMetadataInput[];
}
