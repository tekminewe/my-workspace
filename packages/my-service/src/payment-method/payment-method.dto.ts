import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  UserPaymentMethod,
  PaymentDirectionEnum,
  PaymentChannel,
  Media,
} from '@prisma/client';
import { MediaDto } from 'src/media/media.dto';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsObject,
} from 'class-validator';

export enum CreateUserPaymentMethodErrorCodesEnum {
  InvalidPaymentChannel = 'invalidPaymentChannel',
  InvalidPaymentDirection = 'invalidPaymentDirection',
  ExceedNumOfUserPaymentMethod = 'exceedNumOfUserPaymentMethod',
}

@Exclude()
export class UserPaymentMethodPaymentChannelDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty({
    type: MediaDto,
    required: false,
  })
  @Expose()
  logo?: MediaDto;

  @ApiProperty()
  @Expose()
  minAmount: number;

  @ApiProperty()
  @Expose()
  maxAmount: number;

  constructor(partial: Partial<PaymentChannel & { logo?: Media }>) {
    Object.assign(this, partial);
    if (partial.logo) {
      this.logo = new MediaDto(partial.logo);
    }
  }
}

@Exclude()
export class UserPaymentMethodDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty({ type: UserPaymentMethodPaymentChannelDto })
  @Expose()
  @Type(() => UserPaymentMethodPaymentChannelDto)
  paymentChannel: UserPaymentMethodPaymentChannelDto;

  @ApiProperty({ enum: PaymentDirectionEnum })
  @Expose()
  direction: PaymentDirectionEnum;

  @ApiProperty()
  @Expose()
  accountName: string;

  @ApiProperty()
  @Expose()
  accountNumber?: string;

  constructor(
    partial: Partial<UserPaymentMethod & { paymentChannel: PaymentChannel }>,
  ) {
    Object.assign(this, partial);
    this.accountName = partial.accountName
      ? partial.accountName.split(' ')[0].length > 5
        ? partial.accountName.slice(0, 5) + '**********'
        : partial.accountName.split(' ')[0] + '**********'
      : partial.accountName;
    this.accountNumber = '**********' + partial.accountNumber.slice(-4);
    if (partial.paymentChannel) {
      this.paymentChannel = new UserPaymentMethodPaymentChannelDto(
        partial.paymentChannel,
      );
    }
  }
}

export class CreateUserPaymentMethodDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  paymentChannelId: string;

  @ApiProperty({ enum: PaymentDirectionEnum })
  @IsNotEmpty()
  @IsEnum(PaymentDirectionEnum)
  direction: PaymentDirectionEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  accountNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  swiftCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  paypalEmail?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  extra?: Record<string, any>;
}

export class DeletePaymentMethodResponseDto {
  success: boolean;
}
