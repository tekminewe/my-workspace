import { Inject, Injectable } from '@nestjs/common';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AdvertiserDto,
  CreateAdvertiserClickResponseDto,
  GetAdvertisersDto,
  GetUserAdvertiserClickDto,
  UserAdvertiserClickDto,
} from './advertiser.dto';
import {
  AdvertiserCommissionStatusEnum,
  AdvertiserStatusEnum,
  LanguageEnum,
  Prisma,
} from '@prisma/client';
import { PaginationService } from 'src/pagination/pagination.service';
import { PaginationDto } from 'src/pagination/pagination.dto';

@Injectable()
export class AdvertiserService {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly db: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async getAdvertisers({
    language = LanguageEnum.EN_US,
    page,
    pageSize,
  }: {
    language?: LanguageEnum;
  } & GetAdvertisersDto) {
    const paginationParams = this.paginationService.getPaginationCriteria({
      page,
      pageSize,
    });

    const whereClause: Prisma.AdvertiserWhereInput = {
      statusId: AdvertiserStatusEnum.Active,
      commissions: {
        some: {
          statusId: AdvertiserCommissionStatusEnum.Active,
        },
      },
    };
    const result = await this.db.advertiser.findMany({
      ...paginationParams,
      where: whereClause,
      include: {
        logo: true,
        metadatas: {
          where: {
            languageId: language,
          },
          take: 1,
        },
        providers: true,
        providerReferences: true,
        commissions: {
          where: {
            statusId: AdvertiserCommissionStatusEnum.Active,
          },
          include: {
            commissionRows: true,
          },
        },
      },
    });

    result.forEach((advertiser) =>
      advertiser.commissions.forEach((commission) => {
        commission.commissionRows.forEach((row) => {
          // Calculate the commission and store it as a separate property
          (row as any).calculatedCommission = this.calculateCommission(
            row.commission,
            commission.commissionShare,
          );
        });
      }),
    );

    const totalCount = await this.db.advertiser.count({
      where: whereClause,
    });

    return {
      data: result.map(
        (advertiser) =>
          new AdvertiserDto({
            ...advertiser,
            commission: advertiser.commissions?.[0]
              ? {
                  ...advertiser.commissions[0],
                  commissionRows:
                    advertiser.commissions[0].commissionRows?.map((row) => ({
                      ...row,
                      calculatedCommission: (row as any).calculatedCommission,
                    })) || [],
                }
              : undefined,
            metadata: advertiser.metadatas?.[0],
          }),
      ),
      pagination: new PaginationDto(totalCount, page, pageSize),
    };
  }

  async getAdvertiser({ id }: { id: string }) {
    const result = await this.db.advertiser.findFirst({
      where: {
        id,
      },
      include: {
        logo: true,
        campaigns: true,
        providers: true,
      },
    });

    return result !== null ? new AdvertiserDto(result) : null;
  }

  async getAdvertiserBySlug({
    slug,
    language = LanguageEnum.EN_US,
  }: {
    slug: string;
    language?: LanguageEnum;
  }) {
    const result = await this.db.advertiser.findFirst({
      where: {
        slug,
        statusId: AdvertiserStatusEnum.Active,
      },
      include: {
        metadatas: {
          where: {
            languageId: language,
          },
          take: 1,
        },
        logo: true,
        campaigns: true,
        commissions: {
          where: {
            statusId: AdvertiserCommissionStatusEnum.Active,
          },
          include: {
            commissionRows: {
              include: {
                metadatas: {
                  where: {
                    languageId: language,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    result.commissions.forEach((commission) => {
      commission.commissionRows.forEach((row) => {
        // Calculate the commission and store it as a separate property
        (row as any).calculatedCommission = this.calculateCommission(
          row.commission,
          result.commissions?.[0].commissionShare,
        );
      });
    });

    return result
      ? new AdvertiserDto({
          ...result,
          commission: {
            ...result.commissions?.[0],
            commissionRows: result.commissions?.[0].commissionRows.map(
              (row) => ({
                ...row,
                metadata: row.metadatas?.[0],
                calculatedCommission: (row as any).calculatedCommission,
              }),
            ),
          },
          metadata: result.metadatas?.[0],
        })
      : null;
  }

  async getPopularAdvertisers({
    language = LanguageEnum.EN_US,
  }: {
    language?: LanguageEnum;
  }) {
    const advertisers = await this.db.advertiser.findMany({
      where: {
        statusId: AdvertiserStatusEnum.Active,
      },
      include: {
        metadatas: {
          where: {
            languageId: language,
          },
          take: 1,
        },
        logo: true,
        commissions: {
          where: {
            statusId: AdvertiserCommissionStatusEnum.Active,
          },
          include: {
            commissionRows: {
              include: {
                metadatas: {
                  where: {
                    languageId: language,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
      orderBy: { popularity: 'desc' },
      take: 10,
    });

    advertisers.forEach((advertiser) =>
      advertiser.commissions.forEach((commission) => {
        commission.commissionRows.forEach((row) => {
          // Calculate the commission and store it as a separate property
          (row as any).calculatedCommission = this.calculateCommission(
            row.commission,
            advertiser.commissions?.[0].commissionShare,
          );
        });
      }),
    );

    return advertisers.map(
      (advertiser) =>
        new AdvertiserDto({
          ...advertiser,
          metadata: advertiser.metadatas?.[0],
          commission: {
            ...advertiser.commissions?.[0],
            commissionRows:
              advertiser.commissions?.[0]?.commissionRows?.map((row) => ({
                ...row,
                metadata: row.metadatas?.[0],
                calculatedCommission: (row as any).calculatedCommission,
              })) || [],
          },
        }),
    );
  }

  async createUserAdvertiserClick(data: {
    advertiserId: string;
    ipAddress: string;
    userAgent: string;
    referrer: string;
    userId: string;
  }) {
    const advertiser = await this.db.advertiserCommission.findFirst({
      where: {
        advertiserId: data.advertiserId,
        statusId: AdvertiserCommissionStatusEnum.Active,
      },
    });

    if (!advertiser) {
      return null;
    }

    const result = await this.db.userAdvertiserClick.create({
      data,
    });

    return new CreateAdvertiserClickResponseDto({
      url: `${advertiser.url}?aff_sub=${result.id}`,
    });
  }

  async getUserAdvertiserClicks({
    userId,
    page,
    pageSize,
    language = LanguageEnum.EN_US,
  }: { userId: string; language?: LanguageEnum } & GetUserAdvertiserClickDto) {
    const paginationParams = this.paginationService.getPaginationCriteria({
      page,
      pageSize,
    });
    const whereClause: Prisma.UserAdvertiserClickWhereInput = {
      userId,
    };

    const result = await this.db.userAdvertiserClick.findMany({
      ...paginationParams,
      where: whereClause,
      include: {
        advertiser: {
          select: {
            metadatas: {
              select: {
                name: true,
              },
              where: {
                languageId: language,
              },
            },
          },
        },
      },
      orderBy: {
        clickedAt: 'desc',
      },
    });
    const totalCount = await this.db.userAdvertiserClick.count({
      where: whereClause,
    });

    return {
      clicks: result.map(
        (click) =>
          new UserAdvertiserClickDto({
            ...click,
            advertiser: {
              ...click.advertiser,
              metadata: click.advertiser.metadatas?.[0],
            },
          }),
      ),
      pagination: new PaginationDto(totalCount, page, pageSize),
    };
  }

  public calculateCommission(commission: number, share: number) {
    const temp = Math.floor(commission * (100 - share)) / 100;
    return Math.floor(temp * 10) / 10;
  }
}
