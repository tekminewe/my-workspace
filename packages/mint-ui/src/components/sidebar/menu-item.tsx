import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';
import { TEXT_COLORS } from '../utils/component-colors';

export interface SidebarMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the menu item is selected.
   * @default false
   * @example true
   */
  selected?: boolean;
}

export const SidebarMenuItem = forwardRef<HTMLDivElement, SidebarMenuItemProps>(
  ({ children, selected, ...props }, ref) => {
    return (
      <div
        {...props}
        data-selected={selected}
        className={cn(
          // Base styling
          'p-3 rounded-lg cursor-pointer font-medium flex items-center gap-3',
          'transition-colors duration-200',
          'mt-1 first:mt-0',
          // Default state using standardized colors
          TEXT_COLORS.secondary,
          // Hover effects consistent with other components (like Select)
          'hover:bg-primary-50 hover:text-primary-700',
          // Selected state with primary theme
          selected && 'bg-primary-100 text-primary-700',
          // Focus state for accessibility
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          props.className,
        )}
        ref={ref}
        tabIndex={0}
        role="button"
      >
        {children}
      </div>
    );
  },
);
