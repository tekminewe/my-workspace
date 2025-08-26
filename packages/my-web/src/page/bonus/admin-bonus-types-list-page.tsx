import { getDictionary } from '@/dictionaries';
import { ServerComponentProps } from '@/types';
import { AdminBonusTypesList } from '@/components/admin/bonus/admin-bonus-types-list';

export const AdminBonusTypesListPage = async ({
  params,
}: ServerComponentProps<any>) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <AdminBonusTypesList dictionary={dictionary} lang={lang} />;
};
