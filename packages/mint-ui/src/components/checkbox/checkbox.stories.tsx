import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './checkbox';
import { allModes } from '../../storybook-modes';

const meta: Meta<typeof Checkbox> = {
  title: 'Form / Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    label: {
      control: 'text',
      description: 'The label for the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
  },
  args: {
    label: 'Accept terms and conditions',
  },
  decorators: [
    (Story) => (
      <div className="p-4 max-w-md">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      // Single comprehensive story for both light and dark themes
      modes: {
        'light desktop': allModes['light desktop'],
        'dark desktop': allModes['dark desktop'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div className="grid gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">All Checkbox States</h3>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-neutral-600">
              Basic States
            </h4>
            <div className="space-y-2">
              <Checkbox label="Unchecked" />
              <Checkbox label="Checked" checked />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-neutral-600">
              Disabled States
            </h4>
            <div className="space-y-2">
              <Checkbox label="Disabled" disabled />
              <Checkbox label="Checked and Disabled" checked disabled />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-neutral-600">
              Without Label
            </h4>
            <div className="space-y-2">
              <Checkbox />
              <Checkbox checked />
              <Checkbox disabled />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-neutral-600">Long Label</h4>
            <Checkbox label="This is a very long checkbox label that demonstrates how the component handles text wrapping and maintains proper alignment between the checkbox and the label text" />
          </div>
        </div>
      </div>
    </div>
  ),
};
