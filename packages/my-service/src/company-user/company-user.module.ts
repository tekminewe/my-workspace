import { Module } from '@nestjs/common';
import { CompanyUserController } from './company-user.controller';
import { CompanyUserService } from './company-user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [CompanyUserController],
  providers: [CompanyUserService],
})
export class CompanyUserModule {}
