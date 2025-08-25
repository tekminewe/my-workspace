export type PaginatedParams<T> = T & {
  pageSize?: number;
  page?: number;
};
