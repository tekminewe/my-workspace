import { Dictionary } from '@/dictionaries';
import { replaceTokens } from '@/utils/string';
import { Card } from '@tekminewe/mint-ui/card';

export const CashbackTimeline = ({
  dayToCashback,
  dictionary,
}: {
  dayToCashback: number;
  dictionary: Dictionary;
}) => {
  return (
    <Card className="timeline">
      <h3 className="mb-4 card-title">
        {dictionary.merchantDetail.cashbackTimeline}
      </h3>
      <div className="space-y-4 relative">
        <div className="w-[2px] absolute left-[5px] top-[6px] bottom-[28px] bg-neutral-300"></div>
        <div className="flex justify-start gap-4">
          <div className="h-3 w-3 bg-neutral-300 rounded-full my-[6px]" />
          <div>
            <div className="font-medium text-primary-600">
              {dictionary.merchantDetail.cashbackTimelineStep1}
            </div>
            <div className="text-sm text-neutral-700">
              {dictionary.merchantDetail.cashbackTimelineStep1Description}
            </div>
          </div>
        </div>
        <div className="flex justify-start gap-4">
          <div className="h-3 w-3 bg-neutral-300 rounded-full my-[6px]" />
          <div>
            <div className="font-medium text-primary-600">
              {dictionary.merchantDetail.cashbackTimelineStep2}
            </div>
            <div className="text-sm text-neutral-700">
              {dictionary.merchantDetail.cashbackTimelineStep2Description}
            </div>
          </div>
        </div>
        <div className="flex justify-start gap-4">
          <div className="h-3 w-3 bg-neutral-300 rounded-full my-[6px]" />
          <div>
            <div className="font-medium text-primary-600">
              {dictionary.merchantDetail.cashbackTimelineStep3}
            </div>
            <div className="text-sm text-neutral-700">
              {replaceTokens(
                dictionary.merchantDetail.cashbackTimelineStep3Description,
                {
                  days: dayToCashback.toString(),
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
