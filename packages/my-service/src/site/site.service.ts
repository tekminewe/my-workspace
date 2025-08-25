import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LanguageEnum } from '@prisma/client';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { Site } from './site.model';
import { UpdateSiteInput } from './site.input';
import { SiteSettings } from './site-settings.model';
import { UpdateSiteSettingsInput } from './site-settings.input';

@Injectable()
export class SiteService {
  constructor(@Inject(ENHANCED_PRISMA) private readonly db: PrismaService) {}

  async getSite({
    language = LanguageEnum.EN_US,
  }: {
    language?: LanguageEnum;
  }): Promise<Site> {
    const site = await this.db.site.findFirst({
      include: {
        metadatas: {
          include: {
            logo: true,
            darkLogo: true,
          },
          where: {
            languageId: language,
          },
        },
      },
    });

    const metadata = site.metadatas[0];
    return {
      id: site.id,
      name: metadata?.name,
      domain: site.domain,
      description: metadata?.description,
      logo: metadata?.logo
        ? {
            id: metadata.logo.id,
            url: `${process.env.MEDIA_URL}/${metadata.logo.filePath}`,
            caption: metadata.logo.caption,
            mimeType: metadata.logo.mimeType,
            createdAt: metadata.logo.createdAt,
          }
        : null,
      createdAt: site.createdAt,
      updatedAt: site.updatedAt,
      metadatas: [], // This will be populated by the resolver
    };
  }

  async getSiteMetadatas(siteId: string) {
    const siteMetadatas = await this.db.siteMetadata.findMany({
      where: {
        siteId,
      },
      include: {
        logo: true,
        darkLogo: true,
      },
    });

    return siteMetadatas.map((metadata) => ({
      name: metadata.name,
      description: metadata.description,
      languageId: metadata.languageId,
      logo: metadata.logo
        ? {
            id: metadata.logo.id,
            url: `${process.env.MEDIA_URL}/${metadata.logo.filePath}`,
            caption: metadata.logo.caption,
            mimeType: metadata.logo.mimeType,
            createdAt: metadata.logo.createdAt,
          }
        : null,
      darkLogo: metadata.darkLogo
        ? {
            id: metadata.darkLogo.id,
            url: `${process.env.MEDIA_URL}/${metadata.darkLogo.filePath}`,
            caption: metadata.darkLogo.caption,
            mimeType: metadata.darkLogo.mimeType,
            createdAt: metadata.darkLogo.createdAt,
          }
        : null,
    }));
  }

  async updateSite(
    input: UpdateSiteInput,
    languageId: LanguageEnum = LanguageEnum.EN_US,
  ): Promise<Site> {
    // Find the first site (assuming there's only one site in the system)
    const siteToUpdate = await this.db.site.findFirst();

    if (!siteToUpdate) {
      throw new NotFoundException('Site not found');
    }

    // Update the site with domain if provided
    const updatedSite = await this.db.site.update({
      where: {
        id: siteToUpdate.id,
      },
      data: {
        domain: input.domain || undefined,
        // Handle site metadata updates if provided
        metadatas: input.metadatas?.length
          ? {
              upsert: input.metadatas.map((metadata) => ({
                // Create or update based on the composite key [siteId, languageId]
                where: {
                  siteId_languageId: {
                    siteId: siteToUpdate.id,
                    languageId: metadata.languageId,
                  },
                },
                create: {
                  name: metadata.name,
                  description: metadata.description,
                  logoId: metadata.logoId,
                  darkLogoId: metadata.darkLogoId,
                  languageId: metadata.languageId,
                },
                update: {
                  name: metadata.name,
                  description: metadata.description,
                  logoId: metadata.logoId,
                  darkLogoId: metadata.darkLogoId,
                },
              })),
            }
          : undefined,
      },
      include: {
        metadatas: {
          include: {
            logo: true,
            darkLogo: true,
          },
          where: {
            languageId,
          },
        },
      },
    });

    const metadata = updatedSite.metadatas[0];

    return {
      id: updatedSite.id,
      name: metadata?.name,
      domain: updatedSite.domain,
      description: metadata?.description,
      logo: metadata?.logo
        ? {
            id: metadata.logo.id,
            url: `${process.env.MEDIA_URL}/${metadata.logo.filePath}`,
            caption: metadata.logo.caption,
            mimeType: metadata.logo.mimeType,
            createdAt: metadata.logo.createdAt,
          }
        : null,
      createdAt: updatedSite.createdAt,
      updatedAt: updatedSite.updatedAt,
      metadatas: [], // This will be populated by the resolver
    };
  }

