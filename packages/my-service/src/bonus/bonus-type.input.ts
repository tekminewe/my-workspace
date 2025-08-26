import { InputType, Field } from '@nestjs/graphql';
import {
  BonusTypeCodeEnum,
  BonusTypeStatusEnum,
  LanguageEnum,
} from '@prisma/client';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType({ description: 'Bonus type metadata for a specific language' })
export class BonusTypeMetadataInput {
  @Field(() => String, {
    description: 'The title of the bonus type in the specific language',
  })
  @IsString()
  title: string;

  @Field(() => String, {
    description: 'The description of the bonus type in the specific language',
  })
  @IsString()
  description: string;

  @Field(() => String, {
    description: 'The terms and conditions in the specific language',
  })
  @IsString()
  termsAndConditions: string;

  @Field(() => String, {
    description: 'The featured image ID for the specific language',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  featuredImageId?: string;

  @Field(() => String, {
    description: 'The logo ID for the specific language',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  logoId?: string;

  @Field(() => LanguageEnum, {
    description: 'The language identifier for this metadata',
  })
  @IsEnum(LanguageEnum)
  languageId: LanguageEnum;
}

@InputType()
export class CreateBonusTypeInput {
  @Field(() => BonusTypeCodeEnum)
  codeId: BonusTypeCodeEnum;

  @Field({ nullable: true })
  version?: number;

  @Field({ nullable: true })
  priority?: number;

  @Field({ nullable: true })
  expiryDays?: number;

  @Field({ nullable: true })
  maxUsagePerUser?: number;

  @Field()
  ruleConfig: string; // JSON string

  @Field(() => BonusTypeStatusEnum, {
    defaultValue: BonusTypeStatusEnum.Active,
  })
  statusId: BonusTypeStatusEnum;

  @Field({ nullable: true })
  effectiveFrom?: Date;

  @Field({ nullable: true })
  effectiveTo?: Date;

  @Field(() => [BonusTypeMetadataInput], {
    description: 'The metadata for different languages',
    nullable: true,
  })
  @ValidateNested({ each: true })
  @Type(() => BonusTypeMetadataInput)
  @IsOptional()
  metadatas?: BonusTypeMetadataInput[];
}

@InputType()
export class UpdateBonusTypeInput {
  @Field({ nullable: true })
  version?: number;

  @Field({ nullable: true })
  priority?: number;

  @Field({ nullable: true })
  expiryDays?: number;

  @Field({ nullable: true })
  maxUsagePerUser?: number;

  @Field({ nullable: true })
  ruleConfig?: string; // JSON string

  @Field(() => BonusTypeStatusEnum, { nullable: true })
  statusId?: BonusTypeStatusEnum;

  @Field({ nullable: true })
  effectiveFrom?: Date;

  @Field({ nullable: true })
  effectiveTo?: Date;

  @Field(() => [BonusTypeMetadataInput], {
    description: 'The metadata for different languages',
    nullable: true,
  })
  @ValidateNested({ each: true })
  @Type(() => BonusTypeMetadataInput)
  @IsOptional()
  metadatas?: BonusTypeMetadataInput[];
}
