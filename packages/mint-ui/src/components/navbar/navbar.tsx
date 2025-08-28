'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';

export interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Class name for the container element.
   * @default undefined
   * @example "shadow-lg"
   */
  containerClassName?: string;
}

export const Navbar = forwardRef<HTMLDivElement, NavbarProps>(
  ({ children, className, containerClassName, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full p-4 flex items-center sticky top-0 z-50 bg-white dark:bg-neutral-50 min-h-16',
          containerClassName,
        )}
        {...props}
      >
        <div className={cn('container mx-auto flex items-center', className)}>
          {children}
        </div>
      </div>
    );
  },
);
