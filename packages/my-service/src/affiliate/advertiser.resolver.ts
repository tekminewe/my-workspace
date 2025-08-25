import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Advertiser, SearchResultAdvertiser } from './advertiser.model';
import { AuthService } from 'src/auth/auth.service';
import { AdvertiserService2 } from './advertiser2.service';
import {
  AdvertiserCommissionArgs,
  GetAdvertiserArgs,
  GetAdvertisersArgs,
  SearchAdvertisersArgs,
} from './advertiser.args';
import { Media } from 'src/media/media.model';
import { MediaService } from 'src/media/media.service';
import { SearchService } from 'src/search/search.service';
import { AdvertiserIndexObject } from './advertiser.types';
import { AllowIAM, Public } from 'src/auth/auth.decorator';
import { PermissionEnum } from '@prisma/client';
import { Permissions } from 'src/role/role.decorator';
import { UpdateAdvertiserInput } from './advertiser.input';
import { RefreshAdvertiserSearchIndexInput } from './refresh-advertiser-search-index.input';
import { RefreshAdvertiserSearchIndexOutput } from './refresh-advertiser-search-index.output';
import { AdvertiserCommission } from './advertiser-commission.model';
import { AffiliateProvider } from './affiliate-provider.model';
import { AdvertiserProviderReference } from './advertiser-provider-reference.model';
import { CreateAdvertiserInput } from './create-advertiser.input';
import { FetchAdvertiserInput } from './fetch-advertiser.input';
import { FetchAdvertiserOutput } from './fetch-advertiser.output';
import { AdvertiserLambdaService } from './advertiser-lambda.service';
import { AdvertiserMetadata } from './advertiser-metadata.model';
import { AdvertiserCategory } from './advertiser-category.model';

@Resolver(() => Advertiser)
export class AdvertiserResolver {
  constructor(
    private readonly advertiserService: AdvertiserService2,
    private readonly authService: AuthService,
    private readonly mediaService: MediaService,
    private readonly searchService: SearchService,
    private readonly advertiserLambdaService: AdvertiserLambdaService,
  ) {}

  @Query(() => Advertiser)
  @Public()
  async advertiser(@Args() args: GetAdvertiserArgs) {
    if (!args.advertiserId && !args.slug) {
      throw new Error('Either advertiserId or slug must be provided');
    }

    const language = await this.authService.getAcceptLanguage();
    const advertiser = await this.advertiserService.getAdvertiser({
      advertiserId: args.advertiserId,
      slug: args.slug,
      language,
    });
    return advertiser;
  }

  @Mutation(() => Advertiser, {
    description: 'Create a new advertiser with provider references',
  })
  @Permissions(PermissionEnum.ManageAdvertiser)
  @AllowIAM()
  async createAdvertiser(@Args('data') data: CreateAdvertiserInput) {
    const language = await this.authService.getAcceptLanguage();
    return this.advertiserService.createAdvertiser(data, language);
  }

  @Mutation(() => Advertiser)
  @Permissions(PermissionEnum.ManageAdvertiser)
  @AllowIAM()
  async updateAdvertiser(
    @Args('id') id: string,
    @Args('data') data: UpdateAdvertiserInput,
  ) {
    const language = await this.authService.getAcceptLanguage();
    return this.advertiserService.updateAdvertiser(id, data, language);
  }

  @Mutation(() => RefreshAdvertiserSearchIndexOutput, {
    description:
      'Refreshes the advertiser search index. If no advertiserId is provided, all active advertisers will be re-indexed.',
  })
  @Permissions(PermissionEnum.ManageAdvertiser)
  async refreshAdvertiserSearchIndex(
    @Args('data') data: RefreshAdvertiserSearchIndexInput,
  ): Promise<RefreshAdvertiserSearchIndexOutput> {
    try {
      const result = await this.advertiserService.refreshAdvertiserSearchIndex({
        advertiserId: data.advertiserId,
      });

      return result;
    } catch (error) {
      throw new Error(
        `Failed to refresh advertiser search index: ${error.message}`,
      );
    }
  }

  @Query(() => [Advertiser])
  @Public()
  async advertisers(@Args() args: GetAdvertisersArgs) {
    const language = await this.authService.getAcceptLanguage();
    return this.advertiserService.getAdvertisers({
      statusId: args.statusId,
      categoryIds: args.categoryIds,
      language,
      page: args.page,
      pageSize: args.pageSize,
      sortBy: args.sortBy,
      sortDirection: args.sortDirection,
    });
  }

