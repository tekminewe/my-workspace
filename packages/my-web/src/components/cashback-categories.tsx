import { Dictionary } from '@/dictionaries';
import { Card } from '@tekminewe/mint-ui/card';

export const CashbackCategories = ({
  commissionRows,
  dictionary,
}: {
  commissionRows: {
    id: string;
    name: string;
    calculatedCommission: number;
  }[];
  dictionary: Dictionary;
}) => {
  return (
    <Card className="categories">
      <h3 className="mb-4 card-title">
        {dictionary.merchantDetail.cashbackCategories}
      </h3>
      <div className="space-y-1">
        {commissionRows.map((row) => (
          <div
            className="flex justify-between text-sm text-neutral-700"
            key={row.id}
          >
            <p>{row.name}</p>
            <p className="text-primary-600">{row.calculatedCommission}%</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
