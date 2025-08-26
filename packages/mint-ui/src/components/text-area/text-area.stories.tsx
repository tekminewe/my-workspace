import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from "./text-area";

const meta: Meta<typeof TextArea> = {
  title: "Form Controls/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    label: "Description",
    placeholder: "Enter your description here",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Description",
    description: "Please provide a detailed description",
    placeholder: "Enter your description here",
  },
};

export const Required: Story = {
  args: {
    label: "Description",
    required: true,
    placeholder: "Enter your description here",
  },
};

export const WithError: Story = {
  args: {
    label: "Description",
    error: "Description is required",
    placeholder: "Enter your description here",
  },
};

export const Disabled: Story = {
  args: {
    label: "Description",
    disabled: true,
    placeholder: "Enter your description here",
    value: "This text area is disabled",
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: "Description",
    placeholder: "Enter your description here",
    defaultValue: "This is a default value for the text area",
  },
};

export const LargeTextArea: Story = {
  args: {
    label: "Description",
    placeholder: "Enter your description here",
    className: "min-h-[200px]",
  },
};

export const DarkMode: Story = {
  args: {
    label: "Description",
    placeholder: "Enter your description here",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};
