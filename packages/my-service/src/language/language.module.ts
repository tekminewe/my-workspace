import { Module } from '@nestjs/common';
import { LanguageResolver } from './language.resolver';
import { LanguageService } from './language.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [LanguageService],
  providers: [LanguageService, LanguageResolver],
})
export class LanguageModule {}
