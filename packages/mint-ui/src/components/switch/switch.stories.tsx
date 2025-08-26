import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './switch';
import { getCardColors } from '../utils/component-colors';

const meta: Meta<typeof Switch> = {
  title: 'Form / Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked or not',
    },
    label: {
      control: 'text',
      description: 'Label for the switch',
    },
    description: {
      control: 'text',
      description: 'Description text to display below the switch',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
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
    label: 'Active',
    description: 'Switch to activate awesomeness',
  },
};

export const Checked: Story = {
  args: {
    ...Default.args,
    checked: true,
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'This field is required',
  },
};

export const WithoutLabel: Story = {
  args: {
    description: 'Switch without a label',
  },
};

export const DarkMode: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    backgrounds: { default: 'dark' },
    themes: { themeOverride: 'dark' },
  },
};

// Component with all variants
export const AllVariants: Story = {
  render: () => (
    <div className="grid gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Light Mode</h3>
        <div className="space-y-2">
          <Switch label="Unchecked" description="Default unchecked state" />
          <Switch label="Checked" description="Default checked state" checked />
          <Switch label="Disabled" description="Disabled state" disabled />
          <Switch
            label="Disabled Checked"
            description="Disabled checked state"
            disabled
            checked
          />
          <Switch
            label="With Error"
            description="Error state"
            error="This field is required"
          />
        </div>
      </div>

      <div className={`space-y-4 p-4 rounded-lg ${getCardColors('elevated')}`}>
        <h3 className="text-lg font-medium">Dark Mode</h3>
        <div className="space-y-2">
          <Switch label="Unchecked" description="Default unchecked state" />
          <Switch label="Checked" description="Default checked state" checked />
          <Switch label="Disabled" description="Disabled state" disabled />
          <Switch
            label="Disabled Checked"
            description="Disabled checked state"
            disabled
            checked
          />
          <Switch
            label="With Error"
            description="Error state"
            error="This field is required"
          />
        </div>
      </div>
    </div>
  ),
};
