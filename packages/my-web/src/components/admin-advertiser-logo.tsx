'use client';

import { gql, useQuery } from '@apollo/client';
import {
  AdminAdvertiserLogoQuery,
  AdminAdvertiserLogoQueryVariables,
} from '@/services/graphql';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const ADVERTISER_QUERY = gql(/* GraphQL */ `
  query AdminAdvertiserLogo($advertiserId: String!) {
    advertiser(advertiserId: $advertiserId) {
      id
      name
      logo {
        url
      }
    }
  }
`);

export const AdminAdvertiserLogo = ({
  advertiserId,
  lang,
}: {
  advertiserId: string;
  lang: string;
}) => {
  const [isError, setIsError] = useState(false);
  const session = useSession();

  const { data, loading } = useQuery<
    AdminAdvertiserLogoQuery,
    AdminAdvertiserLogoQueryVariables
  >(ADVERTISER_QUERY, {
    variables: {
      advertiserId,
    },
    context: {
      headers: {
        'Accept-Language': lang,
        Authorization: `Bearer ${session?.data?.accessToken}`,
      },
    },
    onError: () => setIsError(true),
  });

  if (loading)
    return <div className="w-6 h-6 bg-neutral-200 rounded animate-pulse" />;
  if (isError || !data?.advertiser?.logo?.url)
    return <div className="w-6 h-6 bg-neutral-100 rounded" />;

  return (
    <div className="flex items-center justify-center">
      <Image
        src={data.advertiser.logo.url}
        alt={data.advertiser.name}
        width={24}
        height={24}
        className="object-contain"
      />
    </div>
  );
};
