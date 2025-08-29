import { MerchantHero } from './merchant-hero';
import { MerchantCashbackSection } from './merchant-cashback-section';
import { CashbackCategories } from './cashback-categories';
import { CashbackTimeline } from './cashback-timeline';
import { getDictionary } from '@/dictionaries';
import { Coupon } from './coupon';
import { Campaign } from './campaign';
import { GetAdvertiserBySlugQuery } from '@/services/graphql';

export const MerchantDetailMobile = async ({
  advertiser,
  campaigns,
  language,
}: {
  advertiser: NonNullable<GetAdvertiserBySlugQuery['advertiser']>;
  campaigns: NonNullable<GetAdvertiserBySlugQuery['advertiserCampaigns']>;
  language: string;
}) => {
  const dictionary = await getDictionary(language);
  return (
    <div className="flex flex-col gap-6 mb-4 px-4">
      {/* Hero Section with Feature Image */}
      <MerchantHero advertiser={advertiser} dictionary={dictionary} />

      {/* Cashback Section */}
      <MerchantCashbackSection
        advertiser={advertiser}
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
