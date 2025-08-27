'use client';

import { components, InputProps } from 'react-select';
import { GroupBase } from 'react-select';
import { SelectOption } from '../select';
import { cn } from '../../utils';
import { TEXT_COLORS } from '../../utils/component-colors';

export const Input = <
  IsMulti extends boolean = false,
  Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
>({
  ...props
}: InputProps<SelectOption, IsMulti, Group>) => {
  return (
    <components.Input
      {...props}
      className={cn(TEXT_COLORS.primary, 'px-2 py-1')}
    />
  );
};
