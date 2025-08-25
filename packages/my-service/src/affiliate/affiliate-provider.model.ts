import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  AffiliateProviderEnum,
  AffiliateProviderStatusEnum,
} from '@prisma/client';

registerEnumType(AffiliateProviderEnum, {
  name: 'AffiliateProviderEnum',
});

registerEnumType(AffiliateProviderStatusEnum, {
  name: 'AffiliateProviderStatusEnum',
});

@ObjectType({
  description: 'Affiliate provider entity',
})
export class AffiliateProvider {
  @Field(() => AffiliateProviderEnum, {
    description: 'Unique identifier for the affiliate provider',
  })
  id: AffiliateProviderEnum;

  @Field({
    description: 'Name of the affiliate provider',
  })
  name: string;

  @Field(() => AffiliateProviderStatusEnum, {
    description: 'Status of the affiliate provider (Active/Inactive)',
  })
  statusId: AffiliateProviderStatusEnum;

  @Field({
    description: 'Date when the affiliate provider was created',
  })
  createdAt: Date;

  @Field({
    description: 'Date when the affiliate provider was last updated',
  })
  updatedAt: Date;
}
