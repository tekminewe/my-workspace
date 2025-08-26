import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FetchAdvertiserOutput {
  @Field(() => Boolean, {
    description: 'Indicates whether the operation was successful',
  })
  success: boolean;

  @Field(() => String, {
    description: 'The name of the advertiser that was fetched',
    nullable: true,
  })
  advertiserName?: string;

  @Field(() => String, {
    description: 'The generated slug for the advertiser',
    nullable: true,
  })
  slug?: string;

  @Field(() => String, {
    description: 'Any message returned from the operation',
    nullable: true,
  })
  message?: string;
}
