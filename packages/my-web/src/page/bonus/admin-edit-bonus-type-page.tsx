import { getDictionary } from '@/dictionaries';
import { ServerComponentProps } from '@/types';
import { AdminEditBonusTypeForm } from '@/components/admin/bonus/admin-edit-bonus-type-form';
import { query } from '@/services/apollo-client-server';
import { GET_SUPPORTED_LANGUAGES } from '@/graphql/queries/get-supported-languages';
import { GetSupportedLanguagesQuery } from '@/services/graphql';

export const AdminEditBonusTypePage = async ({
  params,
}: ServerComponentProps<any>) => {
  const { lang, bonusTypeId } = await params;
  const dictionary = await getDictionary(lang);

  // Fetch supported languages from the backend
  const { data } = await query<GetSupportedLanguagesQuery>({
    query: GET_SUPPORTED_LANGUAGES,
  });

  return (
    <AdminEditBonusTypeForm
      dictionary={dictionary}
      lang={lang}
      bonusTypeId={bonusTypeId}
      supportedLanguages={data.languages}
    />
  );
};
