import { Inject, Injectable } from '@nestjs/common';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LanguageService {
  constructor(@Inject(ENHANCED_PRISMA) private readonly db: PrismaService) {}

  async getLanguages({ isSupported }: { isSupported?: boolean } = {}) {
    const where = isSupported !== undefined ? { isSupported } : {};

    return this.db.language.findMany({
      where,
      orderBy: {
        name: 'asc',
      },
    });
  }
}
