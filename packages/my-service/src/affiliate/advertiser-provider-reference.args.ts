import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { AffiliateProviderEnum } from '@prisma/client';

@ArgsType()
export class GetAdvertiserProviderReferencesArgs {
  @Field(() => String, {
    nullable: true,
    description: 'Filter by advertiser ID',
  })
  @IsOptional()
  @IsString()
  advertiserId?: string;

  @Field(() => AffiliateProviderEnum, {
    nullable: true,
    description: 'Filter by provider ID',
  })
  @IsOptional()
  providerId?: AffiliateProviderEnum;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Filter by active advertisers only',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
