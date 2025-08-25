'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PopularMerchantsItem } from './popular-merchants-item';
import { Dictionary } from '@/dictionaries';
import { useAllAdvertisersGQL } from '@/hooks/use-all-advertisers-gql';
import { useCategoryFilter } from '@/hooks/use-category-filter';
import { FilterSidebar } from './filters/filter-sidebar';
import { ActiveFilters } from './filters/active-filters';
import { MobileFilterButton } from './filters/mobile-filter-button';
import { MobileFilterDrawer } from './filters/mobile-filter-drawer';
import { AdvertiserCategoryEnum } from '@/services/graphql';
import { Skeleton } from '@tekminewe/mint-ui/skeleton';

export const StoreList = ({
  locale,
  dictionary,
}: {
  locale: string;
  dictionary: Dictionary['allStores'];
}) => {
  // Mobile filter drawer state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Get selected categories from URL first (without passing advertiser data)
  const searchParams = useSearchParams();
  const selectedCategoriesFromURL = useMemo(() => {
    const categories = searchParams.get('categories');
    return categories ? categories.split(',') : [];
  }, [searchParams]);

  // Convert to enum values for GraphQL query
  const selectedCategoryEnums = useMemo(() => {
    return selectedCategoriesFromURL.filter((id: string) =>
      Object.values(AdvertiserCategoryEnum).includes(
        id as AdvertiserCategoryEnum,
      ),
    ) as AdvertiserCategoryEnum[];
  }, [selectedCategoriesFromURL]);

  // Use the selected category enums to filter at the GraphQL level
  const { data, loadMore, loading } = useAllAdvertisersGQL({
    pageSize: 25,
    locale,
    categoryIds:
      selectedCategoryEnums.length > 0 ? selectedCategoryEnums : undefined,
  });

  const advertisers = data?.advertisers || [];
  const pagination = data?.advertisersPagination;

  // Now use category filter with actual advertisers data
  const {
    categoryItems,
    selectedCategories,
    updateCategoryFilter,
    clearCategoryFilters,
    activeFilterLabels,
    hasActiveFilters,
    categoriesLoading,
  } = useCategoryFilter(advertisers, locale);

  return (
    <div>
      {/* Mobile Filter Button - only visible on mobile */}
      <div className="lg:hidden mb-4">
        <MobileFilterButton
          activeFiltersCount={selectedCategories.length}
          onClick={() => setIsMobileFilterOpen(true)}
          dictionary={{ filters: dictionary.filters.title }}
        />
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        open={isMobileFilterOpen}
        onOpenChange={setIsMobileFilterOpen}
        categoryItems={categoryItems}
        selectedCategories={selectedCategories}
        onCategoryChange={updateCategoryFilter}
        dictionary={dictionary}
        trigger={<div />} // Not used since we control open state
      />

      <div className="flex gap-6">
        {/* Desktop Filter Sidebar - hidden on mobile */}
        <FilterSidebar
          categoryItems={categoryItems}
          selectedCategories={selectedCategories}
          onCategoryChange={updateCategoryFilter}
          dictionary={dictionary}
        />

        {/* Main Content */}
        <div className="flex-1">
          {/* Active Filters */}
          {hasActiveFilters && (
            <ActiveFilters
              activeFilters={activeFilterLabels}
              onRemoveFilter={(filterId) => {
                const newSelected = selectedCategories.filter(
                  (id) => id !== filterId,
                );
                updateCategoryFilter(newSelected);
              }}
              onClearAll={clearCategoryFilters}
              dictionary={dictionary}
              className="mb-6"
            />
          )}

          {/* Store Grid */}
          {loading && advertisers.length === 0 ? (
            // Loading skeleton to prevent empty state flash
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-32 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <InfiniteScroll
              dataLength={advertisers.length}
              hasMore={!!pagination?.nextPage}
              loader={<div />}
              next={loadMore}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
                {advertisers.map((advertiser) => (
                  <PopularMerchantsItem
                    language={locale}
                    key={advertiser.id}
                    advertiser={advertiser}
                    cashbackLabel={dictionary.cashback}
                  />
                ))}
              </div>
            </InfiniteScroll>
          )}

          {/* No Results Message */}
          {!loading && hasActiveFilters && advertisers.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                {dictionary.filters.noStoresFound}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                {dictionary.filters.noStoresFoundDescription}
              </p>
              <button
                onClick={clearCategoryFilters}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline"
              >
                {dictionary.filters.clearAll}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
