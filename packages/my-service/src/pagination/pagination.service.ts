import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  getPaginationCriteria = ({
    page,
    pageSize,
  }: {
    page?: number;
    pageSize?: number;
  }) => {
    const _page = page || 1;
    const _pageSize = pageSize || 25;
    return {
      skip: (_page - 1) * _pageSize,
      take: _pageSize,
    };
  };
}
