import * as React from 'react';
import { cn } from '../utils';

type ElementType = 'span' | 'p' | 'div';

export interface SmallTextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The content of the small text.
   */
  children: React.ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * The HTML element to render.
   * @default "span"
   */
  as?: ElementType;
}

export function SmallText({
  children,
  className,
  as = 'span',
  ...props
}: SmallTextProps) {
  const Component = as;

  return (
    <Component
      className={cn(
        'text-sm text-neutral-500 dark:text-neutral-400',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
