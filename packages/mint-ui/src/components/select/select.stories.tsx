import { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './select';
import { TextInput } from '../text-input';
import { useState } from 'react';

const defaultOptions = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Ember', value: 'ember' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Nuxt.js', value: 'nuxtjs' },
  { label: 'Remix', value: 'remix' },
  { label: 'SvelteKit', value: 'sveltekit' },
];

const meta = {
  title: 'Form / Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => {
    const [singleValue, setSingleValue] = useState<string>();
    const [multiValue, setMultiValue] = useState<string[]>([]);
    const [asyncValue, setAsyncValue] = useState<string>();
    const [creatableValue, setCreatableValue] = useState<string[]>([]);

    // Mock async load function
    const loadOptions = async (inputValue: string) => {
      return new Promise<typeof defaultOptions>((resolve) => {
        setTimeout(() => {
          const filtered = defaultOptions.filter((option) =>
            option.label.toLowerCase().includes(inputValue.toLowerCase()),
          );
          resolve(filtered);
        }, 1000);
      });
    };

    return (
      <div className="space-y-8 p-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Single Select</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Basic"
              options={defaultOptions}
              value={singleValue}
              onChange={(value) => setSingleValue(value as string)}
              placeholder="Select a framework"
            />

            <Select
              label="With Description"
              description="Choose your preferred frontend framework"
              options={defaultOptions}
              value={singleValue}
              onChange={(value) => setSingleValue(value as string)}
              placeholder="Select a framework"
            />

            <Select
              label="Required"
              required
              options={defaultOptions}
              value={singleValue}
              onChange={(value) => setSingleValue(value as string)}
              placeholder="Select a framework"
            />

            <Select
              label="Not Clearable"
              clearable={false}
              options={defaultOptions}
              value={singleValue}
              onChange={(value) => setSingleValue(value as string)}
              placeholder="Select a framework"
            />

            <Select
              label="Disabled"
              disabled
              options={defaultOptions}
              value={singleValue}
              onChange={(value) => setSingleValue(value as string)}
              placeholder="Select a framework"
            />

            <Select
              label="With Error"
              error="Please select a framework"
              options={defaultOptions}
              value={singleValue}
              onChange={(value) => setSingleValue(value as string)}
              placeholder="Select a framework"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Sizes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Small"
              size="sm"
              options={defaultOptions}
              value={singleValue}
              onChange={(value) => setSingleValue(value as string)}
            />
            <Select
              label="Medium (Default)"
              size="md"
              options={defaultOptions}
              value={singleValue}
              onChange={(value) => setSingleValue(value as string)}
            />
            <Select
              label="Large"
              size="lg"
              options={defaultOptions}
              value={singleValue}
              onChange={(value) => setSingleValue(value as string)}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Multi Select</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Multiple Selection"
              multiple
              options={defaultOptions}
              value={multiValue}
              onChange={(value) => setMultiValue(value as string[])}
              placeholder="Select frameworks"
            />

            <Select
              label="Multiple Selection"
              multiple
              options={defaultOptions}
              value={multiValue}
              onChange={(value) => setMultiValue(value as string[])}
              placeholder="Select frameworks"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Async Loading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Async Select"
              async
              loadOptions={loadOptions}
              defaultOptions={defaultOptions}
              value={asyncValue}
              onChange={(value) => setAsyncValue(value as string)}
              placeholder="Search frameworks..."
            />

            <Select
              label="Async with Cache"
              async
              cacheOptions
              loadOptions={loadOptions}
              value={asyncValue}
              onChange={(value) => setAsyncValue(value as string)}
              placeholder="Search frameworks..."
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Creatable</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Creatable Single"
              creatable
              options={defaultOptions}
              value={singleValue}
              onChange={(value) => setSingleValue(value as string)}
              placeholder="Type to create new option"
            />

            <Select
              label="Creatable Multiple"
              creatable
              multiple
              options={defaultOptions}
              value={creatableValue}
              onChange={(value) => setCreatableValue(value as string[])}
              placeholder="Type to create new options"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Advanced Combinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Async + Creatable"
              async
              creatable
              multiple
              loadOptions={loadOptions}
              value={creatableValue}
              onChange={(value) => setCreatableValue(value as string[])}
              placeholder="Search or create options"
            />

            <Select
              label="Non-searchable Multiple"
              multiple
              isSearchable={false}
              options={defaultOptions}
              value={multiValue}
              onChange={(value) => setMultiValue(value as string[])}
              placeholder="Select from dropdown"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Color Consistency with TextInput
          </h2>
          <p className="text-sm text-neutral-600 mb-4">
            Compare Select and TextInput components to verify consistent styling
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="font-medium text-sm">Select Component</h3>
              <Select
                label="Framework"
                options={defaultOptions.slice(0, 3)}
                placeholder="Choose a framework"
                description="Select your preferred framework"
              />
              <Select
                label="Required Field"
                required
                options={defaultOptions.slice(0, 3)}
                placeholder="This field is required"
              />
              <Select
                label="With Error"
                options={defaultOptions.slice(0, 3)}
                error="Please select a valid option"
                placeholder="Select an option"
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-sm">TextInput Component</h3>
              <TextInput
                label="Framework"
                placeholder="Enter a framework"
                description="Type your preferred framework"
              />
              <TextInput
                label="Required Field"
                required
                placeholder="This field is required"
              />
              <TextInput
                label="With Error"
                error="Please enter a valid value"
                placeholder="Enter a value"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};
