import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link } from "./link";

const meta: Meta<typeof Link> = {
  title: "Navigation/Link",
  component: Link,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: "#",
    children: "This is a link",
  },
};

export const WithoutUnderline: Story = {
  args: {
    href: "#",
    children: "This is a link without underline",
    underline: false,
  },
};

export const External: Story = {
  args: {
    href: "https://example.com",
    children: "This is an external link",
    external: true,
  },
};

export const WithCustomClass: Story = {
  args: {
    href: "#",
    children: "This is a link with custom class",
    className: "text-red-500 dark:text-red-400 font-bold",
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: () => (
    <div className="flex flex-col gap-4 dark p-4 bg-neutral-900">
      <Link href="#">This is a link in dark mode</Link>
      <Link href="#" underline={false}>
        This is a link without underline in dark mode
      </Link>
      <Link href="https://example.com" external>
        This is an external link in dark mode
      </Link>
      <Link href="#" className="text-red-500 dark:text-red-400 font-bold">
        This is a link with custom styling in dark mode
      </Link>
    </div>
  ),
};
