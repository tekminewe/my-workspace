'use client';

import { Avatar } from '@tekminewe/mint-ui/avatar';
import { DrawerRoot, DrawerTrigger } from '@tekminewe/mint-ui/drawer';
import { ThemeToggle } from '@/components/theme-toggle';
import { AvatarDrawer } from './avatar-drawer';
import { Navbar as MintNavbar } from '@tekminewe/mint-ui/navbar';

export const Navbar = ({
  user,
}: {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    photoUrl: string;
  };
}) => {
  const shortName = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  return (
    <MintNavbar style={{ gridArea: 'navbar' }}>
      <div className="flex flex-grow justify-end items-center gap-4">
        <ThemeToggle aria-label="Toggle theme" />
        <DrawerRoot direction="right">
          <DrawerTrigger>
            <button>
              <Avatar
                src={user.photoUrl}
                className="cursor-pointer"
                fallback={shortName}
              />
            </button>
          </DrawerTrigger>
          <AvatarDrawer user={user} shortName={shortName} />
        </DrawerRoot>
      </div>
    </MintNavbar>
  );
};
