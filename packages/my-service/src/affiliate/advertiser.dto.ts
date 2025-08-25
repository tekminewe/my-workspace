import { ApiProperty } from '@nestjs/swagger';
import {
  Advertiser,
  AdvertiserCampaign,
  AdvertiserCommission,
  AdvertiserCommissionRow,
  AdvertiserCommissionRowMetadata,
  AdvertiserCommissionTypeEnum,
  AdvertiserMetadata,
  Media,
  UserAdvertiserClick,
} from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { MediaDto } from 'src/media/media.dto';
import { AdvertiserCampaignDto } from './campaign.dto';
import { PaginatedRequestDto } from 'src/pagination/pagination.dto';

@Exclude()
export class AdvertiserCommissionRowDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  commission: number;

  @ApiProperty()
  @Expose()
  calculatedCommission: number;

  @ApiProperty({ enum: AdvertiserCommissionTypeEnum })
  @Expose()
  type: AdvertiserCommissionTypeEnum;

  @ApiProperty()
  advertiserCommissionId: string;

  constructor(
    partial: Partial<
      AdvertiserCommissionRow & {
        metadata?: AdvertiserCommissionRowMetadata;
        calculatedCommission?: number;
      }
    >,
  ) {
    Object.assign(this, partial);

    this.name = partial.metadata?.name ?? '';
    this.calculatedCommission =
      partial.calculatedCommission ?? partial.commission ?? 0;
  }
}

@Exclude()
export class AdvertiserCommissionDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  commission: number;

  @ApiProperty()
  @Expose()
  calculatedCommission: number;

  @ApiProperty({ type: [AdvertiserCommissionRowDto] })
  @Expose()
  commissionRows: AdvertiserCommissionRowDto[];

  @ApiProperty()
  @Expose()
  dayToValidate: number;

  @ApiProperty()
  @Expose()
  dayToPayout: number;

  @ApiProperty()
  @Expose()
  url: string;

  constructor(
    partial: Partial<
      AdvertiserCommission & {
        commissionRows?: (AdvertiserCommissionRow & {
          metadata?: AdvertiserCommissionRowMetadata;
          calculatedCommission?: number;
        })[];
      }
    >,
  ) {
    Object.assign(this, partial);

    if (partial.commissionRows) {
      this.commissionRows = partial.commissionRows.map(
        (row) => new AdvertiserCommissionRowDto(row),
      );
    }

    // Calculate max commission from commission rows
    this.commission = Math.max(
      ...this.commissionRows.map((row) => row.commission),
    );

    // Calculate max calculated commission from commission rows
    this.calculatedCommission = Math.max(
      ...this.commissionRows.map((row) => row.calculatedCommission),
    );
  }
}

@Exclude()
export class AdvertiserDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  slug: string;

  @ApiProperty()
  @Expose()
  logo: MediaDto;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  campaigns: AdvertiserCampaignDto[];

  @ApiProperty()
  @Expose()
  commission: AdvertiserCommissionDto;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  constructor(
    partial: Partial<
      Advertiser & {
        logo?: Media;
        metadata?: AdvertiserMetadata;
        campaigns?: AdvertiserCampaign[];
        commission?: AdvertiserCommission & {
          commissionRows?: (AdvertiserCommissionRow & {
            metadata?: AdvertiserCommissionRowMetadata;
          })[];
        };
      }
    >,
  ) {
    Object.assign(this, partial);
    this.name = partial.metadata?.name || '';
    this.description = partial.metadata?.description || '';

    if (partial.logo) {
      this.logo = new MediaDto(partial.logo);
    }

    if (partial.campaigns) {
      this.campaigns = partial.campaigns.map(
        (campaign) => new AdvertiserCampaignDto(campaign),
      );
    }

    if (partial.commission) {
      this.commission = new AdvertiserCommissionDto(partial.commission);
    }
  }
}

export class GetAdvertisersDto extends PaginatedRequestDto {}

@Exclude()
export class CreateAdvertiserClickResponseDto {
  @ApiProperty()
  @Expose()
  url: string;

  constructor(partial: Partial<{ url: string }>) {
    Object.assign(this, partial);
  }
}

export class GetUserAdvertiserClickDto extends PaginatedRequestDto {}

@Exclude()
export class UserAdvertiserClickAdvertiserDto {
  @Expose()
  @ApiProperty()
  name: string;

  constructor(
    partial: Partial<Advertiser & { metadata?: Partial<AdvertiserMetadata> }>,
  ) {
    Object.assign(this, partial);
    if (partial.metadata) {
      this.name = partial.metadata.name;
    }
  }
}

@Exclude()
export class UserAdvertiserClickDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  advertiser: UserAdvertiserClickAdvertiserDto;

  @Expose()
  @ApiProperty()
  clickedAt: Date;

  constructor(
    partial: Partial<
      UserAdvertiserClick & {
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
      this.advertiser = new UserAdvertiserClickAdvertiserDto(
        partial.advertiser,
      );
    }
  }
}
