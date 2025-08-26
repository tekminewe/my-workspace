'use client';

import { DataTable } from '@tekminewe/mint-ui/data-table';
import { ErrorMessage } from '@tekminewe/mint-ui/error-message';
import { Badge } from '@tekminewe/mint-ui/badge';
import { UserCashbackDto } from '@/services/api';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useMyCashbacks } from '@/hooks/use-my-cashbacks';
import { formatCurrency } from '@/utils/currency';

export const MyCashbacksTable = ({
  dictionary,
  language,
}: {
  language: string;
  dictionary: {
    common: {
      error: {
        title: string;
        message: string;
      };
    };
    myCashbacks: {
      date: string;
      merchant: string;
      amount: string;
      status: string;
    };
  };
}) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMyCashbacks({
    page,
    pageSize: 25,
    language,
  });

  if (data && !data?.ok()) {
    return (
      <ErrorMessage
        title={dictionary.common.error.title}
        message={dictionary.common.error.message}
      />
    );
  }

  return (
    <DataTable<UserCashbackDto, any>
      isLoading={isLoading}
      data={data?.data.data ?? []}
      totalCount={data?.data.pagination.totalItems ?? 0}
      pageSize={data?.data.pagination.pageSize ?? 1}
      page={data?.data.pagination.currentPage ?? 1}
      onPaginationChange={({ page }) => {
        setPage(page);
      }}
      columns={[
        {
          dataKey: undefined,
          label: dictionary.myCashbacks.date,
          renderCell: ({ value }) => {
            return dayjs(value.createdAt).format('lll');
          },
        },
        {
          dataKey: undefined,
          label: dictionary.myCashbacks.merchant,
          renderCell: ({ value }) => {
            if (value instanceof Object) {
              return (
                <div>
                  <div className="font-semibold">{value.advertiser.name}</div>
                  <div className="caption">{value.advertiserOrderId}</div>
                </div>
              );
            }
            return null;
          },
        },
        {
          dataKey: 'netAmount',
          label: dictionary.myCashbacks.amount,
          renderCell: ({ value }) => {
            return (
              <div className="font-semibold">
                {formatCurrency({
                  amount: +value,
                  locale: language,
                  currency: 'MYR',
                })}
              </div>
            );
          },
        },
        {
          dataKey: 'statusId',
          label: dictionary.myCashbacks.status,
          renderCell: ({ value }) => {
            let color: undefined | 'gray' = 'gray';
            if (value === 'Approved') {
              color = undefined;
            }
            return <Badge color={color}>{value.toString()}</Badge>;
          },
        },
      ]}
    />
  );
};
