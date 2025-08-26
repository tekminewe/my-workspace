import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ZenStackModule } from '@zenstackhq/server/nestjs';
import { ClsService } from 'nestjs-cls';
import { enhance } from '@zenstackhq/runtime';
import * as AWSXRay from 'aws-xray-sdk';
import { CURRENT_USER } from 'src/auth/auth.constant';
import { NotificationModule } from 'src/notification/notification.module';
import { SNSService } from 'src/notification/sns.service';

const zenStackModule = ZenStackModule.registerAsync({
  useFactory: (
    prisma: PrismaService,
    cls: ClsService,
    snsService: SNSService,
  ) => {
    return {
      getEnhancedPrisma: () =>
        enhance(
          prisma.$extends({
            query: {
              async $allOperations({ model, operation, args, query }) {
                const segment = AWSXRay.getSegment();
                if (!segment) {
                  return query(args);
                }
                const subsegment = segment.addNewSubsegment(
                  `prisma.${model ? `${model}.` : ''}${operation}`,
                );
                subsegment.addMetadata('args', args);
                try {
                  return await query(args);
                } catch (error) {
                  subsegment.addError(error);
                  throw error;
                } finally {
                  subsegment.close();
                }
              },
              advertiser: {
                async update({ args, query }) {
                  // Skip processing if no status change
                  if (!args.data?.status?.connect?.id && !args.data?.statusId) {
                    return query(args);
                  }

                  // Get the status ID from the update args
                  const newStatusId =
                    args.data?.status?.connect?.id || args.data?.statusId;

                  try {
                    // Get the original advertiser to compare status
                    const originalAdvertiser =
                      await prisma.advertiser.findUnique({
                        where: args.where,
                        select: {
                          id: true,
                          statusId: true,
                          slug: true,
                          metadatas: {
                            select: { name: true },
                            take: 1,
                          },
                        },
                      });

                    // Execute the update
                    const result = await query(args);

                    // Check if status has changed
                    if (
                      originalAdvertiser &&
                      originalAdvertiser.statusId !== newStatusId
                    ) {
                      const advertiserName =
                        originalAdvertiser.metadatas[0]?.name;

                      // Send notification via SNS
                      try {
                        await snsService.publishMessage({
                          subject: `Advertiser Status Changed: ${advertiserName}`,
                          message: {
                            id: originalAdvertiser.id,
                            name: advertiserName,
                            previousStatus: originalAdvertiser.statusId,
                            newStatus: newStatusId,
                            changedAt: new Date().toISOString(),
                          },
                          topicArn: process.env.ALERT_SNS_TOPIC_ARN,
                        });
                      } catch (error) {
                        console.error(
                          'Failed to send SNS notification for advertiser status change:',
                          error,
                        );
                        // Continue execution even if notification fails
                      }
                    }

                    return result;
                  } catch (error) {
                    console.error(
                      'Error in advertiser update extension:',
                      error,
                    );

                    return query(args);
                  }
                },
              },
              post: {
                async update({ args }) {
                  const [result] = await prisma.$transaction(async (tx) => {
                    const newPost = await tx.post.update(args);
                    const post = await tx.post.findFirst({
                      where: { id: newPost.id },
                    });
                    const lastVersion = await tx.postVersion.findFirst({
                      where: { postId: post.id },
                      orderBy: { version: 'desc' },
                    });
                    const { id, ...rest } = post;
                    const tags = await tx.tag.findMany({
                      where: {
                        posts: {
                          some: {
                            id: id,
                          },
                        },
                      },
                    });
                    if (lastVersion.statusId === post.statusId) {
                      await tx.postVersion.update({
                        where: { id: lastVersion.id },
                        data: {
                          ...rest,
                          postId: post.id,
                          tags: {
                            set: tags.map((tag) => ({ id: tag.id })),
                          },
                        },
                      });
                    } else {
                      await tx.postVersion.create({
                        data: {
                          ...rest,
                          version: lastVersion?.version + 1,
                          postId: post.id,
                          tags: {
                            connect: tags.map((tag) => ({ id: tag.id })),
                          },
                        },
                      });
                    }
                    return [post];
                  });

                  return result;
                },
                async create({ args }) {
                  const [result] = await prisma.$transaction(async (tx) => {
                    const newPost = await tx.post.create(args);
                    const post = await tx.post.findFirst({
                      where: { id: newPost.id },
                    });
                    const { id, ...rest } = post;
                    const tags = await tx.tag.findMany({
                      where: {
                        posts: {
                          some: {
                            id: id,
                          },
                        },
                      },
                    });
                    await tx.postVersion.create({
                      data: {
                        ...rest,
                        version: 1,
                        postId: post.id,
                        tags: {
                          connect: tags.map((tag) => ({ id: tag.id })),
                        },
                      },
                    });

                    return [post];
                  });

                  return result;
                },
              },
            },
          }),
          { user: cls.get(CURRENT_USER) },
        ),
    };
  },
  inject: [PrismaService, ClsService, SNSService],
  extraProviders: [PrismaService, SNSService],
});

@Module({
  imports: [zenStackModule, NotificationModule],
  providers: [PrismaService, ZenStackModule],
  exports: [PrismaService, zenStackModule],
})
export class PrismaModule {}
