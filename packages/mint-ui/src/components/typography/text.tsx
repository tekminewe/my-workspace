import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, ...props }, ref) => {
    return <p ref={ref} {...props} className={cn('text', className)} />;
  },
);

Text.displayName = 'Text';
