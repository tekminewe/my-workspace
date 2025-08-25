import type { Meta, StoryObj } from "@storybook/react-vite";
import { PostItem } from "./post-item";

const meta: Meta<typeof PostItem> = {
  title: "Blog/PostItem",
  component: PostItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PostItem>;

export const Default: Story = {
  args: {
    title: "10 benefits of using MintUI",
    summary:
      "MintUI is a great library for building user interfaces. Here are 10 benefits of using it. MintUI is a great library for building user interfaces. Here are 10 benefits of using it.",
    imageUrl: "https://via.placeholder.com/200x100",
    date: "July 13, 2021",
    tags: ["React", "JavaScript", "UI"],
  },
};

export const WithoutTags: Story = {
  args: {
    title: "Getting started with MintUI",
    summary:
      "Learn how to get started with MintUI and build beautiful user interfaces in minutes.",
    imageUrl: "https://via.placeholder.com/200x100",
    date: "August 5, 2021",
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: () => (
    <div className="dark p-4 bg-neutral-900" style={{ width: "800px" }}>
      <PostItem
        title="MintUI in Dark Mode"
        summary="Discover how MintUI works seamlessly in dark mode with automatic theme detection and consistent styling."
        imageUrl="https://via.placeholder.com/200x100"
        date="September 10, 2021"
        tags={["Dark Mode", "Theming", "UI"]}
      />
    </div>
  ),
};
