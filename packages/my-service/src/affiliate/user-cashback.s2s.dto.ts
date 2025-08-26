import { CurrencyEnum } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNumber } from 'class-validator';

export class ProcessUserCashbackDto {
  @ApiProperty()
  @IsString()
  userClickId: string;

  @ApiProperty()
  @IsString()
  providerReferenceId: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  advertiserOrderId: string;

  @ApiProperty({ enum: CurrencyEnum })
  @IsEnum(CurrencyEnum)
  currencyId: CurrencyEnum;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  date: string;
}
