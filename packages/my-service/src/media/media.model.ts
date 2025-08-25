import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Media {
  @Field(() => String, { description: 'Unique identifier for the media' })
  id: string;

  @Field(() => String, { description: 'Publicly accessible URL to the media' })
  url: string;

  @Field(() => String, {
    nullable: true,
    description: 'Optional caption for the media',
  })
  caption?: string;

  @Field(() => String, { nullable: true, description: 'File mime type' })
  mimeType?: string;

  @Field(() => Date, {
    nullable: true,
    description: 'When the media was created',
  })
  createdAt?: Date;
}
