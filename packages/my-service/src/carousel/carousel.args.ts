import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';
import { CarouselStatusEnum } from '@prisma/client';
import { PaginationArgs } from 'src/pagination/pagination.args';

@ArgsType()
export class GetCarouselsArgs extends PaginationArgs {
  @Field({ nullable: true })
  @IsEnum(CarouselStatusEnum)
  @IsOptional()
  status?: CarouselStatusEnum;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  endDate?: Date;
}
