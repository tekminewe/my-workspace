import { ApiProperty } from '@nestjs/swagger';
import {
  AdvertiserCampaign,
  AdvertiserCampaignStatusEnum,
  Media,
} from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { MediaDto } from 'src/media/media.dto';

@Exclude()
export class AdvertiserCampaignDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  voucherCodes: string[];

  @ApiProperty()
  @Expose()
  startDate: Date;

  @ApiProperty()
  @Expose()
  endDate: Date;

  @ApiProperty()
  @Expose()
  banner: MediaDto;

  @ApiProperty()
  @Expose()
  status: AdvertiserCampaignStatusEnum;

  @ApiProperty()
  @Expose()
  slug: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  constructor(
    partial: Partial<
      AdvertiserCampaign & {
        banner?: Media;
      }
    >,
  ) {
    Object.assign(this, partial);

    if (partial.banner) {
      this.banner = new MediaDto(partial.banner);
    }
  }
}
