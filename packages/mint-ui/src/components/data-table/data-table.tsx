'use client';

import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { MouseEventHandler, ReactNode, useMemo } from 'react';
import { Pagination } from './pagination';
import { Filter, IDataTableFilterState, IDataTableFilterProps } from './filter';
import { Title, Text } from '../typography';
import { Card } from '../card';
import { Button } from '../button';
import { utils, writeFile } from 'xlsx';
import { LuDownload } from 'react-icons/lu';
import { cn } from '../utils';
import {
  SURFACE_COLORS,
  TEXT_COLORS,
  BORDER_COLORS,
  INTERACTION_COLORS,
  SKELETON_COLORS,
} from '../utils/component-colors';

export type IDataTableColumn<T> =
  | IDataTableColumnWithDataKey<T>
  | IDataTableColumnWithoutDataKey<T>;

export interface IDataTableColumnWithDataKey<T> {
  dataKey: keyof T;
  label: string;
  formatValueForExport?: (options: { value: T[keyof T] }) => string | number;
  renderCell?: (options: { value: T[keyof T]; rowIndex: number }) => ReactNode;
}

export interface IDataTableColumnWithoutDataKey<T> {
  dataKey: undefined;
  formatValueForExport?: (options: { value: T }) => string | number;
  label: string;
  renderCell?: (options: { value: T; rowIndex: number }) => ReactNode;
}

export interface IDataTableProps<T, F> {
  columns: IDataTableColumn<T>[];
  data: T[];
  variant?: 'ghost' | 'surface';
  page?: number;
  totalCount?: number;
  pageSize?: number;
  filters?: IDataTableFilterProps<F>;
  onPaginationChange?: (pagination: { page: number }) => void;
  onFilterSubmit?: (data: F) => void;
  emptyText?: string;
  emptyTitle?: string;
  allowExport?: boolean;
  exportDataRequest?: () => Promise<T[]> | T[];
  exportFileName?: string;
  isLoading?: boolean;
  showAddButton?: boolean;
  addButtonLabel?: string;
  onAddButtonClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Maximum height for the table container. When content exceeds this height, vertical scrolling will be enabled.
   * @example "400px" | "50vh"
   */
  maxHeight?: string;
  /**
   * Enable sticky header when scrolling vertically
   * @default true
   */
  stickyHeader?: boolean;
}

