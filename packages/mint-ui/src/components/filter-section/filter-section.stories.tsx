import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterSection } from './filter-section';
import { Badge } from '../badge';
import { Checkbox } from '../checkbox';

const meta = {
  title: 'Common / FilterSection',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div className="w-64 space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Basic Filter Section</h3>
        <FilterSection title="Categories">
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <Checkbox />
              <span className="text-sm">Electronics</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox />
              <span className="text-sm">Clothing</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox />
              <span className="text-sm">Books</span>
            </label>
          </div>
        </FilterSection>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Badge</h3>
        <FilterSection
          title="Price Range"
          badge={<Badge variant="soft">3</Badge>}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <Checkbox />
              <span className="text-sm">$0 - $50</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox />
              <span className="text-sm">$50 - $100</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox />
              <span className="text-sm">$100+</span>
            </label>
          </div>
        </FilterSection>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Non-Collapsible</h3>
        <FilterSection title="Location" collapsible={false}>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <Checkbox />
              <span className="text-sm">New York</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox />
              <span className="text-sm">Los Angeles</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox />
              <span className="text-sm">Chicago</span>
            </label>
          </div>
        </FilterSection>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Initially Collapsed</h3>
        <FilterSection title="Brand" defaultExpanded={false}>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <Checkbox />
              <span className="text-sm">Apple</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox />
              <span className="text-sm">Samsung</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox />
              <span className="text-sm">Google</span>
            </label>
          </div>
        </FilterSection>
      </div>
    </div>
  ),
};
