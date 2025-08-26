import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { allModes } from '../../storybook-modes';
import { TEXT_COLORS } from '../utils/component-colors';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
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
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outline', 'ghost', 'link'],
      description: 'The visual style of the button',
    },
    color: {
      control: 'select',
      options: ['primary', 'neutral', 'success', 'error', 'warning', 'info'],
      description: 'The color scheme of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius for the button',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    children: {
      control: 'text',
      description: 'The content of the button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Comprehensive button showcase - all variants, colors, sizes, and states
 * This single story will be tested in both light and dark modes by Chromatic
 */
export const AllVariants: Story = {
  render: () => (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Variants Section */}
      <section className="space-y-4">
        <h2 className={`text-2xl font-bold ${TEXT_COLORS.primary}`}>
          Variants
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="solid" color="primary">
            Solid
          </Button>
          <Button variant="soft" color="primary">
            Soft
          </Button>
          <Button variant="outline" color="primary">
            Outline
          </Button>
          <Button variant="ghost" color="primary">
            Ghost
          </Button>
          <Button variant="link" color="primary">
            Link
          </Button>
        </div>
      </section>

      {/* Colors Section */}
      <section className="space-y-4">
        <h2 className={`text-2xl font-bold ${TEXT_COLORS.primary}`}>Colors</h2>
        <div className="space-y-4">
          {(['solid', 'soft', 'outline', 'ghost'] as const).map((variant) => (
            <div key={variant} className="space-y-2">
              <h3
                className={`text-lg font-semibold ${TEXT_COLORS.secondary} capitalize`}
              >
                {variant}
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant={variant} color="primary">
                  Primary
                </Button>
                <Button variant={variant} color="neutral">
                  Neutral
                </Button>
                <Button variant={variant} color="success">
                  Success
                </Button>
                <Button variant={variant} color="error">
                  Error
                </Button>
                <Button variant={variant} color="warning">
                  Warning
                </Button>
                <Button variant={variant} color="info">
                  Info
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sizes Section */}
      <section className="space-y-4">
        <h2 className={`text-2xl font-bold ${TEXT_COLORS.primary}`}>Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm" variant="solid" color="primary">
            Small
          </Button>
          <Button size="md" variant="solid" color="primary">
            Medium
          </Button>
          <Button size="lg" variant="solid" color="primary">
            Large
          </Button>
        </div>
      </section>

      {/* Radius Section */}
      <section className="space-y-4">
        <h2 className={`text-2xl font-bold ${TEXT_COLORS.primary}`}>
          Border Radius
        </h2>
        <div className="flex flex-wrap gap-4">
          {(['none', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((radius) => (
            <Button
              key={radius}
              variant="solid"
              color="primary"
              radius={radius}
            >
              {radius === 'none'
                ? 'Square'
                : radius === 'full'
                ? 'Pill'
                : radius.toUpperCase()}
            </Button>
          ))}
        </div>
      </section>

      {/* States Section */}
      <section className="space-y-4">
        <h2 className={`text-2xl font-bold ${TEXT_COLORS.primary}`}>States</h2>
        <div className="space-y-4">
          {(['solid', 'outline', 'soft'] as const).map((variant) => (
            <div key={variant} className="space-y-2">
              <h3
                className={`text-lg font-semibold ${TEXT_COLORS.secondary} capitalize`}
              >
                {variant} States
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant={variant} color="primary">
                  Normal
                </Button>
                <Button variant={variant} color="primary" loading>
                  Loading
                </Button>
                <Button variant={variant} color="primary" disabled>
                  Disabled
                </Button>
                <Button variant={variant} color="primary" loading disabled>
                  Loading Disabled
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Size Combinations */}
      <section className="space-y-4">
        <h2 className={`text-2xl font-bold ${TEXT_COLORS.primary}`}>
          Size Combinations
        </h2>
        <div className="space-y-4">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <div key={size} className="space-y-2">
              <h3 className={`text-lg font-semibold ${TEXT_COLORS.secondary}`}>
                Size: {size}
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button size={size} variant="solid" color="primary">
                  Solid
                </Button>
                <Button size={size} variant="outline" color="success">
                  Outline
                </Button>
                <Button size={size} variant="soft" color="warning">
                  Soft
                </Button>
                <Button size={size} variant="ghost" color="info">
                  Ghost
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};
