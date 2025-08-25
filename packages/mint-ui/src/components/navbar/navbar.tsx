'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';

export interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Class name for the container element.
   * @default undefined
   * @example "border-b"
   */
  containerClassName?: string;
}

export const Navbar = forwardRef<HTMLDivElement, NavbarProps>(
  ({ children, className, containerClassName, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('navbar', containerClassName)} {...props}>
        <div className={cn('container mx-auto flex items-center', className)}>
          {children}
        </div>
      </div>
    );
  },
);
