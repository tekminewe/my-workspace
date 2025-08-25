'use client';

import { cn } from '../utils';
import { LuX } from 'react-icons/lu';
import {
  TEXT_COLORS,
  SURFACE_COLORS,
  BORDER_COLORS,
  INTERACTION_COLORS,
} from '../utils/component-colors';

export interface FilterChipProps {
  /**
   * The label to display on the chip
   * @example "Electronics"
   */
  label: string;

  /**
   * Callback function when the remove button is clicked
   */
  onRemove?: () => void;

  /**
   * Whether the chip is removable
   * @default true
   */
  removable?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Size variant of the chip
   * @default "sm"
   */
  size?: 'sm' | 'md';
}

export const FilterChip = ({
  label,
  onRemove,
  removable = true,
  className,
  size = 'sm',
}: FilterChipProps) => {
  const sizeClasses = {
    sm: 'h-6 px-2 text-xs',
    md: 'h-8 px-3 text-sm',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full',
        'border',
        SURFACE_COLORS.surface,
        BORDER_COLORS.default,
        TEXT_COLORS.secondary,
        sizeClasses[size],
        className,
      )}
    >
      <span className="truncate">{label}</span>
      {removable && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className={cn(
            'rounded-full p-0.5 transition-colors',
            INTERACTION_COLORS.hover,
            'hover:bg-neutral-200 dark:hover:bg-neutral-300',
            TEXT_COLORS.muted,
            'hover:text-neutral-700 dark:hover:text-neutral-700',
          )}
          aria-label={`Remove ${label} filter`}
        >
          <LuX className={iconSizes[size]} />
        </button>
      )}
    </div>
  );
};
