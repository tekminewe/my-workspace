import {
  Field,
  InputType,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  AdvertiserCommissionRowStatusEnum,
  AdvertiserCommissionShareTypeEnum,
  AdvertiserCommissionStatusEnum,
  AdvertiserCommissionTypeEnum,
  AffiliateProviderEnum,
  LanguageEnum,
} from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

registerEnumType(AdvertiserCommissionShareTypeEnum, {
  name: 'AdvertiserCommissionShareTypeEnum',
  description: 'Type of commission share (Percentage or Fixed)',
});

@InputType()
export class CreateCommissionRowMetadataInput {
  @Field(() => LanguageEnum, {
    description: 'Language ID of the metadata',
  })
  @IsEnum(LanguageEnum)
  languageId: LanguageEnum;

  @Field(() => String, {
    description: 'Name of the commission row in the specified language',
  })
  @IsString()
  name: string;
}

@InputType()
export class CreateCommissionRowInput {
  @Field(() => String, {
    description: 'Provider reference ID for this commission row',
  })
  @IsString()
  providerReferenceId: string;

  @Field(() => AdvertiserCommissionTypeEnum, {
    description: 'Type of the commission (Percentage or Fixed)',
  })
  @IsEnum(AdvertiserCommissionTypeEnum)
  typeId: AdvertiserCommissionTypeEnum;

  @Field(() => AdvertiserCommissionRowStatusEnum, {
    description: 'Status of the commission row (Active or Inactive)',
    defaultValue: AdvertiserCommissionRowStatusEnum.Inactive,
  })
  @IsOptional()
  @IsEnum(AdvertiserCommissionRowStatusEnum)
  statusId?: AdvertiserCommissionRowStatusEnum;

  @Field(() => Number, {
    description: 'Commission value',
  })
  @IsNumber()
  @Min(0)
  commission: number;

  @Field(() => [CreateCommissionRowMetadataInput], {
    description: 'Metadata translations for the commission row',
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCommissionRowMetadataInput)
  metadatas?: CreateCommissionRowMetadataInput[];
}

@InputType()
export class UpdateCommissionRowInput {
  @Field(() => String, {
    description: 'ID of the commission row to update',
  })
  @IsString()
  id: string;

  @Field(() => AdvertiserCommissionTypeEnum, {
    description: 'Type of the commission (Percentage or Fixed)',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(AdvertiserCommissionTypeEnum)
  typeId?: AdvertiserCommissionTypeEnum;

  @Field(() => AdvertiserCommissionRowStatusEnum, {
    description: 'Status of the commission row (Active or Inactive)',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(AdvertiserCommissionRowStatusEnum)
  statusId?: AdvertiserCommissionRowStatusEnum;

  @Field(() => [CreateCommissionRowMetadataInput], {
    description: 'Metadata translations for the commission row',
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCommissionRowMetadataInput)
  metadatas?: CreateCommissionRowMetadataInput[];
}

@InputType()
export class CreateAdvertiserCommissionInput {
  @Field(() => String, {
    description: 'Advertiser ID that this commission belongs to',
  })
  @IsString()
  advertiserId: string;

  @Field(() => String, {
    description: 'Provider reference ID',
  })
  @IsString()
  providerReferenceId: string;

  @Field(() => AffiliateProviderEnum, {
    description: 'Affiliate provider ID',
  })
  @IsEnum(AffiliateProviderEnum)
  providerId: AffiliateProviderEnum;

  @Field(() => Number, {
    description: 'Commission share percentage',
  })
  @IsNumber()
  @Min(0)
  commissionShare: number;

  @Field(() => AdvertiserCommissionShareTypeEnum, {
    description: 'Commission share type',
  })
  @IsEnum(AdvertiserCommissionShareTypeEnum)
  commissionShareTypeId: AdvertiserCommissionShareTypeEnum;

  @Field(() => Number, {
    description: 'Number of days to validate the commission',
  })
  @IsNumber()
  @Min(0)
  dayToValidate: number;

  @Field(() => Number, {
    description: 'Number of days to payout the commission',
  })
  @IsNumber()
  @Min(0)
  dayToPayout: number;

  @Field(() => String, {
    description: 'Affiliate URL',
  })
  @IsUrl()
  url: string;

  @Field(() => AdvertiserCommissionStatusEnum, {
    description: 'Status of the commission',
  })
  @IsEnum(AdvertiserCommissionStatusEnum)
  statusId: AdvertiserCommissionStatusEnum;

  @Field(() => [CreateCommissionRowInput], {
    description: 'Commission rows for this commission',
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCommissionRowInput)
  commissionRows?: CreateCommissionRowInput[];
}

@InputType()
export class UpdateAdvertiserCommissionIdentifierInput {
  @Field(() => String, {
    description: 'ID of the advertiser commission to update',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  id?: string;

  @Field(() => String, {
    description:
      'Advertiser ID to identify the commission when ID is not provided',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  advertiserId?: string;

  @Field(() => AffiliateProviderEnum, {
    description:
      'Provider ID to identify the commission when ID is not provided',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(AffiliateProviderEnum)
  providerId?: AffiliateProviderEnum;

  @Field(() => String, {
    description:
      'Provider reference ID to identify the commission when ID is not provided',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  providerReferenceId?: string;
}

@InputType()
export class UpdateAdvertiserCommissionInput extends PartialType(
  CreateAdvertiserCommissionInput,
) {
  @Field(() => UpdateAdvertiserCommissionIdentifierInput, {
    description: 'Identifier for the advertiser commission to update',
  })
  @ValidateNested()
  @Type(() => UpdateAdvertiserCommissionIdentifierInput)
  identifier: UpdateAdvertiserCommissionIdentifierInput;

  @Field(() => [CreateCommissionRowInput], {
    description:
      'Commission rows that will completely replace all existing rows',
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCommissionRowInput)
  commissionRows?: CreateCommissionRowInput[];
}
