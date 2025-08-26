import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AffiliateProviderEnum } from '@prisma/client';
import { Advertiser } from './advertiser.model';
import { AffiliateProvider } from './affiliate-provider.model';

registerEnumType(AffiliateProviderEnum, {
  name: 'AffiliateProviderEnum',
});

@ObjectType({
  description: 'Advertiser provider reference entity',
})
export class AdvertiserProviderReference {
  @Field({
    description: 'The advertiser ID',
  })
  advertiserId: string;

  @Field(() => AffiliateProviderEnum, {
    description: 'The affiliate provider ID',
  })
  providerId: AffiliateProviderEnum;

  @Field({
    description: 'The reference ID of the advertiser in the provider system',
  })
  providerReferenceId: string;

  @Field(() => Advertiser, {
    nullable: true,
    description: 'The advertiser',
  })
  advertiser?: Advertiser;

  @Field(() => AffiliateProvider, {
    nullable: true,
    description: 'The affiliate provider',
  })
  provider?: AffiliateProvider;
}
