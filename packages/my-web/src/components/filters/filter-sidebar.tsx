'use client';

import { FilterGroup } from '@tekminewe/mint-ui/filter-group';
import { CategoryFilter } from './category-filter';
import { CategoryItem } from '@/hooks/use-category-filter';
import { Dictionary } from '@/dictionaries';

interface FilterSidebarProps {
  /**
   * Category filter props
   */
  categoryItems: CategoryItem[];
  selectedCategories: string[];
  onCategoryChange: (selectedCategories: string[]) => void;

  /**
   * Dictionary for translations
   */
  dictionary: Dictionary['allStores'];

  /**
   * Whether to show category filter
   * @default true
   */
  showCategoryFilter?: boolean;

  /**
   * Custom class name
   */
  className?: string;
}

export const FilterSidebar = ({
  categoryItems,
  selectedCategories,
  onCategoryChange,
  dictionary,
  showCategoryFilter = true,
  className,
}: FilterSidebarProps) => {
  return (
    <aside
      className={`hidden lg:block w-64 sticky top-20 self-start ${
        className || ''
      }`}
    >
      <FilterGroup>
        <CategoryFilter
          categoryItems={categoryItems}
          selectedCategories={selectedCategories}
          onSelectionChange={onCategoryChange}
          dictionary={dictionary}
          show={showCategoryFilter}
        />

        {/* Future filters can be added here */}
        {/* <PriceRangeFilter ... />
        <LocationFilter ... />
        <BrandFilter ... /> */}
      </FilterGroup>
    </aside>
  );
};
