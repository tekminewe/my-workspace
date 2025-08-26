import { Inject, Injectable } from '@nestjs/common';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatedParamsType } from 'src/app.types';

@Injectable()
export class CompanyUserService {
  constructor(@Inject(ENHANCED_PRISMA) private readonly db: PrismaService) {}

  async getCompanyUsers(
    params: PaginatedParamsType<{
      companyId: string;
    }>,
  ) {
    const { page = 1, pageSize = 25, companyId } = params;
    const whereClause = {
      companies: {
        some: {
          id: companyId,
        },
      },
    };
    const users = await this.db.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: whereClause,
      include: {
        profile: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    const totalCount = await this.db.user.count({
      where: whereClause,
    });
    return {
      users,
      total: totalCount,
    };
  }
}
