import { getSessionServer } from '@/services/auth/next';
import { client } from '@/services/client';
import { ErrorMessage } from '@tekminewe/mint-ui/error-message';
import { AdminContent } from '@tekminewe/mint-ui/admin-content';
import { AdminLayout as MintAdminLayout } from '@tekminewe/mint-ui/admin-layout';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { AdminSidebar } from '@/components/sidebar';
import { AdminNavbar } from '@/components/admin-navbar';
import { ServerComponentProps } from '@/types';
import { getDictionary } from '@/dictionaries';
import { query } from '@/services/apollo-client-server';
import { GET_SITE_WITH_METADATA } from '@/graphql/queries/get-site-with-metadata';
import { GetSiteWithMetadataQuery } from '@/services/graphql';

export const AdminLayout = async ({
  children,
  params,
}: ServerComponentProps<{ children: ReactNode }>) => {
  const session = await getSessionServer();
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  const role = await client.roles.getUserRolesAndPermissions({
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  if (!role?.ok) {
    console.error(role?.error);
    return <ErrorMessage title="Error" message="Something went wrong" />;
  }

  const permissions = role.data.data.flatMap((r) =>
    r.permissions.map((p) => p.name),
  );

  if (!permissions.includes('AdminPanel')) {
    return redirect('/');
  }

  // Fetch site data for the sidebar logo
  const siteData = await query<GetSiteWithMetadataQuery>({
    query: GET_SITE_WITH_METADATA,
    context: {
      headers: {
        'Accept-Language': lang,
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  });

  return (
    <MintAdminLayout>
      <AdminSidebar
        language={lang}
        permissions={permissions}
        dictionary={{ ...dictionary.admin, navbar: dictionary.navbar }}
        site={siteData.data?.site}
        languages={siteData.data?.languages}
      />
      <AdminNavbar />
      <AdminContent>{children}</AdminContent>
    </MintAdminLayout>
  );
};
