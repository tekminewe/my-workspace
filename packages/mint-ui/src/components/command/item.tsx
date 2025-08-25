'use client';

import { Command as Cmdk } from 'cmdk';
import { forwardRef } from 'react';
import { cn } from '../utils';

interface ICommandItemProps
  extends React.ComponentPropsWithoutRef<typeof Cmdk.Item> {
  selected?: boolean;
  // If true, the item will not be clickable
  isStatic?: boolean;
}

export const CommandItem = forwardRef<
  React.ElementRef<typeof Cmdk.Item>,
  ICommandItemProps
>(
  (
    {
      className,
      selected = false,
      isStatic = false,
      disabled = false,
      ...props
    },
    ref,
  ) => (
    <Cmdk.Item
      ref={ref}
      className={cn(
        'flex items-center rounded px-2 py-2',
        {
          'font-semibold': selected,
        },
        {
          'cursor-pointer hover:bg-accent-a3': !isStatic && !disabled,
        },
        {
          'pointer-events-none opacity-50': disabled,
        },
        className,
      )}
      disabled={disabled}
      {...props}
    />
  ),
);

CommandItem.displayName = 'CommandItem';
