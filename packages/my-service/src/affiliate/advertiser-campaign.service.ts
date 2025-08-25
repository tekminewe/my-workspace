import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  AdvertiserCampaignStatusEnum,
  AffiliateProviderEnum,
} from '@prisma/client';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PaginationDto } from 'src/pagination/pagination.dto';
import { PaginatedParamsType } from 'src/pagination/pagination.types';
import { CreateAdvertiserCampaignInput } from './advertiser-campaign.input';
import { UpdateAdvertiserCampaignInput } from './update-advertiser-campaign.input';
import { SortByField, SortDirection } from './sort.args';

@Injectable()
export class AdvertiserCampaignService {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly prisma: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async createAdvertiserCampaign({
    metadatas,
    ...campaignData
  }: CreateAdvertiserCampaignInput) {
    const campaign = await this.prisma.advertiserCampaign.create({
      data: {
        ...campaignData,
        metadatas: {
          create: metadatas.map((metadata) => ({
            languageId: metadata.languageId,
            name: metadata.name,
            description: metadata.description,
            // If bannerId is provided, connect to an existing Banner entity using its ID
            ...(metadata.bannerId
              ? { banner: { connect: { id: metadata.bannerId } } }
              : {}),
          })),
        },
      },
      include: {
        metadatas: {
          include: {
            banner: true,
          },
        },
      },
    });

    // Transform the data to match our GraphQL model
    const transformedCampaign = {
      ...campaign,
      metadatas: campaign.metadatas.map((metadata) => ({
        ...metadata,
        // Transform banner if it exists
        ...(metadata.banner
          ? {
              banner: {
                ...metadata.banner,
                url: `${process.env.MEDIA_URL}/${metadata.banner.filePath}`,
              },
            }
          : null),
      })),
    };

    return transformedCampaign;
  }

  async getAdvertiserCampaign({ id }: { id: string }) {
    const campaign = await this.prisma.advertiserCampaign.findUnique({
      where: { id },
      include: {
        metadatas: {
          include: {
            banner: true,
          },
        },
      },
    });

    if (!campaign) {
      return null;
    }

    // Transform the data to match our GraphQL model
    const transformedCampaign = {
      ...campaign,
      metadatas: campaign.metadatas.map((metadata) => ({
        ...metadata,
        // Transform banner if it exists
        ...(metadata.banner
          ? {
              banner: {
                ...metadata.banner,
                url: `${process.env.MEDIA_URL}/${metadata.banner.filePath}`,
              },
            }
          : null),
      })),
    };

    return transformedCampaign;
  }

  async getAdvertiserCampaigns({
    advertiserId,
    advertiserSlug,
    providerReferenceId,
    providerId,
    statusId,
    endDateGt,
    startDateLte,
    sortBy = SortByField.CreatedAt,
    sortDirection = SortDirection.Desc,
    page,
    pageSize,
  }: {
    advertiserId?: string;
    advertiserSlug?: string;
    providerReferenceId?: string;
    providerId?: AffiliateProviderEnum;
    statusId?: AdvertiserCampaignStatusEnum;
    endDateGt?: Date;
    startDateLte?: Date;
    sortBy?: SortByField;
    sortDirection?: SortDirection;
    page?: number;
    pageSize?: number;
  }) {
    // Build the where clause based on provided filters
    const where: Prisma.AdvertiserCampaignWhereInput = {};
    if (advertiserId) where.advertiserId = advertiserId;
    if (advertiserSlug) {
      where.advertiser = {
        slug: advertiserSlug,
      };
    }
    if (providerReferenceId) where.providerReferenceId = providerReferenceId;
    if (providerId) where.providerId = providerId;
    if (statusId) where.statusId = statusId;

    // Filter by endDate if specified
    if (endDateGt) {
      where.OR = [{ endDate: { gt: endDateGt } }, { endDate: null }];
    }

    // Filter by startDate if specified
    if (startDateLte) {
      where.startDate = {
        lte: startDateLte,
      };
    }

    // Build orderBy object for sorting
    const orderBy: Record<string, 'asc' | 'desc'> = {};

    if (sortBy === SortByField.CreatedAt) {
      orderBy.createdAt = sortDirection === SortDirection.Desc ? 'desc' : 'asc';
    } else if (sortBy === SortByField.StartDate) {
      orderBy.startDate = sortDirection === SortDirection.Desc ? 'desc' : 'asc';
    }

    // Get pagination parameters
    const paginationParams = this.paginationService.getPaginationCriteria({
      page,
      pageSize,
    });

    const campaigns = await this.prisma.advertiserCampaign.findMany({
      ...paginationParams,
      where,
      orderBy,
      include: {
        metadatas: {
          include: {
            banner: true,
          },
        },
      },
    });

    // Transform the data to match our GraphQL model
    return campaigns.map((campaign) => ({
      ...campaign,
      metadatas: campaign.metadatas.map((metadata) => ({
        ...metadata,
        // Transform banner if it exists
        ...(metadata.banner
          ? {
              banner: {
                ...metadata.banner,
                url: `${process.env.MEDIA_URL}/${metadata.banner.filePath}`,
              },
            }
          : null),
      })),
    }));
  }

