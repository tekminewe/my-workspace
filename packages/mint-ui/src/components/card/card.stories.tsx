import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './card';
import { allModes } from '../../storybook-modes';
import { TEXT_COLORS } from '../utils/component-colors';

const meta = {
  title: 'Common/Card',
  component: Card,
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
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Shadow size for the card',
      table: {
        defaultValue: { summary: 'none' },
      },
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius for the card',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Comprehensive card showcase - all shadow variations and use cases
 * This single story will be tested in both light and dark modes by Chromatic
 */
export const AllVariations: Story = {
  render: () => (
    <div className="p-8 space-y-6  max-w-7xl mx-auto">
      {/* Shadow Variations Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Shadow Variations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((shadow) => (
            <Card key={shadow} shadow={shadow} className="p-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">
                  {shadow === 'none'
                    ? 'No Shadow (Border)'
                    : `${shadow.toUpperCase()} Shadow`}
                </h3>
                <p>
                  {shadow === 'none'
                    ? 'Card with no shadow displays with a subtle border for definition.'
                    : `Card with ${shadow} shadow for ${
                        shadow === 'sm'
                          ? 'subtle'
                          : shadow === 'md'
                          ? 'moderate'
                          : shadow === 'lg'
                          ? 'prominent'
                          : 'dramatic'
                      } elevation.`}
                </p>
                <div className="text-sm">shadow="{shadow}"</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Radius Variations Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Radius Variations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(['none', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((radius) => (
            <Card key={radius} shadow="md" radius={radius} className="p-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">
                  {radius === 'none'
                    ? 'No Radius (Square)'
                    : radius === 'full'
                    ? 'Full Radius (Pill)'
                    : `${radius.toUpperCase()} Radius`}
                </h3>
                <p>
                  {radius === 'none'
                    ? 'Card with sharp, square corners for modern, geometric layouts.'
                    : radius === 'full'
                    ? 'Card with fully rounded corners for a pill-like appearance.'
                    : `Card with ${radius} radius for ${
                        radius === 'sm'
                          ? 'subtle'
                          : radius === 'md'
                          ? 'balanced'
                          : 'pronounced'
                      } rounded corners.`}
                </p>
                <div className="text-sm">radius="{radius}"</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Content Examples Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Content Examples</h2>

        {/* Simple Content Card */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Simple Content</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card shadow="md" className="p-6">
              <h4 className="text-lg font-medium mb-2">Basic Card</h4>
              <p>
                A simple card with basic content and medium shadow for standard
                use cases.
              </p>
            </Card>
            <Card shadow="lg" className="p-6">
              <h4 className="text-lg font-medium mb-2">Elevated Card</h4>
              <p>
                An elevated card with large shadow for important content that
                needs attention.
              </p>
            </Card>
          </div>
        </div>

        {/* Complex Content Card */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Complex Content</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card shadow="md" className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className={`font-semibold ${TEXT_COLORS.primary}`}>
                      A
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">Article Card</h4>
                    <p className="text-sm">Published 2 hours ago</p>
                  </div>
                </div>
                <p>
                  This is an example of a more complex card with avatar, title,
                  metadata, and content. Perfect for article previews or user
                  profiles.
                </p>
                <div className="flex space-x-2">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                    Tag 1
                  </span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
                    Tag 2
                  </span>
                </div>
              </div>
            </Card>

            <Card shadow="lg" className="p-6">
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Feature Card</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Feature A included</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Feature B included</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Feature C coming soon</span>
                  </div>
                </div>
                <button
                  className={`w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors ${TEXT_COLORS.primary}`}
                >
                  Learn More
                </button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Cards Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Interactive Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            shadow="sm"
            className="p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
          >
            <h4 className="text-lg font-medium mb-2">Hover Effect</h4>
            <p>
              This card has a hover effect that increases shadow on interaction.
            </p>
          </Card>

          <Card shadow="md" className="p-6">
            <h4 className="text-lg font-medium mb-2">Static Card</h4>
            <p>This card maintains consistent shadow without hover effects.</p>
          </Card>

          <Card
            shadow="lg"
            className="p-6 border-2 border-blue-200 dark:border-blue-800"
          >
            <h4 className="text-lg font-medium mb-2">Highlighted Card</h4>
            <p>This card combines shadow with a colored border for emphasis.</p>
          </Card>
        </div>
      </section>

      {/* Layout Examples Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Layout Examples</h2>

        {/* Card Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Card Grid</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }, (_, i) => (
              <Card key={i} shadow="sm" className="p-4">
                <h5 className="font-medium mb-1">Card {i + 1}</h5>
                <p className="text-sm">Small card in a grid layout.</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Nested Cards */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Nested Cards</h3>
          <Card shadow="lg" className="p-6">
            <h4 className="text-lg font-medium mb-4">Parent Card</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card shadow="sm" className="p-4">
                <h5 className="font-medium mb-2">Child Card 1</h5>
                <p className="text-sm">Nested card with smaller shadow.</p>
              </Card>
              <Card shadow="sm" className="p-4">
                <h5 className="font-medium mb-2">Child Card 2</h5>
                <p className="text-sm">Another nested card for comparison.</p>
              </Card>
            </div>
          </Card>
        </div>
      </section>
    </div>
  ),
};
