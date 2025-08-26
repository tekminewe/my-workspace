import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { Media } from './media.model';
import { MediaResolver } from './media.resolver';

@Module({
  exports: [MediaService],
  imports: [PrismaModule, AuthModule],
  controllers: [MediaController],
  providers: [MediaService, Media, MediaResolver],
})
export class MediaModule {}
