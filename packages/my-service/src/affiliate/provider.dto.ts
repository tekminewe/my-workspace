import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AffiliateProvider, AffiliateProviderEnum } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AffiliateProviderDto {
  @ApiProperty()
  @Expose()
  id: string;
  @ApiProperty()
  @Expose()
  name: string;

  constructor(partial: Partial<AffiliateProvider>) {
    Object.assign(this, partial);
  }
}

export class CreateAffiliateProviderDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ enum: () => AffiliateProviderEnum })
  id: AffiliateProviderEnum;
}

export class UpdateAffiliateProviderDto extends PartialType(
  CreateAffiliateProviderDto,
) {}
