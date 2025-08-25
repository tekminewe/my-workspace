import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [PrismaModule, AuthModule, EmailModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
