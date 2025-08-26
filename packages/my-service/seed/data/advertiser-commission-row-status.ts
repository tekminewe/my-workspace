import { PrismaClient } from '@prisma/client';
import active from './advertiser-commission-row-statuses/active';
import inactive from './advertiser-commission-row-statuses/inactive';
import { AdvertiserCommissionRowStatusData } from './advertiser-commission-row-status.types';

export async function seedAdvertiserCommissionRowStatus(prisma: PrismaClient) {
  // Get all status data objects
  const statusDataObjects: AdvertiserCommissionRowStatusData[] = [
    active,
    inactive,
  ];

  // Process each status data object
  for (const data of statusDataObjects) {
    // Use Prisma transaction to perform database operation
    await prisma.advertiserCommissionRowStatus.upsert({
      where: {
        id: data.id,
      },
      create: {
        id: data.id,
        description: data.description,
        metadatas: {
          createMany: {
            data: data.metadatas,
          },
        },
      },
      update: {}, // Empty update to prevent modifying existing data
    });
  }
}
