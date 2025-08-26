import { Meta, StoryObj } from '@storybook/react-vite';
import { AdminNavbar } from './admin-navbar';
import { Avatar } from '../avatar';
import { NavigationMenu } from '../navigation-menu';
import { SURFACE_COLORS } from '../utils/component-colors';

const meta = {
  title: 'Admin / Navbar',
  component: AdminNavbar,
  tags: ['autodocs'],
  render: () => {
    return (
      <div className="h-screen flex flex-col">
        <AdminNavbar>
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">
              Admin Dashboard
            </h2>
            <NavigationMenu>
              <Avatar
                src="../assets/avatar.webp"
                fallback="../assets/avatar.webp"
                alt="John Doe"
              />
            </NavigationMenu>
          </div>
        </AdminNavbar>
        <div className={`flex-1 p-6 ${SURFACE_COLORS.surfaceSubtle}`}>
          <p className="text-neutral-700 dark:text-neutral-700">
            This demonstrates the admin navbar with improved styling and proper
            spacing.
          </p>
        </div>
      </div>
    );
  },
} satisfies Meta<typeof AdminNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  args: {},
};
