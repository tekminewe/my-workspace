import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserWithdrawalDto } from './withdrawal.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { PaginationDto } from 'src/pagination/pagination.dto';
import { LanguageEnum } from '@prisma/client';

@Injectable()
export class WithdrawalService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async getUserWithdrawals(
    userId: string,
    languageId: LanguageEnum,
    page: number,
    pageSize: number,
  ): Promise<{ data: UserWithdrawalDto[]; pagination: PaginationDto }> {
    const paginationParams = this.paginationService.getPaginationCriteria({
      page,
      pageSize,
    });

    const whereClause = { paymentMethod: { userId } };

    const withdrawals = await this.prisma.userWithdrawal.findMany({
      ...paginationParams,
      where: whereClause,
      include: {
        paymentMethod: {
          include: {
            paymentChannel: {
              include: {
                metadatas: {
                  where: {
                    languageId,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalCount = await this.prisma.userWithdrawal.count({
      where: whereClause,
    });

    return {
      data: withdrawals.map(
        (withdrawal) =>
          new UserWithdrawalDto({
            ...withdrawal,
            paymentMethod: {
              ...withdrawal.paymentMethod,
              paymentChannel: {
                ...withdrawal.paymentMethod.paymentChannel,
                metadata: withdrawal.paymentMethod.paymentChannel.metadatas[0],
              },
            },
          }),
      ),
      pagination: new PaginationDto(totalCount, page, pageSize),
    };
  }
}
