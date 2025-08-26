import { Meta, StoryObj } from "@storybook/react-vite";
import { Navbar } from "./navbar";
import { NavigationMenu } from "../navigation-menu/navigation-menu";
import { NavigationMenuItem } from "../navigation-menu/item";
import { MobileNavigationMenu } from "../mobile-navigation-menu";
import { MobileNavigationMenuItem } from "../mobile-navigation-menu/item";
import { NavbarBrand } from "./brand";
import {
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenu,
} from "../dropdown-menu";
import { Avatar } from "../avatar";
import { useCallback, useState } from "react";

const meta = {
  title: "Common / Navbar",
  component: Navbar,
  tags: ["autodocs"],
  render: () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const callbackRef = useCallback((node: HTMLDivElement) => {
      if (node) {
        setRef(node);
      }
    }, []);
    return (
      <div ref={callbackRef}>
        <Navbar>
          <MobileNavigationMenu>
            <MobileNavigationMenuItem href="/">Home</MobileNavigationMenuItem>
            <MobileNavigationMenuItem href="/blog">
              Blog
            </MobileNavigationMenuItem>
            <MobileNavigationMenuItem href="/about">
              About
            </MobileNavigationMenuItem>
          </MobileNavigationMenu>
          <NavbarBrand>
            <img
              src="../assets/logo.webp"
              alt="tekminewe.com"
              width={150}
              height={150}
            />
          </NavbarBrand>
          <NavigationMenu>
            <NavigationMenuItem href="/">Home</NavigationMenuItem>
            <NavigationMenuItem href="/blog">Blog</NavigationMenuItem>
            <NavigationMenuItem href="/about">About</NavigationMenuItem>
          </NavigationMenu>
          <DropdownMenuRoot>
            <DropdownMenuTrigger>
              <Avatar
                src="../assets/avatar.webp"
                fallback="../assets/avatar.webp"
                alt="John Doe"
              />
            </DropdownMenuTrigger>
            <DropdownMenu container={ref}>
              <DropdownMenuItem>My Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenu>
          </DropdownMenuRoot>
        </Navbar>
      </div>
    );
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
