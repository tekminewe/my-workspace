import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdvertiserCampaignService } from './advertiser-campaign.service';
import { AdvertiserCampaign } from './advertiser-campaign.model';
import { CreateAdvertiserCampaignInput } from './advertiser-campaign.input';
import { UpdateAdvertiserCampaignInput } from './update-advertiser-campaign.input';
import { AdvertiserCampaignArgs } from './advertiser-campaign.args';
import { AdvertiserCampaignsFilterArgs } from './advertiser-campaigns-filter.args';
import { AdvertiserCampaignProviderArgs } from './advertiser-campaign-provider.args';
import { AllowIAM, Public } from 'src/auth/auth.decorator';
import { Permissions } from 'src/role/role.decorator';
import { PermissionEnum } from '@prisma/client';

type AdvertiserCampaignReturnType = Omit<
  AdvertiserCampaign,
  'name' | 'banner' | 'description' | 'advertiser'
>;

@Resolver(() => AdvertiserCampaign)
export class AdvertiserCampaignResolver {
  constructor(
    private readonly advertiserCampaignService: AdvertiserCampaignService,
  ) {}

  @Mutation(() => AdvertiserCampaign, {
    name: 'createAdvertiserCampaign',
    description: 'Create a new advertiser campaign',
  })
  @AllowIAM()
  @Permissions(PermissionEnum.ManageAdvertiser)
  async createAdvertiserCampaign(
    @Args('data') campaignData: CreateAdvertiserCampaignInput,
  ): Promise<AdvertiserCampaignReturnType> {
    return this.advertiserCampaignService.createAdvertiserCampaign(
      campaignData,
    );
  }

  @Mutation(() => AdvertiserCampaign, {
    name: 'updateAdvertiserCampaign',
    description: 'Update an existing advertiser campaign',
  })
  @Permissions(PermissionEnum.ManageAdvertiser)
  async updateAdvertiserCampaign(
    @Args('data') campaignData: UpdateAdvertiserCampaignInput,
  ): Promise<AdvertiserCampaignReturnType> {
    try {
      return this.advertiserCampaignService.updateAdvertiserCampaign(
        campaignData,
      );
    } catch (error) {
      throw new Error(`Failed to update advertiser campaign: ${error.message}`);
    }
  }

  @Query(() => AdvertiserCampaign, {
    description: 'Get an advertiser campaign by ID',
    nullable: true,
  })
  @Public()
  async advertiserCampaign(
    @Args() { id }: AdvertiserCampaignArgs,
  ): Promise<AdvertiserCampaignReturnType | null> {
    return this.advertiserCampaignService.getAdvertiserCampaign({ id });
  }

  @Query(() => [AdvertiserCampaign], {
    description:
      'Get advertiser campaigns with optional filtering by status, dates (endDateGt and startDateLte) and sorting by createdAt or startDate',
  })
  @Public()
  async advertiserCampaigns(
    @Args()
    {
      advertiserId,
      advertiserSlug,
      providerReferenceId,
      providerId,
      statusId,
      endDateGt,
      startDateLte,
      sortBy,
      sortDirection,
      page,
      pageSize,
    }: AdvertiserCampaignsFilterArgs,
  ): Promise<AdvertiserCampaignReturnType[]> {
    return this.advertiserCampaignService.getAdvertiserCampaigns({
      advertiserId,
      advertiserSlug,
      providerReferenceId,
      providerId,
      statusId,
      endDateGt,
      startDateLte,
      sortBy,
      sortDirection,
      page,
      pageSize,
    });
  }

  @Query(() => AdvertiserCampaign, {
    description: 'Get an advertiser campaign by provider details',
    nullable: true,
  })
  @Public()
  async advertiserCampaignByProvider(
    @Args() { providerId, providerReferenceId }: AdvertiserCampaignProviderArgs,
  ): Promise<AdvertiserCampaignReturnType | null> {
    return this.advertiserCampaignService.getAdvertiserCampaignByProvider({
      providerId,
      providerReferenceId,
    });
  }
}
