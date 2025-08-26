import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { CarouselStatusEnum, LanguageEnum } from '@prisma/client';
import { CarouselCtaEnum } from './carousel.model';

@InputType()
export class CreateCarouselMetadataInput {
  @Field()
  @IsString()
  imageId: string;

  @Field(() => LanguageEnum)
  @IsEnum(LanguageEnum)
  languageId: LanguageEnum;
}

@InputType()
export class CreateCarouselInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsDate()
  startDate: Date;

  @Field()
  @IsDate()
  endDate: Date;

  @Field(() => CarouselStatusEnum)
  @IsEnum(CarouselStatusEnum)
  status: CarouselStatusEnum;

  @Field(() => Int)
  @IsInt()
  sortOrder: number;

  @Field(() => CarouselCtaEnum)
  @IsEnum(CarouselCtaEnum)
  ctaType: CarouselCtaEnum;

  @ValidateIf((o) => o.ctaType === CarouselCtaEnum.Link)
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  ctaPayloadLink?: string;

  @ValidateIf((o) => o.ctaType === CarouselCtaEnum.Cashback)
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  ctaPayloadAdvertiserId?: string;

  @Field(() => [CreateCarouselMetadataInput])
  metadatas: CreateCarouselMetadataInput[];
}

@InputType()
export class UpdateCarouselInput extends PartialType(CreateCarouselInput) {}
