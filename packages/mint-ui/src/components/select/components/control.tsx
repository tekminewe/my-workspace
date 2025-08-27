'use client';

import { ControlProps } from 'react-select';
import { GroupBase } from 'react-select';
import { SelectOption } from '../select';
import { cn } from '../../utils';
import { SURFACE_COLORS, BORDER_COLORS } from '../../utils/component-colors';

export const Control = <
  IsMulti extends boolean = false,
  Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
>({
  children,
  innerProps,
  innerRef,
  isDisabled,
  isFocused,
  selectProps,
}: ControlProps<SelectOption, IsMulti, Group>) => {
  const { error, size, controlRef } = selectProps as any;

  return (
    <div
      ref={(node) => {
        // Set both our ref and the react-select ref
        if (controlRef) {
          controlRef.current = node;
        }
        if (typeof innerRef === 'function') {
          innerRef(node);
        } else if (innerRef) {
          innerRef.current = node;
        }
      }}
      {...innerProps}
      className={cn(
        // Base styles
        'relative flex items-center border rounded-lg transition-all duration-200',
        // Background: match SURFACE_COLORS.surface
        SURFACE_COLORS.surface,
        // Border and focus states
        error
          ? 'border-error-500'
          : isFocused
            ? 'border-primary-500 ring-1 ring-primary-500'
            : BORDER_COLORS.default,
        // Hover styles
        !error && !isFocused && 'hover:border-neutral-300',
        // Size-specific height
        size === 'sm' ? 'min-h-8' : size === 'lg' ? 'min-h-11' : 'min-h-9',
        // Disabled styles
        isDisabled && 'opacity-60 cursor-not-allowed',
      )}
    >
      {children}
    </div>
  );
};
