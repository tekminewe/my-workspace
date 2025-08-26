import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';

export interface AdminLayoutProps extends HTMLAttributes<HTMLDivElement> {}

export const AdminLayout = forwardRef<HTMLDivElement, AdminLayoutProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={cn('admin-layout', className)} />
    );
  },
);

AdminLayout.displayName = 'AdminLayout';
