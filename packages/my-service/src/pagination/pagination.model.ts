import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Pagination {
  @Field(() => Int, { nullable: true })
  nextPage?: number;
  @Field(() => Int, { nullable: true })
  previousPage?: number;
  @Field(() => Int)
  totalPages: number;
  @Field(() => Int)
  totalItems: number;
  @Field(() => Int)
  currentPage: number;
  @Field(() => Int)
  pageSize: number;
}
