import type { Meta, StoryObj } from '@storybook/react-vite';
import { Callout } from './callout';

const meta: Meta<typeof Callout> = {
  title: 'Feedback/Callout',
  component: Callout,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      {/* Inline Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Inline Callouts</h2>
        <div className="space-y-3">
          <Callout type="info">
            This is an informational callout with important details.
          </Callout>
          <Callout type="warning">
            This is a warning callout. Proceed with caution.
          </Callout>
          <Callout type="error">
            This is an error callout. Something went wrong.
          </Callout>
          <Callout type="success">
            This is a success callout. Operation completed successfully.
          </Callout>
        </div>
      </section>

      {/* Card Variants - Replacing InfoCard and SuccessCard */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Card Callouts (Replaces InfoCard & SuccessCard)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Callout type="info" variant="card">
            <h3 className="text-2xl font-bold">Information</h3>
            <p>
              This is an informational message that provides guidance to the
              user.
            </p>
          </Callout>
          <Callout type="success" variant="card">
            <h3 className="text-2xl font-bold">Success!</h3>
            <p>Your operation was completed successfully.</p>
          </Callout>
          <Callout type="warning" variant="card">
            <h3 className="text-2xl font-bold">Warning</h3>
            <p>Please review your action before proceeding.</p>
          </Callout>
          <Callout type="error" variant="card">
            <h3 className="text-2xl font-bold">Error</h3>
            <p>Something went wrong. Please try again.</p>
          </Callout>
        </div>
      </section>

      {/* Advanced Usage Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Advanced Usage</h2>
        <div className="space-y-4">
          <Callout type="info">
            <p>
              <strong>Pro tip:</strong> You can include formatted content like{' '}
              <code>code snippets</code> and <em>emphasis</em> in callouts.
            </p>
          </Callout>

          <Callout type="success" variant="card">
            <div>
              <h3 className="text-xl font-bold mb-2">Account Created!</h3>
              <p className="mb-3">
                Welcome to our platform. Your account has been successfully
                created.
              </p>
              <ul className="text-sm text-left space-y-1">
                <li>• Check your email for verification</li>
                <li>• Complete your profile setup</li>
                <li>• Explore our features</li>
              </ul>
            </div>
          </Callout>

          {/* Migration Examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Callout type="info" variant="card">
              <h3 className="text-2xl font-bold">Custom Style</h3>
              <p>
                This card demonstrates the flexibility of the Callout component.
              </p>
            </Callout>
            <Callout type="success" variant="card">
              <h3 className="text-2xl font-bold">Migration Complete</h3>
              <p>
                InfoCard and SuccessCard functionality now available through
                Callout.
              </p>
            </Callout>
          </div>
        </div>
      </section>
    </div>
  ),
};
