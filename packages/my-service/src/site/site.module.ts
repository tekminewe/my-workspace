import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { SiteResolver } from './site.resolver';
import { SiteSettingsResolver } from './site-settings.resolver';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [SiteService, SiteResolver, SiteSettingsResolver],
})
export class SiteModule {}
