import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProfileController],
  imports: [PrismaModule, AuthModule],
  providers: [ProfileService],
})
export class ProfileModule {}
