'use client';

import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { GET_BONUS_TYPES } from '@/graphql/bonus/admin-bonus-queries';
import { GetBonusTypesQuery } from '@/services/graphql';
import { Card } from '@tekminewe/mint-ui/card';
import { Button } from '@tekminewe/mint-ui/button';
import { Badge } from '@tekminewe/mint-ui/badge';
import { DataTable, IDataTableColumn } from '@tekminewe/mint-ui/data-table';
import { Spinner } from '@tekminewe/mint-ui/spinner';
import { format } from 'date-fns';

interface AdminBonusTypesListProps {
  dictionary: any;
  lang: string;
}

export const AdminBonusTypesList = ({
  dictionary,
  lang,
}: AdminBonusTypesListProps) => {
  const router = useRouter();
  const session = useSession();

  const { data, loading, error, refetch } = useQuery<GetBonusTypesQuery>(
    GET_BONUS_TYPES,
    {
      context: {
        headers: {
          'Accept-Language': lang,
          Authorization: `Bearer ${session?.data?.accessToken}`,
        },
      },
      errorPolicy: 'all', // This ensures we get both data and error when available
    },
  );

  type BonusTypeData = GetBonusTypesQuery['bonusTypes'][0];

  const columns: IDataTableColumn<BonusTypeData>[] = useMemo(
    () => [
      {
        dataKey: 'codeId',
        label: dictionary?.admin?.bonuses?.code || 'Code',
        renderCell: ({ value }: any) => (
          <Badge variant="outline">{value != null ? value : '-'}</Badge>
        ),
      },
      {
        dataKey: 'version',
        label: dictionary?.admin?.bonuses?.version || 'Version',
        renderCell: ({ value }: any) => (
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            v{value != null ? value : 0}
          </span>
        ),
      },
      {
        dataKey: 'statusId',
        label: dictionary?.admin?.bonuses?.status || 'Status',
        renderCell: ({ value }: any) => (
          <Badge variant={value === 'Active' ? 'solid' : 'soft'}>
            {value != null ? value : '-'}
          </Badge>
        ),
      },
      {
        dataKey: 'priority',
        label: dictionary?.admin?.bonuses?.priority || 'Priority',
      },
      {
        dataKey: 'maxUsagePerUser',
        label: dictionary?.admin?.bonuses?.maxUsage || 'Max Usage',
      },
      {
        dataKey: 'expiryDays',
        label: dictionary?.admin?.bonuses?.expiryDays || 'Expiry Days',
        renderCell: ({ value }: { value: number | null }) => (
          <span>
            {value || dictionary?.admin?.bonuses?.noExpiry || 'No expiry'}
          </span>
        ),
      },
      {
        dataKey: 'effectiveFrom',
        label: dictionary?.admin?.bonuses?.effectiveFrom || 'Effective From',
        renderCell: ({ value }: { value: string | null }) => (
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {value ? format(new Date(value), 'MMM dd, yyyy') : '-'}
          </span>
        ),
      },
      {
        dataKey: 'effectiveTo',
        label: dictionary?.admin?.bonuses?.effectiveTo || 'Effective To',
        renderCell: ({ value }: { value: string | null }) => (
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {value
              ? format(new Date(value), 'MMM dd, yyyy')
              : dictionary?.admin?.bonuses?.indefinite || 'Indefinite'}
          </span>
        ),
      },
      {
        dataKey: undefined,
        label: dictionary?.admin?.bonuses?.actions || 'Actions',
        renderCell: ({ value: rowData }: { value: BonusTypeData }) => (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(rowData)}
            >
              {dictionary?.admin?.bonuses?.edit || 'Edit'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(rowData?.id)}
            >
              {dictionary?.admin?.bonuses?.delete || 'Delete'}
            </Button>
          </div>
        ),
      },
    ],
    [dictionary],
  );

  const handleCreate = () => {
    router.push(`/${lang}/admin/bonus/create`);
  };

  const handleEdit = (bonusType: any) => {
    router.push(`/${lang}/admin/bonus/${bonusType.id}/edit`);
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete bonus type
    console.log('Delete bonus type:', id);
  };

  if (loading) {
    return (
      <Card className="p-8">
        <div className="flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-600 dark:text-red-400">
          <p className="text-lg font-medium mb-2">
            {dictionary?.admin?.bonuses?.loadError ||
              'Failed to load bonus types'}
          </p>
          <p className="text-sm mb-4">{error.message}</p>
          <Button onClick={() => refetch()} variant="outline">
            {dictionary?.admin?.bonuses?.retry || 'Retry'}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {dictionary?.admin?.bonuses?.title || 'Bonus Types'}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            {dictionary?.admin?.bonuses?.description ||
              'Manage and configure bonus types for your platform.'}
          </p>
        </div>
      </div>

      <Card>
        <DataTable
          data={data?.bonusTypes || []}
          columns={columns}
          isLoading={loading}
          showAddButton={!error}
          onAddButtonClick={handleCreate}
          addButtonLabel={
            dictionary?.admin?.bonuses?.createNew || 'Create New Bonus Type'
          }
        />
      </Card>
    </div>
  );
};
