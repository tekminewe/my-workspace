import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/pagination/pagination.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { PaginatedParamsType } from 'src/pagination/pagination.types';
import {
  AdvertiserCommissionStatusEnum,
  Carousel,
  CarouselStatusEnum,
  LanguageEnum,
} from '@prisma/client';
import { CreateCarouselInput, UpdateCarouselInput } from './carousel.input';
import { CarouselCtaEnum } from './carousel.model';
import { AdvertiserService } from 'src/affiliate/advertiser.service';

@Injectable()
export class CarouselService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationService: PaginationService,
    private readonly advertiserService: AdvertiserService,
  ) {}
  async getCarousel(id: string, language: LanguageEnum) {
    const carousel = await this.prisma.carousel.findUnique({
      where: {
        id,
      },
    });

    return this.getCarouselExtraInformations(carousel, language);
  }
  async getCarousels({
    page,
    pageSize,
    startDate,
    status,
    endDate,
    language,
  }: PaginatedParamsType & {
    language?: LanguageEnum;
    status?: CarouselStatusEnum;
    startDate?: Date;
    endDate?: Date;
  }) {
    const paginationParams = this.paginationService.getPaginationCriteria({
      page,
      pageSize,
    });
    const carousels = await this.prisma.carousel.findMany({
      ...paginationParams,
      where: {
        ...(status ? { status } : {}),
        ...(startDate ? { startDate: { lte: startDate } } : {}),
        ...(endDate ? { endDate: { gte: endDate } } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });

    return carousels.map((carousel) =>
      this.getCarouselExtraInformations(carousel, language),
    );
  }

  async getCarouselsPagination({
    page,
    pageSize,
    startDate,
    status,
    endDate,
  }: PaginatedParamsType & {
    language?: LanguageEnum;
    status?: CarouselStatusEnum;
    startDate?: Date;
    endDate?: Date;
  }) {
    const totalCount = await this.prisma.carousel.count({
      where: {
        ...(status ? { status } : {}),
        ...(startDate ? { startDate: { lte: startDate } } : {}),
        ...(endDate ? { endDate: { gte: endDate } } : {}),
      },
    });

    return new PaginationDto(totalCount, page, pageSize);
  }

  async getCarouselImage({
    languageId,
    carouselId,
  }: {
    languageId: LanguageEnum;
    carouselId: string;
  }) {
    const result = await this.prisma.carouselMetadata.findFirst({
      where: {
        carouselId,
        languageId,
      },
      include: {
        image: true,
      },
    });

    return result.image;
  }

  async getCarouselMetadatas({ carouselId }: { carouselId: string }) {
    const result = await this.prisma.carouselMetadata.findMany({
      where: {
        carouselId,
      },
      include: {
        image: true,
      },
    });

    return result;
  }

  async createCarousel(data: CreateCarouselInput) {
    const {
      metadatas,
      ctaType,
      ctaPayloadAdvertiserId,
      ctaPayloadLink,
      ...restData
    } = data;
    const carousel = await this.prisma.carousel.create({
      data: {
        ...restData,
        cta: {
          type: ctaType,
          payload: {
            ...(ctaPayloadLink && { link: ctaPayloadLink }),
            ...(ctaPayloadAdvertiserId && {
              advertiserId: ctaPayloadAdvertiserId,
            }),
          },
        },
        metadatas: {
          createMany: {
            data: metadatas.map((metadata) => {
              return metadata;
            }),
          },
        },
      },
    });
    return carousel;
  }

  async updateCarousel(id: string, data: UpdateCarouselInput) {
    const {
      metadatas,
      ctaType,
      ctaPayloadAdvertiserId,
      ctaPayloadLink,
      ...restData
    } = data;
    const carousel = await this.prisma.carousel.update({
      where: { id },
      data: {
        ...restData,
        cta: {
          type: ctaType,
          payload: {
            ...(ctaPayloadLink && { link: ctaPayloadLink }),
            ...(ctaPayloadAdvertiserId && {
              advertiserId: ctaPayloadAdvertiserId,
            }),
          },
        },
        metadatas: {
          upsert: metadatas.map((metadata) => {
            return {
              where: {
                carouselId_languageId: {
                  carouselId: id,
                  languageId: metadata.languageId,
                },
              },
              update: metadata,
              create: metadata,
            };
          }),
        },
      },
    });

    return carousel;
  }

  private getCarouselExtraInformations = async (
    carousel: Carousel,
    languageId: LanguageEnum,
  ) => {
    if (carousel.cta['type'] === CarouselCtaEnum.Cashback) {
      const advertiser = await this.prisma.advertiser.findUnique({
        where: {
          id: carousel.cta['payload']['advertiserId'],
        },
        include: {
          commissions: {
            where: {
              statusId: AdvertiserCommissionStatusEnum.Active,
            },
            include: {
              commissionRows: {
                include: {
                  metadatas: {
                    where: {
                      languageId,
                    },
                    take: 1,
                  },
                },
              },
            },
          },
          metadatas: {
            where: {
              languageId,
            },
          },
          logo: true,
        },
      });
      if (!advertiser) {
        throw new Error('Advertiser not found');
      }
      carousel.cta['payload']['advertiserSlug'] = advertiser.slug;
      carousel.cta['payload']['advertiserRedirectUrl'] =
        advertiser.commissions[0].url;
      carousel.cta['payload']['advertiserCashbackRate'] = Math.max(
        ...(advertiser.commissions[0]?.commissionRows.map((commission) => {
          return this.advertiserService.calculateCommission(
            commission.commission,
            advertiser.commissions[0].commissionShare,
          );
        }) ?? [0]),
      );
      this.advertiserService.calculateCommission(
        advertiser.commissions[0].commissionShare,
        advertiser.commissions?.[0].commissionShare,
      );
      carousel.cta['payload']['advertiserName'] =
        advertiser.metadatas[0]?.name ?? '';
      carousel.cta['payload']['advertiserLogoUrl'] =
        `${process.env.MEDIA_URL}/${advertiser.logo.filePath}`;
    }

    return carousel;
  };
}
