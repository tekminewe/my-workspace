'use client';

import { cn } from '../../utils';
import { TEXT_COLORS } from '../../utils/component-colors';

export const DropdownIndicator = ({ children, innerProps, isFocused }: any) => {
  return (
    <div
      {...innerProps}
      className={cn(
        'p-2 cursor-pointer',
        isFocused ? TEXT_COLORS.secondary : TEXT_COLORS.muted,
        !isFocused && 'hover:text-neutral-600',
      )}
    >
      {children || (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 10.5L4 6.5h8l-4 4z" />
        </svg>
      )}
    </div>
  );
};
