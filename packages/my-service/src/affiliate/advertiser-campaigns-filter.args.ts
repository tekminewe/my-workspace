import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import {
  AdvertiserCampaignStatusEnum,
  AffiliateProviderEnum,
} from '@prisma/client';
import { PaginationArgs } from 'src/pagination/pagination.args';
import { SortByField, SortDirection } from './sort.args';

registerEnumType(AdvertiserCampaignStatusEnum, {
  name: 'AdvertiserCampaignStatusEnum',
  description: 'Status of advertiser campaigns',
});

@ArgsType()
export class AdvertiserCampaignsFilterArgs extends PaginationArgs {
  @Field({
    description: 'Filter advertiser campaigns by advertiser ID',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  advertiserId?: string;

  @Field({
    description: 'Filter advertiser campaigns by advertiser slug',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  advertiserSlug?: string;

  @Field({
    description: 'Filter advertiser campaigns by provider reference ID',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  providerReferenceId?: string;

  @Field(() => AffiliateProviderEnum, {
    description: 'Filter advertiser campaigns by provider ID',
    nullable: true,
  })
  @IsEnum(AffiliateProviderEnum)
  @IsOptional()
  providerId?: AffiliateProviderEnum;

  @Field(() => AdvertiserCampaignStatusEnum, {
    description: 'Filter advertiser campaigns by status ID',
    nullable: true,
  })
  @IsEnum(AdvertiserCampaignStatusEnum)
  @IsOptional()
  statusId?: AdvertiserCampaignStatusEnum;

  @Field(() => Date, {
    description: 'Filter campaigns where endDate is greater than this date.',
    nullable: true,
  })
  @IsDate()
  @IsOptional()
  endDateGt?: Date;

  @Field(() => Date, {
    description:
      'Filter campaigns where startDate is less than or equal to this date.',
    nullable: true,
  })
  @IsDate()
  @IsOptional()
  startDateLte?: Date;

  @Field(() => SortByField, {
    description: 'Field to sort advertiser campaigns by',
    nullable: true,
    defaultValue: SortByField.CreatedAt,
  })
  @IsEnum(SortByField)
  @IsOptional()
  sortBy?: SortByField;

  @Field(() => SortDirection, {
    description: 'Direction to sort advertiser campaigns',
    nullable: true,
    defaultValue: SortDirection.Desc,
  })
  @IsEnum(SortDirection)
  @IsOptional()
  sortDirection?: SortDirection;
}
