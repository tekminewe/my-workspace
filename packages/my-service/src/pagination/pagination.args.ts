import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  page: number = 1;

  @Field(() => Int)
  pageSize: number = 10;
}
