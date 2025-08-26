import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { PostStatusEnum } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationArgs } from 'src/pagination/pagination.args';

registerEnumType(PostStatusEnum, {
  name: 'PostStatusEnum',
});

@ArgsType()
export class GetPostsArgs extends PaginationArgs {
  @Field({ nullable: true })
  @IsEnum(PostStatusEnum)
  @IsOptional()
  statusId?: PostStatusEnum;
}

@ArgsType()
export class GetPostArgs {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  slug?: string;
}
