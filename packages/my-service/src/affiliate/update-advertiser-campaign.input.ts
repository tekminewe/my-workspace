import { Field, InputType } from '@nestjs/graphql';
import { AdvertiserCampaignStatusEnum, LanguageEnum } from '@prisma/client';
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

@InputType()
export class UpdateAdvertiserCampaignMetadataInput {
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
export class UpdateAdvertiserCampaignInput {
  @Field({ description: 'The ID of the advertiser campaign to update' })
  @IsString()
  id: string;

  @Field(() => [String], {
    description: 'The voucher codes for the campaign',
    nullable: true,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  voucherCodes?: string[];

  @Field({
    description: 'The start date of the campaign',
    nullable: true,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @Field({
    description: 'The end date of the campaign',
    nullable: true,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @Field(() => AdvertiserCampaignStatusEnum, {
    nullable: true,
    description: 'The status of the advertiser campaign',
  })
  @IsEnum(AdvertiserCampaignStatusEnum)
  @IsOptional()
  statusId?: AdvertiserCampaignStatusEnum;

  @Field({
    description: 'The URL of the advertiser campaign',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  url?: string;

  @Field({
    description: 'URL-friendly identifier for the campaign',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @Field(() => [UpdateAdvertiserCampaignMetadataInput], {
    description: 'The advertiser campaign metadata in different languages',
    nullable: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => UpdateAdvertiserCampaignMetadataInput)
  @IsOptional()
  metadatas?: UpdateAdvertiserCampaignMetadataInput[];
}
