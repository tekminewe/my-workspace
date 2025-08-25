import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchableCheckboxList } from './searchable-checkbox-list';
import { useState } from 'react';

const meta = {
  title: 'Common / SearchableCheckboxList',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCategories = [
  { value: 'electronics', label: 'Electronics', count: 1234 },
  { value: 'clothing', label: 'Clothing & Fashion', count: 856 },
  { value: 'books', label: 'Books', count: 642 },
  { value: 'home', label: 'Home & Garden', count: 398 },
  { value: 'sports', label: 'Sports & Outdoors', count: 267 },
  { value: 'toys', label: 'Toys & Games', count: 189 },
  { value: 'beauty', label: 'Beauty & Personal Care', count: 145 },
  { value: 'automotive', label: 'Automotive', count: 89 },
  { value: 'pet', label: 'Pet Supplies', count: 67 },
  {
    value: 'industrial',
    label: 'Industrial & Scientific',
    count: 23,
    disabled: true,
  },
];

export const AllVariants: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([
      'electronics',
      'books',
    ]);

    return (
      <div className="w-80 space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Full Featured List</h3>
          <SearchableCheckboxList
            items={sampleCategories}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            searchPlaceholder="Search categories..."
          />
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Without Search</h3>
          <SearchableCheckboxList
            items={sampleCategories.slice(0, 5)}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            showSearch={false}
          />
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Without Actions</h3>
          <SearchableCheckboxList
            items={sampleCategories.slice(0, 5)}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            showActions={false}
          />
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Custom Max Height</h3>
          <SearchableCheckboxList
            items={sampleCategories}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            maxHeight="120px"
          />
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Without Counts</h3>
          <SearchableCheckboxList
            items={sampleCategories.map((item) => ({
              value: item.value,
              label: item.label,
            }))}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
          />
        </div>
      </div>
    );
  },
};
