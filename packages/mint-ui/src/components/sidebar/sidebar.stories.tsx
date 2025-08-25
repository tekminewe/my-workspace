import { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar } from './sidebar';
import { SidebarHeader } from './header';
import { SidebarMenu } from './menu';
import { SidebarMenuGroup } from './menu-group';
import { SidebarMenuItem } from './menu-item';
import { SURFACE_COLORS } from '../utils/component-colors';
import {
  LuBuilding,
  LuChartLine,
  LuCog,
  LuTarget,
  LuUser,
} from 'react-icons/lu';

const meta = {
  title: 'Admin / Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  render: () => {
    return (
      <div className="h-screen flex">
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
        <div className={`flex-1 p-6 ${SURFACE_COLORS.surfaceSubtle}`}>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-900">
            Demo Content Area
          </h1>
          <p className="text-neutral-700 dark:text-neutral-700 mt-2">
            This demonstrates the sidebar with improved styling and theme
            support.
          </p>
        </div>
      </div>
    );
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  args: {},
};
