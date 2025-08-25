import * as RadixTabs from '@radix-ui/react-tabs';
import { forwardRef } from 'react';
import { cn } from '../utils';

export type TabsContentProps = RadixTabs.TabsContentProps;

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ ...props }, ref) => {
    return (
      <RadixTabs.TabsContent
        {...props}
        className={cn('pt-4', props.className)}
        ref={ref}
      />
    );
  },
);

TabsContent.displayName = 'TabsContent';
