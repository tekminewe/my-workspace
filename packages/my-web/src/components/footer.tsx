import { getDictionary } from '@/dictionaries';
import Link from 'next/link';
import { LuMail, LuFacebook, LuTwitter, LuInstagram } from 'react-icons/lu';

export const Footer = async ({
  siteName,
  language,
}: {
  siteName: string;
  language: string;
}) => {
  const dictionary = await getDictionary(language);

  return (
    <footer className="bg-neutral-100 text-neutral-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                {siteName}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {dictionary.home.footer.earnCashbackTagline}
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-neutral-900 transition-colors duration-200"
                aria-label="Follow us on Facebook"
              >
                <LuFacebook size={20} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-neutral-900 transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                <LuTwitter size={20} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-neutral-900 transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <LuInstagram size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-neutral-900 text-base">
              {dictionary.home.footer.quickLinks}
            </h4>
            <nav className="space-y-2">
              <Link
                href={`/${language}/`}
                className="block text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
              >
                {dictionary.navbar.drawer.home}
              </Link>
              <Link
                href={`/${language}/all-stores`}
                className="block text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
              >
                {dictionary.home.footer.seeAllStores}
              </Link>
              <Link
                href={`/${language}/blog`}
                className="block text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
              >
                {dictionary.navbar.drawer.blog}
              </Link>
              <Link
                href={`/${language}/dashboard`}
                className="block text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
              >
                {dictionary.navbar.dropdownMenu.myCashback}
              </Link>
            </nav>
          </div>

          {/* Popular Stores */}
          <div className="space-y-4">
            <h4 className="font-semibold text-neutral-900 text-base">
              {dictionary.home.footer.stores}
            </h4>
            <nav className="space-y-2">
              <Link
                href={`/${language}/store/lazada`}
                className="block text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
              >
                Lazada
              </Link>
              <Link
                href={`/${language}/store/temu`}
                className="block text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
              >
                Temu
              </Link>
              <Link
                href={`/${language}/all-stores`}
                className="block text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
              >
                {dictionary.home.footer.seeAllStores}
              </Link>
            </nav>
          </div>

          {/* Support & Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-neutral-900 text-base">
              {dictionary.home.footer.support}
            </h4>
            <nav className="space-y-2">
              <a
                href="mailto:contact@mintdeal.my"
                className="flex items-center text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
              >
                <LuMail size={16} className="mr-2" />
                contact@mintdeal.my
              </a>
              <Link
                href={`/${language}/privacy-policy`}
                className="block text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
              >
                {dictionary.home.footer.privacyPolicy}
              </Link>
              <Link
                href={`/${language}/terms-and-conditions`}
                className="block text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
              >
                {dictionary.home.footer.termsOfService}
              </Link>
              <div className="text-sm text-neutral-500">
                {dictionary.home.footer.withdrawalMethod}
              </div>
            </nav>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-neutral-300 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-neutral-500">
              © {new Date().getFullYear()} {siteName}.{' '}
              {dictionary.home.footer.allRightsReserved}
            </div>

            {/* Additional Info */}
            <div className="text-sm text-neutral-500">
              {dictionary.home.footer.poweredBy}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