  async getSiteSettings(): Promise<SiteSettings | null> {
    const site = await this.db.site.findFirst();
    if (!site) {
      return null;
    }

    const settings = await this.db.siteSettings.findUnique({
      where: { siteId: site.id },
    });

    if (!settings) {
      return null;
    }

    return {
      id: settings.id,
      createdAt: settings.createdAt,
      updatedAt: settings.updatedAt,
      siteId: settings.siteId,
      googleAnalyticsId: settings.googleAnalyticsId,
      googleTagManagerId: settings.googleTagManagerId,
      facebookPixelId: settings.facebookPixelId,
      defaultMetaTitle: settings.defaultMetaTitle,
      defaultMetaDescription: settings.defaultMetaDescription,
      sitemapUrl: settings.sitemapUrl,
      robotsTxt: settings.robotsTxt,
      facebookUrl: settings.facebookUrl,
      twitterUrl: settings.twitterUrl,
      instagramUrl: settings.instagramUrl,
      linkedinUrl: settings.linkedinUrl,
      contactEmail: settings.contactEmail,
      supportEmail: settings.supportEmail,
      phoneNumber: settings.phoneNumber,
      address: settings.address,
      maintenanceMode: settings.maintenanceMode,
      allowUserRegistration: settings.allowUserRegistration,
      enableComments: settings.enableComments,
      enableNewsletter: settings.enableNewsletter,
    };
  }

  async updateSiteSettings(
    input: UpdateSiteSettingsInput,
  ): Promise<SiteSettings> {
    // Find the first site (assuming there's only one site in the system)
    const site = await this.db.site.findFirst();
    if (!site) {
      throw new NotFoundException('Site not found');
    }

    // Update or create site settings
    const settings = await this.db.siteSettings.upsert({
      where: { siteId: site.id },
      create: {
        siteId: site.id,
        googleAnalyticsId: input.googleAnalyticsId,
        googleTagManagerId: input.googleTagManagerId,
        facebookPixelId: input.facebookPixelId,
        defaultMetaTitle: input.defaultMetaTitle,
        defaultMetaDescription: input.defaultMetaDescription,
        sitemapUrl: input.sitemapUrl,
        robotsTxt: input.robotsTxt,
        facebookUrl: input.facebookUrl,
        twitterUrl: input.twitterUrl,
        instagramUrl: input.instagramUrl,
        linkedinUrl: input.linkedinUrl,
        contactEmail: input.contactEmail,
        supportEmail: input.supportEmail,
        phoneNumber: input.phoneNumber,
        address: input.address,
        maintenanceMode: input.maintenanceMode ?? false,
        allowUserRegistration: input.allowUserRegistration ?? true,
        enableComments: input.enableComments ?? true,
        enableNewsletter: input.enableNewsletter ?? false,
      },
      update: {
        googleAnalyticsId: input.googleAnalyticsId,
        googleTagManagerId: input.googleTagManagerId,
        facebookPixelId: input.facebookPixelId,
        defaultMetaTitle: input.defaultMetaTitle,
        defaultMetaDescription: input.defaultMetaDescription,
        sitemapUrl: input.sitemapUrl,
        robotsTxt: input.robotsTxt,
        facebookUrl: input.facebookUrl,
        twitterUrl: input.twitterUrl,
        instagramUrl: input.instagramUrl,
        linkedinUrl: input.linkedinUrl,
        contactEmail: input.contactEmail,
        supportEmail: input.supportEmail,
        phoneNumber: input.phoneNumber,
        address: input.address,
        maintenanceMode: input.maintenanceMode,
        allowUserRegistration: input.allowUserRegistration,
        enableComments: input.enableComments,
        enableNewsletter: input.enableNewsletter,
      },
    });

    return {
      id: settings.id,
      createdAt: settings.createdAt,
      updatedAt: settings.updatedAt,
      siteId: settings.siteId,
      googleAnalyticsId: settings.googleAnalyticsId,
      googleTagManagerId: settings.googleTagManagerId,
      facebookPixelId: settings.facebookPixelId,
      defaultMetaTitle: settings.defaultMetaTitle,
      defaultMetaDescription: settings.defaultMetaDescription,
      sitemapUrl: settings.sitemapUrl,
      robotsTxt: settings.robotsTxt,
      facebookUrl: settings.facebookUrl,
      twitterUrl: settings.twitterUrl,
      instagramUrl: settings.instagramUrl,
      linkedinUrl: settings.linkedinUrl,
      contactEmail: settings.contactEmail,
      supportEmail: settings.supportEmail,
      phoneNumber: settings.phoneNumber,
      address: settings.address,
      maintenanceMode: settings.maintenanceMode,
      allowUserRegistration: settings.allowUserRegistration,
      enableComments: settings.enableComments,
      enableNewsletter: settings.enableNewsletter,
    };
  }
}
