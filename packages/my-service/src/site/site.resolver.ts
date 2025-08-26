import {
  Query,
  Resolver,
  ResolveField,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { SiteService } from './site.service';
import { Site, SiteMetadata } from './site.model';
import { AuthService } from '../auth/auth.service';
import { Public } from 'src/auth/auth.decorator';
import { UpdateSiteInput } from './site.input';
import { Permissions } from 'src/role/role.decorator';
import { PermissionEnum } from '@prisma/client';

@Resolver(() => Site)
export class SiteResolver {
  constructor(
    private readonly siteService: SiteService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => Site, {
    description: 'Get the site information',
    name: 'site',
  })
  @Public()
  async site(): Promise<Site> {
    return this.siteService.getSite({
      language: await this.authService.getAcceptLanguage(),
    });
  }

  @Mutation(() => Site, {
    description: 'Update the site information and metadata',
    name: 'updateSite',
  })
  @Permissions(PermissionEnum.ManageSite)
  async updateSite(@Args('input') input: UpdateSiteInput): Promise<Site> {
    const languageId = await this.authService.getAcceptLanguage();
    return this.siteService.updateSite(input, languageId);
  }

  @ResolveField(() => [SiteMetadata], {
    description: 'Get all metadata for the site in different languages',
  })
  async metadatas(@Parent() site: Site): Promise<SiteMetadata[]> {
    return this.siteService.getSiteMetadatas(site.id);
  }
}
