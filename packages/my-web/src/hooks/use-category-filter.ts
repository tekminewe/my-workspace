'use client';

import { useState, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useAdvertiserCategoriesWithCounts } from './use-advertiser-categories-with-counts';
import {
  PopularMerchant,
  useAllAdvertisersGQL,
} from '@/hooks/use-all-advertisers-gql';
import { AdvertiserCategoryEnum } from '@/services/graphql';

export type CategoryItem = {
  value: string;
  label: string;
  count: number;
};

export const useCategoryFilter = (
  advertisers: PopularMerchant[],
  language?: string,
) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { categories, loading: categoriesLoading } =
    useAdvertiserCategoriesWithCounts(language);

  // Get selected categories from URL
  const selectedCategories = useMemo(() => {
    const categories = searchParams.get('categories');
    return categories ? categories.split(',') : [];
  }, [searchParams]);

  // Transform backend categories to CategoryItem format
  const categoryItems = useMemo(() => {
    return categories
      .map((category) => ({
        value: category.id,
        label: category.name,
        count: category.count,
      }))
      .filter((item) => item.count > 0); // Only show categories with active advertisers
  }, [categories]);

  // Filter advertisers based on selected categories (client-side filtering for display only)
  const filteredAdvertisers = useMemo(() => {
    if (selectedCategories.length === 0) {
      return advertisers;
    }

    return advertisers.filter((advertiser) =>
      advertiser.categories?.some((category) =>
        selectedCategories.includes(category.id),
      ),
    );
  }, [advertisers, selectedCategories]);

  // Update URL with selected categories
  const updateCategoryFilter = useCallback(
    (newSelectedCategories: string[]) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newSelectedCategories.length > 0) {
        params.set('categories', newSelectedCategories.join(','));
      } else {
        params.delete('categories');
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname],
  );

  // Clear all category filters
  const clearCategoryFilters = useCallback(() => {
    updateCategoryFilter([]);
  }, [updateCategoryFilter]);

  // Get active filter labels for display using backend-provided names
  const activeFilterLabels = useMemo(() => {
    return selectedCategories.map((categoryId) => {
      const category = categories.find((cat) => cat.id === categoryId);
      return {
        id: categoryId,
        label: category?.name || categoryId, // Use backend-provided localized name
      };
    });
  }, [selectedCategories, categories]);

  // Convert selected categories to enum values for GraphQL query
  const selectedCategoryEnums = useMemo(() => {
    return selectedCategories.filter((id) =>
      Object.values(AdvertiserCategoryEnum).includes(
        id as AdvertiserCategoryEnum,
      ),
    ) as AdvertiserCategoryEnum[];
  }, [selectedCategories]);

  return {
    categoryItems,
    selectedCategories,
    selectedCategoryEnums,
    filteredAdvertisers,
    updateCategoryFilter,
    clearCategoryFilters,
    activeFilterLabels,
    hasActiveFilters: selectedCategories.length > 0,
    categoriesLoading,
  };
};
