import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  BonusTypeCodeEnum,
  BonusTypeStatusEnum,
  BonusEligibilityStatusEnum,
  CurrencyEnum,
} from '@prisma/client';

export interface ProcessBonusResult {
  success: boolean;
  bonusAmount?: number;
  bonusTransactionId?: string;
  error?: string;
}

export interface CreateBonusEligibilityInput {
  userId: string;
  bonusTypeId: string;
  eligibilityMetadata?: any;
}

@Injectable()
export class BonusService {
  private readonly logger = new Logger(BonusService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get available bonus types that are currently active and effective
   */
  async getAvailableBonusTypes() {
    const bonusTypes = await this.prisma.bonusType.findMany({
      where: {
        statusId: BonusTypeStatusEnum.Active,
        effectiveFrom: { lte: new Date() },
        OR: [{ effectiveTo: null }, { effectiveTo: { gte: new Date() } }],
      },
      orderBy: { priority: 'asc' },
      include: {
        metadatas: {
          include: {
            featuredImage: true,
            logo: true,
          },
        },
      },
    });

    return bonusTypes.map((type) => ({
      ...type,
      ruleConfig: JSON.stringify(type.ruleConfig),
      metadatas: type.metadatas.map((metadata) => ({
        ...metadata,
        featuredImage: metadata.featuredImage
          ? {
              ...metadata.featuredImage,
              url: `${process.env.MEDIA_URL}/${metadata.featuredImage.filePath}`,
            }
          : null,
        logo: metadata.logo
          ? {
              ...metadata.logo,
              url: `${process.env.MEDIA_URL}/${metadata.logo.filePath}`,
            }
          : null,
      })),
    }));
  }

  /**
   * Check if user is eligible for a specific bonus type
   */
  async checkBonusEligibility(
    userId: string,
    bonusTypeCode: BonusTypeCodeEnum,
  ): Promise<boolean> {
    try {
      // Get active bonus type
      const bonusType = await this.prisma.bonusType.findFirst({
        where: {
          codeId: bonusTypeCode,
          statusId: BonusTypeStatusEnum.Active,
          effectiveFrom: { lte: new Date() },
          OR: [{ effectiveTo: null }, { effectiveTo: { gte: new Date() } }],
        },
        orderBy: { version: 'desc' },
      });

      if (!bonusType) {
        return false;
      }

      // Check if user already has this bonus eligibility
      const existingEligibility = await this.prisma.bonusEligibility.findFirst({
        where: {
          userId,
          bonusTypeId: bonusType.id,
          statusId: {
            in: [
              BonusEligibilityStatusEnum.Available,
              BonusEligibilityStatusEnum.Used,
            ],
          },
        },
      });

      return !existingEligibility;
    } catch (error) {
      this.logger.error(
        `Error checking bonus eligibility: ${error.message}`,
        error.stack,
      );
      return false;
    }
  }

  /**
   * Create bonus eligibility for a user
   */
  async createBonusEligibility(
    input: CreateBonusEligibilityInput,
  ): Promise<string | null> {
    try {
      const bonusType = await this.prisma.bonusType.findUnique({
        where: { id: input.bonusTypeId },
      });

      if (!bonusType) {
        throw new Error('Bonus type not found');
      }

      // Calculate expiry date
      const expiresAt = bonusType.expiryDays
        ? new Date(Date.now() + bonusType.expiryDays * 24 * 60 * 60 * 1000)
        : null;

      const eligibility = await this.prisma.bonusEligibility.create({
        data: {
          userId: input.userId,
          bonusTypeId: input.bonusTypeId,
          bonusVersion: bonusType.version,
          statusId: BonusEligibilityStatusEnum.Available,
          availableAt: new Date(),
          expiresAt,
          eligibilityMetadata: input.eligibilityMetadata,
        },
      });

      return eligibility.id;
    } catch (error) {
      this.logger.error(
        `Error creating bonus eligibility: ${error.message}`,
        error.stack,
      );
      return null;
    }
  }

  /**
   * Process bonus for a cashback transaction
   */
  async processBonusForCashback(
    userId: string,
    cashbackTransactionId: string,
    cashbackAmount: number,
    currencyId: CurrencyEnum,
    merchantCallbackId?: string,
    tx?: any, // Optional transaction context
  ): Promise<ProcessBonusResult> {
    try {
      // Use provided transaction or create new one
      const dbContext = tx || this.prisma;

      // Check if user has first cashback multiplier eligibility (including those with no expiry)
      const eligibility = await dbContext.bonusEligibility.findFirst({
        where: {
          userId,
          statusId: BonusEligibilityStatusEnum.Available,
          OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
          bonusType: {
            codeId: BonusTypeCodeEnum.FirstCashbackMultiplier,
            statusId: BonusTypeStatusEnum.Active,
          },
        },
        include: {
          bonusType: true,
        },
      });

      if (!eligibility) {
        return { success: false, error: 'No eligible bonus found' };
      }

      // Parse rule config to get multiplier
      const ruleConfig = eligibility.bonusType.ruleConfig as any;
      const multiplier = ruleConfig?.multiplier || 2;

      // Calculate bonus amount (additional amount beyond original cashback)
      const bonusAmount = cashbackAmount * (multiplier - 1);

      // Create bonus transaction and update eligibility
      // If tx is provided, use it directly; otherwise create a new transaction
      const executeOperations = async (transactionContext: any) => {
        // Create bonus transaction
        const bonusTransaction =
          await transactionContext.bonusTransaction.create({
            data: {
              userId,
              bonusEligibilityId: eligibility.id,
              bonusTypeId: eligibility.bonusTypeId,
              bonusVersion: eligibility.bonusVersion,
              amount: bonusAmount,
              currencyId,
              sourceTransactionId: cashbackTransactionId,
              merchantCallbackId,
              processedAt: new Date(),
              processingMetadata: {
                originalCashback: cashbackAmount,
                multiplier,
                calculatedBonus: bonusAmount,
              },
            },
          });

        // Mark eligibility as used
        await transactionContext.bonusEligibility.update({
          where: { id: eligibility.id },
          data: {
            statusId: BonusEligibilityStatusEnum.Used,
            usedAt: new Date(),
          },
        });

        return bonusTransaction;
      };

      let result;
      if (tx) {
        // Use the provided transaction context
        result = await executeOperations(tx);
      } else {
        // Create a new transaction
        result = await this.prisma.$transaction(executeOperations);
      }

      this.logger.log(
        `Bonus processed for user ${userId}: ${bonusAmount} ${currencyId}`,
      );

      return {
        success: true,
        bonusAmount,
        bonusTransactionId: result.id,
      };
    } catch (error) {
      this.logger.error(
        `Error processing bonus: ${error.message}`,
        error.stack,
      );
      return { success: false, error: error.message };
    }
  }

  /**
   * Auto-enroll new users for first cashback bonus
   */
  async autoEnrollFirstCashbackBonus(userId: string): Promise<void> {
    try {
      // Check if user already has first cashback eligibility
      const isEligible = await this.checkBonusEligibility(
        userId,
        BonusTypeCodeEnum.FirstCashbackMultiplier,
      );

      // If user is NOT eligible (already has it), return early
      if (!isEligible) {
        return;
      }

      // Get the active first cashback bonus type
      const bonusType = await this.prisma.bonusType.findFirst({
        where: {
          codeId: BonusTypeCodeEnum.FirstCashbackMultiplier,
          statusId: BonusTypeStatusEnum.Active,
          effectiveFrom: { lte: new Date() },
          OR: [{ effectiveTo: null }, { effectiveTo: { gte: new Date() } }],
        },
        orderBy: { version: 'desc' },
      });

      if (bonusType) {
        await this.createBonusEligibility({
          userId,
          bonusTypeId: bonusType.id,
          eligibilityMetadata: { autoEnrolled: true, enrolledAt: new Date() },
        });

        this.logger.log(
          `Auto-enrolled user ${userId} for first cashback bonus`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Error auto-enrolling user for bonus: ${error.message}`,
        error.stack,
      );
    }
  }

  /**
   * Create bonus eligibility for email verification with transaction support
   */
  async createBonusEligibilityOnEmailVerification(
    userId: string,
    tx?: any, // Optional transaction context
  ): Promise<boolean> {
    try {
      const dbContext = tx || this.prisma;

      // Check if user already has first cashback eligibility
      const existingEligibility = await dbContext.bonusEligibility.findFirst({
        where: {
          userId,
          bonusType: {
            codeId: BonusTypeCodeEnum.FirstCashbackMultiplier,
            statusId: BonusTypeStatusEnum.Active,
          },
          statusId: {
            in: [
              BonusEligibilityStatusEnum.Available,
              BonusEligibilityStatusEnum.Used,
            ],
          },
        },
      });

      // If user already has eligibility, skip creation
      if (existingEligibility) {
        this.logger.log(
          `User ${userId} already has first cashback bonus eligibility`,
        );
        return true;
      }

      // Get the active first cashback bonus type
      const bonusType = await dbContext.bonusType.findFirst({
        where: {
          codeId: BonusTypeCodeEnum.FirstCashbackMultiplier,
          statusId: BonusTypeStatusEnum.Active,
          effectiveFrom: { lte: new Date() },
          OR: [{ effectiveTo: null }, { effectiveTo: { gte: new Date() } }],
        },
        orderBy: { version: 'desc' },
      });

      if (!bonusType) {
        this.logger.warn('No active first cashback bonus type found');
        return false;
      }

      // Calculate expiry date
      const expiresAt = bonusType.expiryDays
        ? new Date(Date.now() + bonusType.expiryDays * 24 * 60 * 60 * 1000)
        : null;

      // Create bonus eligibility
      await dbContext.bonusEligibility.create({
        data: {
          userId,
          bonusTypeId: bonusType.id,
          bonusVersion: bonusType.version,
          statusId: BonusEligibilityStatusEnum.Available,
          availableAt: new Date(),
          expiresAt,
          eligibilityMetadata: {
            emailVerificationEnrolled: true,
            enrolledAt: new Date(),
          },
        },
      });

      this.logger.log(
        `Created first cashback bonus eligibility for user ${userId} on email verification`,
      );

      return true;
    } catch (error) {
      this.logger.error(
        `Error creating bonus eligibility on email verification for user ${userId}: ${error.message}`,
        error.stack,
      );
      return false;
    }
  }

  /**
   * Get user's available bonuses
   */
  async getUserBonuses(userId: string) {
    const bonuses = await this.prisma.bonusEligibility.findMany({
      where: {
        userId,
        statusId: BonusEligibilityStatusEnum.Available,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
    });

    return bonuses.map((bonus) => ({
      ...bonus,
      eligibilityMetadata: bonus.eligibilityMetadata
        ? JSON.stringify(bonus.eligibilityMetadata)
        : null,
    }));
  }

  /**
   * Get user's bonus transaction history
   */
  async getUserBonusHistory(userId: string) {
    const transactions = await this.prisma.bonusTransaction.findMany({
      where: { userId },
      orderBy: { processedAt: 'desc' },
    });

    return transactions.map((transaction) => ({
      ...transaction,
      processingMetadata: transaction.processingMetadata
        ? JSON.stringify(transaction.processingMetadata)
        : null,
    }));
  }

  /**
   * Get user's bonus transaction history with pagination
   */
  async getUserBonusHistoryPaginated(
    userId: string,
    page: number,
    pageSize: number,
  ) {
    const skip = (page - 1) * pageSize;

    const [transactions, totalCount] = await Promise.all([
      this.prisma.bonusTransaction.findMany({
        where: { userId },
        orderBy: { processedAt: 'desc' },
        skip,
        take: pageSize,
      }),
      this.prisma.bonusTransaction.count({
        where: { userId },
      }),
    ]);

    const items = transactions.map((transaction) => ({
      ...transaction,
      processingMetadata: transaction.processingMetadata
        ? JSON.stringify(transaction.processingMetadata)
        : null,
    }));

    return {
      items,
      totalCount,
      page,
      pageSize,
    };
  }

  /**
   * Get bonus eligibility by ID
   */
  async getBonusEligibilityById(id: string) {
    const eligibility = await this.prisma.bonusEligibility.findUnique({
      where: { id },
      include: {
        bonusType: {
          include: {
            metadatas: true,
          },
        },
      },
    });

    if (!eligibility) {
      return null;
    }

    return {
      ...eligibility,
      eligibilityMetadata: eligibility.eligibilityMetadata
        ? JSON.stringify(eligibility.eligibilityMetadata)
        : null,
      bonusType: eligibility.bonusType
        ? {
            ...eligibility.bonusType,
            ruleConfig: eligibility.bonusType.ruleConfig
              ? JSON.stringify(eligibility.bonusType.ruleConfig)
              : '',
          }
        : null,
    };
  }

  /**
   * Get all bonus types for admin (with optional filtering)
   */
  async getAllBonusTypes() {
    const types = await this.prisma.bonusType.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        metadatas: {
          include: {
            featuredImage: true,
            logo: true,
          },
        },
      },
    });

    return types.map((type) => ({
      ...type,
      ruleConfig: JSON.stringify(type.ruleConfig),
      metadatas: type.metadatas.map((metadata) => ({
        ...metadata,
        featuredImage: metadata.featuredImage
          ? {
              ...metadata.featuredImage,
              url: `${process.env.MEDIA_URL}/${metadata.featuredImage.filePath}`,
            }
          : null,
        logo: metadata.logo
          ? {
              ...metadata.logo,
              url: `${process.env.MEDIA_URL}/${metadata.logo.filePath}`,
            }
          : null,
      })),
    }));
  }

  /**
   * Get a single bonus type by ID
   */
  async getBonusTypeById(id: string) {
    const type = await this.prisma.bonusType.findUnique({
      where: { id },
      include: {
        metadatas: {
          include: {
            featuredImage: true,
            logo: true,
          },
        },
      },
    });

    if (!type) return null;

    return {
      ...type,
      ruleConfig: JSON.stringify(type.ruleConfig),
      metadatas: type.metadatas.map((metadata) => ({
        ...metadata,
        featuredImage: metadata.featuredImage
          ? {
              ...metadata.featuredImage,
              url: `${process.env.MEDIA_URL}/${metadata.featuredImage.filePath}`,
            }
          : null,
        logo: metadata.logo
          ? {
              ...metadata.logo,
              url: `${process.env.MEDIA_URL}/${metadata.logo.filePath}`,
            }
          : null,
      })),
    };
  }

  /**
   * Get metadata for a bonus type by language
   */
  async getBonusTypeMetadataByLanguage(bonusTypeId: string, languageId: any) {
    const metadata = await this.prisma.bonusTypeMetadata.findUnique({
      where: {
        bonusTypeId_languageId: {
          bonusTypeId,
          languageId,
        },
      },
      include: {
        featuredImage: true,
        logo: true,
      },
    });

    if (!metadata) return null;

    return {
      ...metadata,
      featuredImage: metadata.featuredImage
        ? {
            ...metadata.featuredImage,
            url: `${process.env.MEDIA_URL}/${metadata.featuredImage.filePath}`,
          }
        : null,
      logo: metadata.logo
        ? {
            ...metadata.logo,
            url: `${process.env.MEDIA_URL}/${metadata.logo.filePath}`,
          }
        : null,
    };
  }

  /**
   * Create a new bonus type
   */
  async createBonusType(input: any, userId: string) {
    const { metadatas, ...bonusTypeData } = input;

    const bonusType = await this.prisma.bonusType.create({
      data: {
        ...bonusTypeData,
        ruleConfig: JSON.parse(bonusTypeData.ruleConfig),
        createdBy: userId,
        updatedBy: userId,
        ...(metadatas?.length && {
          metadatas: {
            create: metadatas,
          },
        }),
      },
    });

    return {
      ...bonusType,
      ruleConfig: JSON.stringify(bonusType.ruleConfig),
    };
  }

  /**
   * Update an existing bonus type
   */
  async updateBonusType(id: string, input: any, userId: string) {
    const { metadatas, ...bonusTypeData } = input;

    const updateData: any = {
      ...bonusTypeData,
      updatedBy: userId,
    };

    if (bonusTypeData.ruleConfig) {
      updateData.ruleConfig = JSON.parse(bonusTypeData.ruleConfig);
    }

    const bonusType = await this.prisma.bonusType.update({
      where: { id },
      data: {
        ...updateData,
        // Always update metadatas if provided, even if empty array (to clear existing)
        ...(metadatas !== undefined && {
          metadatas: {
            deleteMany: {}, // Delete existing metadata
            ...(metadatas.length > 0 && { create: metadatas }), // Create new metadata only if array has items
          },
        }),
      },
    });

    return {
      ...bonusType,
      ruleConfig: JSON.stringify(bonusType.ruleConfig),
    };
  }

  /**
   * Delete a bonus type
   */
  async deleteBonusType(id: string): Promise<boolean> {
    await this.prisma.bonusType.delete({
      where: { id },
    });
    return true;
  }
}
