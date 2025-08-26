import { Meta, StoryObj } from "@storybook/react-vite";

import { ErrorMessage } from "./error-message";

const meta = {
  title: "Common / ErrorMessage",
  tags: ["autodocs"],
  render: () => {
    return (
      <ErrorMessage
        title="Ooppsss! We are so sorry"
        message="Something's went wrong. Please refresh the page again"
      />
    );
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
