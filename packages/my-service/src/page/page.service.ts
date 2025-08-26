import { Inject, Injectable } from '@nestjs/common';
import { PageStatus } from '@prisma/client';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { PageDto } from './page.dto';

@Injectable()
export class PageService {
  constructor(@Inject(ENHANCED_PRISMA) private readonly db: PrismaService) {}

  async getPageBySlug({ slug }: { slug: string }) {
    const result = await this.db.pageVersion.findFirst({
      where: {
        page: {
          slug,
        },
        status: PageStatus.PUBLISHED,
      },
      orderBy: {
        version: 'desc',
      },
    });

    return result !== null ? new PageDto(result) : null;
  }
}
