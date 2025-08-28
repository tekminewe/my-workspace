'use client';

import { OptionProps } from 'react-select';
import { GroupBase } from 'react-select';
import { SelectOption } from '../select';
import { cn } from '../../utils';
import { TEXT_COLORS } from '../../utils/component-colors';
import { AnimatedTick } from '../animated-tick';
import { getStaticRadiusClass } from '../../utils-client/get-radius-class';

export const Option = <
  IsMulti extends boolean = false,
  Group extends GroupBase<SelectOption> = GroupBase<SelectOption>,
>({
  children,
  innerProps,
  innerRef,
  isDisabled,
  isFocused,
  isSelected,
  selectProps,
}: OptionProps<SelectOption, IsMulti, Group>) => {
  const { size, radius } = selectProps as any;
  const optionRadiusClass = getStaticRadiusClass(radius ?? '2xl'); // Use 2xl as default for option
  const { ...safeProps } = innerProps || {};

  return (
    <div
      ref={innerRef}
      {...safeProps}
      className={cn(
        // Base styles with consistent margins and padding
        'flex items-center cursor-pointer relative transition-all duration-150 mx-2 my-1',
        size === 'sm'
          ? 'py-2 px-3' // Increased from py-1 px-2
          : size === 'lg'
            ? 'py-4 px-5' // Increased from py-3 px-4
            : 'py-3 px-4', // Increased from py-2 px-3
        // Background colors - primary background on hover
        isFocused && !isDisabled
          ? `bg-primary-500 text-white ${optionRadiusClass}`
          : 'bg-transparent',
        // Text colors
        isDisabled
          ? TEXT_COLORS.disabled
          : isFocused
            ? 'text-white'
            : TEXT_COLORS.primary,
        // Cursor
        isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
      )}
    >
      {/* Always reserve space for tick to maintain alignment */}
      <div className="mr-3 w-4 h-4 flex items-center justify-center">
        {isSelected && (
          <AnimatedTick isFocused={isFocused} isSelected={isSelected} />
        )}
      </div>
      <span className="flex-1">{children}</span>
    </div>
  );
};
