import * as DropdownMenuPrimitives from '@radix-ui/react-dropdown-menu';
import { cn } from '../utils';
import { forwardRef } from 'react';
import { BORDER_COLORS } from '../utils/component-colors';

export interface DropdownMenuSeparatorProps
  extends DropdownMenuPrimitives.DropdownMenuSeparatorProps {}

export const DropdownMenuSeparator = forwardRef<
  HTMLDivElement,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <DropdownMenuPrimitives.Separator
      ref={ref}
      {...props}
      className={cn('h-[1px] my-2 mx-1', BORDER_COLORS.default, className)}
    ></DropdownMenuPrimitives.Separator>
  );
});

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';
