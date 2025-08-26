import { Prisma, PrismaClient } from '@prisma/client';
import * as advertisers from './advertisers';
import { AdvertiserData } from './advertiser.types';

export async function seedAdvertiser(prisma: PrismaClient) {
  // Get all advertiser data objects from the advertisers directory
  const advertiserDataObjects = Object.values(advertisers) as AdvertiserData[];

  // Process each advertiser data object
  for (const { statusId, ...data } of advertiserDataObjects) {
    // Transform the data to match Prisma's expected format
    const prismaData: Prisma.AdvertiserCreateInput = {
      ...data,
      status: {
        connect: {
          id: statusId,
        },
      },
      logo: data.logo
        ? {
            create: data.logo,
          }
        : undefined,
      categories: data.categories?.length
        ? {
            connect: data.categories.map((id) => ({ id })),
          }
        : undefined,
      providerReferences: data.providerReferences?.length
        ? {
            create: data.providerReferences,
          }
        : undefined,
      metadatas: data.metadatas?.length
        ? {
            create: data.metadatas,
          }
        : undefined,
      commissions: undefined,
      // commissions: data.commissions?.length
      //   ? {
      //       create: data.commissions.map(
      //         ({ providerId, commissionShareTypeId, ...commission }) => ({
      //           ...commission,
      //           provider: {
      //             connect: {
      //               id: providerId,
      //             },
      //           },
      //           providerReferenceId: commission.providerReferenceId,
      //           commissionShareType: {
      //             connect: {
      //               id: commissionShareTypeId,
      //             },
      //           },
      //           commissionRows: commission.commissionRows?.length
      //             ? {
      //                 create: commission.commissionRows.map((row) => ({
      //                   ...row,
      //                   metadatas: row.metadatas?.length
      //                     ? {
      //                         create: row.metadatas,
      //                       }
      //                     : undefined,
      //                 })),
      //               }
      //             : undefined,
      //         }),
      //       ),
      //     }
      //   : undefined,
    };

    // Use Prisma transaction to perform database operation
    await prisma.advertiser.upsert({
      where: {
        id: data.id,
      },
      create: prismaData,
      update: {}, // Empty update to prevent modifying existing data
    });
  }
}
