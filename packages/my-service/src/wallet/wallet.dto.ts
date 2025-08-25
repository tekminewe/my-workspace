import { ApiProperty } from '@nestjs/swagger';
import {
  CurrencyEnum,
  UserWalletTransactionTypeEnum,
  UserWallet,
  UserWithdrawal,
} from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { toTwoDecimalPlaces } from 'src/number.utils';

export enum WalletErrorCodesEnum {
  InvalidWallet = 'invalidWallet',
  InvalidPaymentMethod = 'invalidPaymentMethod',
  InsufficientBalance = 'insufficientBalance',
  ExceedMaximumAmount = 'exceedMaximumAmount',
  BelowMinimumAmount = 'belowMinimumAmount',
  UnsupportedCurrency = 'unsupportedCurrency',
}

export class CreateUserWalletDto {
  @ApiProperty()
  currency: CurrencyEnum;
}

export class CreateUserWalletTransactionDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    enum: CurrencyEnum,
  })
  @IsEnum(CurrencyEnum)
  currency: CurrencyEnum;

  @ApiProperty({
    enum: UserWalletTransactionTypeEnum,
  })
  @IsEnum(UserWalletTransactionTypeEnum)
  transactionType: UserWalletTransactionTypeEnum;

  @ApiProperty({ required: false })
  @IsString()
  referenceId: string;

  @ApiProperty({ required: false })
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  extra?: string;
}

export class GetUserWalletDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty({
    enum: CurrencyEnum,
  })
  @IsEnum(CurrencyEnum)
  currency: CurrencyEnum;
}

@Exclude()
export class WalletDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  currencyCode: CurrencyEnum;

  @ApiProperty()
  @Expose()
  balance: string;

  constructor(partial: Partial<UserWallet>) {
    Object.assign(this, partial);
    this.balance = toTwoDecimalPlaces(partial.balance || 0);
  }
}

export class CreateUserWithdrawalDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  userPaymentMethodId: string;
}

@Exclude()
export class UserWithdrawalDto {
  @ApiProperty()
  @Expose()
  id: string;

  constructor(partial: Partial<UserWithdrawal>) {
    Object.assign(this, partial);
  }
}
