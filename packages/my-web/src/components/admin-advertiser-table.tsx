'use client';

import { Dictionary } from '@/dictionaries';
import {
  AdminAdvertiserListQuery,
  AdvertiserStatusEnum,
  SortByField,
  SortDirection,
} from '@/services/graphql';
import { gql, useQuery } from '@apollo/client';
import { Badge } from '@tekminewe/mint-ui/badge';
import { DataTable } from '@tekminewe/mint-ui/data-table';
import { IconButton } from '@tekminewe/mint-ui/icon-button';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { LuPen } from 'react-icons/lu';

const QUERY = gql(/* GraphQL */ `
  query AdminAdvertiserList(
    $page: Int!
    $pageSize: Int!
    $sortBy: SortByField
    $sortDirection: SortDirection
  ) {
    advertisers(
      page: $page
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      id
      name
      logo {
        url
      }
      statusId
      commission {
        commission
      }
      categories {
        id
        name
      }
      createdAt
    }
    advertisersPagination(
      page: $page
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      totalItems
      pageSize
      currentPage
    }
  }
`);

export const AdminAdvertiserTable = ({
  lang,
  dictionary,
}: {
  lang: string;
  dictionary: Dictionary['admin']['advertiser']['list'];
}) => {
  const session = useSession();
  const [page, setPage] = useState(1);

  const { data, loading } = useQuery<AdminAdvertiserListQuery>(QUERY, {
    variables: {
      page,
      pageSize: 25,
      sortBy: 'CreatedAt',
      sortDirection: 'Desc',
    },
    context: {
      headers: {
        'Accept-Language': lang,
        Authorization: `Bearer ${session?.data?.accessToken}`,
      },
    },
  });

  const advertisers = data?.advertisers;
  const pagination = data?.advertisersPagination;

  return (
    <DataTable<AdminAdvertiserListQuery['advertisers'][0], any>
      data={advertisers ?? []}
      isLoading={loading}
      totalCount={pagination?.totalItems ?? 0}
      pageSize={pagination?.pageSize ?? 1}
      page={pagination?.currentPage ?? 1}
      onPaginationChange={({ page }) => {
        setPage(page);
      }}
      columns={[
        {
          label: dictionary.nameLabel,
          dataKey: 'name',
        },
        {
          label: dictionary.categoriesLabel || 'Categories',
          dataKey: undefined,
          renderCell: ({ value }) => {
            return value.categories && value.categories.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {value.categories.map((category: any) => (
                  <Badge key={category.id} variant="soft">
                    {category.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-neutral-500">-</span>
            );
          },
        },
        {
          label: dictionary.logoLabel,
          dataKey: undefined,
          renderCell: ({ value }) => {
            return value ? (
              <Image
                src={value.logo.url}
                alt={value.name}
                width={50}
                height={50}
              />
            ) : null;
          },
        },
        {
          label: dictionary.commissionLabel,
          dataKey: undefined,
          renderCell: ({ value }) => {
            return value.commission?.commission
              ? `${value.commission.commission}%`
              : 'N/A';
          },
        },
        {
          label: dictionary.createdAtLabel,
          dataKey: undefined,
          renderCell: ({ value }) => {
            return new Date(value.createdAt).toLocaleDateString();
          },
        },
        {
          label: dictionary.statusLabel,
          dataKey: undefined,
          renderCell: ({ value }) => {
            return (
              <Badge>
                {value.statusId === AdvertiserStatusEnum.Active
                  ? dictionary.active
                  : dictionary.inactive}
              </Badge>
            );
          },
        },
        {
          label: dictionary.actionLabel,
          dataKey: undefined,
          renderCell: ({ value }) => {
            return (
              <div>
                <Link href={`/${lang}/admin/advertiser/${value.id}/edit`}>
                  <IconButton>
                    <LuPen />
                  </IconButton>
                </Link>
              </div>
            );
          },
        },
      ]}
    />
  );
};
