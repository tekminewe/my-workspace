import { Inject, Injectable } from '@nestjs/common';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { LanguageEnum, Prisma, UserCashbackStatusEnum } from '@prisma/client';
import { PaginationService } from 'src/pagination/pagination.service';
import { PaginationDto } from 'src/pagination/pagination.dto';
import {
  GetUserCashbacksDto,
  UserCashbackDto,
  PendingBalanceDto,
} from './cashback.dto';

@Injectable()
export class CashbackService {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly db: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async getUserCashbacks({
    userId,
    page,
    pageSize,
    language = LanguageEnum.EN_US,
  }: { userId: string; language?: LanguageEnum } & GetUserCashbacksDto) {
    const paginationParams = this.paginationService.getPaginationCriteria({
      page,
      pageSize,
    });
    const whereClause: Prisma.UserCashbackWhereInput = {
      userId,
    };

    const result = await this.db.userCashback.findMany({
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
        createdAt: 'desc',
      },
    });
    const totalCount = await this.db.userCashback.count({
      where: whereClause,
    });

    return {
      data: result.map(
        (click) =>
          new UserCashbackDto({
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

  async getUserPendingBalance(userId: string): Promise<PendingBalanceDto> {
    const pendingBalance = await this.db.userCashback.aggregate({
      _sum: {
        netAmount: true,
      },
      where: {
        userId,
        statusId: UserCashbackStatusEnum.Pending,
      },
    });

    return new PendingBalanceDto({
      pendingBalance: pendingBalance._sum.netAmount || 0,
    });
  }
}
