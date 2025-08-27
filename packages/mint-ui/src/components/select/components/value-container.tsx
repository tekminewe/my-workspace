'use client';

import { ValueContainerProps } from 'react-select';
import { GroupBase } from 'react-select';
import { SelectOption } from '../select';

export const ValueContainer = <
  IsMulti extends boolean = false,
  Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
>({
  children,
  innerProps,
}: ValueContainerProps<SelectOption, IsMulti, Group>) => {
  return (
    <div
      {...innerProps}
      className="flex-1 flex items-center relative overflow-hidden py-1 px-2"
    >
      {children}
    </div>
  );
};
