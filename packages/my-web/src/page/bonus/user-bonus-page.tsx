import { getDictionary } from '@/dictionaries';
import { ServerComponentProps } from '@/types';
import { UserBonus } from '@/components/user/bonus/user-bonus';
import { Header } from '@tekminewe/mint-ui/typography';

export const UserBonusPage = async ({ params }: ServerComponentProps<any>) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="mx-4 w-full">
      <Header>{dictionary.admin.bonus.user.title}</Header>
      <div className="mt-8">
        <UserBonus dictionary={dictionary.admin.bonus} lang={lang} />
      </div>
    </div>
  );
};
