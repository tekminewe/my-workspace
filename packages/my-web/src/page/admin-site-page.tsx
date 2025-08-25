import { Header } from '@tekminewe/mint-ui/typography';
import { ServerComponentProps } from '@/types';
import { ErrorMessage } from '@tekminewe/mint-ui/error-message';
import { getSessionServer } from '@/services/auth/next';
import { getDictionary } from '@/dictionaries';
import { query } from '@/services/apollo-client-server';
import { GET_SITE_ADMIN } from '@/graphql/queries/get-site-admin';
import { AdminSiteTabs } from '@/components/admin-site-tabs';

export type GetSiteAdminQuery = {
  site: {
    id: string;
    name: string;
    domain: string;
    description: string | null;
    logo: {
      id: string;
      url: string;
    } | null;
    metadatas: Array<{
      name: string;
      description: string | null;
      logo: {
        id: string;
        url: string;
      } | null;
      darkLogo: {
        id: string;
        url: string;
      } | null;
      languageId: string;
    }>;
    createdAt: string;
    updatedAt: string;
  };
  languages: Array<{
    id: string;
    name: string;
    code: string;
    shortName: string;
    isSupported: boolean;
    isDefault: boolean;
  }>;
};

export const AdminSitePage = async ({ params }: ServerComponentProps<any>) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const session = await getSessionServer();

  // Fetch site data and supported languages
  const { data } = await query<GetSiteAdminQuery>({
    query: GET_SITE_ADMIN,
    context: {
      headers: {
        'Accept-Language': lang,
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  });

  if (!data) {
    return (
      <ErrorMessage
        title={dictionary.common.error.title}
        message={dictionary.common.error.message}
      />
    );
  }

  const { site, languages } = data;

  return (
    <div>
      <Header className="mb-3">{dictionary.admin.site.title}</Header>

      <AdminSiteTabs
        site={site}
        languages={languages}
        currentLanguage={lang}
        dictionary={{
          ...dictionary.admin.site,
          ...dictionary.common,
        }}
      />
    </div>
  );
};
