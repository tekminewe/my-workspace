import { AnchorHTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils';
import { NAVIGATION_COLORS } from '../utils/component-colors';

export interface MobileNavigationMenuItemProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  color?: 'gray' | 'primary';
  disabled?: boolean;
}

export const MobileNavigationMenuItem = forwardRef<
  HTMLAnchorElement,
  MobileNavigationMenuItemProps
>(({ color = 'gray', className, disabled, onClick, ...props }, ref) => {
  return (
    <a
      ref={ref}
      {...props}
      className={cn(
        'p-2 px-4 inline-flex items-center text-base font-normal no-underline rounded transition-colors',
        {
          [NAVIGATION_COLORS.item]: color === 'gray' && !disabled,
          'text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:text-primary-500 dark:hover:text-primary-400 dark:hover:bg-primary-900/30':
            color === 'primary' && !disabled,
          [NAVIGATION_COLORS.itemDisabled]: disabled,
        },
        className,
      )}
      onClick={disabled ? (e) => e.preventDefault() : onClick}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
    />
  );
});

MobileNavigationMenuItem.displayName = 'MobileNavigationMenuItem';

MobileNavigationMenuItem.displayName = 'MobileNavigationMenuItem';
