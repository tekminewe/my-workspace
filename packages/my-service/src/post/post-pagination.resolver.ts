import { Args, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/auth/auth.decorator';
import { GetPostsArgs } from './post.args';
import { PostService } from './post.service';
import { PostsPagination } from './post.model';

@Resolver(() => PostsPagination)
export class PostsPaginationResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => PostsPagination)
  @Public()
  async postsPagination(@Args() args: GetPostsArgs) {
    const data = await this.postService.getPostsPagination({
      page: args.page,
      pageSize: args.pageSize,
      statusId: args.statusId,
    });

    return data;
  }
}
