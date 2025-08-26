import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  UserWithdrawal,
  UserPaymentMethod,
  PaymentChannel,
  PaymentDirectionEnum,
  PaymentChannelTypeEnum,
  UserWithdrawalStatusEnum,
  PaymentChannelMetadata,
} from '@prisma/client';

@Exclude()
export class UserWithdrawalPaymentMethodPaymentChannelDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty({ enum: PaymentChannelTypeEnum })
  @Expose()
  type: PaymentChannelTypeEnum;

  @ApiProperty({ enum: PaymentDirectionEnum })
  @Expose()
  direction: PaymentDirectionEnum;

  constructor(
    partial: Partial<PaymentChannel & { metadata?: PaymentChannelMetadata }>,
  ) {
    Object.assign(this, partial);
    if (partial.metadata) {
      this.name = partial.metadata.name;
    }
  }
}

@Exclude()
export class UserWithdrawalPaymentMethodDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  accountName: string;

  @ApiProperty()
  @Expose()
  accountNumber?: string;

  @ApiProperty()
  @Expose()
  bankName?: string;

  @ApiProperty()
  @Expose()
  paypalEmail?: string;

  @ApiProperty()
  @Expose()
  isDefault: boolean;

  @ApiProperty()
  @Expose()
  paymentChannel: UserWithdrawalPaymentMethodPaymentChannelDto;

  constructor(
    partial: Partial<
      UserPaymentMethod & {
        paymentChannel: PaymentChannel & { metadata?: PaymentChannelMetadata };
      }
    >,
  ) {
    Object.assign(this, partial);
    this.accountName = partial.accountName
      ? partial.accountName.split(' ')[0].length > 5
        ? partial.accountName.slice(0, 5) + '**********'
        : partial.accountName.split(' ')[0] + '**********'
      : partial.accountName;
    this.accountNumber = '**********' + partial.accountNumber.slice(-4);
    if (partial.paymentChannel) {
      this.paymentChannel = new UserWithdrawalPaymentMethodPaymentChannelDto(
        partial.paymentChannel,
      );
    }
  }
}

@Exclude()
export class UserWithdrawalDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  amount: number;

  @ApiProperty({ enum: UserWithdrawalStatusEnum })
  @Expose()
  statusId: UserWithdrawalStatusEnum;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  paymentMethod: UserWithdrawalPaymentMethodDto;

  constructor(
    partial: Partial<
      UserWithdrawal & {
        paymentMethod: UserPaymentMethod & {
          paymentChannel: PaymentChannel & {
            metadata?: PaymentChannelMetadata;
          };
        };
      }
    >,
  ) {
    Object.assign(this, partial);
    if (partial.paymentMethod) {
      this.paymentMethod = new UserWithdrawalPaymentMethodDto(
        partial.paymentMethod,
      );
    }
  }
}
