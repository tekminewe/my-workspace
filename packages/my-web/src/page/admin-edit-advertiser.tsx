import { getDictionary } from '@/dictionaries';
import { query } from '@/services/apollo-client-server';
import {
  AdminAdvertiserMultiCommissionsQueryQuery,
  AffiliateProviderEnum,
} from '@/services/graphql';
import { ServerComponentProps } from '@/types';
import { getSessionServer } from '@/services/auth/next';
import { Header } from '@tekminewe/mint-ui/typography';
import { AdminAdvertiserForm } from '@/components/admin-advertiser-form';
import { ADMIN_ADVERTISER_MULTI_COMMISSIONS_QUERY } from '@/graphql/queries/admin-advertiser-multi-commissions-query';

export const AdminEditAdvertiserPage = async ({
  params,
}: ServerComponentProps<{ params: Promise<{ advertiserId: string }> }>) => {
  const { lang, advertiserId } = await params;
  const session = await getSessionServer();
  const dictionary = await getDictionary(lang);

  const result = await query<AdminAdvertiserMultiCommissionsQueryQuery>({
    query: ADMIN_ADVERTISER_MULTI_COMMISSIONS_QUERY,
    variables: {
      id: advertiserId,
    },
    context: {
      headers: {
        'Accept-Language': lang,
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  });

  const advertiser = result.data.advertiser;

  // Transform commissions from GraphQL to our form structure
  const formCommissions =
    advertiser.commissions?.map((commission: any) => {
      return {
        id: commission.id,
        providerId: commission.providerId as AffiliateProviderEnum,
        statusId: commission.statusId === 'Active',
        commissionRows: commission.commissionRows.map((row: any) => {
          return {
            id: row.id,
            providerReferenceId: row.providerReferenceId || '',
            name: row.name,
            commission: row.commission,
            typeId: row.typeId,
            statusId: row.statusId === 'Active',
            metadatas: row.metadatas || [],
          };
        }),
      };
    }) || [];

  // Get provider references
  const providerReferences = advertiser.providerReferences || [];

  return (
    <div>
      <Header className="mb-3">
        {dictionary.admin.advertiser.manage.updateAdvertiser}
      </Header>
      <AdminAdvertiserForm
        language={lang}
        advertiser={{
          id: advertiserId,
          name: advertiser.name,
          slug: advertiser.slug || '',
          statusId: advertiser.statusId === 'Active',
          metadatas: advertiser.metadatas || [],
          commissions: formCommissions,
          providerReferences: providerReferences,
          categories: advertiser.categories?.map((cat) => cat.id) || [],
        }}
        dictionary={{
          ...dictionary.admin.advertiser.manage,
          ...dictionary.common,
        }}
      />
    </div>
  );
};
