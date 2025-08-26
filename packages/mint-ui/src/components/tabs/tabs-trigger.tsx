import * as RadixTabs from '@radix-ui/react-tabs';
import { forwardRef } from 'react';
import { cn } from '../utils';

export type TabsTriggerProps = RadixTabs.TabsTriggerProps;

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ ...props }, ref) => {
    return (
      <RadixTabs.TabsTrigger
        {...props}
        className={cn(
          "px-4 py-2 data-[state='active']:border-b-2 border-accent-indicator",
          props.className,
        )}
        ref={ref}
      />
    );
  },
);

TabsTrigger.displayName = 'TabsTrigger';
