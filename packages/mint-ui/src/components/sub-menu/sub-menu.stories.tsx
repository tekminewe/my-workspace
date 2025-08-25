import { Meta, StoryObj } from '@storybook/react-vite';
import { SubMenu } from './sub-menu';
import { SubMenuItem } from './sub-menu-item';
import {
  LuAward,
  LuLayoutDashboard,
  LuSettings,
  LuUser,
  LuBell,
  LuCircle,
  LuFileText,
  LuCreditCard,
  LuShield,
  LuChrome,
  LuTrendingUp,
  LuUsers,
} from 'react-icons/lu';
import { SURFACE_COLORS } from '../utils/component-colors';

const meta = {
  title: 'Navigation / SubMenu',
  component: SubMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A vertical navigation sub-menu component with support for different variants, selection states, and accessibility features.',
      },
    },
  },
} satisfies Meta<typeof SubMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">SubMenu Component Variants</h2>
        <p className="text-neutral-600 mb-6">
          Comprehensive showcase of all SubMenu states, variants, and use cases
        </p>
      </div>

      {/* Basic Usage */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Basic Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium mb-2 text-neutral-600">
              Default Variant
            </h4>
            <SubMenu>
              <SubMenuItem selected>
                <LuLayoutDashboard size={16} />
                Dashboard
              </SubMenuItem>
              <SubMenuItem>
                <LuAward size={16} />
                My Rewards
              </SubMenuItem>
              <SubMenuItem>
                <LuSettings size={16} />
                Settings
              </SubMenuItem>
            </SubMenu>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2 text-neutral-600">
              Elevated Variant
            </h4>
            <SubMenu variant="elevated">
              <SubMenuItem selected>
                <LuChrome size={16} />
                Home
              </SubMenuItem>
              <SubMenuItem>
                <LuTrendingUp size={16} />
                Analytics
              </SubMenuItem>
              <SubMenuItem>
                <LuUsers size={16} />
                Team
              </SubMenuItem>
            </SubMenu>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2 text-neutral-600">
              Subtle Variant
            </h4>
            <SubMenu variant="subtle">
              <SubMenuItem selected>
                <LuUser size={16} />
                Profile
              </SubMenuItem>
              <SubMenuItem>
                <LuBell size={16} />
                Notifications
              </SubMenuItem>
              <SubMenuItem>
                <LuCircle size={16} />
                Help
              </SubMenuItem>
            </SubMenu>
          </div>
        </div>
      </section>

      {/* Item States */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Item States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium mb-2 text-neutral-600">
              Interactive States
            </h4>
            <SubMenu>
              <SubMenuItem selected>
                <LuLayoutDashboard size={16} />
                Selected Item
              </SubMenuItem>
              <SubMenuItem>
                <LuAward size={16} />
                Normal Item (hover me)
              </SubMenuItem>
              <SubMenuItem disabled>
                <LuSettings size={16} />
                Disabled Item
              </SubMenuItem>
            </SubMenu>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2 text-neutral-600">
              Without Icons
            </h4>
            <SubMenu>
              <SubMenuItem selected>Dashboard</SubMenuItem>
              <SubMenuItem>My Rewards</SubMenuItem>
              <SubMenuItem>Settings</SubMenuItem>
              <SubMenuItem disabled>Disabled Option</SubMenuItem>
            </SubMenu>
          </div>
        </div>
      </section>

      {/* Real-world Examples */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Real-world Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium mb-2 text-neutral-600">
              Admin Navigation
            </h4>
            <SubMenu variant="elevated">
              <SubMenuItem selected>
                <LuLayoutDashboard size={16} />
                Dashboard
              </SubMenuItem>
              <SubMenuItem>
                <LuUsers size={16} />
                User Management
              </SubMenuItem>
              <SubMenuItem>
                <LuTrendingUp size={16} />
                Analytics
              </SubMenuItem>
              <SubMenuItem>
                <LuShield size={16} />
                Security
              </SubMenuItem>
              <SubMenuItem disabled>
                <LuCreditCard size={16} />
                Billing (Premium)
              </SubMenuItem>
            </SubMenu>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2 text-neutral-600">
              User Account Menu
            </h4>
            <SubMenu>
              <SubMenuItem>
                <LuUser size={16} />
                Profile Settings
              </SubMenuItem>
              <SubMenuItem selected>
                <LuBell size={16} />
                Notifications
              </SubMenuItem>
              <SubMenuItem>
                <LuCreditCard size={16} />
                Billing & Payments
              </SubMenuItem>
              <SubMenuItem>
                <LuFileText size={16} />
                Order History
              </SubMenuItem>
              <SubMenuItem>
                <LuCircle size={16} />
                Help & Support
              </SubMenuItem>
            </SubMenu>
          </div>
        </div>
      </section>

      {/* Custom Styling */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Custom Styling</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium mb-2 text-neutral-600">
              Compact Menu
            </h4>
            <SubMenu className="p-1 space-y-0">
              <SubMenuItem className="px-2 py-1.5 text-sm" selected>
                <LuChrome size={14} />
                Home
              </SubMenuItem>
              <SubMenuItem className="px-2 py-1.5 text-sm">
                <LuSettings size={14} />
                Settings
              </SubMenuItem>
              <SubMenuItem className="px-2 py-1.5 text-sm">
                <LuCircle size={14} />
                Help
              </SubMenuItem>
            </SubMenu>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2 text-neutral-600">
              Wide Menu
            </h4>
            <SubMenu className="min-w-64">
              <SubMenuItem selected>
                <LuLayoutDashboard size={16} />
                <span>Main Dashboard Overview</span>
              </SubMenuItem>
              <SubMenuItem>
                <LuTrendingUp size={16} />
                <span>Advanced Analytics & Reports</span>
              </SubMenuItem>
              <SubMenuItem>
                <LuUsers size={16} />
                <span>Team Management & Permissions</span>
              </SubMenuItem>
            </SubMenu>
          </div>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className={`p-4 rounded-lg ${SURFACE_COLORS.surfaceSubtle}`}>
        <h3 className="text-lg font-semibold mb-2">Accessibility Features</h3>
        <ul className="text-sm text-neutral-600 space-y-1">
          <li>• Selected items have aria-current="page" attribute</li>
          <li>• Disabled items have tabIndex={-1} and proper cursor</li>
          <li>• Keyboard navigation with Tab and Enter keys</li>
          <li>• Proper color contrast ratios for all states</li>
          <li>• Focus indicators visible on keyboard navigation</li>
          <li>• Semantic HTML with proper ARIA attributes</li>
        </ul>
      </section>
    </div>
  ),
};
