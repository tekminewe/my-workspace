"use client";

import { Drawer as Vaul } from "vaul";

export interface DrawerRootProps {
  children?: React.ReactNode;
  direction?: "left" | "bottom" | "right";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

export const DrawerRoot = ({
  open,
  modal,
  onOpenChange,
  children,
  direction = "left",
}: DrawerRootProps) => {
  return (
    <Vaul.Root
      modal={modal}
      onOpenChange={onOpenChange}
      open={open}
      direction={direction}
    >
      {children}
    </Vaul.Root>
  );
};
