'use client';

import Image from 'next/image';
import { GetAdvertiserBySlugQuery } from '@/services/graphql';
import { Dictionary } from '@/dictionaries';
import { getFeatureImageForCategory } from '@/utils/merchant-categories';

interface MerchantHeroProps {
  advertiser: NonNullable<GetAdvertiserBySlugQuery['advertiser']>;
  dictionary: Dictionary;
}

/**
 * Hero section for merchant detail page with feature image, logo, and name
 * Features a category-based feature image with overlaid merchant information
 */
export const MerchantHero = ({ advertiser, dictionary }: MerchantHeroProps) => {
  const featureImageStyle = getFeatureImageForCategory(
    advertiser.categories?.[0]?.id,
  );

  return (
    <section
      className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden"
      aria-label={`${advertiser.name} hero section`}
    >
      {/* Feature Image Background - Gray placeholder for now */}
      <div
        className={`absolute inset-0 ${featureImageStyle}`}
        role="img"
        aria-label="Category feature background"
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
        <div className="flex items-end gap-4 md:gap-6">
          {/* Merchant Logo */}
          <div className="flex-shrink-0">
            <div className="bg-white dark:bg-neutral-100 p-3 rounded-lg shadow-lg">
              <Image
                src={advertiser.logo.url}
                alt={`${advertiser.name} logo`}
                width={64}
                height={64}
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
              />
            </div>
          </div>

          {/* Merchant Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 break-words">
              {advertiser.name}
            </h1>
            {advertiser.categories && advertiser.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {advertiser.categories.slice(0, 2).map((category) => (
                  <span
                    key={category.id}
                    className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full"
                  >
                    {category.name}
                  </span>
                ))}
                {advertiser.categories.length > 2 && (
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                    +{advertiser.categories.length - 2}{' '}
                    {dictionary.merchantDetail.moreCategoriesText}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
