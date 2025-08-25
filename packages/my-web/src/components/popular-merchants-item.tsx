'use client';

import { Card } from '@tekminewe/mint-ui/card';
import Image from 'next/image';
import Link from 'next/link';

type PopularMerchant = {
  id: string;
  name: string;
  slug: string;
  logo: {
    url: string;
  };
  commission: {
    calculatedCommission: number;
  };
};

export const PopularMerchantsItem = ({
  advertiser,
  cashbackLabel,
  language,
}: {
  advertiser: PopularMerchant;
  cashbackLabel: string;
  language: string;
}) => {
  return (
    <Link href={`/${language}/store/${advertiser.slug}`}>
      <Card className="flex flex-col items-center h-full">
        <Image
          src={advertiser.logo.url}
          alt={`Logo of ${advertiser.name}`}
          width={100}
          height={100}
          className="w-[100px] h-[100px] object-contain"
        />

        {advertiser.commission.calculatedCommission > 0 && (
          <>
            <p className="font-semibold text-xl text-primary-600 py-2">
              {advertiser.commission.calculatedCommission}%
            </p>
            <p className="text-sm">{cashbackLabel}</p>
          </>
        )}
      </Card>
    </Link>
  );
};
