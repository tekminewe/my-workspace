import { Module } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WithdrawalController } from './withdrawal.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PaginationModule } from 'src/pagination/pagination.module';

@Module({
  imports: [PrismaModule, AuthModule, PaginationModule],
  controllers: [WithdrawalController],
  providers: [WithdrawalService],
})
export class WithdrawalModule {}
