import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RefreshAdvertiserSearchIndexOutput {
  @Field({ description: 'Indicates whether the operation was successful' })
  success: boolean;
}
