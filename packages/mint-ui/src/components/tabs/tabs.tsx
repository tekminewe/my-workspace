import * as RadixTabs from "@radix-ui/react-tabs";
import { forwardRef } from "react";

export type TabsProps = RadixTabs.TabsProps;

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ ...props }, ref) => {
    return <RadixTabs.Root {...props} ref={ref} />;
  }
);

Tabs.displayName = "Tabs";
