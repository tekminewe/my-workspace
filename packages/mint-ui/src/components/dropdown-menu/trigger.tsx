import * as DropdownMenuPrimitives from '@radix-ui/react-dropdown-menu';
import { forwardRef } from 'react';
import { cn } from '../utils';

export interface DropdownMenuTriggerProps
  extends DropdownMenuPrimitives.DropdownMenuTriggerProps {}

export const DropdownMenuTrigger = forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <DropdownMenuPrimitives.Trigger
      ref={ref}
      {...props}
      className={cn('outline-none', className)}
    />
  );
});

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';
