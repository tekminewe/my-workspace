'use client';

import { ValueContainerProps } from 'react-select';
import { GroupBase } from 'react-select';
import { SelectOption } from '../select';
import { cn } from '../../utils';

interface CustomSelectProps {
  size?: 'sm' | 'md' | 'lg';
}

export const ValueContainer = <
  IsMulti extends boolean = false,
  Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
>({
  children,
  innerProps,
  selectProps,
}: ValueContainerProps<SelectOption, IsMulti, Group>) => {
  const { size } = selectProps as CustomSelectProps;

  // Get the same size class as text input to ensure consistent padding
  const sizeClass = {
    sm: 'text-sm mx-1',
    md: 'py-1 mx-2',
    lg: 'text-lg py-2 mx-3',
  }[size || 'md'];

  return (
    <div
      {...innerProps}
      className={cn(
        'flex-1 flex items-center relative overflow-hidden',
        sizeClass,
      )}
    >
      {children}
    </div>
  );
};
