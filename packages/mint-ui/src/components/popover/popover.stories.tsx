import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from './popover';
import { Button } from '../button';
import { SURFACE_COLORS, TEXT_COLORS } from '../utils/component-colors';

const meta: Meta<typeof Popover.Root> = {
  title: 'Overlay/Popover',
  component: Popover.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover.Root>;

export const Default: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button>Open Popover</Button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="space-y-2">
          <h3 className="font-medium">Popover Title</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            This is a popover content. It can contain any React components.
          </p>
        </div>
      </Popover.Content>
    </Popover.Root>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button>Popover with Arrow</Button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="space-y-2">
          <h3 className="font-medium">Popover with Arrow</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            This popover has an arrow pointing to the trigger.
          </p>
        </div>
        <Popover.Arrow
          className={`fill-current ${SURFACE_COLORS.surfaceElevated}`}
        />
      </Popover.Content>
    </Popover.Root>
  ),
};

export const AlignStart: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button>Align Start</Button>
      </Popover.Trigger>
      <Popover.Content align="start">
        <div className="space-y-2">
          <h3 className="font-medium">Align Start</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            This popover is aligned to the start of the trigger.
          </p>
        </div>
      </Popover.Content>
    </Popover.Root>
  ),
};

export const AlignEnd: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button>Align End</Button>
      </Popover.Trigger>
      <Popover.Content align="end">
        <div className="space-y-2">
          <h3 className="font-medium">Align End</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            This popover is aligned to the end of the trigger.
          </p>
        </div>
      </Popover.Content>
    </Popover.Root>
  ),
};

export const CustomWidth: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button>Custom Width</Button>
      </Popover.Trigger>
      <Popover.Content className="w-96">
        <div className="space-y-2">
          <h3 className="font-medium">Custom Width</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            This popover has a custom width (w-96) applied through className.
          </p>
        </div>
      </Popover.Content>
    </Popover.Root>
  ),
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div className="dark p-8 bg-neutral-900">
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button>Dark Mode Popover</Button>
        </Popover.Trigger>
        <Popover.Content>
          <div className="space-y-2">
            <h3 className={`font-medium ${TEXT_COLORS.primary}`}>Dark Mode</h3>
            <p className={`text-sm ${TEXT_COLORS.muted}`}>
              This is a popover displayed in dark mode.
            </p>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
};
