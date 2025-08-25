'use client';

import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '../button';
import { Drawer, DrawerRoot, DrawerTrigger } from '../drawer';
import { Select } from '../select';
import { FormEvent, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { DateInput } from '../date-input';
import { cn } from '../utils';
import { Badge } from '../badge';
import { DrawerTitle } from '../drawer/drawer-title';
import { SURFACE_COLORS } from '../utils/component-colors';

interface IDataTableFilterColumnOption {
  value: string;
  label: string;
}

interface IDataTableFilterColumn<T> {
  label: string;
  type: 'date';
  key: keyof T;
  value?: string;
}

interface IDataTableFilterColumnSelect<T> {
  label: string;
  type: 'select';
  key: keyof T;
  value?: string;
  options: IDataTableFilterColumnOption[];
}

type DataTableFilterColumnsType<T> =
  | IDataTableFilterColumnSelect<T>
  | IDataTableFilterColumn<T>;

export interface IDataTableFilterState {
  [name: string]: string | undefined;
}

export interface IDataTableFilterProps<T> {
  columns: DataTableFilterColumnsType<T>[];
  onSubmit?: (data: T) => void;
}

export const Filter = <T extends IDataTableFilterState>({
  columns,
  onSubmit,
}: IDataTableFilterProps<T>) => {
  const [filterState, setFilterState] = useState(() => {
    return columns.reduce((state, column) => {
      state[column.key] = column.value as T[keyof T];
      return state;
    }, {} as T);
  });
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const filterCount = columns.filter(
    (column) => column.value !== undefined,
  ).length;
  const hasFilter = filterCount > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setOpen(false);
    onSubmit?.(filterState);
  };

  return (
    <DrawerRoot
      open={open}
      onOpenChange={setOpen}
      direction={isDesktop ? 'right' : 'bottom'}
    >
      <div className="flex">
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            className={cn({
              '!bg-[--focus-a3] ': hasFilter,
            })}
          >
            <MixerHorizontalIcon /> Filter
            {hasFilter && <Badge variant="solid">{filterCount}</Badge>}
          </Button>
        </DrawerTrigger>
      </div>
      <Drawer
        className={cn(
          SURFACE_COLORS.surfaceElevated,
          'fixed bottom-0 left-0 md:left-auto md:h-screen md:w-80 right-0 p-4 rounded-t-2 md:rounded-none',
        )}
      >
        <DrawerTitle>
          <MixerHorizontalIcon width="18" height="18" />
          Filter
        </DrawerTitle>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {columns.map((column, index) => {
            switch (column.type) {
              case 'select':
                return (
                  <Select
                    onChange={(value) =>
                      setFilterState((state) => ({
                        ...state,
                        [String(column.key)]: value,
                      }))
                    }
                    value={filterState[column.key]}
                    label={column.label}
                    key={index}
                    options={column.options}
                  />
                );

              case 'date':
                return (
                  <DateInput
                    onChange={(value) =>
                      setFilterState((state) => ({
                        ...state,
                        [String(column.key)]: value?.toISOString(),
                      }))
                    }
                    value={
                      filterState[column.key]
                        ? new Date(filterState[column.key] ?? '')
                        : undefined
                    }
                    label={column.label}
                    key={index}
                  />
                );

              default:
                return null;
            }
          })}
          <div className="flex justify-end">
            <Button type="submit">Filter</Button>
          </div>
        </form>
      </Drawer>
    </DrawerRoot>
  );
};
