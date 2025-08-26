import { Meta, StoryObj } from "@storybook/react-vite";
import { ProductList } from "./product-list";
import { ProductItem } from "../product-item";

const meta = {
  title: "ECommerce / Product List",
  component: ProductList,
  tags: ["autodocs"],
} satisfies Meta<typeof ProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: (
      <>
        <ProductItem
          title="Product Title"
          caption="Product Caption"
          imageUrl="https://via.placeholder.com/375x140"
          price="£100.00"
        />
        <ProductItem
          title="Product Title"
          caption="Product Caption"
          imageUrl="https://via.placeholder.com/375x140"
          price="£100.00"
        />
        <ProductItem
          title="Product Title"
          caption="Product Caption"
          imageUrl="https://via.placeholder.com/375x140"
          price="£100.00"
        />
        <ProductItem
          title="Product Title"
          caption="Product Caption"
          imageUrl="https://via.placeholder.com/375x140"
          price="£100.00"
        />
        <ProductItem
          title="Product Title"
          caption="Product Caption"
          imageUrl="https://via.placeholder.com/375x140"
          price="£100.00"
        />
        <ProductItem
          title="Product Title"
          caption="Product Caption"
          imageUrl="https://via.placeholder.com/375x140"
          price="£100.00"
        />
        <ProductItem
          title="Product Title"
          caption="Product Caption"
          imageUrl="https://via.placeholder.com/375x140"
          price="£100.00"
        />
      </>
    ),
  },
};
