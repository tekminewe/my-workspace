"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Drawer } from "@tekminewe/mint-ui/drawer";
import { Command, CommandItem } from "@tekminewe/mint-ui/command";
import { Avatar } from "@tekminewe/mint-ui/avatar";
import { Text } from "@tekminewe/mint-ui/typography";
import { toast } from "@tekminewe/mint-ui/toast";
import { LuSettings2, LuUser } from "react-icons/lu";

interface AvatarDrawerProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    photoUrl: string;
  };
  shortName: string;
}

export const AvatarDrawer = ({ shortName, user }: AvatarDrawerProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      // Manually logout from AWS Cognito as next-auth is not supporting it
      const searchParams = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_AUTH_COGNITO_ID ?? "",
        logout_uri: window.location.origin,
      });
      router.push(
        `${
          process.env.NEXT_PUBLIC_AUTH_DOMAIN
        }/logout?${searchParams.toString()}`
      );
    } catch {
      toast("Unable to logout", {
        type: "error",
      });
    }
  };

  return (
    <Drawer className="fixed right-0 top-0 bottom-0 w-80">
      <Command label="Command Menu">
        <Command.List>
          <Command.Group className="p-4">
            <CommandItem isStatic className="flex flex-col items-center gap-2">
              <Avatar src={user.photoUrl} fallback={shortName} />
              <Text className="font-medium">{`${user.firstName} ${user.lastName}`}</Text>
              <Text>{user.email}</Text>
            </CommandItem>
          </Command.Group>
          <hr />
          <Command.Group className="p-4">
            <Link href="/dashboard/profile">
              <CommandItem className="flex items-center">
                <LuUser className="mr-2 h-5 w-5" />
                <span>My Profile</span>
              </CommandItem>
            </Link>
            <CommandItem className="flex items-center">
              <LuSettings2 className="mr-2 h-5 w-5" />
              <span>Account Settings</span>
            </CommandItem>
          </Command.Group>
          <hr />
          <Command.Group className="p-4">
            <CommandItem asChild className="cursor-pointer">
              <form action={handleLogout}>
                <button type="submit">Sign out</button>
              </form>
            </CommandItem>
          </Command.Group>
        </Command.List>
      </Command>
    </Drawer>
  );
};
