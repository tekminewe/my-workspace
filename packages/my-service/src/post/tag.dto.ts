import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TagDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  constructor(partial: Partial<TagDto>) {
    Object.assign(this, partial);
  }
}

export class SearchTagDto {
  @ApiPropertyOptional()
  name?: string;
}
