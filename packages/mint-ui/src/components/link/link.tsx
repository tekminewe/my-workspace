import * as React from 'react';
import { cn } from '../utils';

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * The href attribute for the link.
   */
  href: string;

  /**
   * The content of the link.
   */
  children: React.ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Whether the link is underlined.
   * @default true
   */
  underline?: boolean;

  /**
   * Whether the link should open in a new tab.
   * @default false
   */
  external?: boolean;
}

export function Link({
  href,
  children,
  className,
  underline = true,
  external = false,
  ...props
}: LinkProps) {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a
      href={href}
      className={cn(
        'font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400',
        underline && 'underline underline-offset-4',
        className,
      )}
      {...externalProps}
      {...props}
    >
      {children}
    </a>
  );
}
