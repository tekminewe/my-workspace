import React from 'react';
import { cn } from '../utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The visual color appearance of the badge.
   * @default "gray"
   * @example "green"
   */
  color?: 'gray' | 'green' | 'red' | 'blue' | 'yellow';

  /**
   * The size of the badge.
   * @default "1"
   * @example "2"
   */
  size?: '1' | '2';

  /**
   * The variant of the badge.
   * @default "solid"
   * @example "outline"
   */
  variant?: 'solid' | 'outline' | 'soft';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { color = 'gray', size = '1', variant = 'solid', className, ...props },
    ref,
  ) => {
    const sizeClasses = size === '1' ? 'text-xs px-2' : 'text-sm px-3';

    const colorClasses = {
      solid: {
        gray: 'bg-neutral-900 text-neutral-50',
        green: 'bg-success-600 text-neutral-50',
        red: 'bg-error-600 text-neutral-50',
        blue: 'bg-primary text-neutral-50',
        yellow: 'bg-warning-600 text-neutral-900',
      },
      soft: {
        gray: 'bg-neutral-100 text-neutral-900',
        green: 'bg-success-100 text-success-800',
        red: 'bg-error-100 text-error-800',
        blue: 'bg-primary-100 text-primary-800',
        yellow: 'bg-warning-100 text-warning-800',
      },
      outline: {
        gray: 'border border-neutral-300 text-neutral-700',
        green: 'border border-success-300 text-success-700',
        red: 'border border-error-300 text-error-700',
        blue: 'border border-primary-300 text-primary-700',
        yellow: 'border border-warning-300 text-warning-700',
      },
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium py-1',
          sizeClasses,
          colorClasses[variant][color],
          className,
        )}
        {...props}
      />
    );
  },
);

Badge.displayName = 'Badge';
