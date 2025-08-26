import { Field, InputType, PartialType } from '@nestjs/graphql';
import {
  AdvertiserStatusEnum,
  LanguageEnum,
  AdvertiserCategoryEnum,
} from '@prisma/client';
import {
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateAdvertiserInput {
  @Field(() => AdvertiserStatusEnum)
  @IsEnum(AdvertiserStatusEnum)
  statusId: AdvertiserStatusEnum;
}

@InputType()
export class UpdateAdvertiserMetadataInput {
  @Field(() => LanguageEnum, {
    description: 'Language ID of the metadata',
  })
  @IsEnum(LanguageEnum)
  languageId: LanguageEnum;

  @Field(() => String, {
    description: 'Name of the advertiser in the specified language',
  })
  @IsString()
  name: string;
}

@InputType()
export class UpdateAdvertiserInput extends PartialType(CreateAdvertiserInput) {
  @Field(() => String, {
    description: 'The unique slug for the advertiser',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @Field(() => [UpdateAdvertiserMetadataInput], {
    description: 'The advertiser metadata to update in different languages',
    nullable: true,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateAdvertiserMetadataInput)
  metadatas?: UpdateAdvertiserMetadataInput[];

  @Field(() => [AdvertiserCategoryEnum], {
    description: 'The category IDs to assign to the advertiser',
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(AdvertiserCategoryEnum, { each: true })
  categoryIds?: AdvertiserCategoryEnum[];
}
