import * as PopoverPrimitive from "@radix-ui/react-popover";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "./popover-primitive";

// Re-export the same structure as the old Popover component
const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Close: PopoverPrimitive.Close,
  Anchor: PopoverPrimitive.Anchor,
  Arrow: PopoverPrimitive.Arrow,
};

export { Popover };
