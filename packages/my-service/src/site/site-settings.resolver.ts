import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { SiteService } from './site.service';
import { SiteSettings } from './site-settings.model';
import { UpdateSiteSettingsInput } from './site-settings.input';
import { Public } from 'src/auth/auth.decorator';
import { Permissions } from 'src/role/role.decorator';
import { PermissionEnum } from '@prisma/client';

@Resolver(() => SiteSettings)
export class SiteSettingsResolver {
  constructor(private readonly siteService: SiteService) {}

  @Query(() => SiteSettings, {
    description: 'Get the site settings',
    name: 'siteSettings',
    nullable: true,
  })
  @Public()
  async siteSettings(): Promise<SiteSettings | null> {
    return this.siteService.getSiteSettings();
  }

  @Mutation(() => SiteSettings, {
    description:
      'Update the site settings including logos for light and dark modes',
    name: 'updateSiteSettings',
  })
  @Permissions(PermissionEnum.ManageSite)
  async updateSiteSettings(
    @Args('input') input: UpdateSiteSettingsInput,
  ): Promise<SiteSettings> {
    return this.siteService.updateSiteSettings(input);
  }
}
