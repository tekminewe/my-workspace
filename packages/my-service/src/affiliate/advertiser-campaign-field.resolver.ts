import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { AdvertiserCampaign } from './advertiser-campaign.model';
import { AuthService } from 'src/auth/auth.service';
import { Media } from 'src/media/media.model';
import { Advertiser } from './advertiser.model';
import { AdvertiserService2 } from './advertiser2.service';

@Resolver(() => AdvertiserCampaign)
export class AdvertiserCampaignFieldResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly advertiserService: AdvertiserService2,
  ) {}

  @ResolveField('name', () => String)
  async name(@Parent() campaign: AdvertiserCampaign): Promise<string> {
    // Get the current language from the auth service
    const currentLanguage = await this.authService.getAcceptLanguage();

    // Find the metadata that matches the current language
    const metadata = campaign.metadatas?.find(
      (m) => m.languageId === currentLanguage,
    );

    // If metadata exists for the current language, return its name
    if (metadata) {
      return metadata.name;
    }

    return '';
  }

  @ResolveField('description', () => String, { nullable: true })
  async description(
    @Parent() campaign: AdvertiserCampaign,
  ): Promise<string | null> {
    // Get the current language from the auth service
    const currentLanguage = await this.authService.getAcceptLanguage();

    // Find the metadata that matches the current language
    const metadata = campaign.metadatas?.find(
      (m) => m.languageId === currentLanguage,
    );

    // If metadata exists for the current language, return its description
    if (metadata) {
      return metadata.description;
    }

    return '';
  }

  @ResolveField('banner', () => Media, { nullable: true })
  async banner(@Parent() campaign: AdvertiserCampaign): Promise<Media | null> {
    // Get the current language from the auth service
    const currentLanguage = await this.authService.getAcceptLanguage();

    // Find the metadata that matches the current language
    const metadata = campaign.metadatas?.find(
      (m) => m.languageId === currentLanguage,
    );

    // If metadata exists for the current language, return its logo
    if (metadata && metadata.banner) {
      return metadata.banner;
    }

    return null;
  }

  @ResolveField('advertiser', () => Advertiser)
  async advertiser(@Parent() advertiserCampaign: AdvertiserCampaign) {
    const language = await this.authService.getAcceptLanguage();
    return this.advertiserService.getAdvertiser({
      advertiserId: advertiserCampaign.advertiserId,
      language,
    });
  }
}
