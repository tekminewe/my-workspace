'use client';

import { Dictionary } from '@/dictionaries';
import { AdvertiserCampaign as AdvertiserCampaignType } from '@/services/graphql';
import Image from 'next/image';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface AdvertiserCampaignProps {
  campaign: AdvertiserCampaignType;
  dictionary: Dictionary['advertiserCampaign'];
}

export const AdvertiserCampaign = ({
  campaign,
  dictionary,
}: AdvertiserCampaignProps) => {
  const daysRemaining = useMemo(() => {
    const endDate = dayjs(campaign.endDate);
    const now = dayjs();
    const days = endDate.diff(now, 'day');
    return days > 0 ? days : 0;
  }, [campaign.endDate]);

  const handleClick = () => {
    // Open the campaign URL in a new tab
    window.open(campaign.url, '_blank');
  };

  return (
    <div className="flex flex-row items-center w-full max-w-4xl rounded-xl overflow-hidden bg-neutral-50 shadow-sm">
      {/* Logo/Icon area */}
      <div className="flex items-center justify-center p-4 bg-primary-50 w-24 h-24">
        {campaign.banner && (
          <Image
            src={campaign.banner.url}
            alt={campaign.name}
            width={80}
            height={80}
            className="object-contain"
          />
        )}
        {!campaign.banner && (
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-bold text-xl">
              {campaign.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="flex-1 p-4">
        <h2 className="text-lg font-bold text-neutral-900">{campaign.name}</h2>
        <p className="text-sm text-neutral-600">
          {dictionary.endsIn.replace('{{days}}', daysRemaining.toString())}
        </p>
      </div>

      {/* Action area */}
      <div className="p-4">
        <button
          onClick={handleClick}
          className="bg-primary hover:bg-primary-700 text-neutral-50 font-medium py-2 px-6 rounded-full transition-colors"
        >
          {dictionary.viewNow}
        </button>
      </div>
    </div>
  );
};
