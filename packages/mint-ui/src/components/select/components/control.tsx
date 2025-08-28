'use client';

import { ControlProps } from 'react-select';
import { GroupBase } from 'react-select';
import { SelectOption } from '../select';
import { cn } from '../../utils';
import { INPUT_COLORS } from '../../utils/component-colors';
import { useEffectiveRadius } from '../../utils-client/use-effective-radius';
import { Radius } from '../../utils-client/radius';

interface CustomSelectProps {
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  controlRef?: React.RefObject<HTMLDivElement>;
  radius?: Radius;
}

export const Control = <
  IsMulti extends boolean = false,
  Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
>({
  children,
  innerProps,
  innerRef,
  isDisabled,
  selectProps,
}: ControlProps<SelectOption, IsMulti, Group>) => {
  const { error, size, controlRef, radius } = selectProps as CustomSelectProps;
  const radiusClass = useEffectiveRadius(radius);

  return (
    <div
      ref={(node) => {
        // Set both our ref and the react-select ref
        if (controlRef && node) {
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
        'relative flex items-center transition-all duration-200',
        radiusClass,
        // Background
        INPUT_COLORS.background,
        // Error border
        error ? INPUT_COLORS.errorBorder : '',
        // Focus ring
        error
          ? 'focus-within:ring-2 focus-within:ring-error-500 focus-within:outline-none'
          : 'focus-within:ring-2 focus-within:ring-primary-500 focus-within:outline-none',
        // Size-specific height
        size === 'sm' ? 'min-h-8' : size === 'lg' ? 'min-h-11' : 'min-h-9',
        // Disabled styles
        isDisabled && [
          'opacity-60',
          INPUT_COLORS.disabled.cursor,
          INPUT_COLORS.disabled.containerCursor,
        ],
      )}
    >
      {children}
    </div>
  );
};
