import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Field, ArgsType, registerEnumType } from '@nestjs/graphql';
import {
  AdvertiserCommissionRowStatusEnum,
  AdvertiserCommissionStatusEnum,
  AdvertiserStatusEnum,
  AdvertiserCategoryEnum,
} from '@prisma/client';
import { PaginationArgs } from 'src/pagination/pagination.args';
import { SortByField, SortDirection } from './sort.args';

registerEnumType(AdvertiserStatusEnum, {
  name: 'AdvertiserStatusEnum',
});

registerEnumType(AdvertiserCommissionStatusEnum, {
  name: 'AdvertiserCommissionStatusEnum',
});

registerEnumType(AdvertiserCommissionRowStatusEnum, {
  name: 'AdvertiserCommissionRowStatusEnum',
});

registerEnumType(AdvertiserCategoryEnum, {
  name: 'AdvertiserCategoryEnum',
});

@ArgsType()
export class GetAdvertisersArgs extends PaginationArgs {
  @Field({ nullable: true })
  @IsEnum(AdvertiserStatusEnum)
  @IsOptional()
  statusId?: AdvertiserStatusEnum;

  @Field(() => [AdvertiserCategoryEnum], {
    nullable: true,
    description: 'Filter advertisers by categories',
  })
  @IsEnum(AdvertiserCategoryEnum, { each: true })
  @IsOptional()
  categoryIds?: AdvertiserCategoryEnum[];

  @Field(() => SortByField, {
    nullable: true,
    description: 'Field to sort by. Default is CreatedAt.',
  })
  @IsEnum(SortByField)
  @IsOptional()
  sortBy?: SortByField;

  @Field(() => SortDirection, {
    nullable: true,
    description: 'Direction to sort. Default is Desc.',
  })
  @IsEnum(SortDirection)
  @IsOptional()
  sortDirection?: SortDirection;
}

@ArgsType()
export class GetAdvertiserArgs {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  advertiserId?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  slug?: string;
}

@ArgsType()
export class SearchAdvertisersArgs {
  @Field({ nullable: true })
  @IsOptional()
  query: string;
}

@ArgsType()
export class AdvertiserCommissionArgs {
  @Field(() => AdvertiserCommissionRowStatusEnum, {
    nullable: true,
    description:
      'Filter commissions by row status. If not provided, returns active commissions.',
  })
  @IsEnum(AdvertiserCommissionRowStatusEnum)
  @IsOptional()
  rowStatusId?: AdvertiserCommissionRowStatusEnum;

  @Field(() => AdvertiserCommissionStatusEnum, {
    nullable: true,
    description:
      'Filter commissions by status. If not provided, returns active commissions.',
  })
  @IsEnum(AdvertiserCommissionStatusEnum)
  @IsOptional()
  statusId?: AdvertiserCommissionStatusEnum;
}
