import { Inject, Injectable } from '@nestjs/common';
import {
  AffiliateProviderEnum,
  AdvertiserStatusEnum,
  Prisma,
} from '@prisma/client';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { PrismaService } from 'src/prisma/prisma.service';

interface GetAdvertiserProviderReferencesParams {
  advertiserId?: string;
  providerId?: AffiliateProviderEnum;
  isActive?: boolean;
}

@Injectable()
export class AdvertiserProviderReferenceService {
  constructor(@Inject(ENHANCED_PRISMA) private readonly db: PrismaService) {}

  async getAdvertiserProviderReferences({
    advertiserId,
    providerId,
    isActive,
  }: GetAdvertiserProviderReferencesParams) {
    const where: Prisma.AdvertiserProviderReferenceWhereInput = {};

    if (advertiserId) {
      where.advertiserId = advertiserId;
    }

    if (providerId) {
      where.providerId = providerId;
    }

    if (isActive !== undefined) {
      where.advertiser = {
        statusId: isActive ? AdvertiserStatusEnum.Active : undefined,
      };
    }

    const references = await this.db.advertiserProviderReference.findMany({
      where,
      include: {
        advertiser: true,
        provider: true,
      },
    });

    return references;
  }

  async updateAdvertiserProviderReference({
    advertiserId,
    providerId,
    providerReferenceId,
  }: {
    advertiserId: string;
    providerId: AffiliateProviderEnum;
    providerReferenceId: string;
  }) {
    // Check if the advertiser exists
    const advertiser = await this.db.advertiser.findUnique({
      where: { id: advertiserId },
    });

    if (!advertiser) {
      throw new Error(`Advertiser with ID ${advertiserId} not found`);
    }

    // Check if the provider exists
    const provider = await this.db.affiliateProvider.findUnique({
      where: { id: providerId },
    });

    if (!provider) {
      throw new Error(`Affiliate provider with ID ${providerId} not found`);
    }

    // Update an existing one
    const reference = await this.db.advertiserProviderReference.update({
      where: {
        advertiserId_providerId: {
          advertiserId,
          providerId,
        },
      },
      data: {
        providerReferenceId,
      },
      include: {
        advertiser: true,
        provider: true,
      },
    });

    return reference;
  }
}
