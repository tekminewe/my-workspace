import {
  createUnionType,
  Field,
  Float,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CarouselStatusEnum, LanguageEnum } from '@prisma/client';
import { Media } from 'src/media/media.model';
import { Pagination } from 'src/pagination/pagination.model';
import { Type } from '@nestjs/common';

export enum CarouselCtaEnum {
  Link = 'Link',
  Cashback = 'Cashback',
}

registerEnumType(CarouselStatusEnum, {
  name: 'CarouselStatusEnum',
});

registerEnumType(CarouselCtaEnum, {
  name: 'CarouselCtaEnum',
});

registerEnumType(LanguageEnum, {
  name: 'LanguageEnum',
});

interface ICarouselCta<T> {
  type: CarouselCtaEnum;
  payload: T;
}

function CarouselCtaClass<T>(type: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class CarouselCta implements ICarouselCta<T> {
    @Field(() => CarouselCtaEnum)
    type: CarouselCtaEnum;

    @Field(() => type)
    payload: T;
  }

  return CarouselCta as Type<ICarouselCta<T>>;
}

@ObjectType()
class CarouselCtaLinkPayload {
  @Field(() => String)
  link: string;
}

@ObjectType()
class CarouselCtaCashbackPayload {
  @Field(() => String)
  advertiserId: string;

  @Field(() => String)
  advertiserSlug: string;

  @Field(() => String)
  advertiserRedirectUrl: string;

  @Field(() => Float)
  advertiserCashbackRate: number;

  @Field(() => String)
  advertiserName: string;

  @Field(() => String)
  advertiserLogoUrl: string;
}

@ObjectType()
class CarouselCtaLink extends CarouselCtaClass(CarouselCtaLinkPayload) {}
@ObjectType()
class CarouselCtaCashback extends CarouselCtaClass(
  CarouselCtaCashbackPayload,
) {}

const CarouselCta = createUnionType({
  name: 'CarouselCta',
  types: () => [CarouselCtaLink, CarouselCtaCashback] as const,
  resolveType(value) {
    if (value.type === CarouselCtaEnum.Link) {
      return CarouselCtaLink;
    }
    if (value.type === CarouselCtaEnum.Cashback) {
      return CarouselCtaCashback;
    }
    return null;
  },
});

@ObjectType()
export class Carousel {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field(() => Media)
  image: Media;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field(() => CarouselStatusEnum)
  status: CarouselStatusEnum;

  @Field(() => String)
  sortOrder: number;

  @Field(() => CarouselCta)
  cta: typeof CarouselCta;

  @Field(() => [CarouselMetada])
  metadatas: CarouselMetada[];
}

@ObjectType()
export class CarouselMetada {
  @Field()
  id: string;

  @Field(() => LanguageEnum)
  languageId: LanguageEnum;

  @Field(() => Media)
  image: Media;
}

@ObjectType()
export class CarouselsPagination extends Pagination {}
