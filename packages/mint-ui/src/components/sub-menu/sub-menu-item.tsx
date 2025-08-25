import { AnchorHTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils';
import { TEXT_COLORS } from '../utils/component-colors';

export interface SubMenuItemProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * If `true`, the item will be selected.
   * @default false
   * @example true
   */
  selected?: boolean;
  /**
   * If `true`, the item will be disabled.
   * @default false
   * @example true
   */
  disabled?: boolean;
}

export const SubMenuItem = forwardRef<HTMLAnchorElement, SubMenuItemProps>(
  ({ selected, disabled, ...props }, ref) => {
    return (
      <a
        ref={ref}
        {...props}
        data-selected={selected}
        data-disabled={disabled}
        className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 cursor-pointer',
          TEXT_COLORS.primary,
          // Default state
          'hover:bg-primary-50 hover:text-primary-700',
          // Selected state
          "data-[selected='true']:bg-primary-100 data-[selected='true']:text-primary-800 data-[selected='true']:font-medium",
          // Disabled state
          "data-[disabled='true']:opacity-50 data-[disabled='true']:cursor-not-allowed data-[disabled='true']:hover:bg-transparent data-[disabled='true']:hover:text-current",
          props.className,
        )}
        aria-current={selected ? 'page' : undefined}
        tabIndex={disabled ? -1 : 0}
      />
    );
  },
);

SubMenuItem.displayName = 'SubMenuItem';
