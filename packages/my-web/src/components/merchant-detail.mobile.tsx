import { MerchantHeader } from "./merchant-header";
import { CashbackCategories } from "./cashback-categories";
import { CashbackTimeline } from "./cashback-timeline";
import { getDictionary } from "@/dictionaries";
import { Coupon } from "./coupon";
import { Campaign } from "./campaign";
import { GetAdvertiserBySlugQuery } from "@/services/graphql";

export const MerchantDetailMobile = async ({
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
    <div className="flex flex-col gap-4 mb-4">
      <MerchantHeader
        name={advertiser.name}
        logo={advertiser.logo}
        advertiserSlug={advertiser.slug}
        commission={advertiser.commission}
        dictionary={dictionary}
      />
      {advertiser.commission && (
        <>
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
        </>
      )}

      {campaigns.length > 0 && (
        <Campaign campaigns={campaigns} dictionary={dictionary} />
      )}
      <Coupon dictionary={dictionary} />
    </div>
  );
};
