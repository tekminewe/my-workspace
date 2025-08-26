import { ApiProperty } from '@nestjs/swagger';
import {
  Advertiser,
  AdvertiserMetadata,
  UserCashback,
  UserCashbackStatusEnum,
} from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { toTwoDecimalPlaces } from 'src/number.utils';
import { PaginatedRequestDto } from 'src/pagination/pagination.dto';

export class GetUserCashbacksDto extends PaginatedRequestDto {}

@Exclude()
export class UserCashbackAdvertiserDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  constructor(
    partial: Partial<
      Advertiser & {
        metadata?: Partial<AdvertiserMetadata>;
      }
    >,
  ) {
    Object.assign(this, partial);
    this.name = partial.metadata?.name || '';
  }
}

@Exclude()
export class UserCashbackDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  advertiser: UserCashbackAdvertiserDto;

  @ApiProperty()
  @Expose()
  advertiserOrderId: string;

  @ApiProperty()
  @Expose()
  netAmount: number;

  @ApiProperty({ enum: UserCashbackStatusEnum })
  @Expose()
  statusId: UserCashbackStatusEnum;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  constructor(
    partial: Partial<
      UserCashback & {
        advertiser?: Partial<
          Advertiser & {
            metadata?: Partial<AdvertiserMetadata>;
          }
        >;
      }
    >,
  ) {
    Object.assign(this, partial);

    if (partial.advertiser) {
      this.advertiser = new UserCashbackAdvertiserDto(partial.advertiser);
    }
  }
}

@Exclude()
export class PendingBalanceDto {
  @ApiProperty()
  @Expose()
  pendingBalance: string;

  constructor(partial: Partial<{ pendingBalance: number }>) {
    Object.assign(this, partial);
    this.pendingBalance = toTwoDecimalPlaces(partial.pendingBalance || 0);
  }
}
