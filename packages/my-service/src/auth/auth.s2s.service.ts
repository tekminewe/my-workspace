import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/user/user.entity';
import { BonusService } from 'src/bonus/bonus.service';

@Injectable()
export class AuthS2SService {
  private readonly logger = new Logger(AuthS2SService.name);

  constructor(
    private readonly db: PrismaService,
    private readonly bonusService: BonusService,
  ) {}

  async createUser({
    email,
    providerAccountId,
    firstName,
    lastName,
  }: {
    email: string;
    providerAccountId: string;
    firstName: string;
    lastName: string;
  }) {
    const site = await this.db.site.findFirst();
    const user = await this.db.user.create({
      data: {
        email,
        accounts: {
          create: {
            type: 'oidc',
            provider: 'cognito',
            providerAccountId,
          },
        },
        profile: {
          create: {
            firstName,
            lastName,
          },
        },
        wallets: {
          create: {
            balance: 0,
            currencyId: site.currencyId,
          },
        },
        roles: {
          connect: {
            name: 'User',
          },
        },
      },
    });

    return new UserEntity(user);
  }

  async verifyUserEmail(input: { email: string } | string): Promise<boolean> {
    try {
      // Handle both email object and userId string for backward compatibility
      let userId: string;

      if (typeof input === 'string') {
        userId = input;
      } else {
        // Look up user by email to get userId
        const user = await this.db.user.findUnique({
          where: { email: input.email },
        });

        if (!user) {
          this.logger.error(`User not found with email: ${input.email}`);
          return false;
        }

        userId = user.id;
      }

      return await this.db.$transaction(async (tx) => {
        // Update user's email verification status
        await tx.user.update({
          where: { id: userId },
          data: { emailVerified: new Date() },
        });

        // Create bonus eligibility for first cashback after email verification
        await this.bonusService.createBonusEligibilityOnEmailVerification(
          userId,
          tx, // Pass transaction context
        );

        this.logger.log(`Email verified for user: ${userId}`);
        return true;
      });
    } catch (error) {
      this.logger.error(
        `Failed to verify email: ${error.message}`,
        error.stack,
      );
      return false;
    }
  }
}
