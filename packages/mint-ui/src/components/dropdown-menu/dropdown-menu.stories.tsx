import { Meta, StoryObj } from '@storybook/react-vite';

import { DropdownMenu, DropdownMenuRoot } from './dropdown-menu';
import { Button } from '../button';
import { IconButton } from '../icon-button';
import { Avatar } from '../avatar';
import {
  FaLinkedinIn,
  FaFacebook,
  FaEllipsisV,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaShare,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useCallback, useState } from 'react';
import { DropdownMenuItem } from './item';
import { DropdownMenuTrigger } from './trigger';
import { DropdownMenuSeparator } from './separator';

const meta = {
  title: 'Common / DropdownMenu',
  component: DropdownMenuRoot,
  tags: ['autodocs'],
  render: () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const callbackRef = useCallback((node: HTMLDivElement) => {
      if (node) {
        setRef(node);
      }
    }, []);

    return (
      <div ref={callbackRef} className="space-y-8 p-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Share Menu</h3>
          <DropdownMenuRoot>
            <DropdownMenuTrigger>
              <Button variant="outline" size="md">
                <FaShare className="w-4 h-4" />
                Share
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenu container={ref}>
              <DropdownMenuItem>
                <FaXTwitter className="w-4 h-4" />
                Share on X
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FaLinkedinIn className="w-4 h-4" />
                Share on LinkedIn
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FaFacebook className="w-4 h-4" />
                Share on Facebook
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Copy Link</DropdownMenuItem>
            </DropdownMenu>
          </DropdownMenuRoot>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">User Menu</h3>
          <DropdownMenuRoot>
            <DropdownMenuTrigger>
              <Avatar
                src="../assets/avatar.webp"
                fallback="../assets/avatar.webp"
                alt="John Doe"
              />
            </DropdownMenuTrigger>
            <DropdownMenu container={ref}>
              <DropdownMenuItem>
                <FaUser className="w-4 h-4" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FaCog className="w-4 h-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FaSignOutAlt className="w-4 h-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenu>
          </DropdownMenuRoot>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Action Menu</h3>
          <DropdownMenuRoot>
            <DropdownMenuTrigger>
              <IconButton variant="ghost" size="2">
                <FaEllipsisV className="w-4 h-4" />
              </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenu container={ref}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-error-600 dark:text-error-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenu>
          </DropdownMenuRoot>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Simple Menu</h3>
          <DropdownMenuRoot>
            <DropdownMenuTrigger>
              <Button variant="solid" color="primary">
                Open Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenu container={ref}>
              <DropdownMenuItem>Option 1</DropdownMenuItem>
              <DropdownMenuItem>Option 2</DropdownMenuItem>
              <DropdownMenuItem>Option 3</DropdownMenuItem>
            </DropdownMenu>
          </DropdownMenuRoot>
        </div>
      </div>
    );
  },
} satisfies Meta<typeof DropdownMenuRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  args: {},
};
