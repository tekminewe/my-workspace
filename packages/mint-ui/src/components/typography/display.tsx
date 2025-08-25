import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';

export interface DisplayProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * The heading level.
   * @default "h1"
   *
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Display = forwardRef<HTMLHeadingElement, DisplayProps>(
  ({ as = 'h1', className, ...props }, ref) => {
    const Comp = as;

    return <Comp ref={ref} {...props} className={cn('display', className)} />;
  },
);

Display.displayName = 'Display';
