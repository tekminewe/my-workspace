import { Module } from '@nestjs/common';
import { PaymentChannelService } from './payment-channel.service';
import { PaymentChannelController } from './payment-channel.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PaymentChannelController],
  providers: [PaymentChannelService],
})
export class PaymentChannelModule {}
