'use client';

import { Avatar } from '@tekminewe/mint-ui/avatar';
import Image from 'next/image';
import Link from 'next/link';
import { useClientLanguage } from '@/hooks/use-language';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@tekminewe/mint-ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { toast } from '@tekminewe/mint-ui/toast';
import { Dictionary } from '@/dictionaries';

export const UserAvatar = ({
  dictionary,
  showAdmin,
}: {
  dictionary: Dictionary['navbar']['dropdownMenu'];
  showAdmin: boolean;
}) => {
  const language = useClientLanguage();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      // Manually logout from AWS Cognito as next-auth is not supporting it
      const searchParams = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_AUTH_COGNITO_ID ?? '',
        logout_uri: window.location.origin,
      });
      router.push(
        `${
          process.env.NEXT_PUBLIC_AUTH_DOMAIN
        }/logout?${searchParams.toString()}`,
      );
    } catch {
      toast(dictionary.signOutError, {
        type: 'error',
      });
    }
  };

  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <Avatar
          fallback={
            <Image
              src="/assets/images/avatar.webp"
              alt="User avatar"
              width={50}
              height={50}
            />
          }
        />
      </DropdownMenuTrigger>
      <DropdownMenu>
        {showAdmin && (
          <>
            <Link href={`/${language}/admin`}>
              <DropdownMenuItem>{dictionary.admin}</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
          </>
        )}
        <Link href={`/${language}/dashboard`}>
          <DropdownMenuItem>{dictionary.myCashback}</DropdownMenuItem>
        </Link>
        <Link href={`/${language}/bonus`}>
          <DropdownMenuItem>{dictionary.myBonuses}</DropdownMenuItem>
        </Link>
        <Link href={`/${language}/profile`}>
          <DropdownMenuItem>{dictionary.profile}</DropdownMenuItem>
        </Link>
        <Link href={`/${language}/withdrawal`}>
          <DropdownMenuItem>{dictionary.withdrawMoney}</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          {dictionary.signOut}
        </DropdownMenuItem>
      </DropdownMenu>
    </DropdownMenuRoot>
  );
};
