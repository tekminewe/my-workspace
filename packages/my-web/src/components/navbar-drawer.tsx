'use client';

import { Dictionary } from '@/dictionaries';
import { Button } from '@tekminewe/mint-ui/button';
import { List, ListItem } from '@tekminewe/mint-ui/list';
import {
  Drawer,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from '@tekminewe/mint-ui/drawer';
import Link from 'next/link';
import { LuHouse, LuMenu, LuSquareMenu, LuStore } from 'react-icons/lu';
import { signIn } from 'next-auth/react';
import { ThemeToggle } from './theme-toggle';
import { LanguageSelect } from './language-select';
import { Separator } from '@tekminewe/mint-ui/separator';
import type { Session } from 'next-auth';
import { SiteLogo } from './site-logo';

export const NavbarDrawer = ({
  languageId,
  dictionary,
  language,
  session,
  site,
  languages,
}: {
  languageId: string;
  dictionary: Dictionary['navbar']['drawer'];
  language: string;
  session: Session | null;
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
  const handleSignInButtonClick = () => {
    return signIn('cognito');
  };

  return (
    <DrawerRoot direction="right">
      <DrawerTrigger>
        <LuMenu />
      </DrawerTrigger>
      <Drawer>
        <DrawerTitle className="hidden">MintDeal</DrawerTitle>
        <div className="px-4 py-2">
          <SiteLogo
            currentLanguage={languageId}
            alt="Site Logo"
            className="h-10 w-auto"
            site={site}
            languages={languages}
          />
        </div>
        <List>
          <ListItem>
            <LuHouse />
            <Link href={`/${languageId}/`}>{dictionary.home}</Link>
          </ListItem>
          <ListItem>
            <LuStore />
            <Link href={`/${languageId}/all-stores`}>{dictionary.stores}</Link>
          </ListItem>
          <ListItem>
            <LuSquareMenu />
            <Link href={`/${languageId}/blog`}>{dictionary.blog}</Link>
          </ListItem>
        </List>

        <Separator className="my-4" />

        <div className="px-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{dictionary.language}</span>
            <LanguageSelect language={language} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{dictionary.theme}</span>
            <ThemeToggle />
          </div>
        </div>

        <Separator className="my-4" />

        {!session && (
          <div className="px-4">
            <Button
              size="lg"
              onClick={handleSignInButtonClick}
              className="w-full"
            >
              {dictionary.signIn}
            </Button>
          </div>
        )}
      </Drawer>
    </DrawerRoot>
  );
};
