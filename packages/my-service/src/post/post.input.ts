import {
  Field,
  InputType,
  Int,
  ID,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { GraphQLISODateTime } from '@nestjs/graphql';
import { PostStatusEnum, PostTypeEnum } from '@prisma/client';

registerEnumType(PostTypeEnum, {
  name: 'PostTypeEnum',
});

@InputType()
export class CreatePostInput {
  @Field(() => String, { nullable: true, description: 'The title of the post' })
  title?: string;

  @Field(() => String, {
    nullable: true,
    description: 'The main content of the post',
  })
  content?: string;

  @Field(() => String, {
    nullable: true,
    description: 'URL-friendly identifier for the post',
  })
  slug?: string;

  @Field(() => ID, {
    nullable: true,
    description: 'ID of the featured image associated with the post',
  })
  featuredImageId?: string;

  @Field(() => Int, {
    nullable: true,
    description: 'Version of the editor used',
  })
  editorVersion?: number;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'The date the post was published or scheduled',
  })
  postDate?: Date;

  @Field(() => String, {
    nullable: true,
    description: 'A short summary or description of the post',
  })
  description?: string;

  @Field(() => [String], {
    nullable: true,
    description: 'List of tags associated with the post',
  })
  tags?: string[];

  @Field(() => PostTypeEnum, {
    nullable: true,
    description: 'The type of the post (e.g., blog, article)',
  })
  postTypeId?: PostTypeEnum;

  @Field(() => PostStatusEnum, {
    nullable: true,
    description: 'The status of the post (e.g., draft, published)',
  })
  statusId?: PostStatusEnum;
}

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {}
