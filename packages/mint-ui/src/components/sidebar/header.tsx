import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';

export interface SidebarHeaderProps
  extends HTMLAttributes<HTMLHeadingElement> {}

export const SidebarHeader = forwardRef<HTMLHeadingElement, SidebarHeaderProps>(
  (props, ref) => {
    return (
      <h1
        {...props}
        className={cn('sidebar-header', props.className)}
        ref={ref}
      ></h1>
    );
  },
);
