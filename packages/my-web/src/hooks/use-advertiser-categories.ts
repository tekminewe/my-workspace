'use client';

import { useQuery } from '@apollo/client';
import { GET_ADVERTISER_CATEGORIES } from '@/graphql/queries/get-advertiser-categories';
import { GetAdvertiserCategoriesQuery } from '@/services/graphql';

export const useAdvertiserCategories = (language?: string) => {
  const { data, loading, error } = useQuery<GetAdvertiserCategoriesQuery>(
    GET_ADVERTISER_CATEGORIES,
    {
      // Use context to set Accept-Language header
      context: {
        headers: {
          'Accept-Language': language || 'en-US',
        },
      },
      // Ensure we refetch when language changes
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    },
  );

  return {
    categories: data?.advertiserCategories || [],
    loading,
    error,
  };
};
