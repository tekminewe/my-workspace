import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';

export interface AdminNavbarProps extends HTMLAttributes<HTMLDivElement> {}

export const AdminNavbar = forwardRef<HTMLDivElement, AdminNavbarProps>(
  ({ className, ...props }, ref) => {
    return (
      <nav ref={ref} {...props} className={cn('admin-navbar', className)} />
    );
  },
);

AdminNavbar.displayName = 'AdminNavbar';
