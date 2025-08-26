import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  AdvertiserCampaign,
  AdvertiserCampaignStatusEnum,
  AffiliateProviderEnum,
  LanguageEnum,
} from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { MediaDto } from 'src/media/media.dto';
import { IsArray, IsEnum, IsOptional, IsString, IsDate } from 'class-validator';

@Exclude()
export class AdvertiserCampaignMetadataDto {
  @ApiProperty()
  @Expose()
  name: string;

  @ApiPropertyOptional()
  @Expose()
  description?: string;

  @ApiPropertyOptional()
  @Expose()
  banner?: MediaDto;

  constructor(partial: Partial<AdvertiserCampaignMetadataDto>) {
    Object.assign(this, partial);
    if (partial.banner) {
      this.banner = new MediaDto(partial.banner);
    }
  }
}

@Exclude()
export class AdvertiserCampaignDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  advertiserId: string;

  @ApiProperty()
  @Expose()
  providerReferenceId: string;

  @ApiProperty()
  @Expose()
  providerId: string;

  @ApiProperty()
  @Expose()
  startDate: Date;

  @ApiProperty()
  @Expose()
  endDate: Date;

  @ApiProperty({ enum: AdvertiserCampaignStatusEnum })
  @Expose()
  statusId: AdvertiserCampaignStatusEnum;

  @ApiProperty()
  @Expose()
  url: string;

  @ApiProperty()
  @Expose()
  slug: string;

  @ApiProperty({ type: [AdvertiserCampaignMetadataDto] })
  @Expose()
  metadatas: AdvertiserCampaignMetadataDto[];

  constructor(
    partial: Partial<
      AdvertiserCampaign & {
        metadatas: AdvertiserCampaignMetadataDto[];
      }
    >,
  ) {
    Object.assign(this, partial);
    if (partial.metadatas) {
      this.metadatas = partial.metadatas.map(
        (metadata) => new AdvertiserCampaignMetadataDto(metadata),
      );
    }
  }
}

export class CreateAdvertiserCampaignMetadataDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  bannerFilePath?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  bannerFileMimeType?: string;

  @ApiProperty({ enum: LanguageEnum })
  @IsEnum(LanguageEnum)
  languageId: LanguageEnum;
}

export class CreateAdvertiserCampaignDto {
  @ApiProperty()
  @IsString()
  advertiserId: string;

  @ApiProperty()
  @IsString()
  providerReferenceId: string;

  @ApiProperty({ enum: AffiliateProviderEnum })
  @IsEnum(AffiliateProviderEnum)
  providerId: AffiliateProviderEnum;

  @ApiProperty()
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @IsDate()
  endDate: Date;

  @ApiProperty({ enum: AdvertiserCampaignStatusEnum })
  @IsEnum(AdvertiserCampaignStatusEnum)
  statusId: AdvertiserCampaignStatusEnum;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  voucherCodes?: string[];

  @ApiProperty({ type: [CreateAdvertiserCampaignMetadataDto] })
  @IsArray()
  metadatas: CreateAdvertiserCampaignMetadataDto[];
}

export class UpdateAdvertiserCampaignDto extends PartialType(
  CreateAdvertiserCampaignDto,
) {}
