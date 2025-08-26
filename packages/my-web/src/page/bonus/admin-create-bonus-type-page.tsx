import { getDictionary } from '@/dictionaries';
import { ServerComponentProps } from '@/types';
import { AdminBonusTypeForm } from '@/components/admin/bonus/admin-bonus-type-form';
import { query } from '@/services/apollo-client-server';
import { GET_SUPPORTED_LANGUAGES } from '@/graphql/queries/get-supported-languages';
import { GetSupportedLanguagesQuery } from '@/services/graphql';

export const AdminCreateBonusTypePage = async ({
  params,
}: ServerComponentProps<any>) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  // Fetch supported languages from the server
  const { data } = await query<GetSupportedLanguagesQuery>({
    query: GET_SUPPORTED_LANGUAGES,
  });

  const supportedLanguages = data?.languages || [];

  return (
    <AdminBonusTypeForm
      dictionary={dictionary}
      lang={lang}
      supportedLanguages={supportedLanguages}
    />
  );
};
