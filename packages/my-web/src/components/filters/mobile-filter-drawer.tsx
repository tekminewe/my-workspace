'use client';

import {
  DrawerRoot,
  Drawer,
  DrawerTrigger,
  DrawerTitle,
} from '@tekminewe/mint-ui/drawer';
import { Button } from '@tekminewe/mint-ui/button';
import { LuX } from 'react-icons/lu';
import { CategoryFilter } from './category-filter';
import { CategoryItem } from '@/hooks/use-category-filter';
import { Dictionary } from '@/dictionaries';

interface MobileFilterDrawerProps {
  /**
   * Whether the drawer is open
   */
  open: boolean;

  /**
   * Open state change handler
   */
  onOpenChange: (open: boolean) => void;

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
   * Trigger element
   */
  trigger: React.ReactNode;
}

export const MobileFilterDrawer = ({
  open,
  onOpenChange,
  categoryItems,
  selectedCategories,
  onCategoryChange,
  dictionary,
  showCategoryFilter = true,
  trigger,
}: MobileFilterDrawerProps) => {
  return (
    <DrawerRoot open={open} onOpenChange={onOpenChange} direction="left">
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <Drawer className="w-80 max-w-[90vw]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
          <DrawerTitle className="text-lg font-semibold">
            {dictionary.filters.title}
          </DrawerTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="p-2"
          >
            <LuX className="w-4 h-4" />
          </Button>
        </div>

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {showCategoryFilter && (
            <CategoryFilter
              categoryItems={categoryItems}
              selectedCategories={selectedCategories}
              onSelectionChange={onCategoryChange}
              dictionary={dictionary}
              show={showCategoryFilter}
            />
          )}

          {/* Future filters can be added here */}
          {/* <PriceRangeFilter ... />
          <LocationFilter ... />
          <BrandFilter ... /> */}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Done
          </Button>
        </div>
      </Drawer>
    </DrawerRoot>
  );
};
