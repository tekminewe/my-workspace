'use client';

import { forwardRef } from 'react';
import { Radius } from '../utils-client/radius';
import { cn } from '../utils';
import { Spinner } from '../spinner';
import { getStaticRadiusClass } from '../utils-client/get-radius-class';
import { getButtonColors } from '../utils/component-colors';

// Base styles that apply to all buttons (without radius)
const baseStyles =
  'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

// Size styles
const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-2.5 text-lg',
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The variant of the button.
   * @default "solid"
   * @example "solid"
   */
  variant?: 'solid' | 'soft' | 'outline' | 'ghost' | 'link';

  /**
   * The color of the button.
   * @default "primary"
   * @example "primary"
   */
  color?: 'primary' | 'neutral' | 'success' | 'error' | 'warning' | 'info';

  /**
   * The size of the button.
   * @default "md"
   * @example "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * The border radius for the button.
   * If not provided, uses the global default radius from RadiusProvider.
   * @default "md" (from global context)
   * @example "lg"
   */
  radius?: Radius;

  /**
   * Whether the button is in a loading state.
   * @default false
   * @example false
   */
  loading?: boolean;

  /**
   * Whether the button is disabled.
   * @default false
   * @example false
   */
  disabled?: boolean;

  /**
   * The content of the button.
   */
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      color = 'primary',
      size = 'md',
      radius,
      loading = false,
      disabled = false,
      children,
      className,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const radiusClass = getStaticRadiusClass(radius);

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          radiusClass,
          sizeStyles[size],
          getButtonColors(variant, color),
          className,
        )}
        {...props}
      >
        {loading && <Spinner color={color} className="mr-2 h-4 w-4" />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
