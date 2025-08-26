import { Card } from '@tekminewe/mint-ui/card';
import { Button } from '@tekminewe/mint-ui/button';
import Image from 'next/image';
import { Dictionary } from '@/dictionaries';
import { GetAdvertiserBySlugQuery } from '@/services/graphql';
import dayjs from 'dayjs';
import { replaceTokens } from '@/utils/string';

export const Campaign = ({
  campaigns,
  dictionary,
}: {
  campaigns: GetAdvertiserBySlugQuery['advertiserCampaigns'];
  dictionary: Dictionary;
}) => {
  return (
    <Card className="campaigns">
      <h3 className="card-title mb-4">{dictionary.merchantDetail.campaign}</h3>

      {campaigns.length === 0 ? (
        <div className="flex flex-col items-center gap-4 my-4">
          <Image
            src="/assets/images/waiting.webp"
            alt="No campaigns"
            width={200}
            height={200}
          />
          <p className="text-neutral-700">
            {dictionary.merchantDetail.noCampaigns}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {campaigns.map((campaign) => {
            return (
              <Card key={campaign.id} className="flex gap-2">
                {campaign.banner?.url && (
                  <div>
                    <Image
                      src={campaign.banner.url}
                      alt={campaign.name}
                      width={100}
                      height={100}
                      className="w-[100px] h-[100px] object-contain rounded-md"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="text-lg font-semibold">{campaign.name}</h4>
                  <div className="caption">
                    {dayjs(campaign.startDate).isAfter(new Date())
                      ? replaceTokens(dictionary.merchantDetail.fromTo, {
                          startDate: dayjs(campaign.startDate).format('lll'),
                          endDate: dayjs(campaign.endDate).format('lll'),
                        })
                      : campaign.endDate &&
                        dayjs(campaign.endDate).diff(new Date(), 'month') < 6
                      ? replaceTokens(dictionary.merchantDetail.endsIn, {
                          endDateString: dayjs(campaign.endDate).fromNow(),
                        })
                      : dictionary.merchantDetail.ongoing}
                  </div>
                  {campaign.description && (
                    <p className="mt-2 text-sm text-neutral-600">
                      {campaign.description}
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <a
                    href={campaign.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button aria-label={dictionary.merchantDetail.viewNow}>
                      {dictionary.merchantDetail.viewNow}
                    </Button>
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </Card>
  );
};
