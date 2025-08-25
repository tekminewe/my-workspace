import React from 'react';
import { LuLoaderCircle } from 'react-icons/lu';
import { cn } from '../utils';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The size of the spinner.
   * @default "md"
   * @example "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * The color of the spinner.
   * @default "primary"
   * @example "primary"
   */
  color?: 'primary' | 'neutral' | 'success' | 'error' | 'warning' | 'info';
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const colorClasses = {
    primary: 'text-primary-600',
    neutral: 'text-neutral-600',
    success: 'text-success-600',
    error: 'text-error-600',
    warning: 'text-warning-600',
    info: 'text-info-600',
  };

  return (
    <div
      className={cn('inline-flex items-center justify-center', className)}
      {...props}
      role="status"
      aria-label="Loading"
    >
      <LuLoaderCircle
        className={cn('animate-spin', sizeClasses[size], colorClasses[color])}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
};
