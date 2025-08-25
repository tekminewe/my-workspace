import { Card } from '@tekminewe/mint-ui/card';
import Image from 'next/image';
import { ShopNowButton } from './shop-button';
import { Dictionary } from '@/dictionaries';
import { replaceTokens } from '@/utils/string';
import { GetAdvertiserBySlugQuery } from '@/services/graphql';

export const MerchantHeader = ({
  name,
  logo,
  commission,
  advertiserSlug,
  dictionary,
}: {
  name: string;
  logo: {
    url: string;
  };
  advertiserSlug: string;
  commission: GetAdvertiserBySlugQuery['advertiser']['commission'];
  dictionary: Dictionary;
}) => {
  return (
    <Card className="header flex flex-col md:flex-row items-center justify-center md:justify-between">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Image
          alt={name}
          src={logo.url}
          width={100}
          height={100}
          className="rounded-3"
        />
        <div className="flex flex-col align-center md:align-start">
          <h2 className="mb-2 text-xl text-center md:text-left font-semibold">
            {replaceTokens(dictionary.merchantDetail.storeTitle, {
              name,
            })}
          </h2>
          {!!commission?.calculatedCommission && (
            <p className="font-medium mb-2 md:mb-0 text-primary-600 text-center md:text-left">
              {replaceTokens(dictionary.merchantDetail.cashbackSubtitle, {
                cashback: commission.calculatedCommission.toString(),
              })}
            </p>
          )}
        </div>
      </div>
      <ShopNowButton
        advertiserSlug={advertiserSlug}
        dictionary={dictionary.guestDialog}
        advertiserName={name}
        advertiserLogoUrl={logo.url}
        advertiserCashbackRate={commission?.calculatedCommission || 0}
      >
        {dictionary.merchantDetail.shopNow}
      </ShopNowButton>
    </Card>
  );
};
