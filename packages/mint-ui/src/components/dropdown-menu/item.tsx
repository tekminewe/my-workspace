import * as DropdownMenuPrimitives from '@radix-ui/react-dropdown-menu';
import { cn } from '../utils';
import { forwardRef } from 'react';

export interface DropdownMenuItemProps
  extends DropdownMenuPrimitives.DropdownMenuItemProps {}

export const DropdownMenuItem = forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>(({ className, ...props }, ref) => {
  return (
    <DropdownMenuPrimitives.Item
      ref={ref}
      {...props}
      className={cn(
        'py-2 px-3 outline-none cursor-pointer rounded-md flex items-center gap-2',
        'text-neutral-700 dark:text-neutral-700',
        'hover:bg-primary-50 hover:text-primary-700',
        'focus:bg-primary-50 focus:text-primary-700',
        'transition-colors duration-150',
        className,
      )}
    ></DropdownMenuPrimitives.Item>
  );
});

DropdownMenuItem.displayName = 'DropdownMenuItem';
