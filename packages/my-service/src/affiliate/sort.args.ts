import { registerEnumType } from '@nestjs/graphql';

export enum SortByField {
  CreatedAt = 'createdAt',
  StartDate = 'startDate',
}

registerEnumType(SortByField, {
  name: 'SortByField',
  description: 'Fields to sort by',
});

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

registerEnumType(SortDirection, {
  name: 'SortDirection',
  description: 'Direction to sort',
});
