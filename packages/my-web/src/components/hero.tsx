import { JoinNowButton } from './join-now-button';
import { Text, Display } from '@tekminewe/mint-ui/typography';
import Image from 'next/image';
import { Dictionary } from '@/dictionaries';

export const Hero = ({ dictionary }: { dictionary: Dictionary }) => {
  return (
    <section className="bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 overflow-hidden">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center sm:gap-8">
        <div className="max-w-[360px] flex flex-col p-4 pt-6 sm:order-2">
          <Display as="h3" className="text-primary-900">
            &quot;{dictionary.home.heroMessage1}&quot;
          </Display>
          <Text className="text-primary-800">
            {dictionary.home.heroMessage2}
          </Text>
          <JoinNowButton>{dictionary.home.heroCta}</JoinNowButton>
        </div>
        <div className="sm:mt-4">
          <Image
            src="/assets/images/hero.webp"
            alt="Never pay full price with mintdeal.my"
            className="w-[200px] sm:w-[400px]"
            width={788}
            height={956}
          />
        </div>
      </div>
    </section>
  );
};
