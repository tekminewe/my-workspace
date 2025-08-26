import { Dictionary } from '@/dictionaries';
import { getPendingBalance } from '@/services/user-cashback';
import { getSessionServer } from '@/services/auth/next';
import { formatCurrency } from '@/utils/currency';
import { Card } from '@tekminewe/mint-ui/card';

export const PendingBalanceStats = async ({
  dictionary,
  locale,
}: {
  dictionary: Dictionary;
  locale: string;
}) => {
  const session = await getSessionServer();
  const pendingBalance = await getPendingBalance({
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  return (
    <Card className="flex flex-col items-center gap-4 bg-gradient-to-t from-success-600 to-success-500 text-neutral-50">
      <div>
        <h3 className="card-title">
          {dictionary.dashboard.pendingBalanceStats.pendingBalance}
        </h3>
      </div>
      <h4 className="text-2xl font-semibold">
        {formatCurrency({
          amount: pendingBalance.ok() ? +pendingBalance.data.pendingBalance : 0,
          locale: locale,
          currency: 'MYR',
        })}
      </h4>
      <div className="flex flex-col items-center gap-1">
        <p className="caption text-neutral-50 text-center">
          {dictionary.dashboard.pendingBalanceStats.pendingBalanceDescription}
        </p>
      </div>
    </Card>
  );
};
