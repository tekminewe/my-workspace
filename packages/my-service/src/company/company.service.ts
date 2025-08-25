import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private readonly db: PrismaService) {}

  getCompany({ userId }: { userId: string }) {
    return this.db.company.findFirst({
      where: { users: { some: { id: userId } } },
    });
  }
}
