import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './skeleton';
import { TEXT_COLORS, getCardColors } from '../utils/component-colors';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {/* Text Skeletons */}
      <section className="space-y-4">
        <h2 className={`text-xl font-semibold ${TEXT_COLORS.primary}`}>
          Text Skeletons
        </h2>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </section>

      {/* Card Layout Skeleton */}
      <section className="space-y-4">
        <h2 className={`text-xl font-semibold ${TEXT_COLORS.primary}`}>
          Card Layout
        </h2>
        <div className={`rounded-lg p-4 border ${getCardColors('default')}`}>
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Avatar Skeletons */}
      <section className="space-y-4">
        <h2 className={`text-xl font-semibold ${TEXT_COLORS.primary}`}>
          Avatar Variants
        </h2>
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-16 w-16 rounded-full" />
        </div>
      </section>

      {/* Custom Dimensions */}
      <section className="space-y-4">
        <h2 className={`text-xl font-semibold ${TEXT_COLORS.primary}`}>
          Custom Dimensions
        </h2>
        <div className="flex items-center gap-4">
          <Skeleton width={80} height={80} />
          <Skeleton width={120} height={60} />
          <Skeleton className="h-16 w-32 rounded-md" />
        </div>
      </section>

      {/* List Item Skeleton */}
      <section className="space-y-4">
        <h2 className={`text-xl font-semibold ${TEXT_COLORS.primary}`}>
          List Items
        </h2>
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};
