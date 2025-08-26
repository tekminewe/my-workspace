'use client';

import { Dictionary } from '@/dictionaries';
import { useClientLanguage } from '@/hooks/use-language';
import { SubMenu, SubMenuItem } from '@tekminewe/mint-ui/sub-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuLayoutDashboard, LuUser, LuWallet, LuGift } from 'react-icons/lu';

export const Sidebar = ({ dictionary }: { dictionary: Dictionary }) => {
  const pathName = usePathname() || '';
  const language = useClientLanguage();
  return (
    <SubMenu className="w-[300px] flex-shrink-0 h-min hidden md:block mx-4">
      <Link legacyBehavior href={`/${language}/dashboard`}>
        <SubMenuItem selected={pathName.includes('/dashboard')}>
          <LuLayoutDashboard />
          {dictionary.sidebar.dashboard}
        </SubMenuItem>
      </Link>
      <Link legacyBehavior href={`/${language}/profile`}>
        <SubMenuItem selected={pathName.includes('/profile')}>
          <LuUser />
          {dictionary.sidebar.profile}
        </SubMenuItem>
      </Link>
      <Link legacyBehavior href={`/${language}/bonus`}>
        <SubMenuItem selected={pathName.includes('/bonus')}>
          <LuGift />
          {dictionary.sidebar.bonus}
        </SubMenuItem>
      </Link>
      <Link legacyBehavior href={`/${language}/withdrawal`}>
        <SubMenuItem selected={pathName.includes('/withdrawal')}>
          <LuWallet />
          {dictionary.sidebar.withdrawMoney}
        </SubMenuItem>
      </Link>
    </SubMenu>
  );
};
