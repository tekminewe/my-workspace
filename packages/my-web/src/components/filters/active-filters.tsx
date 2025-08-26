'use client';

import { FilterChip } from '@tekminewe/mint-ui/filter-chip';
import { Dictionary } from '@/dictionaries';

interface ActiveFilterItem {
  id: string;
  label: string;
}

interface ActiveFiltersProps {
  /**
   * List of active filters to display
   */
  activeFilters: ActiveFilterItem[];

  /**
   * Callback when a filter is removed
   */
  onRemoveFilter: (filterId: string) => void;

  /**
   * Callback to clear all filters
   */
  onClearAll?: () => void;

  /**
   * Dictionary for translations
   */
  dictionary: Dictionary['allStores'];

  /**
   * Whether to show the clear all button
   * @default true
   */
  showClearAll?: boolean;

  /**
   * Custom class name
   */
  className?: string;
}

export const ActiveFilters = ({
  activeFilters,
  onRemoveFilter,
  onClearAll,
  dictionary,
  showClearAll = true,
  className,
}: ActiveFiltersProps) => {
  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className || ''}`}>
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {dictionary.filters.title}
      </span>

      {activeFilters.map((filter) => (
        <FilterChip
          key={filter.id}
          label={filter.label}
          onRemove={() => onRemoveFilter(filter.id)}
          size="sm"
        />
      ))}

      {showClearAll && activeFilters.length > 0 && onClearAll && (
        <button
          onClick={onClearAll}
          className="text-xs text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors underline"
        >
          {dictionary.filters.clearAll}
        </button>
      )}
    </div>
  );
};
