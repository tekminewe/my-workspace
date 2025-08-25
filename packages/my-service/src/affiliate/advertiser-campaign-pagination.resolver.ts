import { Args, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/auth/auth.decorator';
import { AdvertiserCampaignPagination } from './advertiser-campaign-pagination.model';
import { AdvertiserCampaignService } from './advertiser-campaign.service';
import { AdvertiserCampaignsFilterArgs } from './advertiser-campaigns-filter.args';

@Resolver(() => AdvertiserCampaignPagination)
export class AdvertiserCampaignPaginationResolver {
  constructor(
    private readonly advertiserCampaignService: AdvertiserCampaignService,
  ) {}

  @Query(() => AdvertiserCampaignPagination)
  @Public()
  async advertiserCampaignsPagination(
    @Args() args: AdvertiserCampaignsFilterArgs,
  ) {
    const data =
      await this.advertiserCampaignService.getAdvertiserCampaignsPagination({
        page: args.page,
        pageSize: args.pageSize,
        advertiserId: args.advertiserId,
        providerId: args.providerId,
        providerReferenceId: args.providerReferenceId,
        statusId: args.statusId,
        endDateGt: args.endDateGt,
        startDateLte: args.startDateLte,
      });

    return data;
  }
}
