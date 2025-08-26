import { getDictionary } from '@/dictionaries';
import { ServerComponentProps } from '@/types';
import { BalanceStats } from '@/components/balance-stats';
import { PendingBalanceStats } from '@/components/pending-balance-stats';
import { DashboardTabs } from '@/components/dashboard-tabs';
import { Header } from '@tekminewe/mint-ui/typography';

export const DashboardPage = async ({ params }: ServerComponentProps<any>) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return (
    <div className="mx-4 w-full">
      <Header>{dictionary.dashboard.title}</Header>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        <BalanceStats dictionary={dictionary} locale={lang} />
        <PendingBalanceStats dictionary={dictionary} locale={lang} />
      </div>
      <div>
        <DashboardTabs
          locale={lang}
          dictionary={{
            common: {
              error: dictionary.common.error,
            },
            myClicks: dictionary.dashboard.myClicks,
            myCashbacks: dictionary.dashboard.myCashbacks,
            myWithdrawals: dictionary.dashboard.myWithdrawals,
            tabs: dictionary.dashboard.tabs,
          }}
        />
      </div>
    </div>
  );
};
