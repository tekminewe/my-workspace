import { ErrorMessage } from '@tekminewe/mint-ui/error-message';
import { getPopularAdvertisers } from '../services/advertiser';
import { MerchantCard } from '@tekminewe/mint-ui/merchant-card';
import { getDictionary } from '@/dictionaries';
import { LuArrowRight } from 'react-icons/lu';
import Link from 'next/link';

export const PopularMerchants = async ({ language }: { language: string }) => {
  const result = await getPopularAdvertisers({
    headers: {
      'Accept-Language': language,
    },
    next: {
      revalidate: 0,
    },
  });
  const dictionary = await getDictionary(language);

  return (
    <div className="bg-neutral-100 py-6">
      <div className="container mx-auto">
        <h3 className="section-title mb-4">{dictionary.home.popularStores}</h3>
        {!result.ok() && (
          <ErrorMessage
            title={dictionary.common.error.title}
            message={dictionary.common.error.message}
          />
        )}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {result.ok() &&
            result.data.map((advertiser) => {
              return (
                <Link
                  key={advertiser.id}
                  href={`/${language}/store/${advertiser.slug}`}
                  className="block h-full"
                >
                  <MerchantCard
                    name={advertiser.name}
                    logoUrl={advertiser.logo?.url}
                    cashbackPercentage={
                      advertiser.commission?.calculatedCommission
                    }
                    cashbackLabel={dictionary.home.cashbackUpTo}
                    clickable={false}
                  />
                </Link>
              );
            })}
        </div>
        <div className="flex justify-center pt-8 pb-4">
          <Link
            href={`${language}/all-stores`}
            className="text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
          >
            {dictionary.home.seeAllStores} <LuArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};
