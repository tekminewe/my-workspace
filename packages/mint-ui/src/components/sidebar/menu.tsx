import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';

export interface SidebarMenuProps extends HTMLAttributes<HTMLDivElement> {}

export const SidebarMenu = forwardRef<HTMLDivElement, SidebarMenuProps>(
  (props, ref) => {
    return (
      <div
        {...props}
        className={cn('sidebar-menu', props.className)}
        ref={ref}
      />
    );
  },
);
