import { Meta, StoryObj } from '@storybook/react-vite';
import { ImageInput } from './image-input';

const meta = {
  title: 'Form / Image Input',
  component: ImageInput,
  tags: ['autodocs'],
} satisfies Meta<typeof ImageInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 max-w-lg">
      <div>
        <h3 className="text-lg font-semibold mb-4">With Image Selected</h3>
        <ImageInput
          label="Featured Image"
          value="https://media.tekminewe.com/bastion-host.webp"
          description="Image must be less than 5MB"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Without Image (Empty State)
        </h3>
        <ImageInput
          label="Profile Picture"
          description="Upload a profile picture (PNG, JPG, or WEBP)"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">With Error</h3>
        <ImageInput label="Company Logo" error="This field is required" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Required Field</h3>
        <ImageInput
          label="Document Upload"
          required
          description="Required document for verification"
        />
      </div>
    </div>
  ),
};
