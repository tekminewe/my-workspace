import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AdvertiserStatusEnum } from '@prisma/client';
import { Media } from 'src/media/media.model';
import { AdvertiserCommission } from './advertiser-commission.model';
import { AffiliateProvider } from './affiliate-provider.model';
import { AdvertiserProviderReference } from './advertiser-provider-reference.model';
import { AdvertiserMetadata } from './advertiser-metadata.model';
import { AdvertiserCategory } from './advertiser-category.model';

registerEnumType(AdvertiserStatusEnum, {
  name: 'AdvertiserStatusEnum',
});

@ObjectType({
  description: 'Advertiser entity',
})
export class Advertiser {
  @Field({
    description: 'Unique identifier for the advertiser',
  })
  id: string;

  @Field({
    description: 'Name of the advertiser',
  })
  name: string;

  @Field({
    description: 'URL-friendly slug for the advertiser',
  })
  slug: string;

  @Field({
    description: 'ID of the advertiser logo media',
  })
  logoId: string;

  @Field(() => Media, {
    description: 'Logo media for the advertiser',
  })
  logo: Media;

  @Field(() => [AdvertiserMetadata], {
    nullable: true,
    description: 'Metadata for the advertiser in different languages',
  })
  metadatas?: AdvertiserMetadata[];

  @Field({
    description: 'Description of the advertiser',
  })
  description: string;

  @Field(() => AdvertiserStatusEnum, {
    description: 'Status of the advertiser (Active/Inactive)',
  })
  statusId: AdvertiserStatusEnum;

  @Field(() => AdvertiserCommission, {
    nullable: true,
    description: 'Primary commission information for the advertiser',
  })
  commission?: AdvertiserCommission;

  @Field(() => [AdvertiserCommission], {
    nullable: true,
    description: 'List of all commissions for the advertiser',
  })
  commissions?: AdvertiserCommission[];

  @Field(() => [AffiliateProvider], {
    nullable: true,
    description: 'List of affiliate providers for the advertiser',
  })
  providers?: AffiliateProvider[];

  @Field(() => [AdvertiserProviderReference], {
    nullable: true,
    description: 'List of provider references for the advertiser',
  })
  providerReferences?: AdvertiserProviderReference[];

  @Field(() => [AdvertiserCategory], {
    nullable: true,
    description: 'Categories the advertiser belongs to',
  })
  categories?: AdvertiserCategory[];

  @Field({
    description: 'Date when the advertiser was created',
  })
  createdAt: Date;

  @Field({
    description: 'Date when the advertiser was last updated',
  })
  updatedAt: Date;
}

@ObjectType({
  description: 'Search result for advertisers',
})
export class SearchResultAdvertiser {
  @Field({
    description: 'Unique identifier for the advertiser',
  })
  id: string;

  @Field({
    description: 'Name of the advertiser',
  })
  name: string;

  @Field({
    description: 'URL-friendly slug for the advertiser',
  })
  slug: string;

  @Field(() => [String], {
    description: 'Categories the advertiser belongs to',
  })
  categories: string[];

  @Field({
    description: 'Commission value for the advertiser',
  })
  commission: number;

  @Field({
    description: 'Calculated commission value after applying share',
  })
  calculatedCommission: number;

  @Field({
    description: 'URL for the advertiser logo',
  })
  logo: string;
}
