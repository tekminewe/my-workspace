'use client';

import { MultiValueRemoveProps } from 'react-select';
import { GroupBase } from 'react-select';
import { SelectOption } from '../select';
import { cn } from '../../utils';
import { TEXT_COLORS } from '../../utils/component-colors';

export const MultiValueRemove = <
  IsMulti extends boolean = false,
  Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
>({
  children,
  innerProps,
}: MultiValueRemoveProps<SelectOption, IsMulti, Group>) => {
  return (
    <div
      {...innerProps}
      className={cn(
        'px-1 py-0.5 rounded-r hover:bg-error-500 hover:text-white cursor-pointer',
        TEXT_COLORS.muted,
      )}
    >
      {children}
    </div>
  );
};
