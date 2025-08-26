import { Query, Resolver } from '@nestjs/graphql';
import {
  AdvertiserCategory,
  AdvertiserCategoryWithCount,
} from './advertiser-category.model';
import { AuthService } from 'src/auth/auth.service';
import { AdvertiserService2 } from './advertiser2.service';
import { Public } from 'src/auth/auth.decorator';

@Resolver(() => AdvertiserCategory)
export class AdvertiserCategoryResolver {
  constructor(
    private readonly advertiserService: AdvertiserService2,
    private readonly authService: AuthService,
  ) {}

  @Query(() => [AdvertiserCategory], {
    description: 'Get all available advertiser categories',
  })
  @Public()
  async advertiserCategories() {
    const language = await this.authService.getAcceptLanguage();
    return this.advertiserService.getAllCategories(language);
  }

  @Query(() => [AdvertiserCategoryWithCount], {
    description: 'Get all advertiser categories with active advertiser counts',
  })
  @Public()
  async advertiserCategoriesWithCounts() {
    const language = await this.authService.getAcceptLanguage();
    return this.advertiserService.getAllCategoriesWithCounts(language);
  }
}
