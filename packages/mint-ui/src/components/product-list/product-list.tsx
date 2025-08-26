import { Grid } from '../grid';
import { cn } from '../utils';

export interface ProductListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns in the grid
   * @default responsive object
   */
  columns?: number;
  /**
   * Gap between grid items
   * @default "4"
   */
  gap?: string | number;
  /**
   * Responsive column count at different breakpoints
   */
  responsive?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export const ProductList = ({
  gap = '4',
  className,
  responsive = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
  },
  ...props
}: ProductListProps) => {
  return (
    <Grid
      gap={gap}
      columns={1} // Default to 1, but use responsive prop for breakpoints
      responsive={responsive}
      className={cn('justify-items-center grid-flow-row', className)}
      {...props}
    />
  );
};
