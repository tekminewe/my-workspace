import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class FetchAdvertiserInput {
  @Field(() => String, {
    description: 'The name of the advertiser to fetch from the provider API',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
