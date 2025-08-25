import { getDictionary } from '@/dictionaries';
import Link from 'next/link';

export const Footer = async ({
  siteName,
  language,
}: {
  siteName: string;
  language: string;
}) => {
  const dictionary = await getDictionary(language);

  return (
    <section className="pt-9 pb-5 border-t border-neutral-200 dark:border-neutral-300">
      <div className="container mx-auto">
        <div className="flex gap-9">
          <div className="space-y-1">
            <div className="font-semibold mb-3">
              {dictionary.home.footer.about}
            </div>
            {/* <div className="text-sm">
              {dictionary.home.footer.howItWorks}
            </div> */}
            <Link href={`/${language}/privacy-policy`}>
              <div className="text-sm">
                {dictionary.home.footer.privacyPolicy}
              </div>
            </Link>
            <Link href={`/${language}/terms-and-conditions`}>
              <div className="text-sm">
                {dictionary.home.footer.termsOfService}
              </div>
            </Link>
          </div>

          <div className="space-y-1">
            <div className="font-semibold mb-3">
              {dictionary.home.footer.stores}
            </div>
            <div className="text-sm">Lazada</div>
            <div className="text-sm">Temu</div>
            <div className="underline text-sm">
              {dictionary.home.footer.seeAllStores}
            </div>
          </div>
        </div>
        <hr className="my-5" />
        <div>
          <div>
            © {new Date().getFullYear()} {siteName},{' '}
            {dictionary.home.footer.allRightsReserved}
          </div>
        </div>
      </div>
    </section>
  );
};
