import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Post, PostStatus, PostTag } from './post.model';
import { PostService } from './post.service';
import { GetPostArgs, GetPostsArgs } from './post.args';
import { Permissions } from 'src/role/role.decorator';
import { PermissionEnum } from '@prisma/client';
import { CreatePostInput, UpdatePostInput } from './post.input';
import { AuthService } from 'src/auth/auth.service';
import { AllowIAM, Public } from 'src/auth/auth.decorator';
import { UserService } from 'src/user/user.service';
import { MediaService } from 'src/media/media.service';
import { Media } from 'src/media/media.model';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly mediaService: MediaService,
  ) {}

  @Query(() => [Post])
  @Public()
  async posts(@Args() args: GetPostsArgs) {
    return this.postService.getPosts({
      page: args.page,
      pageSize: args.pageSize,
      statusId: args.statusId,
    });
  }

  @Query(() => Post, { nullable: true })
  @Public()
  async post(@Args() args: GetPostArgs) {
    if (args.id) {
      return this.postService.getPost({ id: args.id });
    }

    return this.postService.getPostBySlug({ slug: args.slug });
  }

  @Mutation(() => Post)
  @AllowIAM()
  @Permissions(PermissionEnum.ManagePost)
  async createPost(@Args('data') data: CreatePostInput) {
    const user = this.authService.getCurrentUser();
    return this.postService.createPost({
      ...data,
      authorId: user.id,
      companyId: null,
    });
  }

  @Mutation(() => Post)
  @AllowIAM()
  @Permissions(PermissionEnum.ManagePost)
  async updatePost(
    @Args('id') id: string,
    @Args('data') data: UpdatePostInput,
  ) {
    return this.postService.updatePost(id, data);
  }

  @ResolveField('status', () => PostStatus)
  async metadatas(@Parent() post: Post) {
    const { statusId } = post;
    return this.postService.getPostStatus({
      id: statusId,
      languageId: await this.authService.getAcceptLanguage(),
    });
  }

  @ResolveField('tags', () => [PostTag])
  async tags(@Parent() post: Post) {
    const { id } = post;
    return this.postService.getPostTags({
      postId: id,
    });
  }

  @ResolveField('featuredImage', () => Media)
  async featuredImage(@Parent() post: Post) {
    const { featuredImageId } = post;
    if (!featuredImageId) {
      return null;
    }
    return this.mediaService.getMediaById(featuredImageId);
  }

  @ResolveField('ogImage', () => Media)
  async ogImage(@Parent() post: Post) {
    const { ogImageId } = post;
    if (!ogImageId) {
      return null;
    }
    return this.mediaService.getMediaById(ogImageId);
  }
}
