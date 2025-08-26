import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Media, PaymentChannel, PaymentChannelMetadata } from '@prisma/client';
import { MediaDto } from 'src/media/media.dto';

@Exclude()
export class PaymentChannelDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  type: string;

  @ApiProperty()
  @Expose()
  direction: string;

  @ApiProperty({ type: MediaDto, required: false })
  @Expose()
  logo?: MediaDto;

  constructor(
    partial: Partial<
      PaymentChannel & { logo?: Media; metadata?: PaymentChannelMetadata }
    >,
  ) {
    Object.assign(this, partial);
    if (partial.metadata) {
      this.name = partial.metadata.name;
    }
    if (partial.logo) {
      this.logo = new MediaDto(partial.logo);
    }
  }
}
