import { Args, Query, Resolver } from '@nestjs/graphql';
import { CarouselsPagination } from './carousel.model';
import { CarouselService } from './carousel.service';
import { Public } from 'src/auth/auth.decorator';
import { GetCarouselsArgs } from './carousel.args';

@Resolver(() => CarouselsPagination)
export class CarouselsPaginationResolver {
  constructor(private readonly carouselService: CarouselService) {}

  @Query(() => CarouselsPagination)
  @Public()
  async carouselsPagination(@Args() args: GetCarouselsArgs) {
    const data = await this.carouselService.getCarouselsPagination({
      page: args.page,
      pageSize: args.pageSize,
      status: args.status,
      startDate: args.startDate,
      endDate: args.endDate,
    });

    return data;
  }
}
