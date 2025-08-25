'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';

export interface NavigationMenuProps extends HTMLAttributes<HTMLDivElement> {}

export const NavigationMenu = forwardRef<HTMLDivElement, NavigationMenuProps>(
  ({ ...props }, ref) => {
    return (
      <nav
        ref={ref}
        {...props}
        className={cn(
          'mt-navMenu flex-1 flex justify-end gap-6',
          props.className,
        )}
      />
    );
  },
);

NavigationMenu.displayName = 'NavigationMenu';
