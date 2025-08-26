import { Field, ObjectType } from '@nestjs/graphql';
import {
  AdvertiserCampaignStatusEnum,
  AffiliateProviderEnum,
  LanguageEnum,
} from '@prisma/client';
import { Media } from 'src/media/media.model';
import { Advertiser } from './advertiser.model';

@ObjectType()
export class AdvertiserCampaignMetadata {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Media, { nullable: true })
  banner?: Media;

  @Field(() => LanguageEnum)
  languageId: LanguageEnum;
}

@ObjectType()
export class AdvertiserCampaign {
  @Field()
  id: string;

  @Field()
  advertiserId: string;

  @Field(() => AffiliateProviderEnum)
  providerId: AffiliateProviderEnum;

  @Field()
  providerReferenceId: string;

  @Field()
  name: string;

  @Field(() => [String])
  voucherCodes: string[];

  @Field()
  startDate: Date;

  @Field({
    nullable: true,
    description:
      'The end date of the campaign, which can be null for open-ended campaigns',
  })
  endDate?: Date;

  @Field(() => AdvertiserCampaignStatusEnum)
  statusId: AdvertiserCampaignStatusEnum;

  @Field()
  url: string;

  @Field()
  slug: string;

  @Field(() => [AdvertiserCampaignMetadata])
  metadatas: AdvertiserCampaignMetadata[];

  @Field({
    description:
      'Description from the current language metadata, or null if not found',
  })
  description: string;

  @Field(() => Media, {
    nullable: true,
    description:
      'Banner from the current language metadata, or null if not found',
  })
  banner: Media | null;

  @Field(() => Advertiser)
  advertiser: Advertiser;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
