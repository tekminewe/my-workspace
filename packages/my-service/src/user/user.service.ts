import { Inject, Injectable } from '@nestjs/common';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly prisma: PrismaService,
    private readonly dangerPrisma: PrismaService,
  ) {}

  async dangerouslyGetUserByProviderId({ providerId }: { providerId: string }) {
    const result = await this.dangerPrisma.account.findFirst({
      where: {
        providerAccountId: providerId,
      },
      include: {
        user: {
          include: {
            companies: true,
            roles: {
              include: {
                permissions: true,
              },
            },
          },
        },
      },
    });

    return result?.user || null;
  }

  async dangerouslyGetUserByRoleName({ roleName }: { roleName: string }) {
    const result = await this.dangerPrisma.user.findFirst({
      where: {
        roles: {
          some: {
            name: roleName,
          },
        },
      },
      include: {
        companies: true,
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    });

    return result || null;
  }
}
