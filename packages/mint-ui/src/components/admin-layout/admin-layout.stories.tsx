import { Meta, StoryObj } from '@storybook/react-vite';
import {
  LuBuilding,
  LuChartLine,
  LuCog,
  LuTarget,
  LuUser,
} from 'react-icons/lu';
import { getCardColors } from '../utils/component-colors';
import { AdminLayout } from './admin-layout';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuGroup,
  SidebarMenuItem,
} from '../sidebar';
import { AdminNavbar } from '../admin-navbar/admin-navbar';
import { NavigationMenu } from '../navigation-menu';
import { Avatar } from '../avatar';
import { AdminContent } from '../admin-content';

const meta = {
  title: 'Admin / Layout',
  component: AdminLayout,
  tags: ['autodocs'],
  render: () => {
    return (
      <AdminLayout className="h-screen">
        <Sidebar>
          <SidebarHeader>
            <img src="./assets/logo.webp" alt="Logo" className="w-8 h-8" />
            MintUI Admin
          </SidebarHeader>
          <SidebarMenu>
            <SidebarMenuGroup>
              <SidebarMenuItem selected>
                <LuChartLine />
                Dashboard
              </SidebarMenuItem>
              <SidebarMenuItem>
                <LuUser />
                Users
              </SidebarMenuItem>
              <SidebarMenuItem>
                <LuTarget />
                Campaign
              </SidebarMenuItem>
            </SidebarMenuGroup>
            <SidebarMenuGroup title="Settings">
              <SidebarMenuItem>
                <LuBuilding />
                Company
              </SidebarMenuItem>
              <SidebarMenuItem>
                <LuCog />
                Site
              </SidebarMenuItem>
            </SidebarMenuGroup>
          </SidebarMenu>
        </Sidebar>
        <AdminNavbar>
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-900">
              Dashboard
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
        <AdminContent>
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-900 mb-6">
              Welcome to the Admin Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className={`p-6 rounded-lg ${getCardColors('elevated')}`}>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-900 mb-2">
                  Total Users
                </h3>
                <p className="text-3xl font-bold text-primary-600">1,234</p>
              </div>
              <div className={`p-6 rounded-lg ${getCardColors('elevated')}`}>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-900 mb-2">
                  Active Campaigns
                </h3>
                <p className="text-3xl font-bold text-success-600">45</p>
              </div>
              <div className={`p-6 rounded-lg ${getCardColors('elevated')}`}>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-900 mb-2">
                  Revenue
                </h3>
                <p className="text-3xl font-bold text-info-600">$12,345</p>
              </div>
            </div>
          </div>
        </AdminContent>
      </AdminLayout>
    );
  },
} satisfies Meta<typeof AdminLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  args: {},
};
