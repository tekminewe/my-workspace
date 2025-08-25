import * as React from 'react';
import { cn } from '../utils';
import { getIconButtonColors } from '../utils/component-colors';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The icon to display in the button.
   */
  children: React.ReactNode;

  /**
   * The size of the button.
   * @default "2"
   */
  size?: '1' | '2' | '3';

  /**
   * The variant of the button.
   * @default "ghost"
   */
  variant?: 'solid' | 'outline' | 'soft' | 'ghost';

  /**
   * The color of the button.
   * @default "gray"
   */
  color?: 'gray' | 'red' | 'green' | 'blue';

  /**
   * Additional CSS class names.
   */
  className?: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      size = '2',
      variant = 'ghost',
      color = 'gray',
      className,
      ...props
    },
    ref,
  ) => {
    // Size classes
    const sizeClasses = {
      '1': 'h-6 w-6',
      '2': 'h-8 w-8',
      '3': 'h-10 w-10',
    }[size];

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'inline-flex items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none',
          sizeClasses,
          getIconButtonColors(variant, color),
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
