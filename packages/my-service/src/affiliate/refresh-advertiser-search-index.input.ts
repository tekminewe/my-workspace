import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class RefreshAdvertiserSearchIndexInput {
  @Field({
    nullable: true,
    description:
      'Optional specific advertiser ID to refresh. If not provided, all advertisers will be re-indexed.',
  })
  @IsString()
  @IsOptional()
  advertiserId?: string;
}
