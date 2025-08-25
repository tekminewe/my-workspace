import type { Meta, StoryObj } from "@storybook/react-vite";
import { SmallText } from "./small-text";

const meta: Meta<typeof SmallText> = {
  title: "Typography/SmallText",
  component: SmallText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SmallText>;

export const Default: Story = {
  args: {
    children: "This is small text",
  },
};

export const AsParagraph: Story = {
  args: {
    children: "This is small text as a paragraph element",
    as: "p",
  },
};

export const AsDiv: Story = {
  args: {
    children: "This is small text as a div element",
    as: "div",
  },
};

export const WithCustomClass: Story = {
  args: {
    children: "This is small text with a custom class",
    className: "font-bold text-blue-500 dark:text-blue-400",
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: () => (
    <div className="flex flex-col gap-4 dark p-4 bg-neutral-900">
      <SmallText>This is small text in dark mode</SmallText>
      <SmallText as="p">
        This is small text as a paragraph in dark mode
      </SmallText>
      <SmallText className="font-bold text-blue-500 dark:text-blue-400">
        This is small text with custom styling in dark mode
      </SmallText>
    </div>
  ),
};
