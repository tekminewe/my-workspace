import type { Meta, StoryObj } from '@storybook/react-vite';
import { RichTextPreviewPlain } from './rich-text-preview-plain';

const meta = {
  title: 'Components/RichTextPreviewPlain',
  component: RichTextPreviewPlain,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "A plain HTML preview component for rich text content that uses Tiptap's generateHTML utility to convert JSON content to HTML and renders it using dangerouslySetInnerHTML. This component is useful when you need a lightweight HTML rendering without the full editor functionality, such as in emails, PDFs, or static content displays.",
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      description: 'The JSON content to render as HTML',
      control: { type: 'object' },
    },
    className: {
      description: 'Additional CSS class names to apply to the container',
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof RichTextPreviewPlain>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample rich text content for stories
const sampleContent = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [{ type: 'text', text: 'Welcome to Rich Text Preview' }],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'This is a ' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'bold' },
        { type: 'text', text: ' and ' },
        { type: 'text', marks: [{ type: 'italic' }], text: 'italic' },
        { type: 'text', text: ' text example.' },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Features' }],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Renders JSON content as HTML' }],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Supports code highlighting' }],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Lightweight and performant' }],
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Check out this ' },
        {
          type: 'text',
          marks: [{ type: 'link', attrs: { href: 'https://tiptap.dev' } }],
          text: 'Tiptap link',
        },
        { type: 'text', text: ' for more information.' },
      ],
    },
    {
      type: 'codeBlock',
      attrs: { language: 'typescript' },
      content: [
        {
          type: 'text',
          text: `const example = {\n  type: "doc",\n  content: [\n    {\n      type: "paragraph",\n      content: [{ type: "text", text: "Hello World!" }]\n    }\n  ]\n};`,
        },
      ],
    },
    {
      type: 'blockquote',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is a blockquote to demonstrate different content types.',
            },
          ],
        },
      ],
    },
  ],
};

const simpleContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [{ type: 'text', text: 'Simple text content.' }],
    },
  ],
};

const emptyContent = {
  type: 'doc',
  content: [],
};

export const AllVariants: Story = {
  args: {
    content: sampleContent,
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Rich Content Example</h3>
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
          <RichTextPreviewPlain content={sampleContent} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Simple Content</h3>
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
          <RichTextPreviewPlain content={simpleContent} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Empty Content</h3>
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
          <RichTextPreviewPlain content={emptyContent} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">With Custom Styling</h3>
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
          <RichTextPreviewPlain
            content={sampleContent}
            className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Compact Size</h3>
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
          <RichTextPreviewPlain content={sampleContent} className="prose-sm" />
        </div>
      </div>
    </div>
  ),
};

export const Basic: Story = {
  args: {
    content: sampleContent,
  },
};

export const Simple: Story = {
  args: {
    content: simpleContent,
  },
};

export const Empty: Story = {
  args: {
    content: emptyContent,
  },
};

export const WithCustomStyling: Story = {
  args: {
    content: sampleContent,
    className: 'bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg',
  },
};
