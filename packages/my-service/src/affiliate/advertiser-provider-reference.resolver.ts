import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AllowIAM } from 'src/auth/auth.decorator';
import { AdvertiserProviderReference } from './advertiser-provider-reference.model';
import { AdvertiserProviderReferenceService } from './advertiser-provider-reference.service';
import { GetAdvertiserProviderReferencesArgs } from './advertiser-provider-reference.args';
import { UpdateAdvertiserProviderReferenceInput } from './advertiser-provider-reference.input';

@Resolver(() => AdvertiserProviderReference)
export class AdvertiserProviderReferenceResolver {
  constructor(
    private readonly advertiserProviderReferenceService: AdvertiserProviderReferenceService,
  ) {}

  @Query(() => [AdvertiserProviderReference])
  @AllowIAM()
  async advertiserProviderReferences(
    @Args() args: GetAdvertiserProviderReferencesArgs,
  ) {
    return this.advertiserProviderReferenceService.getAdvertiserProviderReferences(
      {
        advertiserId: args.advertiserId,
        providerId: args.providerId,
        isActive: args.isActive,
      },
    );
  }

  @Mutation(() => AdvertiserProviderReference, {
    description: 'Update an advertiser provider reference',
  })
  @AllowIAM()
  async updateAdvertiserProviderReference(
    @Args('input') input: UpdateAdvertiserProviderReferenceInput,
  ) {
    return this.advertiserProviderReferenceService.updateAdvertiserProviderReference(
      {
        advertiserId: input.advertiserId,
        providerId: input.providerId,
        providerReferenceId: input.providerReferenceId,
      },
    );
  }
}
