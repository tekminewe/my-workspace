import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Media } from '@prisma/client';

@Exclude()
export class MediaDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  url: string;

  @ApiProperty({ required: false })
  @Expose()
  caption?: string;

  @ApiProperty()
  @Expose()
  mimeType: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  filePath: string;

  constructor(partial: Partial<Media>) {
    Object.assign(this, {
      ...partial,
      url: `${process.env.MEDIA_URL}/${partial.filePath}`,
    });
  }
}
