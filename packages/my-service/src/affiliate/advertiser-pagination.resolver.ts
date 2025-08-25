import { Args, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/auth/auth.decorator';
import { AdvertisersPagination } from './advertiser-pagination.model';
import { AdvertiserService2 } from './advertiser2.service';
import { GetAdvertisersArgs } from './advertiser.args';

@Resolver(() => AdvertisersPagination)
export class AdvertisersPaginationResolver {
  constructor(private readonly advertiserService: AdvertiserService2) {}

  @Query(() => AdvertisersPagination)
  @Public()
  async advertisersPagination(@Args() args: GetAdvertisersArgs) {
    const data = await this.advertiserService.getAdvertisersPagination({
      page: args.page,
      pageSize: args.pageSize,
      statusId: args.statusId,
      categoryIds: args.categoryIds,
      sortBy: args.sortBy,
      sortDirection: args.sortDirection,
    });

    return data;
  }
}
