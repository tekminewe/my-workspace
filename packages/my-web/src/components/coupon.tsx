import { Card } from '@tekminewe/mint-ui/card';
import Image from 'next/image';
import { Dictionary } from '@/dictionaries';

export const Coupon = ({ dictionary }: { dictionary: Dictionary }) => {
  // Always show empty state regardless of campaigns
  return (
    <Card className="coupons">
      <h3 className="card-title mb-4">{dictionary.merchantDetail.coupon}</h3>

      <div className="flex flex-col items-center gap-4 my-4">
        <Image
          src="/assets/images/waiting.webp"
          alt="No coupons"
          width={200}
          height={200}
        />
        <p className="text-neutral-700">
          {dictionary.merchantDetail.noCoupons}
        </p>
      </div>
    </Card>
  );
};
