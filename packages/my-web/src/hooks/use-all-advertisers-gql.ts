import { useCallback, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_ADVERTISERS } from '@/graphql/queries/get-all-advertisers';
import {
  GetAllAdvertisersQuery,
  AdvertiserCategoryEnum,
} from '@/services/graphql';
import { useSession } from 'next-auth/react';

export type PopularMerchant = {
  id: string;
  name: string;
  slug: string;
  categories?: Array<{
    id: AdvertiserCategoryEnum;
    name: string;
    description?: string | null;
  }>;
  logo: {
    url: string;
  };
  commission: {
    calculatedCommission: number;
  };
};

type UseAllAdvertisersGQLProps = {
  pageSize?: number;
  locale?: string;
  categoryIds?: AdvertiserCategoryEnum[];
};

// Convert GraphQL Advertiser to our simplified PopularMerchant type
const convertToPopularMerchant = (
  advertiser: GetAllAdvertisersQuery['advertisers'][0],
): PopularMerchant => {
  return {
    id: advertiser.id,
    name: advertiser.name,
    slug: advertiser.slug,
    categories: advertiser.categories || [],
    logo: {
      url: advertiser.logo.url,
    },
    commission: {
      calculatedCommission: advertiser.commission?.calculatedCommission || 0,
    },
  };
};

export const useAllAdvertisersGQL = ({
  pageSize = 25,
  locale = 'en-US',
  categoryIds,
}: UseAllAdvertisersGQLProps = {}) => {
  const { data, loading, error, fetchMore } = useQuery<GetAllAdvertisersQuery>(
    GET_ALL_ADVERTISERS,
    {
      variables: {
        page: 1,
        pageSize,
        statusId: 'Active',
        categoryIds,
      },
      context: {
        headers: {
          'Accept-Language': locale,
        },
      },
    },
  );

  const loadMore = useCallback(() => {
    if (!data?.advertisersPagination.nextPage) return;

    fetchMore({
      variables: {
        page: data.advertisersPagination.nextPage,
        categoryIds,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          advertisers: [...prev.advertisers, ...fetchMoreResult.advertisers],
          advertisersPagination: fetchMoreResult.advertisersPagination,
        };
      },
    });
  }, [data, fetchMore, categoryIds]);

  // Convert the GraphQL data to our simplified type
  const advertisers = data?.advertisers.map(convertToPopularMerchant) || [];

  return {
    data: {
      advertisers,
      advertisersPagination: data?.advertisersPagination,
    },
    loading,
    error,
    loadMore,
  };
};
