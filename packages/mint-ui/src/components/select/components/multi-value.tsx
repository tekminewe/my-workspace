'use client';

import { MultiValueProps } from 'react-select';
import { GroupBase } from 'react-select';
import { SelectOption } from '../select';
import { cn } from '../../utils';

export const MultiValue = <
  IsMulti extends boolean = false,
  Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
>({
  children,
  innerProps,
  selectProps,
}: MultiValueProps<SelectOption, IsMulti, Group>) => {
  const { size } = selectProps as any;

  return (
    <div
      {...innerProps}
      className={cn(
        'bg-neutral-100 dark:bg-neutral-800 rounded mx-0.5 my-0.5 flex items-center',
        size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm',
      )}
    >
      {children}
    </div>
  );
};
