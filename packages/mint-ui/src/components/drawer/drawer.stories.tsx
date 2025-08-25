import { Meta, StoryObj } from "@storybook/react-vite";
import { Drawer, DrawerProps } from "./drawer";
import { DrawerRoot, DrawerRootProps } from "./drawer-root";
import { DrawerTrigger } from "./drawer-trigger";
import { Button } from "../button";
import { useCallback, useState } from "react";
import { TextInput } from "../text-input";
import { DrawerTitle } from "./drawer-title";

const meta = {
  title: "Common / Drawer",
  component: Drawer,
  subcomponents: {
    DrawerRoot: DrawerRoot as React.ComponentType<unknown>,
    DrawerTrigger: DrawerTrigger as React.ComponentType<unknown>,
    DrawerTitle: DrawerTitle as React.ComponentType<unknown>,
  },
  tags: ["autodocs"],
  render: (args: DrawerProps & DrawerRootProps) => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const callbackRef = useCallback((node: HTMLDivElement) => {
      if (node) {
        setRef(node);
      }
    }, []);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { direction, open, title, ...drawerProps } = args;

    return (
      <div ref={callbackRef}>
        <DrawerRoot open={open} direction={direction}>
          <DrawerTrigger asChild>
            <Button>Show Drawer</Button>
          </DrawerTrigger>
          <Drawer container={ref} {...drawerProps}>
            <DrawerTitle>{title}</DrawerTitle>
            <TextInput label="Name" placeholder="Please enter the name" />
          </Drawer>
        </DrawerRoot>
      </div>
    );
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RightDrawer: Story = {
  args: {
    title: "Right Drawer",
    direction: "right",
    open: true,
  },
};

export const LeftDrawer: Story = {
  args: {
    title: "Left Drawer",
    direction: "left",
    open: true,
  },
};

export const BottomDrawer: Story = {
  args: {
    title: "Bottom Drawer",
    direction: "bottom",
    open: true,
  },
};
