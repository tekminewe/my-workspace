import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';

export interface SidebarMenuGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The title of the group.
   */
  title?: string;
}

export const SidebarMenuGroup = forwardRef<
  HTMLDivElement,
  SidebarMenuGroupProps
>(({ title, children, ...props }, ref) => {
  return (
    <div
      {...props}
      className={cn('sidebar-menu-group', props.className)}
      ref={ref}
    >
      {title && <h3 className="sidebar-menu-group-title">{title}</h3>}
      {children}
    </div>
  );
});
