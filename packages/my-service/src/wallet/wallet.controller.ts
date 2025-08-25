import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import {
  CreateUserWithdrawalDto,
  UserWithdrawalDto,
  WalletDto,
  WalletErrorCodesEnum,
} from './wallet.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiDefinition } from 'src/api-definition.decorator';
import { AuthService } from 'src/auth/auth.service';
import { CurrencyEnum } from '@prisma/client';

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly authService: AuthService,
  ) {}

  @ApiDefinition({
    description: 'Get wallet by currency code',
    operationId: 'getWalletByCurrencyCode',
    responseType: WalletDto,
  })
  @Get(':currencyCode')
  async getWalletByCurrencyCode(@Param('currencyCode') currencyCode: string) {
    const currentUser = this.authService.getCurrentUser();
    const wallet = await this.walletService.getUserWallet({
      userId: currentUser.id,
      currency: currencyCode as CurrencyEnum,
    });
    return wallet;
  }

  @ApiDefinition({
    description: 'Create user withdrawal',
    operationId: 'createUserWithdrawal',
    responseType: UserWithdrawalDto,
    badRequestErrorCodes: WalletErrorCodesEnum,
  })
  @Post(':userWalletId/withdrawals')
  async createUserWithdrawal(
    @Param('userWalletId') userWalletId,
    @Body() body: CreateUserWithdrawalDto,
  ) {
    const currentUser = this.authService.getCurrentUser();
    const withdrawal = await this.walletService.createWithdrawalTransaction({
      ...body,
      userWalletId,
      userId: currentUser.id,
    });
    return withdrawal;
  }
}