  async getAdvertiserCampaignByProvider({
    providerId,
    providerReferenceId,
  }: {
    providerId: AffiliateProviderEnum;
    providerReferenceId: string;
  }) {
    const campaign = await this.prisma.advertiserCampaign.findFirst({
      where: {
        providerId,
        providerReferenceId,
      },
      include: {
        metadatas: {
          include: {
            banner: true,
          },
        },
      },
    });

    if (!campaign) {
      return null;
    }

    // Transform the data to match our GraphQL model
    const transformedCampaign = {
      ...campaign,
      metadatas: campaign.metadatas.map((metadata) => ({
        ...metadata,
        // Transform banner if it exists
        ...(metadata.banner
          ? {
              banner: {
                ...metadata.banner,
                url: `${process.env.MEDIA_URL}/${metadata.banner.filePath}`,
              },
            }
          : null),
      })),
    };

    return transformedCampaign;
  }

  async getAdvertiserCampaignsPagination({
    page,
    pageSize,
    advertiserId,
    providerReferenceId,
    providerId,
    statusId,
    endDateGt,
    startDateLte,
  }: PaginatedParamsType & {
    advertiserId?: string;
    providerReferenceId?: string;
    providerId?: AffiliateProviderEnum;
    statusId?: AdvertiserCampaignStatusEnum;
    endDateGt?: Date;
    startDateLte?: Date;
  }) {
    // Build the where clause based on provided filters
    const where: any = {};
    if (advertiserId) where.advertiserId = advertiserId;
    if (providerReferenceId) where.providerReferenceId = providerReferenceId;
    if (providerId) where.providerId = providerId;
    if (statusId) where.statusId = statusId;

    // Filter by endDate if specified
    if (endDateGt) {
      where.OR = [{ endDate: { gt: endDateGt } }, { endDate: null }];
    }

    // Filter by startDate if specified
    if (startDateLte) {
      where.startDate = {
        lte: startDateLte,
      };
    }

    const totalCount = await this.prisma.advertiserCampaign.count({
      where,
    });

    return new PaginationDto(totalCount, page || 1, pageSize || 10);
  }

  async updateAdvertiserCampaign({
    id,
    metadatas,
    ...campaignData
  }: UpdateAdvertiserCampaignInput) {
    // First check if the campaign exists
    const existingCampaign = await this.prisma.advertiserCampaign.findUnique({
      where: { id },
      include: {
        metadatas: {
          include: {
            banner: true,
          },
        },
      },
    });

    if (!existingCampaign) {
      throw new Error(`Advertiser campaign with ID ${id} not found`);
    }

    // Update the campaign basic data first (without touching metadatas)
    const updatedCampaign = await this.prisma.advertiserCampaign.update({
      where: { id },
      data: campaignData,
      include: {
        metadatas: {
          include: {
            banner: true,
          },
        },
      },
    });

    // Handle metadatas if provided
    if (metadatas?.length) {
      // Process each metadata using upsert - this will update if exists or create if not
      for (const metadata of metadatas) {
        await this.prisma.advertiserCampaignMetadata.upsert({
          where: {
            advertiserCampaignId_languageId: {
              advertiserCampaignId: id,
              languageId: metadata.languageId,
            },
          },
          update: {
            name: metadata.name,
            description: metadata.description,
            ...(metadata.bannerId
              ? { banner: { connect: { id: metadata.bannerId } } }
              : {}),
          },
          create: {
            advertiserCampaign: { connect: { id } },
            languageId: metadata.languageId,
            name: metadata.name,
            description: metadata.description,
            ...(metadata.bannerId
              ? { banner: { connect: { id: metadata.bannerId } } }
              : {}),
          },
        });
      }

      // Fetch the latest data with updated metadatas
      const freshCampaign = await this.prisma.advertiserCampaign.findUnique({
        where: { id },
        include: {
          metadatas: {
            include: {
              banner: true,
            },
          },
        },
      });

      // Transform the data
      const transformedCampaign = {
        ...freshCampaign,
        metadatas: freshCampaign.metadatas.map((metadata) => ({
          ...metadata,
          ...(metadata.banner
            ? {
                banner: {
                  ...metadata.banner,
                  url: `${process.env.MEDIA_URL}/${metadata.banner.filePath}`,
                },
              }
            : null),
        })),
      };

      return transformedCampaign;
    }

    // If no metadatas provided, just transform and return the updated campaign
    const transformedCampaign = {
      ...updatedCampaign,
      metadatas: updatedCampaign.metadatas.map((metadata) => ({
        ...metadata,
        ...(metadata.banner
          ? {
              banner: {
                ...metadata.banner,
                url: `${process.env.MEDIA_URL}/${metadata.banner.filePath}`,
              },
            }
          : null),
      })),
    };

    return transformedCampaign;
  }
}
