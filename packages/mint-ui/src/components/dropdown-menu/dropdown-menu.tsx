import * as DropdownMenuPrimitives from '@radix-ui/react-dropdown-menu';
import { cn } from '../utils';
import { forwardRef } from 'react';
import {
  SURFACE_COLORS,
  BORDER_COLORS,
  TEXT_COLORS,
} from '../utils/component-colors';

export const DropdownMenuRoot = DropdownMenuPrimitives.Root;

export interface DropdownMenuProps
  extends DropdownMenuPrimitives.DropdownMenuPortalProps,
    DropdownMenuPrimitives.DropdownMenuSubContentProps {}

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ forceMount, container, className, ...props }, ref) => {
    return (
      <DropdownMenuPrimitives.Portal
        forceMount={forceMount}
        container={container}
      >
        <DropdownMenuPrimitives.Content
          ref={ref}
          {...props}
          className={cn(
            'shadow-lg rounded-md overflow-hidden p-1 mt-1',
            SURFACE_COLORS.surfaceElevated,
            TEXT_COLORS.primary,
            BORDER_COLORS.default,
            className,
          )}
        ></DropdownMenuPrimitives.Content>
      </DropdownMenuPrimitives.Portal>
    );
  },
);
