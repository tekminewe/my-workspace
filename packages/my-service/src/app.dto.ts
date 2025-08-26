import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginationDto } from './pagination/pagination.dto';

export class OkResponseDto<T> {
  @ApiProperty()
  @Expose()
  public readonly data: T;
  constructor(args: { data: T }) {
    this.data = args.data;
  }
}

export class PaginatedOkResponse<T> extends OkResponseDto<T> {
  @ApiProperty()
  @Expose()
  public readonly pagination: PaginationDto;

  constructor({ data, pagination }: { data: T; pagination: PaginationDto }) {
    super({ data });

    this.pagination = pagination;
  }
}

export class ErrorResponse {
  constructor(
    readonly error: {
      message: string;
      code: number;
    },
  ) {}
}
