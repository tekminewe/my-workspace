import { WithdrawalMethods } from '@/components/withdrawal-methods';
import { UserBanks } from '@/components/user-banks';
import { ServerComponentProps } from '@/types';
import { getDictionary } from '@/dictionaries';
import { getMyWallet } from '@/services/wallet';
import { getSessionServer } from '@/services/auth/next';
import { ErrorMessage } from '@tekminewe/mint-ui/error-message';
import { Card } from '@tekminewe/mint-ui/card';
import { Header } from '@tekminewe/mint-ui/typography';
import { BalanceStats } from '@/components/balance-stats';
import { logError } from '@/services/error';

export const WithdrawalPage = async ({ params }: ServerComponentProps<any>) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const session = await getSessionServer();
  const wallet = await getMyWallet('MYR', {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  if (!wallet.ok()) {
    logError(wallet.error);
    return (
      <Card className="w-full">
        <ErrorMessage
          title={dictionary.common.error.title}
          message={dictionary.common.error.message}
        />
      </Card>
    );
  }

  return (
    <div className="w-full mx-4 md:mx-0">
      <Header className="mb-4">{dictionary.withdrawal.title}</Header>
      <div className="grid grid-cols-1 sm:grid-cols-3 my-8">
        <BalanceStats
          dictionary={dictionary}
          showWithdrawButton={false}
          locale={lang}
        />
      </div>
      <WithdrawalMethods
        dictionary={{
          tabs: dictionary.withdrawal.tabs,
        }}
        bankTransfer={
          <UserBanks
            dictionary={{
              userBanks: dictionary.withdrawal.userBanks,
              withdrawalForm: dictionary.withdrawal.withdrawalForm,
              common: {
                error: dictionary.common.error,
              },
            }}
            userWalletId={wallet.data.id}
            locale={lang}
          />
        }
      />
    </div>
  );
};
