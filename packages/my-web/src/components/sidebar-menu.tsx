'use client';

import {
  SidebarMenu as MintSidebarMenu,
  SidebarMenuItem,
} from '@tekminewe/mint-ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CgCarousel } from 'react-icons/cg';
import {
  LuFileText,
  LuStore,
  LuCalendar,
  LuSettings,
  LuImage,
  LuGift,
} from 'react-icons/lu';
import { Dictionary } from '@/dictionaries';

export type MenuType =
  | 'carousel'
  | 'advertiser'
  | 'blog'
  | 'campaign'
  | 'site'
  | 'bonus'
  | 'image-test';

export const SidebarMenu = ({
  menus,
  languageId,
  dictionary,
}: {
  menus: Record<MenuType, boolean>;
  languageId: string;
  dictionary: Dictionary['admin'] & { navbar: Dictionary['navbar'] };
}) => {
  const pathname = usePathname();

  return (
    <MintSidebarMenu>
      {menus['carousel'] && (
        <Link href={`/${languageId}/admin/carousel`}>
          <SidebarMenuItem selected={pathname?.includes(`/admin/carousel`)}>
            <CgCarousel />
            {dictionary.carousel.list.carousel}
          </SidebarMenuItem>
        </Link>
      )}
      {menus['advertiser'] && (
        <Link href={`/${languageId}/admin/advertiser`}>
          <SidebarMenuItem selected={pathname?.includes(`/admin/advertiser`)}>
            <LuStore />
            {dictionary.advertiser.list.advertiser}
          </SidebarMenuItem>
        </Link>
      )}
      {menus['blog'] && (
        <Link href={`/${languageId}/admin/blog`}>
          <SidebarMenuItem selected={pathname?.includes(`/admin/blog`)}>
            <LuFileText />
            {dictionary.navbar.drawer.blog}
          </SidebarMenuItem>
        </Link>
      )}
      {menus['campaign'] && (
        <Link href={`/${languageId}/admin/campaign`}>
          <SidebarMenuItem selected={pathname?.includes(`/admin/campaign`)}>
            <LuCalendar />
            {dictionary.campaign.list.campaign}
          </SidebarMenuItem>
        </Link>
      )}
      {menus['bonus'] && (
        <Link href={`/${languageId}/admin/bonus`}>
          <SidebarMenuItem selected={pathname?.includes(`/admin/bonus`)}>
            <LuGift />
            {dictionary.bonus?.title || 'Bonus Types'}
          </SidebarMenuItem>
        </Link>
      )}
      {menus['site'] && (
        <Link href={`/${languageId}/admin/site`}>
          <SidebarMenuItem selected={pathname?.includes(`/admin/site`)}>
            <LuSettings />
            {dictionary.site.title}
          </SidebarMenuItem>
        </Link>
      )}
      {menus['image-test'] && (
        <Link href={`/${languageId}/admin/playground/image-generation`}>
          <SidebarMenuItem
            selected={pathname?.includes(`/admin/playground/image-generation`)}
          >
            <LuImage />
            Image Generation Playground
          </SidebarMenuItem>
        </Link>
      )}
    </MintSidebarMenu>
  );
};
