import type { Meta, StoryObj } from '@storybook/react-vite';
import { MobileNavigationMenuItem } from './item';
import { getCardColors } from '../utils/component-colors';

const meta: Meta<typeof MobileNavigationMenuItem> = {
  title: 'Navigation / MobileNavigationMenuItem',
  component: MobileNavigationMenuItem,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['gray', 'primary'],
      description: 'Color variant of the link',
    },
    href: {
      control: 'text',
      description: 'URL the link points to',
    },
    children: {
      control: 'text',
      description: 'Content inside the link',
    },
  },
  args: {
    href: '#',
    children: 'Navigation Link',
  },
  decorators: [
    (Story) => (
      <div className="p-4 max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Navigation Item',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Navigation Item',
    color: 'primary',
  },
};

export const DarkMode: Story = {
  args: {
    children: 'Dark Mode Navigation Item',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    themes: { themeOverride: 'dark' },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Light Mode</h3>
        <div className="space-y-2 flex flex-col">
          <MobileNavigationMenuItem href="#">
            Gray (Default)
          </MobileNavigationMenuItem>
          <MobileNavigationMenuItem href="#" color="primary">
            Primary
          </MobileNavigationMenuItem>
          <MobileNavigationMenuItem href="#" disabled>
            Disabled
          </MobileNavigationMenuItem>
        </div>
      </div>

      <div className={`space-y-4 p-4 rounded-lg ${getCardColors('elevated')}`}>
        <h3 className="text-lg font-medium">Dark Mode</h3>
        <div className="space-y-2 flex flex-col">
          <MobileNavigationMenuItem href="#">
            Gray (Default)
          </MobileNavigationMenuItem>
          <MobileNavigationMenuItem href="#" color="primary">
            Primary
          </MobileNavigationMenuItem>
          <MobileNavigationMenuItem href="#" disabled>
            Disabled
          </MobileNavigationMenuItem>
        </div>
      </div>
    </div>
  ),
};
