import {
  Navbar as MintNavbar,
  NavbarBrand as MintNavbarBrand,
} from '@tekminewe/mint-ui/navbar';
import {
  NavigationMenu,
  NavigationMenuItem,
} from '@tekminewe/mint-ui/navigation-menu';
import { SignInButton } from './sign-in-button';
import { getSessionServer } from '@/services/auth/next';
import { UserAvatar } from './shared-avatar';
import { LanguageSelect } from './language-select';
import { Dictionary } from '@/dictionaries';
import Link from 'next/link';
import { client } from '@/services/client';
import { SearchDialog } from './search';
import { NavbarSearchInput } from './navbar-search-input';
import { NavbarRoot } from './navbar-root';
import { ThemeToggle } from './theme-toggle';
import { SiteLogo } from './site-logo';

export const Navbar = async ({
  languageId,
  dictionary,
  site,
  languages,
}: {
  languageId: string;
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
      <MintNavbar>
        <div className="flex justify-between items-center w-full">
          <div className="flex-1 flex gap-9 items-center">
            <MintNavbarBrand>
              <Link href={`/${languageId}`}>
                <SiteLogo
                  currentLanguage={languageId}
                  alt={`Logo of ${site.name}`}
                  className="h-7 w-auto"
                  site={site}
                  languages={languages}
                />
              </Link>
            </MintNavbarBrand>
            <NavbarSearchInput placeholder={dictionary.search.placeholder} />
          </div>
          <div className="flex gap-4 items-center">
            <NavigationMenu className="mr-4">
              <NavigationMenuItem href={`/${languageId}/`}>
                {dictionary.navbar.drawer.home}
              </NavigationMenuItem>
              <NavigationMenuItem href={`/${languageId}/all-stores`}>
                {dictionary.navbar.drawer.stores}
              </NavigationMenuItem>
              <NavigationMenuItem href={`/${languageId}/blog`}>
                {dictionary.navbar.drawer.blog}
              </NavigationMenuItem>
            </NavigationMenu>
            <div className="w-[1px] h-5 bg-neutral-300" />
            <LanguageSelect language={languageId} />
            {!session && (
              <SignInButton>{dictionary.home.signInButton}</SignInButton>
            )}
            <ThemeToggle />
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
          </div>
        </div>
      </MintNavbar>
      <SearchDialog dictionary={dictionary['search']} language={languageId} />
    </NavbarRoot>
  );
};
