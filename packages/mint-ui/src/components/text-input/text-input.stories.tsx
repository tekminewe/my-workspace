import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextInput, ControlledTextInput } from './index';
import { allModes } from '../../storybook-modes';
import { TEXT_COLORS, BORDER_COLORS } from '../utils/component-colors';
import { ControlledForm } from '../form';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
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
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    description: {
      control: 'text',
      description: 'Description text to display',
    },
    type: {
      control: 'select',
      options: [
        'text',
        'email',
        'password',
        'number',
        'tel',
        'url',
        'currency',
      ],
      description: 'Input type',
    },
    size: {
      control: 'select',
      options: ['1', '2', '3'],
      description: 'Size of the input',
      table: {
        defaultValue: { summary: '2' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    containerClassName: {
      control: 'text',
      description: 'Additional className for the container',
    },
    labelClassName: {
      control: 'text',
      description: 'Additional className for the label',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

// Simple icon components for examples (since lucide-react is not installed)
const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <circle cx="12" cy="16" r="1" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const UserIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const DollarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

/**
 * Form component for testing controlled text input
 */
const FormExample = () => {
  return (
    <ControlledForm
      defaultValues={{
        username: '',
        email: '',
        password: '',
      }}
      onSubmit={(data) => console.log(data)}
      className="space-y-4 max-w-md"
    >
      <ControlledTextInput
        name="username"
        label="Username"
        placeholder="Enter your username"
        description="This will be your unique identifier"
        icon={<UserIcon />}
      />
      <ControlledTextInput
        name="email"
        type="email"
        label="Email Address"
        placeholder="Enter your email"
        required
        icon={<MailIcon />}
      />
      <ControlledTextInput
        name="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        required
        icon={<LockIcon />}
      />
    </ControlledForm>
  );
};

/**
 * Comprehensive text input showcase - all variants, sizes, types, and states
 * This single story will be tested in both light and dark modes by Chromatic
 */
export const AllVariants: Story = {
  render: () => (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      {/* Basic Variants Section */}
      <section className="space-y-4">
        <h2 className={`text-2xl font-bold ${TEXT_COLORS.primary}`}>
          Basic Text Inputs
        </h2>
        <div className="space-y-4">
          <TextInput label="Basic Input" placeholder="Enter some text" />
          <TextInput
            label="With Description"
            placeholder="Enter some text"
            description="This is a helpful description"
          />
          <TextInput
            label="Required Field"
            placeholder="This field is required"
            required
          />
          <TextInput
            label="Disabled Input"
            placeholder="This input is disabled"
            disabled
            value="Disabled value"
          />
        </div>
      </section>

      {/* Sizes Section */}
      <section className="space-y-4">
        <h2 className={`text-2xl font-bold ${TEXT_COLORS.primary}`}>Sizes</h2>
        <div className="space-y-4">
          <TextInput
            size="1"
            label="Small (Size 1)"
            placeholder="Small input"
          />
          <TextInput
            size="2"
            label="Medium (Size 2)"
            placeholder="Medium input (default)"
          />
          <TextInput
            size="3"
            label="Large (Size 3)"
            placeholder="Large input"
          />
        </div>
      </section>

      {/* Input Types Section */}
      <section className="space-y-4">
        <h2 className={`text-2xl font-bold ${TEXT_COLORS.primary}`}>
          Input Types
        </h2>
        <div className="space-y-4">
          <TextInput type="text" label="Text" placeholder="Enter text" />
          <TextInput
            type="email"
            label="Email"
            placeholder="Enter email address"
            icon={<MailIcon />}
          />
          <TextInput
            type="password"
            label="Password"
            placeholder="Enter password"
            icon={<LockIcon />}
          />
          <TextInput
            type="number"
            label="Number"
            placeholder="Enter a number"
          />
          <TextInput
            type="tel"
            label="Phone"
            placeholder="Enter phone number"
          />
          <TextInput
            type="url"
            label="Website URL"
            placeholder="https://example.com"
          />
          <TextInput
            type="currency"
            label="Currency"
            placeholder="0.00"
            icon={<DollarIcon />}
          />
        </div>
      </section>

      {/* With Icons Section */}
      <section className="space-y-4">
        <h2 className={`text-2xl font-bold ${TEXT_COLORS.primary}`}>
          With Icons
        </h2>
        <div className="space-y-4">
          <TextInput
            label="Search"
            placeholder="Search..."
            icon={<SearchIcon />}
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="your.email@example.com"
            icon={<MailIcon />}
          />
          <TextInput
            label="Username"
            placeholder="Enter username"
            icon={<UserIcon />}
          />
          <TextInput
            label="Price"
            type="currency"
            placeholder="99.99"
            icon={<DollarIcon />}
            description="Enter amount in USD"
          />
        </div>
      </section>

      {/* Error States Section */}
      <section className="space-y-4">
        <h2 className={`text-2xl font-bold ${TEXT_COLORS.primary}`}>
          Error States
        </h2>
        <div className="space-y-4">
          <TextInput
            label="Invalid Email"
            type="email"
            placeholder="Enter email"
            value="invalid-email"
            error="Please enter a valid email address"
            icon={<MailIcon />}
          />
          <TextInput
            label="Required Field"
            placeholder="This field is required"
            error="This field is required"
            required
          />
          <TextInput
            label="Password"
            type="password"
            placeholder="Enter password"
            value="123"
            error="Password must be at least 8 characters long"
            icon={<LockIcon />}
          />
        </div>
      </section>

      {/* Size with Icons Combinations */}
      <section className="space-y-4">
        <h2 className={`text-2xl font-bold ${TEXT_COLORS.primary}`}>
          Size Combinations with Icons
        </h2>
        <div className="space-y-4">
          {(['1', '2', '3'] as const).map((size) => (
            <div key={size} className="space-y-2">
              <h3 className={`text-lg font-semibold ${TEXT_COLORS.secondary}`}>
                Size {size}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  size={size}
                  label={`Search (Size ${size})`}
                  placeholder="Search..."
                  icon={<SearchIcon />}
                />
                <TextInput
                  size={size}
                  label={`Email (Size ${size})`}
                  type="email"
                  placeholder="your.email@example.com"
                  icon={<MailIcon />}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Controlled Form Example */}
      <section className="space-y-4">
        <h2 className={`text-2xl font-bold ${TEXT_COLORS.primary}`}>
          Controlled Form Example
        </h2>
        <div className={`p-6 border rounded-lg ${BORDER_COLORS.default}`}>
          <FormExample />
        </div>
      </section>

      {/* Custom Styling Examples */}
      <section className="space-y-4">
        <h2 className={`text-2xl font-bold ${TEXT_COLORS.primary}`}>
          Custom Styling
        </h2>
        <div className="space-y-4">
          <TextInput
            label="Custom Container"
            placeholder="Custom styled container"
            containerClassName="border border-primary-200 rounded-lg p-4 bg-primary-50 dark:bg-primary-950 dark:border-primary-800"
          />
          <TextInput
            label="Custom Label"
            placeholder="Custom styled label"
            labelClassName="text-primary-600 font-bold"
            description="Label has custom styling"
          />
        </div>
      </section>
    </div>
  ),
};