  @Public()
  @Query(() => [SearchResultAdvertiser])
  async searchAdvertisers(@Args() args: SearchAdvertisersArgs) {
    const language = await this.authService.getAcceptLanguage();
    const hits = await this.searchService.searchObjects<AdvertiserIndexObject>({
      indexName: process.env.ADVERTISERS_SEARCH_INDEX_NAME,
      query: args.query,
    });

    const advertisers: SearchResultAdvertiser[] = hits.map((hit) => {
      return {
        ...hit,
        id: hit.objectID,
        name: hit.name.find((name) => name.languageId === language).name,
        categories: hit.categories
          .filter((category) => category.languageId === language)
          .map((category) => category.name),
      };
    });

    return advertisers;
  }

  @ResolveField('logo', () => Media)
  async logo(@Parent() advertiser: Advertiser) {
    const { logoId } = advertiser;
    const image = await this.mediaService.getMediaById(logoId);

    return {
      ...image,
      url: `${process.env.MEDIA_URL}/${image.filePath}`,
    };
  }

  @ResolveField('metadatas', () => [AdvertiserMetadata], {
    description: 'Get all metadatas for the advertiser in different languages',
  })
  async metadatas(@Parent() advertiser: Advertiser) {
    // If metadatas are already loaded, return them
    if (advertiser.metadatas) {
      return advertiser.metadatas;
    }

    // Otherwise fetch them from the database
    const { id } = advertiser;
    return this.advertiserService.getAdvertiserMetadatas(id);
  }

  @ResolveField('commission', () => AdvertiserCommission, {
    description:
      'Get commission information for the advertiser. Can filter to active commissions only.',
  })
  async commission(
    @Parent() advertiser: Advertiser,
    @Args() args: AdvertiserCommissionArgs,
  ) {
    const language = await this.authService.getAcceptLanguage();
    const { id } = advertiser;
    const commission = await this.advertiserService.getAdvertiserCommission({
      advertiserId: id,
      language,
      rowStatusId: args.rowStatusId,
      statusId: args.statusId,
    });

    return commission;
  }

  @ResolveField('commissions', () => [AdvertiserCommission], {
    description:
      'Get all commissions for the advertiser. Can filter to active commissions only.',
  })
  async commissions(
    @Parent() advertiser: Advertiser,
    @Args() args: AdvertiserCommissionArgs,
  ) {
    const { id } = advertiser;

    return this.advertiserService.getAdvertiserCommissions({
      advertiserId: id,
      rowStatusId: args.rowStatusId,
      statusId: args.statusId,
    });
  }

  @ResolveField('providers', () => [AffiliateProvider], {
    description: 'Get all affiliate providers for the advertiser.',
  })
  async providers(@Parent() advertiser: Advertiser) {
    // If providers are already loaded, return them
    if (advertiser.providers) {
      return advertiser.providers;
    }

    // Otherwise fetch them from the database
    const { id } = advertiser;
    return this.advertiserService.getAdvertiserProviders(id);
  }

  @ResolveField('providerReferences', () => [AdvertiserProviderReference], {
    description: 'Get all provider references for the advertiser.',
  })
  async providerReferences(@Parent() advertiser: Advertiser) {
    // If providerReferences are already loaded, return them
    if (advertiser.providerReferences) {
      return advertiser.providerReferences;
    }

    // Otherwise fetch them from the database
    const { id } = advertiser;
    return this.advertiserService.getAdvertiserProviderReferences(id);
  }

  @ResolveField('categories', () => [AdvertiserCategory], {
    description: 'Get all categories for the advertiser',
  })
  async categories(@Parent() advertiser: Advertiser) {
    // If categories are already loaded, return them
    if (advertiser.categories) {
      return advertiser.categories;
    }

    // Otherwise fetch them from the database
    const { id } = advertiser;
    const language = await this.authService.getAcceptLanguage();
    return this.advertiserService.getAdvertiserCategories(id, language);
  }

  @Mutation(() => FetchAdvertiserOutput, {
    description:
      'Fetch an advertiser from the provider API by name and trigger AWS Lambda function',
  })
  @Permissions(PermissionEnum.ManageAdvertiser)
  @AllowIAM()
  async fetchAdvertiser(
    @Args('data') data: FetchAdvertiserInput,
  ): Promise<FetchAdvertiserOutput> {
    try {
      return this.advertiserLambdaService.triggerFetchAdvertiser(data.name);
    } catch (error) {
      return {
        success: false,
        advertiserName: data.name,
        message: `Failed to fetch advertiser data: ${error.message}`,
      };
    }
  }
}
