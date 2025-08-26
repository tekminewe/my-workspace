import { Inject, Injectable } from '@nestjs/common';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdvertiserCampaignDto } from './advertiser-campaign.s2s.dto';
import { CreateAdvertiserCampaignDto } from './advertiser-campaign.s2s.dto';
import { AffiliateProviderEnum } from '@prisma/client';

@Injectable()
export class AdvertiserCampaignS2SService {
  constructor(@Inject(ENHANCED_PRISMA) private readonly db: PrismaService) {}

  async getAdvertiserCampaignByProvider({
    providerId,
    providerReferenceId,
  }: {
    providerId: AffiliateProviderEnum;
    providerReferenceId: string;
  }) {
    const result = await this.db.advertiserCampaign.findFirst({
      where: {
        providerId,
        providerReferenceId,
      },
    });

    return result !== null ? new AdvertiserCampaignDto(result) : null;
  }

  async createAdvertiserCampaign(data: CreateAdvertiserCampaignDto) {
    const result = await this.db.advertiserCampaign.create({
      data: {
        ...data,
        metadatas: {
          createMany: {
            data: data.metadatas.map((metadata) => ({
              name: metadata.name,
              description: metadata.description,
              languageId: metadata.languageId,
              ...(metadata.bannerFilePath && {
                banner: {
                  create: {
                    filePath: metadata.bannerFilePath,
                    mimeType: metadata.bannerFileMimeType,
                  },
                },
              }),
            })),
          },
        },
      },
    });

    return new AdvertiserCampaignDto(result);
  }

  // async updateAdvertiserCampaign(
  //   id: string,
  //   data: UpdateAdvertiserCampaignDto,
  // ) {
  //   const result = await this.db.advertiserCampaign.update({
  //     where: { id },
  //     data: {
  //       ...data,
  //       metadatas: {
  //         upsert: data.metadatas.map((metadata) => ({
  //           where: {
  //             advertiserCampaignId_languageId: {
  //               advertiserCampaignId: id,
  //               languageId: metadata.languageId,
  //             },
  //           },
  //           update: {
  //             name: metadata.name,
  //             description: metadata.description,
  //             ...(metadata.bannerId && { bannerId: metadata.bannerId }),
  //           },
  //           create: {
  //             name: metadata.name,
  //             description: metadata.description,
  //             languageId: metadata.languageId,
  //             ...(metadata.bannerId && { bannerId: metadata.bannerId }),
  //           },
  //         })),
  //       },
  //     },
  //   });

  //   return new AdvertiserCampaignDto(result);
  // }

  async deleteAdvertiserCampaign(id: string) {
    const result = await this.db.advertiserCampaign.delete({
      where: { id },
    });

    return new AdvertiserCampaignDto(result);
  }
}
