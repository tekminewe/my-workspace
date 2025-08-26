import { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./tabs";
import { TabsList } from "./tabs-list";
import { TabsTrigger } from "./tabs-trigger";
import { TabsContent } from "./tabs-content";
import { useState } from "react";

const meta = {
  title: "Navigation / Tabs",
  tags: ["autodocs"],
  render: () => {
    const [selectedTab, setSelectedTab] = useState("tab1");
    return (
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 content</TabsContent>
        <TabsContent value="tab2">Tab 2 content</TabsContent>
        <TabsContent value="tab3">Tab 3 content</TabsContent>
      </Tabs>
    );
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
