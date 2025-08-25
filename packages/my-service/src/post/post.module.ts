import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { AuthModule } from 'src/auth/auth.module';
import { RoleModule } from 'src/role/role.module';
import { PostResolver } from './post.resolver';
import { PostsPaginationResolver } from './post-pagination.resolver';
import { UserModule } from 'src/user/user.module';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [
    PrismaModule,
    PaginationModule,
    AuthModule,
    RoleModule,
    UserModule,
    MediaModule,
  ],
  controllers: [TagController],
  providers: [PostService, PostResolver, PostsPaginationResolver, TagService],
})
export class PostModule {}
