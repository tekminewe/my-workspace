import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';

export interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  (props, ref) => {
    return (
      <aside {...props} className={cn('sidebar', props.className)} ref={ref} />
    );
  },
);

Sidebar.displayName = 'Sidebar';
