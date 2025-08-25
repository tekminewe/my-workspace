import { getDictionary } from '@/dictionaries';
import { HowItWorksItem } from './how-it-works-item';

export const HowItWorks = async ({ language }: { language: string }) => {
  const dictionary = await getDictionary(language);
  return (
    <section className="container mx-auto py-6">
      <h3 className="section-title text-center mb-6">
        {dictionary.home.howItWorks}
      </h3>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
          <HowItWorksItem
            imageUrl="/assets/images/how-it-works-sign-up.webp"
            title={dictionary.home.howItWorksStep1}
            description={dictionary.home.howItWorksStep1Description}
            color="rgb(var(--color-primary-600))"
            backgroundColor="rgb(var(--color-primary-100))"
          />
          <HowItWorksItem
            imageUrl="/assets/images/how-it-works-shop.webp"
            title={dictionary.home.howItWorksStep2}
            description={dictionary.home.howItWorksStep2Description}
            color="rgb(var(--color-info-600))"
            backgroundColor="rgb(var(--color-info-100))"
          />
          <HowItWorksItem
            imageUrl="/assets/images/how-it-works-cashback.webp"
            title={dictionary.home.howItWorksStep3}
            description={dictionary.home.howItWorksStep3Description}
            color="rgb(var(--color-warning-600))"
            backgroundColor="rgb(var(--color-warning-100))"
          />
          <HowItWorksItem
            imageUrl="/assets/images/how-it-works-payout.webp"
            title={dictionary.home.howItWorksStep4}
            description={dictionary.home.howItWorksStep4Description}
            color="rgb(var(--color-success-600))"
            backgroundColor="rgb(var(--color-success-100))"
          />
        </div>
      </div>
    </section>
  );
};
