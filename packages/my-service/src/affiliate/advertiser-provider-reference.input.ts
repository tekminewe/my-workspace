import { Field, InputType } from '@nestjs/graphql';
import { AffiliateProviderEnum } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateAdvertiserProviderReferenceInput {
  @Field(() => String, {
    description: 'The advertiser ID',
  })
  @IsNotEmpty()
  @IsString()
  advertiserId: string;

  @Field(() => AffiliateProviderEnum, {
    description: 'The affiliate provider ID',
  })
  @IsNotEmpty()
  @IsEnum(AffiliateProviderEnum)
  providerId: AffiliateProviderEnum;

  @Field(() => String, {
    description: 'The reference ID of the advertiser in the provider system',
  })
  @IsNotEmpty()
  @IsString()
  providerReferenceId: string;
}
