import React from 'react';
import { cn } from '../utils';

// Define custom CSS properties for TypeScript
declare module 'react' {
  interface CSSProperties {
    '--grid-cols-xs'?: number;
    '--grid-cols-sm'?: number;
    '--grid-cols-md'?: number;
    '--grid-cols-lg'?: number;
    '--grid-cols-xl'?: number;
  }
}

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns in the grid
   * @default 1
   * @example 3
   */
  columns?: number;
  /**
   * Gap between grid items
   * @default "4"
   * @example "6"
   */
  gap?: string | number;
  /**
   * Responsive column count at different breakpoints
   * @default undefined
   * @example {{ md: 2, lg: 3 }}
   */
  responsive?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ columns = 1, gap = '4', responsive, className, style, ...props }, ref) => {
    const gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
    const gridGap =
      typeof gap === 'number' ? `${gap / 4}rem` : `${parseInt(gap) / 4}rem`;

    // Generate responsive styles
    const responsiveStyles: React.CSSProperties = {};
    if (responsive) {
      if (responsive.xs) responsiveStyles['--grid-cols-xs'] = responsive.xs;
      if (responsive.sm) responsiveStyles['--grid-cols-sm'] = responsive.sm;
      if (responsive.md) responsiveStyles['--grid-cols-md'] = responsive.md;
      if (responsive.lg) responsiveStyles['--grid-cols-lg'] = responsive.lg;
      if (responsive.xl) responsiveStyles['--grid-cols-xl'] = responsive.xl;
    }

    return (
      <div
        ref={ref}
        className={cn('grid', className)}
        style={{
          gridTemplateColumns,
          gap: gridGap,
          ...responsiveStyles,
          ...style,
        }}
        {...props}
      />
    );
  },
);

Grid.displayName = 'Grid';
