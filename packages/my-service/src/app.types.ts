export type PaginatedParamsType<T> = {
  page?: number;
  pageSize?: number;
} & T;
