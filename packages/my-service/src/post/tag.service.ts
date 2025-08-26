import { Inject, Injectable } from '@nestjs/common';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(@Inject(ENHANCED_PRISMA) private readonly db: PrismaService) {}
  async getTags({ name, companyId }: { name?: string; companyId: string }) {
    return this.db.tag.findMany({
      where: { name: { contains: name }, companyId },
      take: 10,
    });
  }
}
