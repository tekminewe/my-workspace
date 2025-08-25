'use client';

import { useQuery } from '@apollo/client';
import { GET_BONUS_TYPE } from '@/graphql/bonus/admin-bonus-queries';
import {
  GetBonusTypeQuery,
  GetBonusTypeQueryVariables,
} from '@/services/graphql';
import { AdminBonusTypeForm } from './admin-bonus-type-form';
import { useSession } from 'next-auth/react';
import { Spinner } from '@tekminewe/mint-ui/spinner';
import { Card } from '@tekminewe/mint-ui/card';
import { Button } from '@tekminewe/mint-ui/button';

interface AdminEditBonusTypeFormProps {
  /**
   * Dictionary for translations
   * @example { admin: { bonuses: { editBonusType: "Edit Bonus Type" } } }
   */
  dictionary: any;
  /**
   * Language code for localization
   * @example "en"
   */
  lang: string;
  /**
   * ID of the bonus type to edit
   * @example "bonus_123"
   */
  bonusTypeId: string;
  /**
   * Supported languages from the database
   * @example [{ id: "EN_MY", name: "English (Malaysia)" }]
   */
  supportedLanguages: Array<{
    id: string;
    name: string;
    code: string;
    shortName: string;
    isSupported: boolean;
    isDefault: boolean;
  }>;
}

export const AdminEditBonusTypeForm = ({
  dictionary,
  lang,
  bonusTypeId,
  supportedLanguages,
}: AdminEditBonusTypeFormProps) => {
  const session = useSession();

  const { data, loading, error, refetch } = useQuery<
    GetBonusTypeQuery,
    GetBonusTypeQueryVariables
  >(GET_BONUS_TYPE, {
    variables: {
      id: bonusTypeId,
    },
    context: {
      headers: {
        'Accept-Language': lang,
        Authorization: `Bearer ${session?.data?.accessToken}`,
      },
    },
  });

  if (loading) {
    return (
      <Card>
        <div className="flex items-center justify-center p-8">
          <Spinner size="lg" />
        </div>
      </Card>
    );
  }

  if (error || !data?.bonusType) {
    return (
      <Card>
        <div className="p-8 text-center">
          <div className="text-red-600 dark:text-red-400">
            <p className="text-lg font-medium mb-2">
              {dictionary?.admin?.bonuses?.loadError ||
                'Failed to load bonus type'}
            </p>
            <p className="text-sm mb-4">
              {error?.message || 'Bonus type not found'}
            </p>
            <Button onClick={() => refetch()} variant="outline">
              {dictionary?.admin?.bonuses?.retry || 'Retry'}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <AdminBonusTypeForm
      dictionary={dictionary}
      lang={lang}
      bonusType={data.bonusType}
      supportedLanguages={supportedLanguages}
    />
  );
};
