import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterGroup } from './filter-group';
import { FilterSection } from '../filter-section';
import { SearchableCheckboxList } from '../searchable-checkbox-list';
import { Badge } from '../badge';

const meta = {
  title: 'Common / FilterGroup',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const categories = [
  { value: 'electronics', label: 'Electronics', count: 1234 },
  { value: 'clothing', label: 'Clothing', count: 856 },
  { value: 'books', label: 'Books', count: 642 },
];

const priceRanges = [
  { value: '0-50', label: '$0 - $50', count: 567 },
  { value: '50-100', label: '$50 - $100', count: 423 },
  { value: '100+', label: '$100+', count: 189 },
];

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Default Filter Group</h3>
        <FilterGroup>
          <FilterSection
            title="Categories"
            badge={
              <Badge variant="soft" color="blue">
                3
              </Badge>
            }
          >
            <SearchableCheckboxList
              items={categories}
              selectedItems={['electronics']}
              onSelectionChange={() => {}}
            />
          </FilterSection>

          <FilterSection title="Price Range">
            <SearchableCheckboxList
              items={priceRanges}
              selectedItems={[]}
              onSelectionChange={() => {}}
              showSearch={false}
            />
          </FilterSection>

          <FilterSection title="Availability">
            <SearchableCheckboxList
              items={[
                { value: 'in-stock', label: 'In Stock', count: 1891 },
                { value: 'on-sale', label: 'On Sale', count: 456 },
                { value: 'free-shipping', label: 'Free Shipping', count: 1203 },
              ]}
              selectedItems={[]}
              onSelectionChange={() => {}}
              showSearch={false}
            />
          </FilterSection>
        </FilterGroup>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">
          Borderless with Tight Spacing
        </h3>
        <FilterGroup bordered={false} spacing="sm">
          <FilterSection title="Brand">
            <SearchableCheckboxList
              items={[
                { value: 'apple', label: 'Apple', count: 89 },
                { value: 'samsung', label: 'Samsung', count: 67 },
                { value: 'google', label: 'Google', count: 45 },
              ]}
              selectedItems={[]}
              onSelectionChange={() => {}}
              showSearch={false}
            />
          </FilterSection>

          <FilterSection title="Rating">
            <SearchableCheckboxList
              items={[
                { value: '5-star', label: '5 Stars', count: 234 },
                { value: '4-star', label: '4+ Stars', count: 567 },
                { value: '3-star', label: '3+ Stars', count: 789 },
              ]}
              selectedItems={[]}
              onSelectionChange={() => {}}
              showSearch={false}
            />
          </FilterSection>
        </FilterGroup>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Large Spacing</h3>
        <FilterGroup spacing="lg">
          <FilterSection title="Location">
            <SearchableCheckboxList
              items={[
                { value: 'ny', label: 'New York', count: 345 },
                { value: 'ca', label: 'California', count: 567 },
                { value: 'tx', label: 'Texas', count: 234 },
              ]}
              selectedItems={[]}
              onSelectionChange={() => {}}
            />
          </FilterSection>
        </FilterGroup>
      </div>
    </div>
  ),
};
