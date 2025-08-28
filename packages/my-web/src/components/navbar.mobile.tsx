import {
  Navbar as MintNavbar,
  NavbarBrand as MintNavbarBrand,
} from '@tekminewe/mint-ui/navbar';
import { SignInButton } from './sign-in-button';
import { getSessionServer } from '@/services/auth/next';
import { UserAvatar } from './shared-avatar';
import { Dictionary } from '@/dictionaries';
import Link from 'next/link';
import { client } from '@/services/client';
import { SearchDialog } from './search';
import { NavbarRoot } from './navbar-root';
import { NavbarSearchInput } from './navbar-search-input';
import { NavbarDrawer } from './navbar-drawer';
import { SiteLogo } from './site-logo';

export const NavbarMobile = async ({
  language,
  dictionary,
  site,
  languages,
}: {
  language: string;
  dictionary: Dictionary;
  site: {
    id: string;
    name: string;
    metadatas: Array<{
      name: string;
      description?: string | null;
      logo?: { id: string; url: string } | null;
      darkLogo?: { id: string; url: string } | null;
      languageId: string;
    }>;
  };
  languages: Array<{
    id: string;
    name: string;
    code: string;
    shortName: string;
    isSupported: boolean;
    isDefault: boolean;
  }>;
}) => {
  const session = await getSessionServer();

  const role = await client.roles.getUserRolesAndPermissions({
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  return (
    <NavbarRoot>
      <MintNavbar containerClassName="shadow-3">
        <div className="w-full">
          <div className="flex justify-between items-center mb-3">
            <MintNavbarBrand>
              <Link href={`/${language}`}>
                <SiteLogo
                  currentLanguage={language}
                  alt={`Logo of ${site.name}`}
                  className="h-7 w-auto"
                  site={site}
                  languages={languages}
                />
              </Link>
            </MintNavbarBrand>
            <div className="flex gap-4 items-center">
              {!session && (
                <SignInButton>{dictionary.home.signInButton}</SignInButton>
              )}
              {session && (
                <UserAvatar
                  dictionary={dictionary.navbar.dropdownMenu}
                  showAdmin={
                    role?.data.data
                      .flatMap((r) => r.permissions.map((p) => p.name))
                      .includes('AdminPanel') ?? false
                  }
                />
              )}
              <NavbarDrawer
                languageId={language}
                dictionary={dictionary.navbar.drawer}
                language={language}
                session={session}
                site={site}
                languages={languages}
              />
            </div>
          </div>
          <NavbarSearchInput placeholder={dictionary.search.placeholder} />
          <SearchDialog dictionary={dictionary['search']} language={language} />
        </div>
      </MintNavbar>
    </NavbarRoot>
  );
};
