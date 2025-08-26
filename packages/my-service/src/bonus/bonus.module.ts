import { forwardRef, Module } from '@nestjs/common';
import { BonusService } from './bonus.service';
import { BonusResolver, BonusTransactionResolver } from './bonus.resolver';
import { BonusTypeResolver } from './bonus-type.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  providers: [
    BonusService,
    BonusResolver,
    BonusTransactionResolver,
    BonusTypeResolver,
  ],
  exports: [BonusService],
})
export class BonusModule {}
