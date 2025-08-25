import { forwardRef } from 'react';
import { cn } from '../utils';

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /**
   * If true, the item will be selected.
   * @default false
   * @example true
   */
  selected?: boolean;
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, selected, ...props }, ref) => {
    return (
      <li
        ref={ref}
        {...props}
        className={cn(
          'p-3 rounded-md cursor-pointer font-medium flex items-center gap-2',
          'hover:bg-primary-50 hover:text-primary-700',
          'transition-colors duration-150',
          'mt-1 first:mt-0',
          selected && 'bg-primary-600 text-neutral-50',
          className,
        )}
        data-selected={selected}
      />
    );
  },
);

ListItem.displayName = 'ListItem';
