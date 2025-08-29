'use client';

import { GetAdvertiserBySlugQuery } from '@/services/graphql';
import { Dictionary } from '@/dictionaries';
import { ShopNowButton } from './shop-button';
import { replaceTokens } from '@/utils/string';

interface MerchantCashbackSectionProps {
  advertiser: NonNullable<GetAdvertiserBySlugQuery['advertiser']>;
  dictionary: Dictionary;
}

/**
 * Cashback information section with darker primary background
 * Features prominent cashback message and shop now button
 */
export const MerchantCashbackSection = ({
  advertiser,
  dictionary,
}: MerchantCashbackSectionProps) => {
  if (!advertiser.commission?.calculatedCommission) {
    return null;
  }

  return (
    <section
      className="bg-primary-600 dark:bg-primary-700 text-white rounded-2xl p-6 md:p-8"
      aria-label="Cashback information"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Cashback Message */}
        <div className="flex-1 text-primary-100">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {replaceTokens(dictionary.merchantDetail.cashbackSubtitle, {
              cashback: advertiser.commission.calculatedCommission.toString(),
            })}
          </h2>
          <p className="text-lg">
            {replaceTokens(dictionary.merchantDetail.cashbackDescription, {
              merchantName: advertiser.name,
            })}
          </p>
        </div>

        {/* Shop Now Button */}
        <div className="flex-shrink-0">
          <div className="[&_button]:bg-white [&_button]:text-primary-700 [&_button]:hover:bg-neutral-50 [&_button]:px-8 [&_button]:py-3 [&_button]:text-lg [&_button]:font-semibold [&_button]:rounded-full [&_button]:transition-colors [&_button]:duration-200 [&_button]:shadow-lg">
            <ShopNowButton
              advertiserSlug={advertiser.slug}
              dictionary={dictionary.guestDialog}
              advertiserName={advertiser.name}
              advertiserLogoUrl={advertiser.logo.url}
              advertiserCashbackRate={
                advertiser.commission.calculatedCommission
              }
            >
              {dictionary.merchantDetail.shopNow}
            </ShopNowButton>
          </div>
          <p className="text-primary-200 text-xs mt-2 text-center">
            {dictionary.merchantDetail.termsAndConditions}
          </p>
        </div>
      </div>
    </section>
  );
};
