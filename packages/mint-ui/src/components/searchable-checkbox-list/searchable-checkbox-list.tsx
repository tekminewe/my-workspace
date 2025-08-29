'use client';

import { useState, useMemo } from 'react';
import { cn } from '../utils';
import { TextInput } from '../text-input';
import { Checkbox } from '../checkbox';
import { LuSearch } from 'react-icons/lu';
import { TEXT_COLORS, SURFACE_COLORS } from '../utils/component-colors';

export interface SearchableCheckboxListItem {
  /**
   * Unique identifier for the item
   */
  value: string;

  /**
   * Display label for the item
   */
  label: string;

  /**
   * Optional count to display next to the label
   */
  count?: number;

  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;
}

export interface SearchableCheckboxListProps {
  /**
   * List of items to display
   */
  items: SearchableCheckboxListItem[];

  /**
   * Currently selected item values
   * @default []
   */
  selectedItems?: string[];

  /**
   * Callback when selection changes
   */
  onSelectionChange?: (selectedValues: string[]) => void;

  /**
   * Placeholder text for the search input
   * @default "Search..."
   */
  searchPlaceholder?: string;

  /**
   * Whether to show the search input
   * @default true
   */
  showSearch?: boolean;

  /**
   * Maximum height of the list container
   * @default "200px"
   */
  maxHeight?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Whether to show "Select All" and "Clear All" actions
   * @default true
   */
  showActions?: boolean;

  /**
   * Custom filter function for search
   */
  filterFn?: (item: SearchableCheckboxListItem, query: string) => boolean;

  /**
   * Text for "Select All" button
   * @default "Select All"
   */
  selectAllText?: string;

  /**
   * Text for "Clear All" button when items are selected
   * @default "Clear All"
   */
  clearAllText?: string;
}

export const SearchableCheckboxList = ({
  items,
  selectedItems = [],
  onSelectionChange,
  searchPlaceholder = 'Search...',
  showSearch = true,
  maxHeight = '200px',
  className,
  showActions = true,
  filterFn,
  selectAllText = 'Select All',
  clearAllText = 'Clear All',
}: SearchableCheckboxListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const defaultFilterFn = (item: SearchableCheckboxListItem, query: string) =>
    item.label.toLowerCase().includes(query.toLowerCase());

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    const filterFunction = filterFn || defaultFilterFn;
    return items.filter((item) => filterFunction(item, searchQuery));
  }, [items, searchQuery, filterFn]);

  const handleItemToggle = (value: string) => {
    const newSelection = selectedItems.includes(value)
      ? selectedItems.filter((item) => item !== value)
      : [...selectedItems, value];

    onSelectionChange?.(newSelection);
  };

  const handleSelectAll = () => {
    const availableValues = filteredItems
      .filter((item) => !item.disabled)
      .map((item) => item.value);
    onSelectionChange?.(availableValues);
  };

  const handleClearAll = () => {
    onSelectionChange?.([]);
  };

  const allFilteredSelected = filteredItems
    .filter((item) => !item.disabled)
    .every((item) => selectedItems.includes(item.value));

  return (
    <div className={cn('space-y-3', className)}>
      {showSearch && (
        <TextInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={searchPlaceholder}
          icon={<LuSearch className="h-4 w-4" />}
          className={cn('w-full', SURFACE_COLORS.surfaceElevated)}
        />
      )}

      {showActions && filteredItems.length > 0 && (
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={allFilteredSelected ? handleClearAll : handleSelectAll}
            className={cn(
              'text-xs font-medium transition-colors',
              TEXT_COLORS.secondary,
              'hover:text-neutral-900 dark:hover:text-neutral-900',
            )}
          >
            {allFilteredSelected ? clearAllText : selectAllText}
          </button>
          {selectedItems.length > 0 && (
            <span className={cn('text-xs', TEXT_COLORS.muted)}>
              {selectedItems.length} selected
            </span>
          )}
        </div>
      )}

      <div className="space-y-2 overflow-y-auto" style={{ maxHeight }}>
        {filteredItems.length === 0 && searchQuery ? (
          <div className={cn('py-4 text-center text-sm', TEXT_COLORS.muted)}>
            No items found for "{searchQuery}"
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.value}
              className="flex items-center justify-between gap-2"
            >
              <label
                className={cn(
                  'flex items-center gap-2 cursor-pointer',
                  item.disabled && 'cursor-not-allowed opacity-50',
                )}
              >
                <Checkbox
                  checked={selectedItems.includes(item.value)}
                  onCheckedChange={() => handleItemToggle(item.value)}
                  disabled={item.disabled}
                />
                <span className={cn('text-sm', TEXT_COLORS.primary)}>
                  {item.label}
                </span>
              </label>
              {item.count !== undefined && (
                <span className={cn('text-xs', TEXT_COLORS.muted)}>
                  ({item.count})
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
