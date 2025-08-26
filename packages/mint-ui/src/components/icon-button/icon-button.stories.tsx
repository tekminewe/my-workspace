import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './icon-button';
import { LuShare, LuTrash, LuHeart, LuPlus, LuSettings } from 'react-icons/lu';

const meta: Meta<typeof IconButton> = {
  title: 'Common/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    children: <LuShare className="h-4 w-4" />,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton size="1">
        <LuShare className="h-3 w-3" />
      </IconButton>
      <IconButton size="2">
        <LuShare className="h-4 w-4" />
      </IconButton>
      <IconButton size="3">
        <LuShare className="h-5 w-5" />
      </IconButton>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <IconButton variant="ghost">
          <LuShare className="h-4 w-4" />
        </IconButton>
        <IconButton variant="soft">
          <LuHeart className="h-4 w-4" />
        </IconButton>
        <IconButton variant="outline">
          <LuSettings className="h-4 w-4" />
        </IconButton>
        <IconButton variant="solid">
          <LuPlus className="h-4 w-4" />
        </IconButton>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <IconButton color="gray">
          <LuShare className="h-4 w-4" />
        </IconButton>
        <IconButton color="red">
          <LuTrash className="h-4 w-4" />
        </IconButton>
        <IconButton color="green">
          <LuPlus className="h-4 w-4" />
        </IconButton>
        <IconButton color="blue">
          <LuSettings className="h-4 w-4" />
        </IconButton>
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div className="flex flex-col gap-4 dark p-4 bg-neutral-900">
      <h3 className="text-lg font-medium text-neutral-50">Variants</h3>
      <div className="flex items-center gap-4">
        <IconButton variant="ghost">
          <LuShare className="h-4 w-4" />
        </IconButton>
        <IconButton variant="soft">
          <LuHeart className="h-4 w-4" />
        </IconButton>
        <IconButton variant="outline">
          <LuSettings className="h-4 w-4" />
        </IconButton>
        <IconButton variant="solid">
          <LuPlus className="h-4 w-4" />
        </IconButton>
      </div>

      <h3 className="text-lg font-medium text-neutral-50 mt-4">Colors</h3>
      <div className="flex items-center gap-4">
        <IconButton color="gray">
          <LuShare className="h-4 w-4" />
        </IconButton>
        <IconButton color="red">
          <LuTrash className="h-4 w-4" />
        </IconButton>
        <IconButton color="green">
          <LuPlus className="h-4 w-4" />
        </IconButton>
        <IconButton color="blue">
          <LuSettings className="h-4 w-4" />
        </IconButton>
      </div>
    </div>
  ),
};
