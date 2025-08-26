import { Inject, Injectable } from '@nestjs/common';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AdvertiserCommissionRowStatusEnum,
  AdvertiserCommissionStatusEnum,
  AdvertiserStatusEnum,
  LanguageEnum,
  Prisma,
} from '@prisma/client';
import { PaginationService } from 'src/pagination/pagination.service';
import { GetAdvertisersArgs } from './advertiser.args';
import { SortByField, SortDirection } from './sort.args';
import { PaginationDto } from 'src/pagination/pagination.dto';
import { UpdateAdvertiserInput } from './advertiser.input';
import { UpdateAdvertiserCommissionInput } from './advertiser-commission.input';
import { SearchService } from 'src/search/search.service';
import { MediaDto } from 'src/media/media.dto';
import { AdvertiserIndexObject } from './advertiser.types';
import { AdvertiserCommissionRow } from './advertiser-commission.model';
import { Advertiser } from './advertiser.model';
import { CreateAdvertiserInput } from './create-advertiser.input';

@Injectable()
export class AdvertiserService2 {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly db: PrismaService,
    private readonly paginationService: PaginationService,
    private readonly searchService: SearchService,
  ) {}

  async getAdvertiser({
    advertiserId,
    slug,
    language = LanguageEnum.EN_US,
  }: {
    advertiserId?: string;
    slug?: string;
    language?: LanguageEnum;
  }): Promise<Omit<Advertiser, 'logo' | 'commission' | 'commissions'>> {
    if (!advertiserId && !slug) {
      throw new Error('Either advertiserId or slug must be provided');
    }

    const result = await this.db.advertiser.findFirstOrThrow({
      where: {
        ...(advertiserId ? { id: advertiserId } : {}),
        ...(slug ? { slug } : {}),
      },
      include: this.getAdvertiserInclude(),
    });

    const metadata = result.metadatas.find((m) => m.languageId === language);

    return {
      ...result,
      name: metadata?.name ?? '',
      description: metadata?.description ?? '',
      categories: this.transformCategories(result.categories || [], language),
    };
  }

  async getAdvertisers({
    language = LanguageEnum.EN_US,
    page,
    pageSize,
    statusId,
    categoryIds,
    sortBy = SortByField.CreatedAt,
    sortDirection = SortDirection.Desc,
  }: {
    language?: LanguageEnum;
  } & GetAdvertisersArgs): Promise<
    Omit<Advertiser, 'logo' | 'commission' | 'commissions'>[]
  > {
    const paginationParams = this.paginationService.getPaginationCriteria({
      page,
      pageSize,
    });

    const whereClause: Prisma.AdvertiserWhereInput = {};
    if (statusId) {
      whereClause.statusId = statusId;
    }

    // Add category filtering
    if (categoryIds && categoryIds.length > 0) {
      whereClause.categories = {
        some: {
          id: {
            in: categoryIds,
          },
        },
      };
    }

    // Add ordering based on sortBy and sortDirection
    const orderBy: Prisma.AdvertiserOrderByWithRelationInput = {};
    if (sortBy === SortByField.CreatedAt) {
      orderBy.createdAt = sortDirection === SortDirection.Desc ? 'desc' : 'asc';
    } else if (sortBy === SortByField.StartDate) {
      // For startDate sorting, can sort by createdAt if needed
      orderBy.createdAt = sortDirection === SortDirection.Desc ? 'desc' : 'asc';
    }

    const result = await this.db.advertiser.findMany({
      ...paginationParams,
      where: whereClause,
      orderBy,
      include: this.getAdvertiserInclude(),
    });

    return result.map((advertiser) => {
      const metadata = advertiser.metadatas.find(
        (m) => m.languageId === language,
      );

      return {
        ...advertiser,
        name: metadata?.name ?? '',
        description: metadata?.description ?? '',
        categories: this.transformCategories(
          advertiser.categories || [],
          language,
        ),
      };
    });
  }

  async updateAdvertiser(
    id: string,
    data: UpdateAdvertiserInput,
    language: LanguageEnum,
  ) {
    const result = await this.db.advertiser.update({
      where: {
        id,
      },
      data: {
        ...(data.statusId && {
          status: {
            connect: {
              id: data.statusId,
            },
          },
        }),
        ...(data.slug && {
          slug: data.slug,
        }),
        ...(data.metadatas &&
          data.metadatas.length > 0 && {
            metadatas: {
              upsert: data.metadatas.map((metadata) => ({
                where: {
                  advertiserId_languageId: {
                    advertiserId: id,
                    languageId: metadata.languageId,
                  },
                },
                update: {
                  name: metadata.name,
                },
                create: {
                  languageId: metadata.languageId,
                  name: metadata.name,
                  // Description is required in the schema, so we need to set a default
                  description: '',
                },
              })),
            },
          }),
        ...(data.categoryIds !== undefined && {
          categories: {
            set: data.categoryIds.map((categoryId) => ({
              id: categoryId,
            })),
          },
        }),
      },
      include: this.getAdvertiserInclude(),
    });

    if (result.statusId === AdvertiserStatusEnum.Active) {
      await this.indexAdvertiser({ advertiserId: id });
    } else if (result.statusId === AdvertiserStatusEnum.Inactive) {
      await this.removeAdvertiserIndex({
        advertiserId: id,
      });
    }

    const metadata = result.metadatas.find((m) => m.languageId === language);

    return {
      ...result,
      name: metadata?.name ?? '',
      description: metadata?.description ?? '',
      categories: this.transformCategories(result.categories, language),
    };
  }

  async getAdvertisersPagination({
    page,
    pageSize,
    statusId,
    categoryIds,
  }: GetAdvertisersArgs) {
    const whereClause: Prisma.AdvertiserWhereInput = {
      statusId,
      commissions: {
        some: {
          statusId: AdvertiserCommissionStatusEnum.Active,
        },
      },
    };

    // Add category filtering
    if (categoryIds && categoryIds.length > 0) {
      whereClause.categories = {
        some: {
          id: {
            in: categoryIds,
          },
        },
      };
    }

    const totalCount = await this.db.advertiser.count({
      where: whereClause,
    });

    return new PaginationDto(totalCount, page, pageSize);
  }

  public async getAdvertiserCommission({
    language,
    advertiserId,
    statusId,
    rowStatusId,
  }: {
    language: LanguageEnum;
    advertiserId: string;
    statusId?: AdvertiserCommissionStatusEnum;
    rowStatusId?: AdvertiserCommissionRowStatusEnum;
  }) {
    const commission = await this.db.advertiserCommission.findFirst({
      where: {
        statusId: statusId,
        advertiserId,
      },
      include: {
        commissionRows: {
          where: {
            statusId: rowStatusId,
          },
          include: {
            metadatas: true,
          },
        },
      },
    });

    if (!commission) {
      return null;
    }

    // Cast and add calculatedCommission property
    const commissionRowsWithCalculated = commission.commissionRows.map(
      (row) => {
        const rowWithCalculated = row as unknown as AdvertiserCommissionRow;
        rowWithCalculated.calculatedCommission = this.calculateCommission(
          row.commission,
          commission.commissionShare,
        );
        return rowWithCalculated;
      },
    );

    return {
      ...commission,
      // Set commission as the max of raw commission values
      commission:
        commissionRowsWithCalculated.length > 0
          ? Math.max(
              ...commissionRowsWithCalculated.map((row) => row.commission || 0),
            )
          : 0,
      // Set calculatedCommission as the max of calculated commission values
      calculatedCommission:
        commissionRowsWithCalculated.length > 0
          ? Math.max(
              ...commissionRowsWithCalculated.map(
                (row) => row.calculatedCommission || 0,
              ),
            )
          : 0,
      commissionRows: commissionRowsWithCalculated.map((row) => ({
        ...row,
        name: row.metadatas.find((m) => m.languageId === language)?.name ?? '',
      })),
    };
  }

  public async getAdvertiserCommissions({
    advertiserId,
    statusId,
    rowStatusId,
  }: {
    advertiserId: string;
    statusId?: AdvertiserCommissionStatusEnum;
    rowStatusId?: AdvertiserCommissionRowStatusEnum;
  }) {
    const commissions = await this.db.advertiserCommission.findMany({
      where: {
        statusId,
        advertiserId,
      },
      include: {
        commissionRows: {
          where: {
            statusId: rowStatusId,
          },
          include: {
            metadatas: true,
          },
        },
      },
    });

    if (!commissions || commissions.length === 0) {
      return [];
    }

    // Return raw database data without additional processing
    return commissions;
  }

  async updateAdvertiserCommission(
    input: UpdateAdvertiserCommissionInput,
    language: LanguageEnum,
  ) {
    try {
      const { identifier, commissionRows, ...updateData } = input;

      // Determine where condition based on provided identifiers
      let whereCondition: Prisma.AdvertiserCommissionWhereUniqueInput;

      if (identifier.id) {
        whereCondition = { id: identifier.id };
      } else if (
        identifier.advertiserId &&
        identifier.providerId &&
        identifier.providerReferenceId
      ) {
        whereCondition = {
          advertiserId_providerId_providerReferenceId: {
            advertiserId: identifier.advertiserId,
            providerId: identifier.providerId,
            providerReferenceId: identifier.providerReferenceId,
          },
        };
      } else {
        throw new Error(
          'Invalid identifier provided. Must provide either id or combination of advertiserId, providerId, and providerReferenceId',
        );
      }

      // Use a transaction to ensure all operations are atomic
      const result = await this.db.$transaction(async (tx) => {
        // First, update the commission main data
        const updatedCommission = await tx.advertiserCommission.update({
          where: whereCondition,
          data: {
            ...(updateData.advertiserId && {
              advertiser: {
                connect: { id: updateData.advertiserId },
              },
            }),
            ...(updateData.providerId && {
              provider: {
                connect: { id: updateData.providerId },
              },
            }),
            ...(updateData.statusId && {
              status: {
                connect: { id: updateData.statusId },
              },
            }),
            ...(updateData.commissionShareTypeId && {
              commissionShareType: {
                connect: { id: updateData.commissionShareTypeId },
              },
            }),
            ...(updateData.commissionShare !== undefined && {
              commissionShare: updateData.commissionShare,
            }),
            ...(updateData.dayToValidate !== undefined && {
              dayToValidate: updateData.dayToValidate,
            }),
            ...(updateData.dayToPayout !== undefined && {
              dayToPayout: updateData.dayToPayout,
            }),
            ...(updateData.url !== undefined && {
              url: updateData.url,
            }),
            ...(updateData.providerReferenceId !== undefined && {
              providerReferenceId: updateData.providerReferenceId,
            }),
          },
        });

        const commissionId = updatedCommission.id; // If commission rows are provided, upsert them using providerReferenceId
        if (commissionRows !== undefined) {
          // Process each commission row with upsert operation
          if (commissionRows.length > 0) {
            for (const rowData of commissionRows) {
              const {
                metadatas,
                providerReferenceId,
                statusId,
                ...rowCreateData
              } = rowData;

              // Skip rows without providerReferenceId as we can't reliably upsert them
              if (!providerReferenceId) {
                console.warn(
                  'Skipping commission row without providerReferenceId',
                );
                continue;
              }

              // Upsert the commission row
              const upsertedRow = await tx.advertiserCommissionRow.upsert({
                where: {
                  advertiserCommissionId_providerReferenceId: {
                    advertiserCommissionId: commissionId,
                    providerReferenceId,
                  },
                },
                update: {
                  ...rowCreateData,
                  ...(statusId && { statusId }),
                },
                create: {
                  ...rowCreateData,
                  statusId:
                    statusId || AdvertiserCommissionRowStatusEnum.Inactive,
                  providerReferenceId,
                  advertiserCommissionId: commissionId,
                },
              });

              // Handle metadatas if provided
              if (metadatas && metadatas.length > 0) {
                // Upsert each metadata using languageId as unique identifier
                for (const meta of metadatas) {
                  await tx.advertiserCommissionRowMetadata.upsert({
                    where: {
                      commissionRowId_languageId: {
                        commissionRowId: upsertedRow.id,
                        languageId: meta.languageId,
                      },
                    },
                    update: {
                      name: meta.name,
                    },
                    create: {
                      commissionRowId: upsertedRow.id,
                      languageId: meta.languageId,
                      name: meta.name,
                    },
                  });
                }
              }
            }
          }
        }

        // Finally, fetch the updated commission with all its rows
        return tx.advertiserCommission.findUnique({
          where: { id: commissionId },
          include: {
            commissionRows: {
              include: {
                metadatas: {
                  where: {
                    languageId: language,
                  },
                  take: 1,
                },
              },
            },
          },
        });
      });

      if (!result) {
        return null;
      }

      await this.indexAdvertiser({ advertiserId: result.advertiserId });

      // Apply commission share calculation to all commission rows
      const commissionRowsWithCalculated = result.commissionRows.map((row) => {
        const rowWithCalculated = row as unknown as AdvertiserCommissionRow;
        rowWithCalculated.calculatedCommission = this.calculateCommission(
          row.commission,
          result.commissionShare,
        );
        return rowWithCalculated;
      });

      return {
        ...result,
        commission:
          commissionRowsWithCalculated.length > 0
            ? Math.max(
                ...commissionRowsWithCalculated.map(
                  (row) => row.commission || 0,
                ),
              )
            : 0,
        calculatedCommission:
          commissionRowsWithCalculated.length > 0
            ? Math.max(
                ...commissionRowsWithCalculated.map(
                  (row) => row.calculatedCommission || 0,
                ),
              )
            : 0,
        commissionRows: commissionRowsWithCalculated.map((row) => ({
          ...row,
          name:
            row.metadatas.find((m) => m.languageId === language)?.name ?? '',
        })),
      };
    } catch (error) {
      console.error('Error updating advertiser commission:', error);
      throw new Error(
        `Failed to update advertiser commission: ${error.message}`,
      );
    }
  }

  async indexAdvertiser({ advertiserId }: { advertiserId: string }) {
    try {
      const result = await this.db.advertiser.findMany({
        where: {
          id: advertiserId,
        },
        include: {
          logo: true,
          metadatas: true,
          categories: {
            include: {
              metadatas: true,
            },
          },
          commissions: {
            where: {
              statusId: AdvertiserCommissionStatusEnum.Active,
            },
            include: {
              commissionRows: {
                where: {
                  statusId: AdvertiserCommissionRowStatusEnum.Active,
                },
                include: {
                  metadatas: {
                    take: 1,
                  },
                },
              },
            },
          },
        },
      });

      if (result.length === 0) {
        console.warn(`Advertiser not found with ID: ${advertiserId}`);
        return;
      }

      for (const advertiser of result) {
        advertiser.commissions.forEach((commission) => {
          commission.commissionRows.forEach((row) => {
            const rowWithCalculated = row as unknown as AdvertiserCommissionRow;
            rowWithCalculated.calculatedCommission = this.calculateCommission(
              row.commission,
              commission.commissionShare,
            );
          });
        });

        const commission = advertiser.commissions[0];
        const object: AdvertiserIndexObject = {
          objectID: advertiser.id,
          name: advertiser.metadatas.map((metadata) => ({
            languageId: metadata.languageId,
            name: metadata.name,
          })),
          slug: advertiser.slug,
          categories: advertiser.categories.flatMap((category) =>
            category.metadatas.map((m) => ({
              id: category.id,
              languageId: m.languageId,
              name: m.name,
            })),
          ),
          commission: !!commission?.commissionRows.length
            ? Math.max(
                ...commission.commissionRows.map((row) => row.commission),
              )
            : 0,
          calculatedCommission: !!commission?.commissionRows.length
            ? Math.max(
                ...commission.commissionRows.map(
                  (row) =>
                    (row as unknown as AdvertiserCommissionRow)
                      .calculatedCommission || 0,
                ),
              )
            : 0,
          logo: new MediaDto(advertiser.logo).url,
        };

        await this.searchService.indexObjects({
          indexName: `${process.env.ADVERTISERS_SEARCH_INDEX_NAME}`,
          objects: [object],
        });
      }
    } catch (error) {
      console.error(`Error indexing advertiser ${advertiserId}:`, error);
      throw new Error(`Failed to index advertiser: ${error.message}`);
    }
  }

  async removeAdvertiserIndex({ advertiserId }: { advertiserId: string }) {
    try {
      await this.searchService.removeObject({
        objectKey: advertiserId,
        indexName: `${process.env.ADVERTISERS_SEARCH_INDEX_NAME}`,
      });
    } catch (error) {
      console.error(
        `Error removing advertiser ${advertiserId} from index:`,
        error,
      );
      throw new Error(
        `Failed to remove advertiser from index: ${error.message}`,
      );
    }
  }
  async refreshAdvertiserSearchIndex({
    advertiserId,
  }: {
    advertiserId?: string;
  }) {
    try {
      if (advertiserId) {
        // For a specific advertiser, we first remove it and then reindex
        await this.removeAdvertiserIndex({ advertiserId });
        await this.indexAdvertiser({ advertiserId });
        return { success: true };
      }

      // If no advertiserId is provided, clear the entire index and refresh all active advertisers
      await this.searchService.clearIndex({
        indexName: `${process.env.ADVERTISERS_SEARCH_INDEX_NAME}`,
      });

      // Get all active advertisers
      const advertisers = await this.db.advertiser.findMany({
        where: {
          statusId: AdvertiserStatusEnum.Active,
        },
        select: {
          id: true,
        },
      });

      // Process advertisers in batches to avoid overwhelming the system
      const batchSize = 10;
      for (let i = 0; i < advertisers.length; i += batchSize) {
        const batch = advertisers.slice(i, i + batchSize);
        await Promise.all(
          batch.map(async (advertiser) => {
            await this.indexAdvertiser({
              advertiserId: advertiser.id,
            });
          }),
        );
      }

      return { success: true };
    } catch (error) {
      console.error('Error refreshing advertiser search index:', error);
      throw new Error(
        `Failed to refresh advertiser search index: ${error.message}`,
      );
    }
  }

  async createAdvertiser(data: CreateAdvertiserInput, language: LanguageEnum) {
    try {
      // Create the advertiser with its relations
      const advertiser = await this.db.advertiser.create({
        data: {
          slug: data.slug,
          statusId: data.statusId || AdvertiserStatusEnum.Inactive,
          logoId: data.logoId ? data.logoId : undefined,
          metadatas: {
            createMany: {
              data: data.metadatas.map((metadata) => ({
                languageId: metadata.languageId,
                name: metadata.name,
                description: metadata.description,
              })),
            },
          },
          providerReferences: data.providerReferences
            ? {
                create: data.providerReferences.map((reference) => ({
                  providerId: reference.providerId,
                  providerReferenceId: reference.providerReferenceId,
                })),
              }
            : undefined,
          commissions: data.commissions
            ? {
                create: data.commissions.map((commission) => ({
                  providerReferenceId: commission.providerReferenceId,
                  providerId: commission.providerId,
                  commissionShare: commission.commissionShare,
                  commissionShareTypeId: commission.commissionShareTypeId,
                  dayToValidate: commission.dayToValidate,
                  dayToPayout: commission.dayToPayout,
                  url: commission.url,
                  statusId: commission.statusId,
                  commissionRows: commission.commissionRows
                    ? {
                        create: commission.commissionRows.map((row) => ({
                          providerReferenceId: row.providerReferenceId,
                          typeId: row.typeId,
                          statusId:
                            row.statusId ||
                            AdvertiserCommissionRowStatusEnum.Inactive,
                          commission: row.commission,
                          metadatas: row.metadatas
                            ? {
                                create: row.metadatas.map((metadata) => ({
                                  languageId: metadata.languageId,
                                  name: metadata.name,
                                })),
                              }
                            : undefined,
                        })),
                      }
                    : undefined,
                })),
              }
            : undefined,
        },
        include: this.getAdvertiserInclude(),
      });

      // Index the new advertiser in search if active
      if (advertiser.statusId === AdvertiserStatusEnum.Active) {
        await this.indexAdvertiser({ advertiserId: advertiser.id });
      }

      // Transform the advertiser to match GraphQL model
      const metadata = advertiser.metadatas.find(
        (m) => m.languageId === language,
      );
      return {
        ...advertiser,
        name: metadata?.name ?? '',
        description: metadata?.description ?? '',
      };
    } catch (error) {
      console.error('Error creating advertiser:', error);
      throw new Error(`Failed to create advertiser: ${error.message}`);
    }
  }

  /**
   * Get all metadatas for an advertiser
   */
  async getAdvertiserMetadatas(advertiserId: string) {
    const result = await this.db.advertiserMetadata.findMany({
      where: {
        advertiserId,
      },
    });

    return result;
  }

  public calculateCommission(commission: number, share: number) {
    const temp = Math.floor(commission * (100 - share)) / 100;
    return Math.floor(temp * 10) / 10;
  }

  /**
   * Transform categories to include localized names
   */
  private transformCategories(
    categories: any[],
    language: LanguageEnum = LanguageEnum.EN_US,
  ) {
    return categories.map((category: any) => ({
      id: category.id,
      description: category.description,
      name:
        category.metadatas?.find((m: any) => m.languageId === language)?.name ??
        category.id,
    }));
  }

  private getAdvertiserInclude(): Prisma.AdvertiserInclude {
    return {
      metadatas: true,
      providers: true,
      providerReferences: true,
      categories: {
        include: {
          metadatas: true,
        },
      },
      commissions: {
        where: {
          statusId: AdvertiserCommissionStatusEnum.Active,
        },
        include: {
          commissionRows: {
            where: {
              statusId: AdvertiserCommissionRowStatusEnum.Active,
            },
            include: {
              metadatas: true,
            },
          },
        },
      },
    };
  }

  async getAdvertiserProviders(advertiserId: string) {
    const advertiser = await this.db.advertiser.findUnique({
      where: {
        id: advertiserId,
      },
      select: {
        providers: true,
      },
    });

    return advertiser?.providers || [];
  }

  async getAdvertiserProviderReferences(advertiserId: string) {
    const advertiser = await this.db.advertiser.findUnique({
      where: {
        id: advertiserId,
      },
      include: {
        providerReferences: {
          include: {
            provider: true,
          },
        },
      },
    });

    return advertiser?.providerReferences || [];
  }

  async getAdvertiserCategories(
    advertiserId: string,
    language: LanguageEnum = LanguageEnum.EN_US,
  ) {
    const advertiser = await this.db.advertiser.findUnique({
      where: {
        id: advertiserId,
      },
      include: {
        categories: {
          include: {
            metadatas: true,
          },
        },
      },
    });

    // Transform categories to include localized names
    return this.transformCategories(advertiser?.categories || [], language);
  }

  async getAllCategories(language: LanguageEnum = LanguageEnum.EN_US) {
    const categories = await this.db.advertiserCategory.findMany({
      include: {
        metadatas: true,
      },
    });

    // Transform categories to include localized names
    return this.transformCategories(categories, language);
  }

  async getAllCategoriesWithCounts(
    language: LanguageEnum = LanguageEnum.EN_US,
  ) {
    const categories = await this.db.advertiserCategory.findMany({
      include: {
        metadatas: true,
        _count: {
          select: {
            advertisers: {
              where: {
                statusId: AdvertiserStatusEnum.Active,
              },
            },
          },
        },
      },
    });

    // Transform categories to include localized names and counts
    return categories.map((category: any) => ({
      ...this.transformCategories([category], language)[0],
      count: category._count.advertisers,
    }));
  }
}
