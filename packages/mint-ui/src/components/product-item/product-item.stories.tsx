import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProductItem } from "./product-item";

const meta: Meta<typeof ProductItem> = {
  title: "ECommerce/ProductItem",
  component: ProductItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProductItem>;

export const Default: Story = {
  args: {
    title: "Product Title",
    caption: "Product Caption",
    imageUrl: "https://via.placeholder.com/375x140",
    price: "£100.00",
  },
};

export const WithCustomWidth: Story = {
  args: {
    title: "Wider Product",
    caption: "This product item has a custom width",
    imageUrl: "https://via.placeholder.com/375x140",
    price: "£150.00",
    maxWidth: "450px",
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: () => (
    <div className="dark p-4 bg-neutral-900">
      <ProductItem
        title="Dark Mode Product"
        caption="This product is displayed in dark mode"
        imageUrl="https://via.placeholder.com/375x140"
        price="£125.00"
      />
    </div>
  ),
};
