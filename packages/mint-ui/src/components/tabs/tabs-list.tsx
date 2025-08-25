import * as RadixTabs from '@radix-ui/react-tabs';
import { forwardRef } from 'react';
import { cn } from '../utils';
import { BORDER_COLORS } from '../utils/component-colors';

export type TabsListProps = RadixTabs.TabsListProps;

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ ...props }, ref) => {
    return (
      <RadixTabs.TabsList
        {...props}
        className={cn('border-b', BORDER_COLORS.subtle, props.className)}
        ref={ref}
      />
    );
  },
);

TabsList.displayName = 'TabsList';
