'use client';

import { PlaceholderProps } from 'react-select';
import { GroupBase } from 'react-select';
import { SelectOption } from '../select';
import { cn } from '../../utils';
import { TEXT_COLORS } from '../../utils/component-colors';

export const Placeholder = <
  IsMulti extends boolean = false,
  Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
>({
  children,
  innerProps,
}: PlaceholderProps<SelectOption, IsMulti, Group>) => {
  return (
    <div
      {...innerProps}
      className={cn(
        'absolute left-0 right-0 top-0 bottom-0 flex items-center px-2',
        TEXT_COLORS.muted,
        'overflow-hidden text-ellipsis whitespace-nowrap',
      )}
    >
      {children}
    </div>
  );
};
