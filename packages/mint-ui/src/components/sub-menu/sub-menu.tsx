import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';
import { getCardColors } from '../utils/component-colors';

export interface SubMenuProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The visual variant of the sub menu
   * @default 'default'
   * @example 'elevated'
   */
  variant?: 'default' | 'elevated' | 'subtle';
}

export const SubMenu = forwardRef<HTMLDivElement, SubMenuProps>(
  ({ variant = 'default', ...props }, ref) => {
    return (
      <aside
        ref={ref}
        {...props}
        className={cn(
          'rounded-lg p-2 space-y-1 border',
          getCardColors(variant),
          props.className,
        )}
      />
    );
  },
);

SubMenu.displayName = 'SubMenu';
