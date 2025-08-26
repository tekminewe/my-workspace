import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Page, PageStatus } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PageDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  content: string;

  @ApiProperty()
  @Expose()
  slug: string;

  @ApiProperty({ enum: PageStatus })
  @Expose()
  status?: PageStatus;

  @ApiProperty()
  @Expose()
  publishDate: Date;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  editorVersion: number;

  @ApiPropertyOptional()
  @Expose()
  description: string;

  constructor(partial: Partial<Page>) {
    Object.assign(this, partial);
  }
}
