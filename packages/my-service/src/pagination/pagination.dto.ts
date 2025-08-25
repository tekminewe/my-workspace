import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class PaginationDto {
  @ApiProperty()
  @Expose()
  public readonly nextPage?: number;
  @ApiProperty()
  @Expose()
  public readonly previousPage?: number;
  @ApiProperty()
  @Expose()
  public readonly totalPages: number;
  @ApiProperty()
  @Expose()
  public readonly totalItems: number;
  @ApiProperty()
  @Expose()
  public readonly currentPage: number;
  @ApiProperty()
  @Expose()
  public readonly pageSize: number;

  constructor(totalItems: number, currentPage: number, pageSize: number) {
    this.totalPages = Math.ceil(totalItems / pageSize);
    this.nextPage = currentPage + 1 > this.totalPages ? null : currentPage + 1;
    this.previousPage = currentPage - 1 < 1 ? null : currentPage - 1;
    this.totalItems = totalItems;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
  }
}

@Exclude()
export class PaginatedRequestDto {
  @ApiProperty()
  @Expose()
  public readonly page: number;

  @ApiProperty()
  @Expose()
  public readonly pageSize: number;

  constructor({ page, pageSize }: { page: number; pageSize: number }) {
    this.page = page;
    this.pageSize = pageSize;
  }
}
