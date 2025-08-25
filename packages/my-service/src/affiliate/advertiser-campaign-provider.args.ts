import { ArgsType, Field } from '@nestjs/graphql';
import { AffiliateProviderEnum } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

@ArgsType()
export class AdvertiserCampaignProviderArgs {
  @Field(() => AffiliateProviderEnum, {
    description: 'The provider ID of the advertiser campaign',
  })
  @IsEnum(AffiliateProviderEnum)
  providerId: AffiliateProviderEnum;

  @Field({
    description: 'The provider reference ID of the advertiser campaign',
  })
  @IsString()
  providerReferenceId: string;
}
