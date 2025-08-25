import { Inject, Injectable } from '@nestjs/common';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PaginatedParamsType } from 'src/pagination/pagination.types';
import { PaginationDto } from 'src/pagination/pagination.dto';
import {
  LanguageEnum,
  PostStatusEnum,
  PostTypeEnum,
  Prisma,
} from '@prisma/client';
import * as dayjs from 'dayjs';
import { CreatePostInput, UpdatePostInput } from './post.input';
import { DefaultArgs } from '@prisma/client/runtime/library';

@Injectable()
export class PostService {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly db: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async getPosts({
    page,
    pageSize,
    statusId,
  }: PaginatedParamsType & {
    statusId?: PostStatusEnum;
  }) {
    const paginationParams = this.paginationService.getPaginationCriteria({
      page,
      pageSize,
    });

    if (statusId !== PostStatusEnum.Published) {
      const whereClause: Prisma.PostWhereInput = {};
      if (statusId) {
        whereClause.statusId = statusId;
      }
      const result = await this.db.post.findMany({
        ...paginationParams,
        where: whereClause,
        include: {
          featuredImage: true,
          ogImage: true,
          tags: true,
        },
        orderBy: {
          postDate: 'desc',
        },
      });

      return result;
    }

    const resultIds: { id: string }[] = await this.db.$queryRaw`
      SELECT pv.id
      FROM "PostVersion" pv
      INNER JOIN (
        SELECT "postId", MAX("version") AS latest_version
        FROM "PostVersion"
        WHERE 1=1 AND "statusId" = CAST(${statusId}::text AS "PostStatusEnum")
        GROUP BY "postId"
      ) latest ON pv."postId" = latest."postId" AND pv."version" = latest.latest_version
      ORDER BY pv."postDate" DESC
      LIMIT ${paginationParams.take}
      OFFSET ${paginationParams.skip};
`;
    const result = await this.db.postVersion.findMany({
      where: {
        id: {
          in: resultIds.map((r) => r.id),
        },
      },
      include: {
        featuredImage: true,
        ogImage: true,
        tags: true,
      },
      orderBy: {
        postDate: 'desc',
      },
    });

    return result;
  }

  async getPostsPagination({
    page,
    pageSize,
    statusId,
  }: PaginatedParamsType & {
    statusId?: PostStatusEnum;
  }) {
    const paginationParams = this.paginationService.getPaginationCriteria({
      page,
      pageSize,
    });

    if (statusId !== PostStatusEnum.Published) {
      const whereClause: Prisma.PostWhereInput = {};
      if (statusId) {
        whereClause.statusId = statusId;
      }
      const totalCount = await this.db.post.count({
        ...paginationParams,
        where: whereClause,
      });

      return new PaginationDto(totalCount, page, pageSize);
    }

    const countResults: { count: number }[] = await this.db.$queryRaw`
      SELECT COUNT(pv.id) as count
      FROM "PostVersion" pv
      INNER JOIN (
        SELECT "postId", MAX("version") AS latest_version
        FROM "PostVersion"
        WHERE 1=1 AND "statusId" = CAST(${statusId}::text AS "PostStatusEnum")
        GROUP BY "postId"
      ) latest ON pv."postId" = latest."postId" AND pv."version" = latest.latest_version;
`;

    return new PaginationDto(Number(countResults[0].count), page, pageSize);
  }

  async getPost({ id }: { id: string }) {
    const result = await this.db.post.findFirst({
      where: {
        id,
      },
      include: {
        featuredImage: true,
        ogImage: true,
        tags: true,
      },
    });

    return result;
  }

  async getPostBySlug({ slug }: { slug: string }) {
    const result = await this.db.postVersion.findFirst({
      where: {
        post: {
          slug,
        },
        statusId: PostStatusEnum.Published,
      },
      include: {
        featuredImage: true,
        ogImage: true,
        tags: true,
      },
      orderBy: {
        version: 'desc',
      },
    });

    return result !== null ? result : null;
  }

  createPost({
    title,
    slug,
    content,
    featuredImageId,
    editorVersion,
    authorId,
    companyId,
    postTypeId,
    description,
  }: CreatePostInput & {
    authorId: string;
    companyId: string;
  }) {
    let featureImageQuery = {};
    if (featuredImageId) {
      featureImageQuery = {
        featuredImageId,
        ogImageId: featuredImageId,
      };
    }
    const finalTitle = title ?? 'Untitled';
    const defaultSlug =
      slug ??
      dayjs().format('YYYY-MM-DD-HH-mm-ss') +
        finalTitle
          .replace(/[^\w\s]/gi, '')
          .replaceAll(' ', '-')
          .toLowerCase();

    return this.db.post.create({
      data: {
        title: finalTitle,
        slug: slug ?? defaultSlug,
        content: content ?? '',
        editorVersion: editorVersion ?? 1,
        statusId: PostStatusEnum.Draft,
        postTypeId: postTypeId ?? PostTypeEnum.Blog,
        description,
        companyId,
        authorId,
        ogDescription: description,
        ogTitle: finalTitle,
        ...featureImageQuery,
      },
    });
  }

  async updatePost(id: string, data: UpdatePostInput) {
    const { featuredImageId, tags, statusId, postTypeId, ...restData } = data;
    const existingPost = await this.db.post.findUnique({
      where: {
        id,
      },
    });
    let featureImageQuery = {};

    if (featuredImageId) {
      featureImageQuery = {
        featuredImage: {
          connect: {
            id: featuredImageId,
          },
        },
        ogImage: {
          connect: {
            id: featuredImageId,
          },
        },
      };
    }

    const updateData: Prisma.PostUpdateInput = {
      ...restData,
      status: {
        connect: {
          id: statusId || PostStatusEnum.Draft,
        },
      },
      postType: {
        connect: {
          id: postTypeId || existingPost.postTypeId,
        },
      },
      ogDescription: restData.description,
      ogTitle: restData.title,
      ...featureImageQuery,
    };

    if (tags) {
      updateData.tags = {
        set: [],
        connectOrCreate: tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag, companyId: existingPost.companyId },
        })),
      };
    }

    return this.db.post.update({
      where: {
        id: id,
      },
      data: updateData,
      include: {
        featuredImage: true,
        ogImage: true,
        tags: true,
      },
    });
  }

  async getPostStatus({
    id,
    languageId,
  }: {
    id: PostStatusEnum;
    languageId?: LanguageEnum;
  }) {
    let metadataWhere: boolean | Prisma.PostStatus$metadatasArgs<DefaultArgs> =
      true;
    if (languageId) {
      metadataWhere = {
        where: {
          languageId,
        },
      };
    }
    const result = await this.db.postStatus.findFirst({
      where: {
        id,
      },
      include: {
        metadatas: metadataWhere,
      },
    });

    return {
      ...result,
      name: result?.metadatas[0]?.name ?? '',
    };
  }

  async getPostTags({ postId }: { postId: string }) {
    const results = await this.db.tag.findFirst({
      where: {
        posts: {
          some: {
            id: postId,
          },
        },
      },
    });

    return results;
  }
}
