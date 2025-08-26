'use client';

import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { AdvertiserCategoriesWithCountsQuery } from '@/services/graphql';

const ADVERTISER_CATEGORIES_WITH_COUNTS_QUERY = gql(/* GraphQL */ `
  query AdvertiserCategoriesWithCounts {
    advertiserCategoriesWithCounts {
      id
      name
      description
      count
    }
  }
`);

export const useAdvertiserCategoriesWithCounts = (language?: string) => {
  const { data, loading, error } =
    useQuery<AdvertiserCategoriesWithCountsQuery>(
      ADVERTISER_CATEGORIES_WITH_COUNTS_QUERY,
      {
        context: {
          headers: {
            'Accept-Language': language || 'en-US',
          },
        },
      },
    );

  return {
    categories: data?.advertiserCategoriesWithCounts || [],
    loading,
    error,
  };
};