export const DataTable = <T extends object, F extends IDataTableFilterState>({
  columns,
  data,
  variant = 'ghost',
  page = 1,
  pageSize = 25,
  onPaginationChange = () => {
    // Do nothinng
  },
  totalCount = 0,
  filters,
  onFilterSubmit,
  emptyText = 'There are no data found at the moment',
  emptyTitle = 'No data',
  allowExport = false,
  exportDataRequest,
  exportFileName = 'Data',
  isLoading,
  showAddButton = false,
  addButtonLabel = 'Add',
  onAddButtonClick,
  maxHeight,
  stickyHeader = true,
}: IDataTableProps<T, F>) => {
  const colummDefs = useMemo(() => {
    const columnHelper = createColumnHelper<T>();

    return columns.map((c) => {
      return columnHelper.accessor(
        (row: T) => (c.dataKey ? row[c.dataKey] : row),
        {
          id: String(c.dataKey ?? c.label),
          header: () => <span>{c.label}</span>,

          cell: (info) => {
            return c.renderCell
              ? c.renderCell({
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  value: info.getValue(),
                  rowIndex: info.row.index,
                })
              : info.renderValue();
          },
        },
      );
    });
  }, [columns]);

  const table = useReactTable<T>({
    data,
    columns: colummDefs,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: {
      pagination: {
        pageSize,
        pageIndex: page - 1,
      },
    },
    onPaginationChange: (updater) => {
      const oldState = {
        pageSize,
        pageIndex: page - 1,
      };
      if (typeof updater === 'function') {
        const newState = updater(oldState);
        onPaginationChange({
          page: newState.pageIndex + 1,
        });
      } else {
        onPaginationChange({
          page: oldState.pageIndex + 1,
        });
      }
    },
    rowCount: totalCount,
  });

  const handleExportClick = async () => {
    const data = await exportDataRequest?.();
    if (!data) {
      return;
    }
    const exportData = data.map((d) => {
      return columns.reduce((data, column) => {
        if (column.dataKey) {
          const value = d[column.dataKey];
          data[column.label] = column.formatValueForExport
            ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              column.formatValueForExport({ value })
            : `${value}`;
        } else {
          data[column.label] = column.formatValueForExport
            ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              column.formatValueForExport({ value: d })
            : '';
        }
        return data;
      }, {} as Record<string, string | number>);
    });

    const worksheet = utils.json_to_sheet(exportData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Data');
    writeFile(workbook, `${exportFileName}.xlsx`, { compression: true });
  };

  const hasData = table.getRowModel().rows.length > 0;
  const showActions = filters || allowExport || showAddButton;

  return (
    <div>
      {showActions && (
        <div className="flex items-center justify-end gap-6 mr-4 mb-4">
          {filters && <Filter<F> onSubmit={onFilterSubmit} {...filters} />}
          {allowExport && (
            <Button variant="ghost" onClick={handleExportClick}>
              <LuDownload />
              Export
            </Button>
          )}
          {showAddButton && (
            <Button onClick={onAddButtonClick}>{addButtonLabel}</Button>
          )}
        </div>
      )}
      <Card>
        <div
          className={cn('overflow-x-auto', maxHeight && 'overflow-y-auto')}
          style={{ maxHeight }}
        >
          <table
            className={cn(
              'w-full border-collapse',
              variant === 'ghost'
                ? 'bg-transparent'
                : SURFACE_COLORS.surfaceElevated,
            )}
          >
            <thead
              className={cn(stickyHeader && maxHeight && 'sticky top-0 z-10')}
            >
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <tr
                    key={headerGroup.id}
                    className={cn(
                      'border-b',
                      BORDER_COLORS.default,
                      stickyHeader &&
                        maxHeight && [
                          variant === 'ghost'
                            ? SURFACE_COLORS.surface
                            : SURFACE_COLORS.surfaceElevated,
                        ],
                    )}
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          className={cn(
                            'px-4 py-3 text-left text-xs font-medium uppercase tracking-wider',
                            TEXT_COLORS.muted,
                          )}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            {isLoading && (
              <tbody>
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-6 text-center"
                  >
                    <div className="space-y-4">
                      <div
                        className={cn(
                          'animate-pulse w-full h-6 rounded',
                          SKELETON_COLORS.primary,
                        )}
                      ></div>
                      <div
                        className={cn(
                          'animate-pulse w-full h-6 rounded',
                          SKELETON_COLORS.primary,
                        )}
                      ></div>
                      <div
                        className={cn(
                          'animate-pulse w-full h-6 rounded',
                          SKELETON_COLORS.primary,
                        )}
                      ></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
            {!isLoading && hasData && (
              <tbody
                className={cn(
                  SURFACE_COLORS.surfaceElevated,
                  'divide-y',
                  BORDER_COLORS.default,
                )}
              >
                {table.getRowModel().rows.map((row) => {
                  return (
                    <tr
                      key={row.id}
                      className={cn(
                        INTERACTION_COLORS.hover,
                        'transition-colors',
                      )}
                    >
                      {row.getVisibleCells().map((cell, i) => {
                        const isFirstCell = i === 0;
                        return (
                          <td
                            key={cell.id}
                            className={cn(
                              'px-4 py-4 whitespace-nowrap text-sm',
                              isFirstCell
                                ? cn('font-medium', TEXT_COLORS.primary)
                                : TEXT_COLORS.muted,
                            )}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
        {!isLoading && hasData && <Pagination table={table} />}
        {!isLoading && !hasData && (
          <div className="flex flex-col items-center py-8">
            <img
              alt="No data"
              src="/assets/ui/404.png"
              width="300"
              height="300"
            />
            <Title className="mt-4 mb-2">{emptyTitle}</Title>
            <Text>{emptyText}</Text>
          </div>
        )}
      </Card>
    </div>
  );
};
