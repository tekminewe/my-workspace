import { Dictionary } from '@/dictionaries';
import { getMyWallet } from '@/services/wallet';
import { getSessionServer } from '@/services/auth/next';
import { Card } from '@tekminewe/mint-ui/card';
import { WithdrawButton } from './withdraw-button';
import { formatCurrency } from '@/utils/currency';

export const BalanceStats = async ({
  dictionary,
  showWithdrawButton = true,
  locale,
}: {
  dictionary: Dictionary;
  showWithdrawButton?: boolean;
  locale: string;
}) => {
  const session = await getSessionServer();
  const wallet = await getMyWallet('MYR', {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  return (
    <Card className="flex flex-col items-center gap-4 bg-gradient-to-t from-primary-600 to-primary-500 text-neutral-50 w-full">
      <div>
        <h3 className="card-title">
          {dictionary.dashboard.balanceStats.accountBalance}
        </h3>
      </div>
      <h4 className="text-2xl font-semibold">
        {formatCurrency({
          amount: wallet.ok() ? +wallet.data.balance : 0,
          locale: locale,
          currency: 'MYR',
        })}
      </h4>
      {showWithdrawButton && (
        <div className="flex flex-col items-center gap-2">
          <WithdrawButton>
            {dictionary.dashboard.balanceStats.withdraw}
          </WithdrawButton>
        </div>
      )}
    </Card>
  );
};
