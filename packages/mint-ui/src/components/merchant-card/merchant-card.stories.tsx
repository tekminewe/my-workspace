import type { Meta, StoryObj } from '@storybook/react-vite';
import { MerchantCard } from './merchant-card';

const meta: Meta<typeof MerchantCard> = {
  title: 'Business/MerchantCard',
  component: MerchantCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    badgeColor: {
      control: 'select',
      options: ['gray', 'green', 'red', 'blue', 'yellow'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">With Logo and Cashback</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          <div className="h-48">
            <MerchantCard
              name="Amazon"
              logoUrl="/images/triumph.webp"
              cashbackPercentage={5.5}
              onClick={() => console.log('Amazon clicked')}
            />
          </div>
          <div className="h-48">
            <MerchantCard
              name="Nike"
              logoUrl="/images/yolofoods.webp"
              cashbackPercentage={4.0}
              badgeColor="blue"
              onClick={() => console.log('Nike clicked')}
            />
          </div>
          <div className="h-48">
            <MerchantCard
              name="Best Buy"
              logoUrl="/images/triumph.webp"
              cashbackPercentage={3.2}
              badgeColor="red"
              onClick={() => console.log('Best Buy clicked')}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Without Logo (Fallback)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          <div className="h-48">
            <MerchantCard
              name="Apple Store"
              cashbackPercentage={2.5}
              onClick={() => console.log('Apple Store clicked')}
            />
          </div>
          <div className="h-48">
            <MerchantCard
              name="Target Corporation"
              cashbackPercentage={4.0}
              badgeColor="yellow"
              onClick={() => console.log('Target clicked')}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Without Cashback</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          <div className="h-48">
            <MerchantCard
              name="McDonald's"
              logoUrl="/images/triumph.webp"
              onClick={() => console.log("McDonald's clicked")}
            />
          </div>
          <div className="h-48">
            <MerchantCard
              name="Starbucks Coffee"
              cashbackPercentage={0}
              onClick={() => console.log('Starbucks clicked')}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Non-Clickable</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          <div className="h-48">
            <MerchantCard
              name="Display Only Store"
              logoUrl="/images/yolofoods.webp"
              cashbackPercentage={1.5}
              clickable={false}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Different Badge Colors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          <div className="h-48">
            <MerchantCard
              name="International Store"
              logoUrl="/images/yolofoods.webp"
              cashbackPercentage={6.0}
              badgeColor="green"
              onClick={() => console.log('International Store clicked')}
            />
          </div>
        </div>
      </div>
    </div>
  ),
};
