import { MerchantHeader } from "./merchant-header";
import { CashbackCategories } from "./cashback-categories";
import { CashbackTimeline } from "./cashback-timeline";
import { Coupon } from "./coupon";
import { Campaign } from "./campaign";
import { getDictionary } from "@/dictionaries";
import { GetAdvertiserBySlugQuery } from "@/services/graphql";

export const MerchantDetail = async ({
  advertiser,
  campaigns,
  language,
}: {
  advertiser: NonNullable<GetAdvertiserBySlugQuery["advertiser"]>;
  campaigns: NonNullable<GetAdvertiserBySlugQuery["advertiserCampaigns"]>;
  language: string;
}) => {
  const dictionary = await getDictionary(language);
  return (
    <div className="mt-6 my-6 space-y-4 container mx-auto">
      <MerchantHeader
        name={advertiser.name}
        logo={advertiser.logo}
        advertiserSlug={advertiser.slug}
        commission={advertiser.commission}
        dictionary={dictionary}
      />
      <div className="flex gap-4 w-full">
        {!!advertiser.commission?.calculatedCommission && (
          <div className="flex flex-col gap-4 w-[300px]">
            <CashbackCategories
              dictionary={dictionary}
              commissionRows={advertiser.commission.commissionRows}
            />
            <CashbackTimeline
              dictionary={dictionary}
              dayToCashback={
                advertiser.commission.dayToValidate +
                advertiser.commission.dayToPayout
              }
            />
          </div>
        )}
        <div className="flex flex-col gap-4 flex-1">
          {campaigns.length > 0 && (
            <Campaign campaigns={campaigns} dictionary={dictionary} />
          )}
          <Coupon dictionary={dictionary} />
        </div>
      </div>
    </div>
  );
};
