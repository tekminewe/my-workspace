import {
  ObjectType,
  Field,
  ID,
  GraphQLISODateTime,
  Int,
  registerEnumType,
} from '@nestjs/graphql';
import { PostStatusEnum } from '@prisma/client';
import { Media } from 'src/media/media.model';
import { Pagination } from 'src/pagination/pagination.model';

registerEnumType(PostStatusEnum, {
  name: 'PostStatusEnum',
});

@ObjectType()
export class PostStatus {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}

@ObjectType()
export class PostTag {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  slug: string;

  @Field(() => String, { nullable: true })
  featuredImageId?: string;

  @Field(() => Media, { nullable: true })
  featuredImage?: Media;

  @Field(() => PostStatusEnum, { nullable: true })
  statusId?: PostStatusEnum;

  @Field(() => GraphQLISODateTime)
  postDate: Date;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => Int)
  editorVersion: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [PostTag], { nullable: true })
  tags?: PostTag[];

  @Field({ nullable: true })
  ogTitle?: string;

  @Field({ nullable: true })
  ogDescription?: string;

  @Field(() => String, { nullable: true })
  ogImageId?: string;

  @Field(() => Media, { nullable: true })
  ogImage?: Media;
}

@ObjectType()
export class PostsPagination extends Pagination {}
