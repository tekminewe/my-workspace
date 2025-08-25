import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';
import {
  AdvertiserStatusEnum,
  AffiliateProviderEnum,
  LanguageEnum,
} from '@prisma/client';
import { CreateAdvertiserCommissionInput } from './advertiser-commission.input';

@InputType()
export class AdvertiserMetadataInput {
  @Field(() => LanguageEnum, {
    description: 'The language of the advertiser metadata',
  })
  @IsEnum(LanguageEnum)
  languageId: LanguageEnum;

  @Field({ description: 'The name of the advertiser' })
  @IsString()
  name: string;

  @Field({ description: 'The description of the advertiser' })
  @IsString()
  description: string;
}

@InputType()
export class AdvertiserProviderReferenceInput {
  @Field(() => AffiliateProviderEnum, {
    description: 'The affiliate provider ID',
  })
  @IsEnum(AffiliateProviderEnum)
  providerId: AffiliateProviderEnum;

  @Field({
    description: 'The reference ID of the advertiser in the provider system',
  })
  @IsString()
  providerReferenceId: string;
}

@InputType()
export class CreateAdvertiserInput {
  @Field({ description: 'The unique slug for the advertiser' })
  @IsString()
  slug: string;

  @Field(() => AdvertiserStatusEnum, {
    nullable: true,
    defaultValue: AdvertiserStatusEnum.Inactive,
    description: 'The status of the advertiser',
  })
  @IsEnum(AdvertiserStatusEnum)
  @IsOptional()
  statusId?: AdvertiserStatusEnum;

  @Field({ description: 'The ID of the logo media' })
  @IsString()
  logoId: string;

  @Field(() => [AdvertiserMetadataInput], {
    description: 'The advertiser metadata in different languages',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => AdvertiserMetadataInput)
  metadatas: AdvertiserMetadataInput[];

  @Field(() => [AdvertiserProviderReferenceInput], {
    description: 'The provider references for the advertiser',
    nullable: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  providerReferences?: AdvertiserProviderReferenceInput[];

  @Field(() => [CreateAdvertiserCommissionInput], {
    description: 'The commissions for the advertiser',
    nullable: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => CreateAdvertiserCommissionInput)
  commissions?: CreateAdvertiserCommissionInput[];
}
