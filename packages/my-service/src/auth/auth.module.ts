import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { UserModule } from '../user/user.module';
import { AuthS2SController } from './auth.s2s.controller';
import { AuthS2SService } from './auth.s2s.service';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LanguageModule } from 'src/language/language.module';
import { BonusModule } from 'src/bonus/bonus.module';

@Module({
  providers: [AuthGuard, AuthS2SService, AuthService],
  exports: [AuthService],
  imports: [UserModule, PrismaModule, LanguageModule, BonusModule],
  controllers: [AuthS2SController],
})
export class AuthModule {}
