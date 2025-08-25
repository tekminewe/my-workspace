import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';

export interface AdminContentProps extends HTMLAttributes<HTMLDivElement> {}

export const AdminContent = forwardRef<HTMLDivElement, AdminContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <main ref={ref} {...props} className={cn('admin-content', className)} />
    );
  },
);

AdminContent.displayName = 'AdminContent';
