import { Meta, StoryObj } from "@storybook/react-vite";
import { RichTextPreview } from "./rich-text-preview";

const meta = {
  title: "Form / Rich Text Preview",
  component: RichTextPreview,
  tags: ["autodocs"],
} satisfies Meta<typeof RichTextPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: {
            level: 2,
          },
          content: [
            {
              type: "text",
              text: "This is Heading 1",
            },
          ],
        },
        {
          type: "heading",
          attrs: {
            level: 3,
          },
          content: [
            {
              type: "text",
              text: "This is heading 2",
            },
          ],
        },
        {
          type: "heading",
          attrs: {
            level: 4,
          },
          content: [
            {
              type: "text",
              text: "This is heading 3",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Lorem ipsum dolor sit amet, ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
              text: "consectetur",
            },
            {
              type: "text",
              text: " adipiscing elit. ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "italic",
                },
              ],
              text: "Vestibulum",
            },
            {
              type: "text",
              text: " cursus fermentum justo eget congue. Fusce lorem elit, pharetra at mauris sed, tempus pellentesque odio. Etiam ullamcorper enim vitae nulla egestas faucibus. Nam lacinia, magna sed pharetra condimentum, nunc tellus tincidunt libero, quis venenatis tortor sem quis quam. Phasellus vitae risus vitae arcu ullamcorper tincidunt. Suspendisse efficitur ullamcorper lectus, quis imperdiet sem volutpat nec. Donec blandit, dolor at semper ultrices, nunc nisi venenatis lorem, et aliquet justo risus id leo. Integer dictum lorem in metus interdum facilisis. In tristique sed leo vel tincidunt.",
            },
          ],
        },
        {
          type: "codeBlock",
          attrs: {
            language: "jsx",
          },
          content: [
            {
              type: "text",
              text: "import React from 'react';\n\nexport const RichTextEditor = () => {\n  return (\n    <div>This is a rich text editor</div>\n  );\n};\n\nexport default RichTextEditor;",
            },
          ],
        },
        {
          type: "figure",
          attrs: {
            src: "https://tekminewe.com/_next/image?url=%2Fassets%2Flogo.webp&w=384&q=75",
            alt: "The logo of tekminewe.com",
            title: "tekminewe Logo",
          },
          content: [
            {
              type: "text",
              text: "This is the caption for the figure",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "This is a ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: "https://tekminewe.com",
                    target: "_blank",
                    rel: "noopener noreferrer nofollow",
                    class: null,
                  },
                },
              ],
              text: "link",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "This is a mailto:",
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: "mailto:johndoe@example.com",
                    target: "_blank",
                    rel: "noopener noreferrer nofollow",
                    class: null,
                  },
                },
              ],
              text: "johndoe@example.com",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "This is the ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "code",
                },
              ],
              text: "inline code",
            },
            {
              type: "text",
              text: " . Do not mistaken with codeblock.",
            },
          ],
        },
        {
          type: "paragraph",
        },
        {
          type: "paragraph",
        },
      ],
    },
  },
};
