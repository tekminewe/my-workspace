'use client';

import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { GET_MY_BONUS_TRANSACTIONS_PAGINATED } from '@/graphql/bonus/user-bonus-queries';
import { DataTable, IDataTableColumn } from '@tekminewe/mint-ui/data-table';
import { Badge } from '@tekminewe/mint-ui/badge';
import dayjs from 'dayjs';
import { useState } from 'react';

interface BonusTransaction {
  id: string;
  amount: number;
  currencyId: string;
  processedAt: string;
  createdAt: string;
  bonusEligibility?: {
    bonusType?: {
      id: string;
      codeId: string;
      metadata?: {
        title?: string;
        description?: string;
      };
    };
  };
}

interface BonusTransactionTableProps {
  /**
   * Dictionary for translations
   */
  dictionary: {
    user?: {
      bonusTransactions?: {
        bonusType?: string;
        amount?: string;
        dateUsed?: string;
        status?: string;
        statusUsed?: string;
        unknownBonus?: string;
        noTransactions?: string;
        noTransactionsDescription?: string;
      };
    };
  };
  /**
   * Language code for localization
   */
  lang: string;
}

export const BonusTransactionTable = ({
  dictionary,
  lang,
}: BonusTransactionTableProps) => {
  const session = useSession();
  const [page, setPage] = useState(1);
  const pageSize = 25;

  const { data, loading, error } = useQuery(
    GET_MY_BONUS_TRANSACTIONS_PAGINATED,
    {
      variables: {
        page,
        pageSize,
      },
      context: {
        headers: {
          'Accept-Language': lang,
          Authorization: `Bearer ${session?.data?.accessToken}`,
        },
      },
      skip: !session?.data?.accessToken,
      fetchPolicy: 'cache-and-network',
    },
  );

  const columns: IDataTableColumn<BonusTransaction>[] = [
    {
      dataKey: 'bonusEligibility',
      label: dictionary?.user?.bonusTransactions?.bonusType || 'Bonus Type',
      renderCell: ({ value }) => {
        const bonusEligibility = value as BonusTransaction['bonusEligibility'];
        return (
          <div className="min-w-0">
            <p className="font-medium text-neutral-900 dark:text-white truncate">
              {bonusEligibility?.bonusType?.metadata?.title ||
                bonusEligibility?.bonusType?.codeId ||
                dictionary?.user?.bonusTransactions?.unknownBonus ||
                'Unknown Bonus'}
            </p>
          </div>
        );
      },
    },
    {
      dataKey: 'amount',
      label: dictionary?.user?.bonusTransactions?.amount || 'Amount',
      renderCell: ({ value, rowIndex }) => {
        const amount = value as number;
        const transaction =
          data?.myBonusTransactionsPaginated?.items?.[rowIndex];
        return (
          <div className="flex justify-start">
            <Badge
              variant="solid"
              className="bg-success-100 text-success-600 dark:bg-success-600 dark:text-success-100"
            >
              +{amount?.toFixed(2)} {transaction?.currencyId || 'MYR'}
            </Badge>
          </div>
        );
      },
    },
    {
      dataKey: 'processedAt',
      label: dictionary?.user?.bonusTransactions?.dateUsed || 'Date Used',
      renderCell: ({ value }) => {
        const date = value as string;
        return (
          <div className="flex flex-col items-start">
            <p className="text-neutral-900 dark:text-white">
              {dayjs(date).format('lll')}
            </p>
          </div>
        );
      },
    },
  ];

  const handlePaginationChange = ({ page: newPage }: { page: number }) => {
    setPage(newPage);
  };

  const transactions = data?.myBonusTransactionsPaginated?.items || [];
  const totalCount = data?.myBonusTransactionsPaginated?.totalCount || 0;

  return (
    <DataTable
      columns={columns}
      data={transactions}
      page={page}
      pageSize={pageSize}
      totalCount={totalCount}
      onPaginationChange={handlePaginationChange}
      isLoading={loading}
      emptyTitle={
        dictionary?.user?.bonusTransactions?.noTransactions || 'No Transactions'
      }
      emptyText={
        dictionary?.user?.bonusTransactions?.noTransactionsDescription ||
        "You haven't used any bonuses yet."
      }
      variant="surface"
    />
  );
};
