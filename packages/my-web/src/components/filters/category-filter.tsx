'use client';

import { FilterSection } from '@tekminewe/mint-ui/filter-section';
import { SearchableCheckboxList } from '@tekminewe/mint-ui/searchable-checkbox-list';
import { Badge } from '@tekminewe/mint-ui/badge';
import { CategoryItem } from '@/hooks/use-category-filter';
import { Dictionary } from '@/dictionaries';

interface CategoryFilterProps {
  /**
   * List of category items with counts
   */
  categoryItems: CategoryItem[];

  /**
   * Currently selected category IDs
   */
  selectedCategories: string[];

  /**
   * Callback when category selection changes
   */
  onSelectionChange: (selectedCategories: string[]) => void;

  /**
   * Dictionary for translations
   */
  dictionary: Dictionary['allStores'];

  /**
   * Whether to show the filter section
   * @default true
   */
  show?: boolean;
}

export const CategoryFilter = ({
  categoryItems,
  selectedCategories,
  onSelectionChange,
  dictionary,
  show = true,
}: CategoryFilterProps) => {
  if (!show) return null;

  // Convert to SearchableCheckboxList format
  const items = categoryItems.map((item) => ({
    value: item.value,
    label: item.label,
    count: item.count,
    disabled: item.count === 0,
  }));

  // Create badge showing selected count
  const selectedCount = selectedCategories.length;
  const badge =
    selectedCount > 0 ? (
      <Badge variant="soft" color="blue" size="1">
        {selectedCount}
      </Badge>
    ) : undefined;

  return (
    <FilterSection
      title={dictionary.filters.categories}
      badge={badge}
      defaultExpanded={true}
    >
      <SearchableCheckboxList
        items={items}
        selectedItems={selectedCategories}
        onSelectionChange={onSelectionChange}
        searchPlaceholder={dictionary.filters.searchCategories}
        selectAllText={dictionary.filters.selectAll}
        clearAllText={dictionary.filters.clearSelection}
        showSearch={true}
        showActions={true}
        maxHeight="300px"
      />
    </FilterSection>
  );
};
