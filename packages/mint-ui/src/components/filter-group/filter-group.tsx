'use client';

import { cn } from '../utils';
import { SURFACE_COLORS } from '../utils/component-colors';

export interface FilterGroupProps {
  /**
   * The content to display inside the filter group
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Spacing between filter sections
   * @default "lg"
   */
  spacing?: 'sm' | 'md' | 'lg';
}

export const FilterGroup = ({
  children,
  className,
  spacing = 'lg',
}: FilterGroupProps) => {
  const spacingClasses = {
    sm: 'space-y-4',
    md: 'space-y-6',
    lg: 'space-y-8',
  };

  return (
    <div
      className={cn(
        'p-4 rounded-xl',
        SURFACE_COLORS.surface,
        spacingClasses[spacing],
        className,
      )}
    >
      {children}
    </div>
  );
};
