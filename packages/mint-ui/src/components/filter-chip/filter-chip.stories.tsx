import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterChip } from './filter-chip';
import { useState } from 'react';

const meta = {
  title: 'Common / FilterChip',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => {
    const [chips, setChips] = useState([
      { id: '1', label: 'Electronics' },
      { id: '2', label: 'Under $50' },
      { id: '3', label: 'In Stock' },
      { id: '4', label: 'Free Shipping' },
    ]);

    const removeChip = (id: string) => {
      setChips(chips.filter((chip) => chip.id !== id));
    };

    return (
      <div className="space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Interactive Filter Chips
          </h3>
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <FilterChip
                key={chip.id}
                label={chip.label}
                onRemove={() => removeChip(chip.id)}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Sizes</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Small:</span>
              <FilterChip label="Small chip" size="sm" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Medium:</span>
              <FilterChip label="Medium chip" size="md" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Non-removable</h3>
          <div className="flex flex-wrap gap-2">
            <FilterChip label="Active status" removable={false} />
            <FilterChip label="Required filter" removable={false} />
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Long Text Handling</h3>
          <div className="w-64">
            <FilterChip label="This is a very long filter label that should truncate nicely" />
          </div>
        </div>
      </div>
    );
  },
};
