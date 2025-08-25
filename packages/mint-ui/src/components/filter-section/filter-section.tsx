'use client';

import { useState } from 'react';
import { cn } from '../utils';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { TEXT_COLORS, INTERACTION_COLORS } from '../utils/component-colors';

export interface FilterSectionProps {
  /**
   * The title of the filter section
   * @example "Categories"
   */
  title: string;

  /**
   * The content to display inside the filter section
   */
  children: React.ReactNode;

  /**
   * Whether the section is collapsible
   * @default true
   */
  collapsible?: boolean;

  /**
   * Whether the section is initially expanded
   * @default true
   */
  defaultExpanded?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Optional badge content to show next to the title (e.g., count)
   */
  badge?: React.ReactNode;
}

export const FilterSection = ({
  title,
  children,
  collapsible = true,
  defaultExpanded = true,
  className,
  badge,
}: FilterSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    if (collapsible) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div
        className={cn(
          'flex items-center justify-between',
          collapsible && 'cursor-pointer',
        )}
        onClick={toggleExpanded}
      >
        <div className="flex items-center gap-2">
          <h3 className={cn('text-sm font-medium', TEXT_COLORS.primary)}>
            {title}
          </h3>
          {badge && <div>{badge}</div>}
        </div>
        {collapsible && (
          <ChevronDownIcon
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              TEXT_COLORS.muted,
              INTERACTION_COLORS.hover,
              isExpanded ? 'rotate-0' : '-rotate-90',
            )}
          />
        )}
      </div>

      {(!collapsible || isExpanded) && (
        <div className="space-y-2">{children}</div>
      )}
    </div>
  );
};
